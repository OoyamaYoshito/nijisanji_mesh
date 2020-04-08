import fs from 'fs';
import path from 'path';
import { FETCH_CACHE_DIR, FUNC_CACHE_DIR } from './settings';
import fetchNameAndChannelIds from './fetchNameAndChannelIds';
import fetchNameAndNicknames from './fetchNameAndNicknames';

const main = async () => {
  try {
    fs.mkdirSync(path.join(__dirname, FETCH_CACHE_DIR));
  } catch (e) {}

  try {
    fs.mkdirSync(path.join(__dirname, FUNC_CACHE_DIR));
  } catch (e) {}

  console.log(await fetchNameAndChannelIds());
  const n = await fetchNameAndNicknames();
  let i: number = 0;
  for (const x of n) {
    i += x.nicknames.length;
  }
  console.log(i);
};
main();
