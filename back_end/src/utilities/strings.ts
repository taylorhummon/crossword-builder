export function firstCharacter(
  word: string
): string {
  return word.charAt(0);
}

export function lastCharacter(
  word: string
): string {
  return word.charAt(word.length - 1);
}

export function trimFirstCharacter(
  word: string
): string {
  return word.substring(1);
}

export function trimLastCharacter(
  word: string
): string {
  return word.substring(0, word.length - 1);
}
