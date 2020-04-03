import fs from 'fs';
import { CACHE_DIR } from './settings';
import fetchNameAndChannelIds from './fetchNameAndChannelIds';
import fetchNameAndNicknames from './fetchNameAndNicknames';

const main = async () => {
  try {
    fs.mkdirSync(__dirname, CACHE_DIR);
  } catch (e) {}

  //console.log(await fetchNameAndChannelIds());
  console.log(await fetchNameAndNicknames());
};
main();
