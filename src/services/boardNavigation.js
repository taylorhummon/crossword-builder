export const boardWidth = 6;
export const boardHeight = 6;

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(key) {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function moveFocusForArrowKey(squareRefs, activeSquareIndex, allowWrap, key) {
  if (key === arrowLeft) moveFocusLeft(squareRefs, activeSquareIndex, allowWrap);
  if (key === arrowRight) moveFocusRight(squareRefs, activeSquareIndex, allowWrap);
  if (key === arrowUp) moveFocusUp(squareRefs, activeSquareIndex, allowWrap);
  if (key === arrowDown) moveFocusDown(squareRefs, activeSquareIndex, allowWrap);
}

export function oneBackwardIndex(index, isTypingVertical) {
  if (isTypingVertical) {
    return oneUpIndex(index);
  } else {
    return oneLeftIndex(index);
  }
}

export function oneForwardIndex(index, isTypingVertical) {
  if (isTypingVertical) {
    return oneDownIndex(index);
  } else {
    return oneRightIndex(index);
  }
}

export function moveFocusBackward(squareRefs, activeSquareIndex, allowWrap, isTypingVertical) {
  if (isTypingVertical) {
    return moveFocusUp(squareRefs, activeSquareIndex, allowWrap);
  } else {
    return moveFocusLeft(squareRefs, activeSquareIndex, allowWrap);
  }
}

export function moveFocusForward(squareRefs, activeSquareIndex, allowWrap, isTypingVertical) {
  if (isTypingVertical) {
    return moveFocusDown(squareRefs, activeSquareIndex, allowWrap);
  } else {
    return moveFocusRight(squareRefs, activeSquareIndex, allowWrap);
  }
}

function moveFocusLeft(squareRefs, activeSquareIndex, allowWrap) {
  if (! allowWrap && inFirstColumn(activeSquareIndex)) return;
  focusSquare(squareRefs, oneLeftIndex(activeSquareIndex));
}

function moveFocusRight(squareRefs, activeSquareIndex, allowWrap) {
  if (! allowWrap && inLastColumn(activeSquareIndex)) return;
  focusSquare(squareRefs, oneRightIndex(activeSquareIndex));
}

function moveFocusUp(squareRefs, activeSquareIndex, allowWrap) {
  if (! allowWrap && inFirstRow(activeSquareIndex)) return;
  focusSquare(squareRefs, oneUpIndex(activeSquareIndex));
}

function moveFocusDown(squareRefs, activeSquareIndex, allowWrap) {
  if (! allowWrap && inLastRow(activeSquareIndex)) return;
  focusSquare(squareRefs, oneDownIndex(activeSquareIndex));
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

function focusSquare(squareRefs, toFocusIndex) {
  const element = squareRefs[toFocusIndex].current;
  if (! element) throw Error('Somehow square dom element was missing'); // !!! is this necessary?
  element.focus();
}