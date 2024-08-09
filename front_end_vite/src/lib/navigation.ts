import { State } from 'src/components/app/App';
import { boardWidth, boardHeight } from 'src/environment/board';


const ARROW_LEFT   = 'ArrowLeft';
const ARROW_RIGHT  = 'ArrowRight';
const ARROW_UP     = 'ArrowUp';
const ARROW_DOWN   = 'ArrowDown';

export function isMouseNavigation(): boolean {
  return document.body.classList.contains('mouse-navigation');
}

export function isKeyboardNavigation(): boolean {
  return document.body.classList.contains('keyboard-navigation');
}

export function isLetterKey(
  key: string
): boolean {
  return /^[A-Za-z]$/.test(key);
}

export function isArrowKey(
  key: string
): boolean {
  return key === ARROW_LEFT || key === ARROW_RIGHT || key === ARROW_UP || key === ARROW_DOWN;
}

export function indexDeterminedByArrowKey(
  state: State,
  allowWrap: boolean,
  key: string
): number | null {
  if (key === ARROW_LEFT)  return indexOneLeftOf(allowWrap, state.activeIndex);
  if (key === ARROW_RIGHT) return indexOneRightOf(allowWrap, state.activeIndex);
  if (key === ARROW_UP)    return indexOneUpFrom(allowWrap, state.activeIndex);
  if (key === ARROW_DOWN)  return indexOneDownFrom(allowWrap, state.activeIndex);
  return null;
}

export function indexOneBeforeActive(
  state: State,
  allowWrap: boolean
): number | null {
  if (state.isTypingVertical) {
    return indexOneUpFrom(allowWrap, state.activeIndex);
  } else {
    return indexOneLeftOf(allowWrap, state.activeIndex);
  }
}

export function indexOneAfterActive(
  state: State,
  allowWrap: boolean
): number | null {
  if (state.isTypingVertical) {
    return indexOneDownFrom(allowWrap, state.activeIndex);
  } else {
    return indexOneRightOf(allowWrap, state.activeIndex);
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
