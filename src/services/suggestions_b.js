import dictionaryWithWordsOfLength from './dictionary';
import buildAlphabet from './build_alphabet';
import computeSubpatterns from './subpatterns';

function findSuggestions(pattern) {
  const subpatterns = computeSubpatterns(pattern);
  const lettersSet = new Set();
  for (let letter of buildAlphabet()) {
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
  const index = pattern.indexOf('@');
  if (index === -1) throw new Error('Did not find @ in pattern');
  const newPattern = pattern.split('').map(
    character => character === '@' ? letter : character
  ).join('');
  const regExp = new RegExp(`^${newPattern}$`);
  const dictionary = dictionaryWithWordsOfLength(pattern.length);
  for (const word of dictionary) {
    if (regExp.test(word)) return true;
  }
  return false;
}

export default findSuggestions;