export const boardWidth = 6;
export const boardHeight = 6;

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(key) {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function moveFocusForArrowKey(state, moveFocusTo, key) {
  const activeSquareIndex = state.activeSquareIndex;
  const allowWrap = false;
  if (key === arrowLeft)  moveFocusLeft(allowWrap, moveFocusTo, activeSquareIndex);
  if (key === arrowRight) moveFocusRight(allowWrap, moveFocusTo, activeSquareIndex);
  if (key === arrowUp)    moveFocusUp(allowWrap, moveFocusTo, activeSquareIndex);
  if (key === arrowDown)  moveFocusDown(allowWrap, moveFocusTo, activeSquareIndex);
}

export function moveFocusBackward(state, moveFocusTo) {
  const activeSquareIndex = state.activeSquareIndex;
  const allowWrap = true;
  if (state.isTypingVertical) {
    return moveFocusUp(allowWrap, moveFocusTo, activeSquareIndex);
  } else {
    return moveFocusLeft(allowWrap, moveFocusTo, activeSquareIndex);
  }
}

export function moveFocusForward(state, moveFocusTo) {
  const activeSquareIndex = state.activeSquareIndex;
  const allowWrap = true;
  if (state.isTypingVertical) {
    return moveFocusDown(allowWrap, moveFocusTo, activeSquareIndex);
  } else {
    return moveFocusRight(allowWrap, moveFocusTo, activeSquareIndex);
  }
}

function moveFocusLeft(allowWrap, moveFocusTo, activeSquareIndex) {
  if (! allowWrap && inFirstColumn(activeSquareIndex)) return;
  moveFocusTo(oneLeftIndex(activeSquareIndex));
}

function moveFocusRight(allowWrap, moveFocusTo, activeSquareIndex) {
  if (! allowWrap && inLastColumn(activeSquareIndex)) return;
  moveFocusTo(oneRightIndex(activeSquareIndex));
}

function moveFocusUp(allowWrap, moveFocusTo, activeSquareIndex) {
  if (! allowWrap && inFirstRow(activeSquareIndex)) return;
  moveFocusTo(oneUpIndex(activeSquareIndex));
}

function moveFocusDown(allowWrap, moveFocusTo, activeSquareIndex) {
  if (! allowWrap && inLastRow(activeSquareIndex)) return;
  moveFocusTo(oneDownIndex(activeSquareIndex));
}

export function oneBackwardIndex(state, index) {
  if (state.isTypingVertical) {
    return oneUpIndex(index);
  } else {
    return oneLeftIndex(index);
  }
}

export function oneForwardIndex(state, index) {
  if (state.isTypingVertical) {
    return oneDownIndex(index);
  } else {
    return oneRightIndex(index);
  }
}

function oneLeftIndex(index) {
  if (inFirstColumn(index)) return index - 1 + boardWidth;
  return index - 1;
}

function oneRightIndex(index) {
  if (inLastColumn(index)) return index + 1 - boardWidth;
  return index + 1;
}

function oneUpIndex(index) {
  if (inFirstRow(index)) return index - boardWidth + boardWidth * boardHeight;
  return index - boardWidth;
}

function oneDownIndex(index) {
  if (inLastRow(index)) return index + boardWidth - boardWidth * boardHeight;
  return index + boardWidth;
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
  return index >= (boardWidth - 1) * boardHeight;
}
