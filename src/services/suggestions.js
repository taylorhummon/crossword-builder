import { findSuggestions1, findSuggestions2 } from './suggestions_b';
import buildAlphabet from './build_alphabet';

// const initialTimeStamp = Date.now();
// console.log('Search Took', Date.now() - initialTimeStamp);

function computeSuggestions(squares, activeIndex, boardWidth) {
  const activeColumn = activeIndex % boardWidth;
  const activeRow = (activeIndex - activeColumn) / boardWidth;
  const rightPattern = computeRightPattern(squares, activeColumn, activeRow, boardWidth);
  const leftPattern = computeLeftPattern(squares, activeColumn, activeRow, boardWidth);
  const bottomPattern = computeBottomPattern(squares, activeColumn, activeRow, boardWidth);
  const topPattern = computeTopPattern(squares, activeColumn, activeRow, boardWidth);
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

function computeLeftPattern(squares, activeColumn, activeRow, boardWidth) {
  const leftIndex = findLeftIndex(squares, boardWidth, activeRow, activeColumn);
  return horizontalPattern(squares, activeColumn, activeRow, boardWidth, leftIndex, activeColumn - 1);
}

function computeRightPattern(squares, activeColumn, activeRow, boardWidth) {
  const rightIndex = findRightIndex(squares, boardWidth, activeRow, activeColumn);
  return horizontalPattern(squares, activeColumn, activeRow, boardWidth, activeColumn + 1, rightIndex);
}

function findLeftIndex(squares, boardWidth, activeRow, activeColumn) {
  let leftIndex = activeColumn;
  while (leftIndex - 1 >= 0 && squareAt(squares, boardWidth, leftIndex - 1, activeRow) !== '\n') {
    leftIndex--;
  }
  return leftIndex;
}

function findRightIndex(squares, boardWidth, activeRow, activeColumn) {
  let rightIndex = activeColumn;
  while (rightIndex + 1 < boardWidth && squareAt(squares, boardWidth, rightIndex + 1, activeRow) !== '\n') {
    rightIndex++;
  }
  return rightIndex;
}

function horizontalPattern(squares, activeColumn, activeRow, boardWidth, from, to) {
  let pattern = '';
  for (let i = from; i <= to; i++) { // NOTE: i <= to is intentional
    const char = squareAt(squares, boardWidth, i, activeRow);
    if (char === null) {
      pattern += '.';
    } else {
      pattern += char.toLowerCase();
    }
  }
  return pattern;
}

/* VERTICAL */

function computeTopPattern(squares, activeColumn, activeRow, boardWidth) {
  const topIndex = findTopIndex(squares, boardWidth, activeRow, activeColumn);
  return verticalPattern(squares, activeColumn, activeRow, boardWidth, topIndex, activeRow - 1);
}

function computeBottomPattern(squares, activeColumn, activeRow, boardWidth) {
  const bottomIndex = findBottomIndex(squares, boardWidth, activeRow, activeColumn);
  return verticalPattern(squares, activeColumn, activeRow, boardWidth, activeRow + 1, bottomIndex);
}

function findTopIndex(squares, boardWidth, activeRow, activeColumn) {
  let topIndex = activeRow;
  while (topIndex - 1 >= 0 && squareAt(squares, boardWidth, activeColumn, topIndex - 1) !== '\n') {
    topIndex--;
  }
  return topIndex;
}

function findBottomIndex(squares, boardWidth, activeRow, activeColumn) {
  let bottomIndex = activeRow;
  while (bottomIndex + 1 < boardWidth && squareAt(squares, boardWidth, activeColumn, bottomIndex + 1) !== '\n') {
    bottomIndex++;
  }
  return bottomIndex;
}

function verticalPattern(squares, activeColumn, activeRow, boardWidth, from, to) {
  let pattern = '';
  for (let j = from; j <= to; j++) { // NOTE: j <= to is intentional
    const char = squareAt(squares, boardWidth, activeColumn, j);
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