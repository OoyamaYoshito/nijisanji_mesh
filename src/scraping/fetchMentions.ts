import { Member, Mention } from '../types';
import cachedFetchContent from './cachedFetch';
import urlencode from 'urlencode';
import { CHARSET } from './settings';

type CountHitsResult = {
  q: string;
  results: { hitCount: number; video: { channelId: string } }[];
};

const fetchNicknamesMentions = async (
  nickname: string,
  target_channel: string
): Promise<Mention[]> => {
  const content = await cachedFetchContent(
    `https://comment.vtubersoft.com/api/count_hits?q=${urlencode(
      nickname,
      CHARSET
    )}`
  );

  const result: CountHitsResult = JSON.parse(content);
  const filterd_result = result.results.filter(
    x => x.video.channelId != target_channel
  );

  const grouped_mentions: { [key: string]: number } = {};
  filterd_result.forEach(x => {
    const channelId = x.video.channelId;
    if (grouped_mentions[channelId] === undefined)
      grouped_mentions[channelId] = x.hitCount;
    else grouped_mentions[channelId] += x.hitCount;
  });

  return Object.entries(grouped_mentions).map(([channel_id, comment_num]) => ({
    origin_channel: channel_id,
    target_channel,
    comment_num,
  }));
};

const fetchMemberMentions = async (member: Member): Promise<Mention[]> => {
  const nicknames_and_fullname: string[] = [...member.nicknames, member.name];
  let result_mentions: Mention[] = [];
  for (const x of nicknames_and_fullname) {
    const nicknames_mentions = await fetchNicknamesMentions(
      x,
      member.channel_id
    );
    result_mentions = result_mentions.concat(nicknames_mentions);
  }

  const member_mentions: { [key: string]: number } = {};
  result_mentions.forEach(x => {
    const channelId = x.origin_channel;
    if (member_mentions[channelId] === undefined)
      member_mentions[channelId] = x.comment_num;
    else member_mentions[channelId] += x.comment_num;
  });

  return Object.entries(member_mentions).map(
    ([origin_channel, comment_num]) => ({
      origin_channel,
      target_channel: member.channel_id,
      comment_num,
    })
  );
};

export const fetchMembersMentions = async (
  members: Member[]
): Promise<Mention[]> => {
  let members_mentions: Mention[] = [];
  for (const x of members) {
    const member_mentions = await fetchMemberMentions(x);
    members_mentions = members_mentions.concat(member_mentions);
  }
  return members_mentions;
};

export default fetchMembersMentions;
