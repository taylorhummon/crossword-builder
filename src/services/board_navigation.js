export const boardWidth = 6;
export const boardHeight = 6;

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(key) {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function moveFocusForArrowKey(squareRefs, activeIndex, allowWrap, key) {
  if (key === arrowLeft) moveFocusLeft(squareRefs, activeIndex, allowWrap);
  if (key === arrowRight) moveFocusRight(squareRefs, activeIndex, allowWrap);
  if (key === arrowUp) moveFocusUp(squareRefs, activeIndex, allowWrap);
  if (key === arrowDown) moveFocusDown(squareRefs, activeIndex, allowWrap);
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

export function moveFocusBackward(squareRefs, activeIndex, allowWrap, isTypingVertical) {
  if (isTypingVertical) {
    return moveFocusUp(squareRefs, activeIndex, allowWrap);
  } else {
    return moveFocusLeft(squareRefs, activeIndex, allowWrap);
  }
}

export function moveFocusForward(squareRefs, activeIndex, allowWrap, isTypingVertical) {
  if (isTypingVertical) {
    return moveFocusDown(squareRefs, activeIndex, allowWrap);
  } else {
    return moveFocusRight(squareRefs, activeIndex, allowWrap);
  }
}

function moveFocusLeft(squareRefs, activeIndex, allowWrap) {
  if (! allowWrap && inFirstColumn(activeIndex)) return;
  focusSquare(squareRefs, oneLeftIndex(activeIndex));
}

function moveFocusRight(squareRefs, activeIndex, allowWrap) {
  if (! allowWrap && inLastColumn(activeIndex)) return;
  focusSquare(squareRefs, oneRightIndex(activeIndex));
}

function moveFocusUp(squareRefs, activeIndex, allowWrap) {
  if (! allowWrap && inFirstRow(activeIndex)) return;
  focusSquare(squareRefs, oneUpIndex(activeIndex));
}

function moveFocusDown(squareRefs, activeIndex, allowWrap) {
  if (! allowWrap && inLastRow(activeIndex)) return;
  focusSquare(squareRefs, oneDownIndex(activeIndex));
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