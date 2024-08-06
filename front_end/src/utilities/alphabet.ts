import { indicesArray } from './arrays';


export const FILLED_SQUARE_CHARACTER = '~';

export function isSuggestion(
  value: any
): boolean {
  if (value === FILLED_SQUARE_CHARACTER) return true;
  return isLetter(value);
}

export function isLetter(
  value: any
): boolean {
  if (typeof value !== 'string') return false;
  return /^[A-Za-z]$/.test(value);
}

export function buildUppercaseAlphabet(): Array<string> {
  const charCode = 'A'.charCodeAt(0);
  return indicesArray(26).map(
    i => String.fromCharCode(charCode + i)
  );
}
