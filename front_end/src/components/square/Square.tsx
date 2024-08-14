import { EMPTY_SQUARE, FILLED_SQUARE, Character } from 'src/utilities/character';
import { buildClassString } from 'src/utilities/css';

import cssModule from './Square.module.css';


interface SquareProps {
  character: Character;
  isActive: boolean;
  boardHasFocus: boolean;
  handleSquareClick: (event: React.MouseEvent) => void;
  dataTestid: string;
}

export default function Square({
  character,
  isActive,
  boardHasFocus,
  handleSquareClick,
  dataTestid
}: SquareProps): JSX.Element {
  return (
    <div
      className={className(character, isActive, boardHasFocus)}
      onClick={handleSquareClick}
      data-testid={dataTestid}
    >
      {displayed(character)}
    </div>
  );
}

function className(
  character: Character,
  isActive: boolean,
  boardHasFocus: boolean
): string {
  const classNames = ['square'];
  if (isFilled(character)) classNames.push('is-filled');
  if (isActive) classNames.push('is-active');
  if (boardHasFocus) classNames.push('board-has-focus');
  return buildClassString(cssModule, classNames);
}

function displayed(
  character: Character
): string | null {
  if (isEmpty(character) || isFilled(character)) return null;
  return character;
}

function isEmpty(
  character: Character
): boolean {
  return character === EMPTY_SQUARE;
}

function isFilled(
  character: Character
): boolean {
  return character === FILLED_SQUARE;
}
