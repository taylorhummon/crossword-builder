import { findSuggestions1, findSuggestions2 } from './suggestions_a';
import buildAlphabet from './build_alphabet';
import { divMod } from './math';

// const initialTimeStamp = Date.now();
// console.log('Search Took', Date.now() - initialTimeStamp);

function computeSuggestions(squares, width, height, activeIndex) {
  const board = buildBoardObject(squares, width, height, activeIndex);
  const rightPattern = computeRightPattern(board);
  const leftPattern = computeLeftPattern(board);
  const bottomPattern = computeBottomPattern(board);
  const topPattern = computeTopPattern(board);
  const horizontalPattern = leftPattern + '@' + rightPattern;
  const verticalPattern = topPattern + '@' + bottomPattern;
  const horizontalSuggestionsSet1 = findSuggestions1(horizontalPattern);
  const verticalSuggestionsSet1 = findSuggestions1(verticalPattern);
  const suggestions1 = toLettersArray(horizontalSuggestionsSet1, verticalSuggestionsSet1);
  const horizontalSuggestionsSet2 = findSuggestions2(horizontalPattern);
  const verticalSuggestionsSet2 = findSuggestions2(verticalPattern);
  const suggestions2 = toLettersArray(horizontalSuggestionsSet2, verticalSuggestionsSet2);
}

function buildBoardObject(squares, width, height, activeIndex) {
  const [activeColumn, activeRow] = divMod(activeIndex, width);
  const board = { 
    squares, 
    width, 
    height, 
    activeColumn, 
    activeRow,
    squareAt(i, j) { return this.squares[j * this.width + i]; }
  };
  return board;
}

/* HORIZONTAL */

function computeLeftPattern(board) {
  const leftIndex = findLeftIndex(board);
  return horizontalPattern(board, leftIndex, board.activeColumn - 1);
}

function computeRightPattern(board) {
  const rightIndex = findRightIndex(board);
  return horizontalPattern(board, board.activeColumn + 1, rightIndex);
}

function findLeftIndex(board) {
  let leftIndex = board.activeColumn;
  while (leftIndex - 1 >= 0 && board.squareAt(leftIndex - 1, board.activeRow) !== '\n') {
    leftIndex--;
  }
  return leftIndex;
}

function findRightIndex(board) {
  let rightIndex = board.activeColumn;
  while (rightIndex + 1 < board.width && board.squareAt(rightIndex + 1, board.activeRow) !== '\n') {
    rightIndex++;
  }
  return rightIndex;
}

function horizontalPattern(board, from, to) {
  let pattern = '';
  for (let i = from; i <= to; i++) { // NOTE: "i <= to" is intentional
    const char = board.squareAt(i, board.activeRow);
    if (char === null) {
      pattern += '.';
    } else {
      pattern += char.toLowerCase();
    }
  }
  return pattern;
}

/* VERTICAL */

function computeTopPattern(board) {
  const topIndex = findTopIndex(board);
  return verticalPattern(board, topIndex, board.activeRow - 1);
}

function computeBottomPattern(board) {
  const bottomIndex = findBottomIndex(board);
  return verticalPattern(board, board.activeRow + 1, bottomIndex);
}

function findTopIndex(board) {
  let topIndex = board.activeRow;
  while (topIndex - 1 >= 0 && board.squareAt(board.activeColumn, topIndex - 1) !== '\n') {
    topIndex--;
  }
  return topIndex;
}

function findBottomIndex(board) {
  let bottomIndex = board.activeRow;
  while (bottomIndex + 1 < board.width && board.squareAt(board.activeColumn, bottomIndex + 1) !== '\n') {
    bottomIndex++;
  }
  return bottomIndex;
}

function verticalPattern(board, from, to) {
  let pattern = '';
  for (let j = from; j <= to; j++) { // NOTE: "j <= to" is intentional
    const char = board.squareAt(board.activeColumn, j);
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

export default computeSuggestions;