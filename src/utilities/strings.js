export function firstCharacter(word) {
  return word.charAt(0);
}

export function lastCharacter(word) {
  return word.charAt(word.length - 1);
}

export function trimFirstCharacter(word) {
  return word.substring(1);
}

export function trimLastCharacter(word) {
  return word.substring(0, word.length - 1);
}