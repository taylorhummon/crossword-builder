export type Letter = (
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' |
  'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
);
export type SuggestableCharacter = Letter | '■';
export type Character = Letter | '□' | '■';


export const LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
] as const;
export const EMPTY_SQUARE = '□';
export const FILLED_SQUARE = '■';


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
