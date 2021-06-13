import { indicesArray } from './arrays';

export function buildLowercaseAlphabet() {
  const charCode = 'a'.charCodeAt(0);
  return indicesArray(26).map(
    i => String.fromCharCode(charCode + i)
  );
}

export function buildUppercaseAlphabet() {
  const charCode = 'A'.charCodeAt(0);
  return indicesArray(26).map(
    i => String.fromCharCode(charCode + i)
  );
}

export function isLetter(string) {
  if (typeof string !== 'string') return false;
  return /^[A-Za-z]$/.test(string);
}

export const filledSquareCharacter = '~';