import fs from 'fs';
import { CACHE_DIR } from './settings';
import fetchMembers from './fetchMembers';

const main = async () => {
  try {
    fs.mkdirSync(__dirname, CACHE_DIR);
  } catch (e) {}

  console.log(await fetchMembers());
};
main();
