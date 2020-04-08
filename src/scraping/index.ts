import fs from 'fs';
import { CACHE_DIR } from './settings';
import { Member } from '../types';
import fetchNameAndChannelIds from './fetchNameAndChannelIds';
import fetchNameAndNicknames from './fetchNameAndNicknames';
import fetchMembersMentions from './fetchMentions';

const main = async () => {
  try {
    fs.mkdirSync(__dirname, CACHE_DIR);
  } catch (e) {}

  const name_and_channel_ids = await fetchNameAndChannelIds();
  const name_2_channel_id: { [key: string]: string } = {};
  name_and_channel_ids.forEach(x => (name_2_channel_id[x.name] = x.channel_id));

  const name_and_nicknames = await fetchNameAndNicknames();
  const members: Member[] = name_and_nicknames.map(x => ({
    ...x,
    channel_id: name_2_channel_id[x.name],
  }));

  await fetchMembersMentions(members);
};
main();
