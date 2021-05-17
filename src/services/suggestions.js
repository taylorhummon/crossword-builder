import findSuggestions from './suggestions_a';
import buildAlphabet from './build_alphabet';

// const initialTimeStamp = Date.now();
// console.log('Search Took', Date.now() - initialTimeStamp);

function computeSuggestions(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const horizontalPattern = computeHorizontalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth);
  const horizontalSuggestionsSet = findSuggestions(horizontalPattern);
  const verticalPattern = computeVerticalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth);
  const verticalSuggestionsSet = findSuggestions(verticalPattern);
  const suggestions = toLettersArray(horizontalSuggestionsSet, verticalSuggestionsSet);
  console.log('SUGGESTIONS', suggestions);
  return suggestions;
}

/* HORIZONTAL */

function computeHorizontalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth) {
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
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

/* VERTICAL */

function computeVerticalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth) {
  const topIndex = findTopIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const bottomIndex = findBottomIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  let pattern = '';
  for (let j = topIndex; j <= bottomIndex; j++) {
    if (j === activeIndexRow) {
      pattern += '@';
    } else {
      const char = squareAt(squares, boardWidth, activeIndexColumn, j);
      if (char === null) {
        pattern += '.';
      } else {
        pattern += char.toLowerCase();
      }
    }
  }
  return pattern;
}

function findTopIndex(squares, boardWidth, activeIndexRow, activeIndexColumn) {
  let topIndex = activeIndexRow;
  while (topIndex - 1 >= 0 && squareAt(squares, boardWidth, activeIndexColumn, topIndex - 1) !== '\n') {
    topIndex--;
  }
  return topIndex;
}

function findBottomIndex(squares, boardWidth, activeIndexRow, activeIndexColumn) {
  let bottomIndex = activeIndexRow;
  while (bottomIndex + 1 < boardWidth && squareAt(squares, boardWidth, activeIndexColumn, bottomIndex + 1) !== '\n') {
    bottomIndex++;
  }
  return bottomIndex;
}

/* OTHER */

function toLettersArray(setA, setB) {
  return buildAlphabet().filter(
    letter => setA.has(letter) && setB.has(letter)
  );
}

function squareAt(squares, boardWidth, i, j) {
  return squares[j * boardWidth + i];
}

export default computeSuggestions;