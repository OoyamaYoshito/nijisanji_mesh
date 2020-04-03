import { Member } from '../types';
import { JSDOM } from 'jsdom';
import { TOPPAGE_URL } from './settings';
import cachedFetchContent from './cachedFetch';

export const fetchMember = async (
  member_url: string
): Promise<Member | null> => {
  const toppage_dom = new JSDOM(await cachedFetchContent(TOPPAGE_URL));
  const toppage_document = toppage_dom.window.document;

  const name_img = toppage_document.querySelector(
    `a[href='${member_url}'] img`
  );
  if (name_img === null) return null;
  const name = (name_img as HTMLImageElement).alt;

  const memberpage_dom = new JSDOM(await cachedFetchContent(member_url));
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

export const fetchMembers = async (): Promise<Member[]> => {
  const dom = new JSDOM(await cachedFetchContent(TOPPAGE_URL));
  const document = dom.window.document;

  const member_anchers: NodeListOf<Element> = document.querySelectorAll(
    '#elementor-tab-content-7551 a'
  );

  const member_urls: string[] = Array.from(member_anchers).map(
    x => (x as HTMLAnchorElement).href
  );

  let members: Member[] = [];
  for (const member_url of member_urls) {
    const member = await fetchMember(member_url);
    if (null !== member) members.push(member);
  }

  return members;
};

export default fetchMembers;
