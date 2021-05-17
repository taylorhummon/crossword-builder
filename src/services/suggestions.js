import dictionary from './dictionary3';

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

// look at each word in the dictionary to see if it matches
function findSuggestionsA(pattern, index) {
  const initialTimeStamp = Date.now();
  const regExp = new RegExp(`^${pattern}$`);
  const resultsSet = new Set();
  for (const word of dictionary) {
    if (regExp.test(word)) resultsSet.add(word.charAt(index));
  }
  const results = [...resultsSet];
  results.sort();
  const duration = (Date.now() - initialTimeStamp);
  console.log('Search Took', duration);
  return results;
}

// use global regexp searching
function findSuggestionsB(pattern, index) {
  const initialTimeStamp1 = Date.now();
  const allWords = dictionary.join('\n');
  const duration1 = (Date.now() - initialTimeStamp1);
  console.log('Precompile Took', duration1);
  const initialTimeStamp2 = Date.now();

  const regExp = new RegExp(`^${pattern}$`, 'gm');
  const resultsSet = new Set();
  for (const match of allWords.matchAll(regExp)) {
    resultsSet.add(match[0].charAt(index));
  }
  const results = [...resultsSet];
  results.sort();
  const duration2 = (Date.now() - initialTimeStamp2);
  console.log('Search Took', duration2);
  return results;
}

// perform 26 searches, but allow a search to give up early
function findSuggestionsC(pattern, index) {
  const initialTimeStamp = Date.now();
  const results = [];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    const specificPattern = pattern.substring(0, index) + letter + pattern.substring(index + 1);
    const regExp = new RegExp(`^${specificPattern}$`);
    for (const word of dictionary) {
      if (regExp.test(word)) {
        results.push(letter);
        break;
      }
    }
  }
  const duration = (Date.now() - initialTimeStamp);
  console.log('Search Took', duration);
  return results;
}



export default computeHorizontalSuggestions;