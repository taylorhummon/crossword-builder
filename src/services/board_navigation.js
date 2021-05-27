export const boardWidth = 6;
export const boardHeight = 6;

const arrowLeft   = 'ArrowLeft';
const arrowRight  = 'ArrowRight';
const arrowUp     = 'ArrowUp';
const arrowDown   = 'ArrowDown';

export function isArrowKey(key) {
  return key === arrowLeft || key === arrowRight || key === arrowUp || key === arrowDown;
}

export function moveFocusForArrowKey(boardElement, key, activeIndex) {
  if (key === arrowLeft && ! inFirstColumn(activeIndex))  squareElement(boardElement, moveLeft(activeIndex)).focus();
  if (key === arrowRight && ! inLastColumn(activeIndex))  squareElement(boardElement, moveRight(activeIndex)).focus();
  if (key === arrowUp && ! inFirstRow(activeIndex))       squareElement(boardElement, moveUp(activeIndex)).focus();
  if (key === arrowDown && ! inLastRow(activeIndex))      squareElement(boardElement, moveDown(activeIndex)).focus();
}

function squareElement(boardElement, toFocus) {
  const squareElements = boardElement.getElementsByClassName(`square-${toFocus}`);
  if (squareElements.length !== 1) throw Error(`Could not find square at index ${toFocus}`);
  return squareElements[0];
}

export function moveLeft(activeIndex) {
  if (inFirstColumn(activeIndex)) return activeIndex - 1 + boardWidth;
  return activeIndex - 1;
}

export function moveRight(activeIndex) {
  if (inLastColumn(activeIndex)) return activeIndex + 1 - boardWidth;
  return activeIndex + 1;
}

export function moveUp(activeIndex) {
  if (inFirstRow(activeIndex)) return activeIndex - boardWidth + boardWidth * boardHeight;
  return activeIndex - boardWidth;
}

export function moveDown(activeIndex) {
  if (inLastRow(activeIndex)) return activeIndex + boardWidth - boardWidth * boardHeight;
  return activeIndex + boardWidth;
}

export function inFirstColumn(activeIndex) {
  return activeIndex % boardWidth === 0;
}

export function inLastColumn(activeIndex) {
  return activeIndex % boardWidth === boardWidth - 1;
}

export function inFirstRow(activeIndex) {
  return activeIndex < boardWidth;
}

export function inLastRow(activeIndex) {
  return activeIndex >= (boardWidth - 1) * boardHeight;
}