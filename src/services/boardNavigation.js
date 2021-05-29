export const boardWidth = 6;
export const boardHeight = 6;

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(key) {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function indexDeterminedByArrowKey(state, allowWrap, key) {
  if (key === arrowLeft)  return indexOneLeftOf(allowWrap, state.activeSquareIndex);
  if (key === arrowRight) return indexOneRightOf(allowWrap, state.activeSquareIndex);
  if (key === arrowUp)    return indexOneUpFrom(allowWrap, state.activeSquareIndex);
  if (key === arrowDown)  return indexOneDownFrom(allowWrap, state.activeSquareIndex);
}

export function indexOneBeforeActive(state, allowWrap) {
  if (state.isTypingVertical) {
    return indexOneUpFrom(allowWrap, state.activeSquareIndex);
  } else {
    return indexOneLeftOf(allowWrap, state.activeSquareIndex);
  }
}

export function indexOneAfterActive(state, allowWrap) {
  if (state.isTypingVertical) {
    return indexOneDownFrom(allowWrap, state.activeSquareIndex);
  } else {
    return indexOneRightOf(allowWrap, state.activeSquareIndex);
  }
}

function indexOneLeftOf(allowWrap, index) {
  if (inFirstColumn(index)) {
    if (! allowWrap) return index;
    return index - 1 + boardWidth;
  } else {
    return index - 1;
  }
}

function indexOneRightOf(allowWrap, index) {
  if (inLastColumn(index)) {
    if (! allowWrap) return index;
    return index + 1 - boardWidth;
  } else {
    return index + 1;
  }
}

function indexOneUpFrom(allowWrap, index) {
  if (inFirstRow(index)) {
    if (! allowWrap) return index;
    return index - boardWidth + boardWidth * boardHeight;
  } else {
    return index - boardWidth;
  }
}

function indexOneDownFrom(allowWrap, index) {
  if (inLastRow(index)) {
    if (! allowWrap) return index;
    return index + boardWidth - boardWidth * boardHeight;
  } else {
    return index + boardWidth;
  }
}

function inFirstColumn(index) {
  return index % boardWidth === 0;
}

function inLastColumn(index) {
  return index % boardWidth === boardWidth - 1;
}

function inFirstRow(index) {
  return index < boardWidth;
}

function inLastRow(index) {
  return index >= boardWidth * boardHeight - boardWidth;
}
