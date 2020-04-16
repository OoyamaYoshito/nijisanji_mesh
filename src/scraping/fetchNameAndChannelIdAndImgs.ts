import path from 'path';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import { Member } from '../types';
import { JSDOM } from 'jsdom';
import { TOPPAGE_URL, FUNC_CACHE_DIR } from './settings';
import cachedFetchText, { cachedFetchBase64 } from './cachedFetch';

export type NameAndChannelIdAndImg = Pick<
  Member,
  'name' | 'channel_id' | 'icon'
>;
export const fetchNameAndChannelIdAndImg = async (
  memberpage_url: string
): Promise<NameAndChannelIdAndImg | null> => {
  const fullpath = path.join(
    __dirname,
    FUNC_CACHE_DIR,
    sanitize(memberpage_url)
  );
  try {
    return JSON.parse(
      fs.readFileSync(fullpath).toString()
    ) as NameAndChannelIdAndImg;
  } catch (e) {}

  //no cache
  const toppage_dom = new JSDOM(await cachedFetchText(TOPPAGE_URL));
  const toppage_document = toppage_dom.window.document;

  const name_img = toppage_document.querySelector(
    `a[href='${memberpage_url}'] img`
  );
  if (name_img === null) return null;
  const name = (name_img as HTMLImageElement).alt;
  const img_url = (name_img as HTMLImageElement).src;
  const icon = await cachedFetchBase64(img_url);

  const memberpage_dom = new JSDOM(await cachedFetchText(memberpage_url));
  const memberpage_document = memberpage_dom.window.document;

  const channel_link = memberpage_document.querySelector(
    'a.elementor-social-icon-youtube'
  );
  if (channel_link === null) return null;
  const matched = (channel_link as HTMLAnchorElement).href.match(
    /https?:.+channel\/(.+)/
  );
  if (matched === null) return null;
  const channel_id = matched[1].replace('?sub_confirmation=1', '');

  fs.writeFileSync(fullpath, JSON.stringify({ name, channel_id, icon }));
  return { name, channel_id, icon };
};

export const fetchNameAndChannelIdAndImgs = async (): Promise<
  NameAndChannelIdAndImg[]
> => {
  const dom = new JSDOM(await cachedFetchText(TOPPAGE_URL));
  const document = dom.window.document;

  const memberpage_anchers: NodeListOf<Element> = document.querySelectorAll(
    '#elementor-tab-content-7551 a'
  );

  const memberpage_urls: string[] = Array.from(memberpage_anchers).map(
    (x) => (x as HTMLAnchorElement).href
  );

  let name_and_channel_id_and_imgs: NameAndChannelIdAndImg[] = [];
  for (const url of memberpage_urls) {
    const name_and_channel_id_and_img = await fetchNameAndChannelIdAndImg(url);
    if (null !== name_and_channel_id_and_img)
      name_and_channel_id_and_imgs.push(name_and_channel_id_and_img);
  }

  return name_and_channel_id_and_imgs;
};

export default fetchNameAndChannelIdAndImgs;
