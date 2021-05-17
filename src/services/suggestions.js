import dictionary1 from './dictionary1';
import dictionary2 from './dictionary2';
import dictionary3 from './dictionary3';
import dictionary4 from './dictionary4';
import dictionary5 from './dictionary5';
import dictionary6 from './dictionary6';

function computeHorizontalSuggestions(squares, activeIndex, boardWidth) {
  const patternAndIndex = computePatternAndIndex(squares, activeIndex, boardWidth);
  const suggestions = findSuggestions(patternAndIndex.pattern, patternAndIndex.index);
  console.log('SUGGESTIONS', suggestions);
  return suggestions;
}

function computePatternAndIndex(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return {
    pattern: computePattern(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex),
    index: activeIndexColumn - leftIndex
  };
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

function computePattern(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex) {
  let pattern = '';
  for (let i = leftIndex; i <= rightIndex; i++) {
    if (i === activeIndexColumn) {
      pattern += '.';
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

const findSuggestions = findSuggestionsA;

function findSuggestionsA(pattern, index) {
  const regExp = new RegExp(`^${pattern}$`);
  const alphabetSet = new Set();
  const dictionary = dictionaryWithWordsOfLength(pattern.length);
  // const initialTimeStamp = Date.now();
  for (const word of dictionary) {
    if (regExp.test(word)) alphabetSet.add(word.charAt(index));
  }
  // console.log('Search Took', Date.now() - initialTimeStamp);
  return toAlphabetArray(alphabetSet);
}

function dictionaryWithWordsOfLength(length) {
  if (length === 1) return dictionary1;
  if (length === 2) return dictionary2;
  if (length === 3) return dictionary3;
  if (length === 4) return dictionary4;
  if (length === 5) return dictionary5;
  if (length === 6) return dictionary6;
  throw 'pattern too long!';
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