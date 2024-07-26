import { indicesArray } from './arrays';

export function buildLowercaseAlphabet(): Array<string> {
  const charCode = 'a'.charCodeAt(0);
  return indicesArray(26).map(
    i => String.fromCharCode(charCode + i)
  );
}

export function buildUppercaseAlphabet(): Array<string> {
  const charCode = 'A'.charCodeAt(0);
  return indicesArray(26).map(
    i => String.fromCharCode(charCode + i)
  );
}

export function isLetter(
  value: any
): boolean {
  if (typeof value !== 'string') return false;
  return /^[A-Za-z]$/.test(value);
}

export const filledSquareCharacter = '~';
