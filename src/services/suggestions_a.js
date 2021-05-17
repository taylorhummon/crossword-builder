import dictionaryWithWordsOfLength from './dictionary';
import computeSubpatterns from './subpatterns';

function findSuggestions(pattern) {
  const lettersSet = new Set();
  for (const subpattern of computeSubpatterns(pattern)) {
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
  const regexPattern = pattern.split('').map(
    character => character === '@' ? '.' : character
  ).join('');
  return new RegExp(`^${regexPattern}$`);
}

export default findSuggestions;