export const boardWidth = 6;
export const boardHeight = 6;

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(key) {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function moveFocusForArrowKey(boardElement, activeIndex, allowWrap, key) {
  if (key === arrowLeft) moveFocusLeft(boardElement, activeIndex, allowWrap);
  if (key === arrowRight) moveFocusRight(boardElement, activeIndex, allowWrap);
  if (key === arrowUp) moveFocusUp(boardElement, activeIndex, allowWrap);
  if (key === arrowDown) moveFocusDown(boardElement, activeIndex, allowWrap);
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

export function moveFocusBackward(boardElement, activeIndex, allowWrap, isTypingVertical) {
  if (isTypingVertical) {
    return moveFocusUp(boardElement, activeIndex, allowWrap);
  } else {
    return moveFocusLeft(boardElement, activeIndex, allowWrap);
  }
}

export function moveFocusForward(boardElement, activeIndex, allowWrap, isTypingVertical) {
  if (isTypingVertical) {
    return moveFocusDown(boardElement, activeIndex, allowWrap);
  } else {
    return moveFocusRight(boardElement, activeIndex, allowWrap);
  }
}

function moveFocusLeft(boardElement, activeIndex, allowWrap) {
  if (! allowWrap && inFirstColumn(activeIndex)) return;
  const index = oneLeftIndex(activeIndex);
  const element = squareElement(boardElement, index);
  element.focus();
}

function moveFocusRight(boardElement, activeIndex, allowWrap) {
  if (! allowWrap && inLastColumn(activeIndex)) return;
  const index = oneRightIndex(activeIndex);
  const element = squareElement(boardElement, index);
  element.focus();
}

function moveFocusUp(boardElement, activeIndex, allowWrap) {
  if (! allowWrap && inFirstRow(activeIndex)) return;
  const index = oneUpIndex(activeIndex);
  const element = squareElement(boardElement, index);
  element.focus();
}

function moveFocusDown(boardElement, activeIndex, allowWrap) {
  if (! allowWrap && inLastRow(activeIndex)) return;
  const index = oneDownIndex(activeIndex);
  const element = squareElement(boardElement, index);
  element.focus();
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

function squareElement(boardElement, toFocusIndex) {
  const squareElements = boardElement.getElementsByClassName(`square-${toFocusIndex}`); // !!! maybe use refs on the squares themselves?
  if (squareElements.length !== 1) throw Error(`Could not find square at index ${toFocusIndex}`);
  return squareElements[0];
}