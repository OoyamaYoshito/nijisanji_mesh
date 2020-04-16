import fs from 'fs';
import { Member, Mention, ResultJSON } from '../types';
import path from 'path';
import { FETCH_CACHE_DIR, FUNC_CACHE_DIR, RESURT_FILE } from './settings';
import fetchNameAndChannelIdAndImgs from './fetchNameAndChannelIdAndImgs';
import fetchNameAndNicknames from './fetchNameAndNicknames';
import fetchMembersMentions from './fetchMentions';

const main = async () => {
  try {
    fs.mkdirSync(path.join(__dirname, FETCH_CACHE_DIR));
  } catch (e) {}
  try {
    fs.mkdirSync(path.join(__dirname, FUNC_CACHE_DIR));
  } catch (e) {}

  const name_and_channel_id_and_imgs = await fetchNameAndChannelIdAndImgs();
  const name_2_channel_id_2_img: {
    [key: string]: Pick<Member, 'name' | 'channel_id' | 'icon'>;
  } = {};
  name_and_channel_id_and_imgs.forEach(
    (x) => (name_2_channel_id_2_img[x.name] = x)
  );

  const name_and_nicknames = await fetchNameAndNicknames();
  const members: Member[] = name_and_nicknames
    .map((x) => ({
      ...x,
      channel_id: name_2_channel_id_2_img[x.name]?.channel_id,
      icon: name_2_channel_id_2_img[x.name]?.icon,
    }))
    .filter((x) => x.channel_id !== undefined);

  const mentions: Mention[] = await fetchMembersMentions(members);
  const result: ResultJSON = { members, mentions };
  const fullpath: string = path.join(__dirname, RESURT_FILE);
  fs.writeFileSync(fullpath, JSON.stringify(result));
};
main();
