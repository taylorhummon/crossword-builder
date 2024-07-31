import { Board } from '../declarations';
import { FILLED_SQUARE_CHARACTER } from './constants';
import { remainderAndQuotient } from '../utilities/math';
import { inclusiveIndicesArray } from '../utilities/arrays';

export function buildBoard(
  data: any
): Board {
  const [activeColumn, activeRow] = remainderAndQuotient(data.activeSquareIndex, data.boardWidth);
  const board = {
    squareValues: data.squareValues,
    width: data.boardWidth,
    height: data.boardHeight,
    activeColumn,
    activeRow,
    squareValueAt(i: number, j: number) { return this.squareValues[j * this.width + i]; }
  };
  return board;
}

export function leftBound(
  board: Board
): number {
  let i = board.activeColumn;
  while (
    i - 1 >= 0 &&
    board.squareValueAt(i - 1, board.activeRow) !== FILLED_SQUARE_CHARACTER
  ) {
    i--;
  }
  return i;
}

export function rightBound(
  board: Board
): number {
  let i = board.activeColumn;
  while (
    i + 1 < board.width &&
    board.squareValueAt(i + 1, board.activeRow) !== FILLED_SQUARE_CHARACTER
  ) {
    i++;
  }
  return i;
}

export function topBound(
  board: Board
): number {
  let j = board.activeRow;
  while (
    j - 1 >= 0 &&
    board.squareValueAt(board.activeColumn, j - 1) !== FILLED_SQUARE_CHARACTER
  ) {
    j--;
  }
  return j;
}

export function bottomBound(
  board: Board
): number {
  let j = board.activeRow;
  while (
    j + 1 < board.height &&
    board.squareValueAt(board.activeColumn, j + 1) !== FILLED_SQUARE_CHARACTER
  ) {
    j++;
  }
  return j;
}

export function horizontalPatternFor(
  board: Board,
  from: number,
  to: number
): string {
  return inclusiveIndicesArray(from, to).map(i => {
    const character = board.squareValueAt(i, board.activeRow);
    if (i === board.activeColumn) return '@';
    if (character === null) return '.';
    if (/[A-Z]/.test(character)) return character;
    throw new Error(`Unexpected character: ${character}`);
  }).join('');
}

export function verticalPatternFor(
  board: Board,
  from: number,
  to: number
): string {
  return inclusiveIndicesArray(from, to).map(j => {
    const character = board.squareValueAt(board.activeColumn, j);
    if (j === board.activeRow) return '@';
    if (character === null) return '.';
    if (/[A-Z]/.test(character)) return character;
    throw new Error(`Unexpected character: ${character}`);
  }).join('');
}
