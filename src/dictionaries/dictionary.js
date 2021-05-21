import { dictionary1 } from './dictionary1';
import { dictionary2 } from './dictionary2';
import { dictionary3 } from './dictionary3';
import { dictionary4 } from './dictionary4';
import { dictionary5 } from './dictionary5';
import { dictionary6 } from './dictionary6';

export function dictionaryWithWordsOfLength(length) {
  if (length === 1) return dictionary1;
  if (length === 2) return dictionary2;
  if (length === 3) return dictionary3;
  if (length === 4) return dictionary4;
  if (length === 5) return dictionary5;
  if (length === 6) return dictionary6;
  throw new Error('Need a dictionary with longer words');
}
