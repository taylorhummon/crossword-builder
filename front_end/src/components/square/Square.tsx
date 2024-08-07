import { EMPTY_SQUARE, FILLED_SQUARE } from 'utilities/character';
import { buildClassString } from 'utilities/css';

import cssModule from './Square.module.scss';


interface SquareProps {
  value: string;
  isActive: boolean;
  boardHasFocus: boolean;
  handleSquareClick: (event: React.MouseEvent) => void;
  dataTestid: string;
}

export default function Square({
  value,
  isActive,
  boardHasFocus,
  handleSquareClick,
  dataTestid
}: SquareProps): JSX.Element {
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

function className(
  value: string,
  isActive: boolean,
  boardHasFocus: boolean
): string {
  const classNames = ['square'];
  if (isFilled(value)) classNames.push('is-filled');
  if (isActive) classNames.push('is-active');
  if (boardHasFocus) classNames.push('board-has-focus');
  return buildClassString(cssModule, classNames);
}

function displayedValue(
  value: string
): string | null {
  if (isEmpty(value) || isFilled(value)) return null;
  return value;
}

function isEmpty(
  value: string
): boolean {
  return value === EMPTY_SQUARE;
}

function isFilled(
  value: string
): boolean {
  return value === FILLED_SQUARE;
}
