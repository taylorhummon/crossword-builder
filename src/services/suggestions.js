import { findSuggestions1, findSuggestions2, computeSuggestFillTrimLeft, computeSuggestFillTrimRight } from './suggestions_a';
import buildAlphabet from './build_alphabet';
import { divMod } from './math';
import { inclusiveIndicesArray } from './indices_array';

// const initialTimeStamp = Date.now();
// console.log('Search Took', Date.now() - initialTimeStamp);

function computeSuggestions(squares, width, height, activeIndex) {
  const canSuggestFill = true;
  const board = buildBoardObject(squares, width, height, activeIndex);
  if (canSuggestFill) {
    const suggestFill = computeSuggestFill(
      computeHorizontalPattern(board, leftBound(board), board.activeColumn),
      computeHorizontalPattern(board, board.activeColumn, rightBound(board)),
      computeVerticalPattern(board, topBound(board), board.activeRow),
      computeVerticalPattern(board, board.activeRow, bottomBound(board))
    );
    console.log('SUGGEST FILL?', suggestFill);
    const horizontalPattern = computeHorizontalPattern(board, leftBound(board), rightBound(board));
    const verticalPattern = computeVerticalPattern(board, topBound(board), bottomBound(board));
    const horizontalSuggestionsSet = findSuggestions2(horizontalPattern);
    const verticalSuggestionsSet = findSuggestions2(verticalPattern);
    const suggestions = toLettersArray(horizontalSuggestionsSet, verticalSuggestionsSet);
    console.log('SUGGESTED LETTERS', suggestions);
  } else {
    const horizontalPattern = computeHorizontalPattern(board, leftBound(board), rightBound(board));
    const verticalPattern = computeVerticalPattern(board, topBound(board), bottomBound(board));
    const horizontalSuggestionsSet = findSuggestions1(horizontalPattern);
    const verticalSuggestionsSet = findSuggestions1(verticalPattern);
    const suggestions = toLettersArray(horizontalSuggestionsSet, verticalSuggestionsSet);
    console.log('SUGGESTIONS', suggestions);
  }
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

function computeSuggestFill(leftPattern, rightPattern, topPattern, bottomPattern) {
  if (! computeSuggestFillTrimLeft(leftPattern)) return false;
  if (! computeSuggestFillTrimRight(rightPattern)) return false;
  if (! computeSuggestFillTrimLeft(topPattern)) return false;
  if (! computeSuggestFillTrimRight(bottomPattern)) return false;
  return true;
}

/* HORIZONTAL */

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

function computeHorizontalPattern(board, from, to) {
  return inclusiveIndicesArray(from, to).map(i => {
    const character = board.squareAt(i, board.activeRow);
    if (i === board.activeColumn) return '@';
    if (character === null) return '.';
    if (/[A-Z]/.test(character)) return character.toLowerCase();
    throw new Error(`Unexpected character: ${character}`);
  }).join('');
}

/* VERTICAL */

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

function computeVerticalPattern(board, from, to) {
  return inclusiveIndicesArray(from, to).map(j => {
    const character = board.squareAt(board.activeColumn, j);
    if (j === board.activeRow) return '@';
    if (character === null) return '.';
    if (/[A-Z]/.test(character)) return character.toLowerCase();
    throw new Error(`Unexpected character: ${character}`);
  }).join('');
}

export default computeSuggestions;