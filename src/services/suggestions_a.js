import dictionaryWithWordsOfLength from './dictionary';
import { computeSubpatterns, computeSubpatternsTrimRight, computeSubpatternsTrimLeft } from './subpatterns';
import { firstCharacter, lastCharacter, trimFirstCharacter, trimLastCharacter } from './strings';

export function findSuggestions1(pattern) {
  return findSuggestionsHelper(pattern);
}

export function findSuggestions2(pattern) {
  const lettersSet = new Set();
  const subpatterns = computeSubpatterns(pattern);
  for (const subpattern of subpatterns) {
    const lettersSetForSubpattern = findSuggestionsHelper(subpattern);
    for (const letter of lettersSetForSubpattern) {
      lettersSet.add(letter);
    }
  }
  return lettersSet;
}

function findSuggestionsHelper(pattern) {
  const lettersSet = new Set();
  const index = pattern.indexOf('@');
  const regExp = buildRegExp(pattern);
  const dictionary = dictionaryWithWordsOfLength(pattern.length);
  for (const word of dictionary) {
    if (regExp.test(word)) lettersSet.add(word.charAt(index));
  }
  return lettersSet;
}

function buildRegExp(pattern) {
  const regExpPattern = pattern.split('').map(
    character => character === '@' ? '.' : character
  ).join('');
  return new RegExp(`^${regExpPattern}$`);
}

export function computeSuggestFillTrimLeft(pattern) {
  if (lastCharacter(pattern) !== '@') throw new Error('Expected @ as last character');
  const subpatterns = computeSubpatternsTrimLeft(pattern);
  if (subpatterns.includes('@')) return true;
  for (const subpattern of subpatterns) {
    const regExpPattern = trimLastCharacter(subpattern);
    if (hasMatchInDictionary(regExpPattern)) return true;
  }
  return false;
}

export function computeSuggestFillTrimRight(pattern) {
  if (firstCharacter(pattern) !== '@') throw new Error('Expected @ as first character');
  const subpatterns = computeSubpatternsTrimRight(pattern);
  if (subpatterns.includes('@')) return true;
  for (const subpattern of subpatterns) {
    const regExpPattern = trimFirstCharacter(subpattern);
    if (hasMatchInDictionary(regExpPattern)) return true;
  }
  return false;
}

function hasMatchInDictionary(regExpPattern) {
  const regExp = new RegExp(`^${regExpPattern}$`);
  const dictionary = dictionaryWithWordsOfLength(regExpPattern.length);
  for (const word of dictionary) {
    if (regExp.test(word)) return true;
  }
}
