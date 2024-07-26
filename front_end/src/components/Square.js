import { filledSquareCharacter } from '../utilities/alphabet';
import { buildClassString } from '../utilities/css';
import cssModule from './Square.module.css';

export default function Square({
  value,
  isActive,
  boardHasFocus,
  handleSquareClick,
  dataTestid
}) {
  return (
    <div
      className={className(value, isActive, boardHasFocus)}
      onClick={handleSquareClick}
      data-testid={dataTestid}
    >
      {displayedValue(value)}
    </div>
  );
}

function className(value, isActive, boardHasFocus) {
  const classNames = ['square'];
  if (isFilled(value)) classNames.push('is-filled');
  if (isActive) classNames.push('is-active');
  if (boardHasFocus) classNames.push('board-has-focus');
  return buildClassString(cssModule, classNames);
}

function displayedValue(value) {
  if (isFilled(value)) return null;
  return value;
}

function isFilled(value) {
  return value === filledSquareCharacter;
}
