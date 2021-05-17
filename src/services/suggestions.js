import dictionary1 from './dictionary1';
import dictionary2 from './dictionary2';
import dictionary3 from './dictionary3';
import dictionary4 from './dictionary4';
import dictionary5 from './dictionary5';
import dictionary6 from './dictionary6';

function computeHorizontalSuggestions(squares, activeIndex, boardWidth) {
  const pattern = computePatternA(squares, activeIndex, boardWidth);
  const suggestions = findSuggestions(pattern);
  console.log('SUGGESTIONS', suggestions);
  return suggestions;
}

function computePatternA(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return computePatternB(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex);
}

function findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn) {
  let leftIndex = activeIndexColumn;
  while (leftIndex - 1 >= 0 && squareAt(squares, boardWidth, leftIndex - 1, activeIndexRow) !== '\n') {
    leftIndex--;
  }
  return leftIndex;
}

function findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn) {
  let rightIndex = activeIndexColumn;
  while (rightIndex + 1 < boardWidth && squareAt(squares, boardWidth, rightIndex + 1, activeIndexRow) !== '\n') {
    rightIndex++;
  }
  return rightIndex;
}

function computePatternB(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex) {
  let pattern = '';
  for (let i = leftIndex; i <= rightIndex; i++) {
    if (i === activeIndexColumn) {
      pattern += '@';
    } else {
      const char = squareAt(squares, boardWidth, i, activeIndexRow);
      if (char === null) {
        pattern += '.';
      } else {
        pattern += char.toLowerCase();
      }
    }
  }
  return pattern;
}

function squareAt(squares, boardWidth, i, j) {
  return squares[j * boardWidth + i];
}

function findSuggestions(pattern) {
  const initialTimeStamp = Date.now();
  const suggestions = toAlphabetArray(findSuggestionsA(pattern));
  console.log('Search Took', Date.now() - initialTimeStamp);
  return suggestions;
}

function findSuggestionsA(pattern) {
  const alphabetSet = new Set();
  const subpatterns = computeSubpatterns(pattern);
  for (const subpattern of subpatterns) {
    const alphabetSetForSubpattern = findSuggestionsB(subpattern);
    for (const letter of alphabetSetForSubpattern) {
      alphabetSet.add(letter);
    }
  }
  return alphabetSet;
}

function computeSubpatterns(pattern) {
  const index = pattern.indexOf('@');
  if (index === -1) throw new Error('Did not find @ in pattern');
  const leftPoints = [];
  for (let i = 0; i < index; i++) {
    if (pattern[i] === '.') leftPoints.push(i + 1);
  }
  leftPoints.unshift(0);
  const rightPoints = [];
  for (let i = index + 1; i < pattern.length; i++) {
    if (pattern[i] === '.') rightPoints.push(i);
  }
  rightPoints.push(pattern.length);
  const subpatterns = [];
  for (const leftPoint of leftPoints) {
    for (const rightPoint of rightPoints) {
      subpatterns.push(pattern.substring(leftPoint, rightPoint));
    }
  }
  subpatterns.sort( // !!! we're not taking advantage of this sort for optimization yet
    (subpatternA, subpatternB) => subpatternA.length - subpatternB.length
  );
  return subpatterns;
}

function findSuggestionsB(pattern) {
  const index = pattern.indexOf('@');
  if (index === -1) throw new Error('Did not find @ in pattern');
  const newPattern = pattern.split('').map(
    character => character === '@' ? '.' : character
  ).join('');
  const regExp = new RegExp(`^${newPattern}$`);
  const alphabetSet = new Set();
  const dictionary = dictionaryWithWordsOfLength(pattern.length);
  for (const word of dictionary) {
    if (regExp.test(word)) alphabetSet.add(word.charAt(index));
  }
  return alphabetSet;
}

function dictionaryWithWordsOfLength(length) {
  if (length === 1) return dictionary1;
  if (length === 2) return dictionary2;
  if (length === 3) return dictionary3;
  if (length === 4) return dictionary4;
  if (length === 5) return dictionary5;
  if (length === 6) return dictionary6;
  throw new Error('Need a dictionary with longer words');
}

function toAlphabetArray(set) {
  const alphabetArray = [];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    if (set.has(letter)) alphabetArray.push(letter);
  }
  return alphabetArray;
}

export default computeHorizontalSuggestions;