import { findSuggestions1, findSuggestions2 } from './suggestions_b';
import buildAlphabet from './build_alphabet';

// const initialTimeStamp = Date.now();
// console.log('Search Took', Date.now() - initialTimeStamp);

function computeSuggestions(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const rightPattern = computeRightPattern(squares, activeIndexColumn, activeIndexRow, boardWidth);
  const leftPattern = computeLeftPattern(squares, activeIndexColumn, activeIndexRow, boardWidth);
  const bottomPattern = computeBottomPattern(squares, activeIndexColumn, activeIndexRow, boardWidth);
  const topPattern = computeTopPattern(squares, activeIndexColumn, activeIndexRow, boardWidth);
  const horizontalPattern = leftPattern + '@' + rightPattern;
  const verticalPattern = topPattern + '@' + bottomPattern;
  const horizontalSuggestionsSet1 = findSuggestions1(horizontalPattern);
  const verticalSuggestionsSet1 = findSuggestions1(verticalPattern);
  const suggestions1 = toLettersArray(horizontalSuggestionsSet1, verticalSuggestionsSet1);
  const horizontalSuggestionsSet2 = findSuggestions2(horizontalPattern);
  const verticalSuggestionsSet2 = findSuggestions2(verticalPattern);
  const suggestions2 = toLettersArray(horizontalSuggestionsSet2, verticalSuggestionsSet2);
}

/* HORIZONTAL */

function computeLeftPattern(squares, activeIndexColumn, activeIndexRow, boardWidth) {
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return horizontalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth, leftIndex, activeIndexColumn - 1);
}

function computeRightPattern(squares, activeIndexColumn, activeIndexRow, boardWidth) {
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return horizontalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth, activeIndexColumn + 1, rightIndex);
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

function horizontalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth, from, to) {
  let pattern = '';
  for (let i = from; i <= to; i++) { // NOTE: i <= to is intentional
    const char = squareAt(squares, boardWidth, i, activeIndexRow);
    if (char === null) {
      pattern += '.';
    } else {
      pattern += char.toLowerCase();
    }
  }
  return pattern;
}

/* VERTICAL */

function computeTopPattern(squares, activeIndexColumn, activeIndexRow, boardWidth) {
  const topIndex = findTopIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return verticalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth, topIndex, activeIndexRow - 1);
}

function computeBottomPattern(squares, activeIndexColumn, activeIndexRow, boardWidth) {
  const bottomIndex = findBottomIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return verticalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth, activeIndexRow + 1, bottomIndex);
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

function verticalPattern(squares, activeIndexColumn, activeIndexRow, boardWidth, from, to) {
  let pattern = '';
  for (let j = from; j <= to; j++) { // NOTE: j <= to is intentional
    const char = squareAt(squares, boardWidth, activeIndexColumn, j);
    if (char === null) {
      pattern += '.';
    } else {
      pattern += char.toLowerCase();
    }
  }
  return pattern;
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