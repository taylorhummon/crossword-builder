import fs from 'fs';
import Stream from 'stream';
import { inclusiveIndicesArray } from '../utilities/arrays.js';
import { isNumber } from '../utilities/math.js';

const MIN_WORD_LENGTH = 1;
const MAX_WORD_LENGTH = 10;

let loadingPromise = null;
let wordsLists = [];

export async function buildWordsFinder() {
  const wordsFinder = (length) => {
    if (! isNumber(length)) throw Error('words finder expects a numerical length argument');
    if (wordsLists === null) throw Error('words lists were not initialized');
    if (length < MIN_WORD_LENGTH || length > MAX_WORD_LENGTH) return [];
    return wordsLists[length];
  }
  try {
    await ensureWordsLoaded();
    return wordsFinder;
  } catch (error) {
    console.error('Error occurred in find method of words service:', error);
  }
}

function ensureWordsLoaded() {
  if (loadingPromise === null) {
    loadingPromise = loadWords();
  }
  return loadingPromise;
}

async function loadWords() {
  try {
    const indices = inclusiveIndicesArray(MIN_WORD_LENGTH, MAX_WORD_LENGTH);
    await Promise.all(indices.map(loadWordsOfLength));
  } catch (error) {
    console.error('Error occurred loading words:', error);
  }
}

function loadWordsOfLength(i) {
  wordsLists[i] = [];
  return new Promise((resolve, reject) => {
    const readWordsStream = fs.createReadStream(`word_lists/words${i}.txt`);
    readWordsStream.on('error', (error) => { reject(error); });
    const storeWordsStream = createStoreWordsStream(wordsLists[i]);
    storeWordsStream.on('error', (error) => { reject(error); });
    storeWordsStream.on('finish', () => { resolve(); });
    readWordsStream.pipe(storeWordsStream);
  });
}

function createStoreWordsStream(array) {
  const storeWordsStream = new Stream.Writable();
  storeWordsStream._write = (chunk, encoding, next) => {
    const words = chunk.toString().split('\n');
    for (let word of words) {
      if (/[A-Z]+/.test(word)) {
        array.push(word);
      }
    }
    next();
  };
  return storeWordsStream;
}
