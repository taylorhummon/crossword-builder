import { filledSquareCharacter } from '../utilities/alphabet';
import './Square.css';

export default function Square({
  value,
  isActive,
  handleSquareClick,
  dataTestid
}) {
  return (
    <div
      className={className(value, isActive)}
      onClick={handleSquareClick}
      data-testid={dataTestid}
    >
      {displayedValue(value)}
    </div>
  );
}

function className(value, isActive) {
  const cssClasses = ['square'];
  if (isFilled(value)) cssClasses.push('is-filled');
  if (isActive) cssClasses.push('is-active');
  return cssClasses.join(' ');
}

function displayedValue(value) {
  if (isFilled(value)) return null;
  return value;
}

function isFilled(value) {
  return value === filledSquareCharacter;
}
