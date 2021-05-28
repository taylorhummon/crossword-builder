import { findSuggestions1, findSuggestions2, computeSuggestFillTrimLeft, computeSuggestFillTrimRight } from './suggestions_a';
import { buildUppercaseAlphabet, filledSquareCharacter } from '../utilities/alphabet';
import { remainderAndQuotient } from '../utilities/math';
import { inclusiveIndicesArray } from '../utilities/indices_array';
import { boardWidth, boardHeight } from './board_navigation';

// const initialTimeStamp = Date.now();
// console.log('Search Took', Date.now() - initialTimeStamp);

export function computeSuggestions(state) {
  if (typeof state.activeIndex !== 'number') return null;
  const board = buildBoardObject(state);
  const horizontalPattern = computeHorizontalPattern(board, leftBound(board), rightBound(board));
  const verticalPattern = computeVerticalPattern(board, topBound(board), bottomBound(board));
  if (state.canSuggestFill) {
    const horizontalSuggestionsSet = findSuggestions2(horizontalPattern);
    const verticalSuggestionsSet = findSuggestions2(verticalPattern);
    const letterSuggestions = toLettersArray(horizontalSuggestionsSet, verticalSuggestionsSet);
    const suggestions = suggestFill(board) ? [filledSquareCharacter].concat(letterSuggestions) : letterSuggestions;
    return suggestions;
  } else {
    const horizontalSuggestionsSet = findSuggestions1(horizontalPattern);
    const verticalSuggestionsSet = findSuggestions1(verticalPattern);
    const suggestions = toLettersArray(horizontalSuggestionsSet, verticalSuggestionsSet);
    return suggestions;
  }
}

function buildBoardObject(state) {
  const [activeColumn, activeRow] = remainderAndQuotient(state.activeIndex, boardWidth);
  const board = {
    squareValues: state.squareValues,
    width: boardWidth,
    height: boardHeight,
    activeColumn,
    activeRow,
    squareValueAt(i, j) { return this.squareValues[j * this.width + i]; }
  };
  return board;
}

function toLettersArray(setA, setB) {
  return buildUppercaseAlphabet().filter(
    letter => setA.has(letter) && setB.has(letter)
  );
}

function suggestFill(board) {
  const leftPattern = computeHorizontalPattern(board, leftBound(board), board.activeColumn);
  const rightPattern = computeHorizontalPattern(board, board.activeColumn, rightBound(board));
  const topPattern = computeVerticalPattern(board, topBound(board), board.activeRow);
  const bottomPattern = computeVerticalPattern(board, board.activeRow, bottomBound(board));
  if (! computeSuggestFillTrimLeft(leftPattern)) return false;
  if (! computeSuggestFillTrimRight(rightPattern)) return false;
  if (! computeSuggestFillTrimLeft(topPattern)) return false;
  if (! computeSuggestFillTrimRight(bottomPattern)) return false;
  return true;
}

/* HORIZONTAL */

function leftBound(board) {
  let i = board.activeColumn;
  while (i - 1 >= 0 && board.squareValueAt(i - 1, board.activeRow) !== filledSquareCharacter) {
    i--;
  }
  return i;
}

function rightBound(board) {
  let i = board.activeColumn;
  while (i + 1 < board.width && board.squareValueAt(i + 1, board.activeRow) !== filledSquareCharacter) {
    i++;
  }
  return i;
}

function computeHorizontalPattern(board, from, to) {
  return inclusiveIndicesArray(from, to).map(i => {
    const character = board.squareValueAt(i, board.activeRow);
    if (i === board.activeColumn) return '@';
    if (character === null) return '.';
    if (/[A-Z]/.test(character)) return character;
    throw new Error(`Unexpected character: ${character}`);
  }).join('');
}

/* VERTICAL */

function topBound(board) {
  let j = board.activeRow;
  while (j - 1 >= 0 && board.squareValueAt(board.activeColumn, j - 1) !== filledSquareCharacter) {
    j--;
  }
  return j;
}

function bottomBound(board) {
  let j = board.activeRow;
  while (j + 1 < board.width && board.squareValueAt(board.activeColumn, j + 1) !== filledSquareCharacter) {
    j++;
  }
  return j;
}

function computeVerticalPattern(board, from, to) {
  return inclusiveIndicesArray(from, to).map(j => {
    const character = board.squareValueAt(board.activeColumn, j);
    if (j === board.activeRow) return '@';
    if (character === null) return '.';
    if (/[A-Z]/.test(character)) return character;
    throw new Error(`Unexpected character: ${character}`);
  }).join('');
}
