import path from 'path';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import fetch from 'node-fetch';
import { FETCH_CACHE_DIR, FETCH_INTERVAL } from './settings';

//scraping utils
const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

const cachedFetchContent = async (url: string): Promise<string> => {
  const filename = sanitize(url);
  const fullpath = path.join(__dirname, FETCH_CACHE_DIR, filename);
  try {
    return fs.readFileSync(fullpath).toString();
  } catch (e) {}

  //no cache
  await sleep(FETCH_INTERVAL);
  const res = await fetch(url);
  const content = await res.text();
  fs.writeFileSync(fullpath, content);
  return content;
};

export default cachedFetchContent;
