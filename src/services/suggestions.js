import { findSuggestions1, findSuggestions2 } from './suggestions_a';
import buildAlphabet from './build_alphabet';
import { divMod } from './math';
import { inclusiveIndicesArray } from './indices_array';

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

function toLettersArray(setA, setB) {
  return buildAlphabet().filter(
    letter => setA.has(letter) && setB.has(letter)
  );
}

/* HORIZONTAL */

function computeLeftPattern(board) {
  return horizontalPattern(board, leftBound(board), board.activeColumn - 1);
}

function computeRightPattern(board) {
  return horizontalPattern(board, board.activeColumn + 1, rightBound(board));
}

function leftBound(board) {
  let i = board.activeColumn;
  while (i - 1 >= 0 && board.squareAt(i - 1, board.activeRow) !== '\n') {
    i--;
  }
  return i;
}

function rightBound(board) {
  let i = board.activeColumn;
  while (i + 1 < board.width && board.squareAt(i + 1, board.activeRow) !== '\n') {
    i++;
  }
  return i;
}

function horizontalPattern(board, from, to) {
  return inclusiveIndicesArray(from, to).map(
    i => board.squareAt(i, board.activeRow)
  ).map(character => {
    if (character === null) return '.';
    return character.toLowerCase();
  }).join('');
}

/* VERTICAL */

function computeTopPattern(board) {
  return verticalPattern(board, topBound(board), board.activeRow - 1);
}

function computeBottomPattern(board) {
  return verticalPattern(board, board.activeRow + 1, bottomBound(board));
}

function topBound(board) {
  let j = board.activeRow;
  while (j - 1 >= 0 && board.squareAt(board.activeColumn, j - 1) !== '\n') {
    j--;
  }
  return j;
}

function bottomBound(board) {
  let j = board.activeRow;
  while (j + 1 < board.width && board.squareAt(board.activeColumn, j + 1) !== '\n') {
    j++;
  }
  return j;
}

function verticalPattern(board, from, to) {
  return inclusiveIndicesArray(from, to).map(
    j => board.squareAt(board.activeColumn, j)
  ).map(character => {
    if (character === null) return '.';
    return character.toLowerCase();
  }).join('');
}

export default computeSuggestions;