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

export default findSuggestions;