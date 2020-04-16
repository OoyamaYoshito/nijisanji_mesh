import path from 'path';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import fetch from 'node-fetch';
import urlencode from 'urlencode';
import { FETCH_CACHE_DIR, FETCH_INTERVAL } from './settings';

//scraping utils
const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

const cachedFetch = async (url: string): Promise<Buffer> => {
  const filename = sanitize(url);
  const fullpath = path.join(__dirname, FETCH_CACHE_DIR, filename);
  try {
    return fs.readFileSync(fullpath);
  } catch (e) {}

  //no cache
  console.log('fetching:', urlencode.decode(url));

  await sleep(FETCH_INTERVAL);
  const res = await fetch(url);
  const content = await res.buffer();
  fs.writeFileSync(fullpath, content);
  return content;
};

const cachedFetchText = async (url: string): Promise<string> =>
  (await cachedFetch(url)).toString();

export const cachedFetchBase64 = async (url: string): Promise<string> =>
  (await cachedFetch(url)).toString('base64');

export default cachedFetchText;
