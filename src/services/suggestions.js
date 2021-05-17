import findSuggestions from './suggestions_a';
import buildAlphabet from './build_alphabet';

function computeHorizontalSuggestions(squares, activeIndex, boardWidth) {
  const pattern = computePattern(squares, activeIndex, boardWidth);
  const initialTimeStamp = Date.now();
  const suggestionsSet = findSuggestions(pattern);
  console.log('Search Took', Date.now() - initialTimeStamp);
  const suggestions = toLettersArray(suggestionsSet);
  console.log('SUGGESTIONS', suggestions);
  return suggestions;
}

function computePattern(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return computePatternHelper(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex);
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

function computePatternHelper(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex) {
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

function toLettersArray(set) {
  return buildAlphabet().filter(letter => set.has(letter));
}

export default computeHorizontalSuggestions;