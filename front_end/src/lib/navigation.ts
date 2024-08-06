import { State } from 'declarations';
import { boardWidth, boardHeight } from 'environment/board';


export function isMouseNavigation(): boolean {
  return document.body.classList.contains('mouse-navigation');
}

export function isKeyboardNavigation(): boolean {
  return document.body.classList.contains('keyboard-navigation');
}

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(
  key: string
): boolean {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function indexDeterminedByArrowKey(
  state: State,
  allowWrap: boolean,
  key: string
): number | null {
  if (key === arrowLeft)  return indexOneLeftOf(allowWrap, state.activeSquareIndex);
  if (key === arrowRight) return indexOneRightOf(allowWrap, state.activeSquareIndex);
  if (key === arrowUp)    return indexOneUpFrom(allowWrap, state.activeSquareIndex);
  if (key === arrowDown)  return indexOneDownFrom(allowWrap, state.activeSquareIndex);
  return null;
}

export function indexOneBeforeActive(
  state: State,
  allowWrap: boolean
): number | null {
  if (state.isTypingVertical) {
    return indexOneUpFrom(allowWrap, state.activeSquareIndex);
  } else {
    return indexOneLeftOf(allowWrap, state.activeSquareIndex);
  }
}

export function indexOneAfterActive(
  state: State,
  allowWrap: boolean
): number | null {
  if (state.isTypingVertical) {
    return indexOneDownFrom(allowWrap, state.activeSquareIndex);
  } else {
    return indexOneRightOf(allowWrap, state.activeSquareIndex);
  }
}

function indexOneLeftOf(
  allowWrap: boolean,
  index: number | null
): number | null {
  if (index === null) return null;
  if (inFirstColumn(index)) {
    if (! allowWrap) return index;
    return index - 1 + boardWidth;
  } else {
    return index - 1;
  }
}

function indexOneRightOf(
  allowWrap: boolean,
  index: number | null
): number | null {
  if (index === null) return null;
  if (inLastColumn(index)) {
    if (! allowWrap) return index;
    return index + 1 - boardWidth;
  } else {
    return index + 1;
  }
}

function indexOneUpFrom(
  allowWrap: boolean,
  index: number | null
): number | null {
  if (index === null) return null;
  if (inFirstRow(index)) {
    if (! allowWrap) return index;
    return index - boardWidth + boardWidth * boardHeight;
  } else {
    return index - boardWidth;
  }
}

function indexOneDownFrom(
  allowWrap: boolean,
  index: number | null
): number | null {
  if (index === null) return null;
  if (inLastRow(index)) {
    if (! allowWrap) return index;
    return index + boardWidth - boardWidth * boardHeight;
  } else {
    return index + boardWidth;
  }
}

function inFirstColumn(
  index: number
): boolean {
  return index % boardWidth === 0;
}

function inLastColumn(
  index: number
): boolean {
  return index % boardWidth === boardWidth - 1;
}

function inFirstRow(
  index: number
): boolean {
  return index < boardWidth;
}

function inLastRow(
  index: number
): boolean {
  return index >= boardWidth * boardHeight - boardWidth;
}
