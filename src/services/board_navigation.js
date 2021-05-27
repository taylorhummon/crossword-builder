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

export function moveFocusForward(boardElement, activeIndex, allowWrap, typingDirection) {
  if (typingDirection === 'horizontal') moveFocusRight(boardElement, activeIndex, true);
  if (typingDirection === 'vertical')   moveFocusDown(boardElement, activeIndex, true);
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

function oneLeftIndex(activeIndex) {
  if (inFirstColumn(activeIndex)) return activeIndex - 1 + boardWidth;
  return activeIndex - 1;
}

function oneRightIndex(activeIndex) {
  if (inLastColumn(activeIndex)) return activeIndex + 1 - boardWidth;
  return activeIndex + 1;
}

function oneUpIndex(activeIndex) {
  if (inFirstRow(activeIndex)) return activeIndex - boardWidth + boardWidth * boardHeight;
  return activeIndex - boardWidth;
}

function oneDownIndex(activeIndex) {
  if (inLastRow(activeIndex)) return activeIndex + boardWidth - boardWidth * boardHeight;
  return activeIndex + boardWidth;
}

function inFirstColumn(activeIndex) {
  return activeIndex % boardWidth === 0;
}

function inLastColumn(activeIndex) {
  return activeIndex % boardWidth === boardWidth - 1;
}

function inFirstRow(activeIndex) {
  return activeIndex < boardWidth;
}

function inLastRow(activeIndex) {
  return activeIndex >= (boardWidth - 1) * boardHeight;
}

function squareElement(boardElement, toFocus) {
  const squareElements = boardElement.getElementsByClassName(`square-${toFocus}`);
  if (squareElements.length !== 1) throw Error(`Could not find square at index ${toFocus}`);
  return squareElements[0];
}