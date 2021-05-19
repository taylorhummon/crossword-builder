import dictionaryWithWordsOfLength from './dictionary';
import { computeSubpatterns, computeSubpatternsTrimRight, computeSubpatternsTrimLeft } from './subpatterns';

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

export function findSuggestionsTrimLeft(pattern) {
  if (pattern[pattern.length - 1] !== '@') throw new Error('Expected @ as last character');
  const subpatterns = computeSubpatternsTrimLeft(pattern);
  console.log('TRIMMED LEFT SUBPATTERNS', subpatterns);
}

export function findSuggestionsTrimRight(pattern) {
  if (pattern[0] !== '@') throw new Error('Expected @ as first character');
  const subpatterns = computeSubpatternsTrimRight(pattern);
  console.log('TRIMMED RIGHT SUBPATTERNS', subpatterns);
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
  const regexPattern = pattern.split('').map(
    character => character === '@' ? '.' : character
  ).join('');
  return new RegExp(`^${regexPattern}$`);
}
