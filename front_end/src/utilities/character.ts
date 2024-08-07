import { indicesArray } from 'utilities/array';


export const EMPTY_SQUARE = '□';
export const FILLED_SQUARE = '■';

export function buildLetters(): Array<string> {
  const charCodeForA = 'A'.charCodeAt(0);
  return indicesArray(26).map(
    i => String.fromCharCode(charCodeForA + i)
  );
}

export function isLetter(
  value: any
): boolean {
  if (typeof value !== 'string') return false;
  return /^([A-Z])$/.test(value)
}

export function isSuggestableCharacter(
  value: any
): boolean {
  if (typeof value !== 'string') return false;
  return /^([A-Z]|■)$/.test(value);
}

export function isCharacter(
  value: any
): boolean {
  if (typeof value !== 'string') return false;
  return /^([A-Z]|■|□)$/.test(value);
}
