import { dictionary1 } from './dictionary1';
import { dictionary2 } from './dictionary2';
import { dictionary3 } from './dictionary3';
import { dictionary4 } from './dictionary4';
import { dictionary5 } from './dictionary5';
import { dictionary6 } from './dictionary6';
import { dictionary7 } from './dictionary7';
import { dictionary8 } from './dictionary8';
import { dictionary9 } from './dictionary9';
import { dictionary10 } from './dictionary10';

export function dictionaryWithWordsOfLength(length) {
  if (length === 1) return dictionary1;
  if (length === 2) return dictionary2;
  if (length === 3) return dictionary3;
  if (length === 4) return dictionary4;
  if (length === 5) return dictionary5;
  if (length === 6) return dictionary6;
  if (length === 7) return dictionary7;
  if (length === 8) return dictionary8;
  if (length === 9) return dictionary9;
  if (length === 10) return dictionary10;
  return [];
}
