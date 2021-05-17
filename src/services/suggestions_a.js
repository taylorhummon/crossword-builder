import dictionaryWithWordsOfLength from './dictionary';
import computeSubpatterns from './subpatterns';

function findSuggestions(pattern) {
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
  const index = pattern.indexOf('@');
  if (index === -1) throw new Error('Did not find @ in pattern');
  const newPattern = pattern.split('').map(
    character => character === '@' ? '.' : character
  ).join('');
  const regExp = new RegExp(`^${newPattern}$`);
  const lettersSet = new Set();
  const dictionary = dictionaryWithWordsOfLength(pattern.length);
  for (const word of dictionary) {
    if (regExp.test(word)) lettersSet.add(word.charAt(index));
  }
  return lettersSet;
}

export default findSuggestions;