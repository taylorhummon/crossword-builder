import { FILLED_SQUARE_CHARACTER } from '../../lib/constants';
import { buildClassString } from '../../utilities/css';

import cssModule from './Square.module.scss';


interface SquareProps {
  value: string | null;
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
  value: string | null,
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
  value: string | null
): string | null {
  if (value === null) return null;
  if (isFilled(value)) return null;
  return value;
}

function isFilled(
  value: string | null
): boolean {
  return value === FILLED_SQUARE_CHARACTER;
}
