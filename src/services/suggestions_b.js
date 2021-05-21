import { dictionaryWithWordsOfLength } from '../dictionaries/dictionary';
import { buildUppercaseAlphabet } from '../utilities/build_alphabet';
import { computeSubpatterns } from './subpatterns';

export function findSuggestions1(pattern) {
  const lettersSet = new Set();
  for (let letter of buildUppercaseAlphabet()) {
    if (hasMatch(pattern, letter)) {
      lettersSet.add(letter);
    }
  }
  return lettersSet;
}

export function findSuggestions2(pattern) {
  const subpatterns = computeSubpatterns(pattern);
  const lettersSet = new Set();
  for (let letter of buildUppercaseAlphabet()) {
    for (const subpattern of subpatterns) {
      if (hasMatch(subpattern, letter)) {
        lettersSet.add(letter);
        break;
      }
    }
  }
  return lettersSet;
}

function hasMatch(pattern, letter) {
  const regExp = buildRegExp(pattern, letter);
  const dictionary = dictionaryWithWordsOfLength(pattern.length);
  for (const word of dictionary) {
    if (regExp.test(word)) return true;
  }
  return false;
}

function buildRegExp(pattern, letter) {
  const regexPattern = pattern.split('').map(
    character => character === '@' ? letter : character
  ).join('');
  return new RegExp(`^${regexPattern}$`);
}
