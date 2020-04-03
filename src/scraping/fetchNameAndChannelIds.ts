import { Member } from '../types';
import { JSDOM } from 'jsdom';
import { TOPPAGE_URL } from './settings';
import cachedFetchContent from './cachedFetch';

export type NameAndChannelId = Pick<Member, 'name' | 'channel_id'>;
export const fetchNameAndChannelId = async (
  memberpage_url: string
): Promise<NameAndChannelId | null> => {
  const toppage_dom = new JSDOM(await cachedFetchContent(TOPPAGE_URL));
  const toppage_document = toppage_dom.window.document;

  const name_img = toppage_document.querySelector(
    `a[href='${memberpage_url}'] img`
  );
  if (name_img === null) return null;
  const name = (name_img as HTMLImageElement).alt;

  const memberpage_dom = new JSDOM(await cachedFetchContent(memberpage_url));
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

  return { name, channel_id };
};

export const fetchNameAndChannelIds = async (): Promise<NameAndChannelId[]> => {
  const dom = new JSDOM(await cachedFetchContent(TOPPAGE_URL));
  const document = dom.window.document;

  const memberpage_anchers: NodeListOf<Element> = document.querySelectorAll(
    '#elementor-tab-content-7551 a'
  );

  const memberpage_urls: string[] = Array.from(memberpage_anchers).map(
    x => (x as HTMLAnchorElement).href
  );

  let name_and_channel_ids: NameAndChannelId[] = [];
  for (const url of memberpage_urls) {
    const name_and_channel_id = await fetchNameAndChannelId(url);
    if (null !== name_and_channel_id)
      name_and_channel_ids.push(name_and_channel_id);
  }

  return name_and_channel_ids;
};

export default fetchNameAndChannelIds;
