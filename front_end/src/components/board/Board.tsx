import Square from 'src/components/square/Square';
import { boardWidth, boardHeight } from 'src/environment/board';
import { indicesArray } from 'src/utilities/array';
import { Character } from 'src/utilities/character';
import { buildClassString } from 'src/utilities/css';

import cssModule from './Board.module.css';


interface BoardProps {
  squares: Array<Character>;
  activeIndex: number | null;
  boardHasFocus: boolean;
  handleBoardKeyDown: (event: React.KeyboardEvent) => void;
  handleBoardClick: (event: React.MouseEvent, k: number) => void;
  handleBoardFocus: () => void;
  handleBoardBlur: () => void;
}

export default function Board({
  squares,
  activeIndex,
  boardHasFocus,
  handleBoardKeyDown,
  handleBoardClick,
  handleBoardFocus,
  handleBoardBlur
}: BoardProps): JSX.Element {
  return (
    <div
      className={buildClassString(cssModule, ['board'])}
      tabIndex={0}
      onKeyDown={handleBoardKeyDown}
      onFocus={handleBoardFocus}
      onBlur={handleBoardBlur}
      data-testid="board"
    >
      {buildRows(squares, activeIndex, boardHasFocus, handleBoardClick)}
    </div>
  );
}

function buildRows(
  squares: Array<Character>,
  activeIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void
): Array<JSX.Element> {
  return indicesArray(boardHeight).map(
    i => buildRow(squares, activeIndex, boardHasFocus, handleBoardClick, i)
  );
}

function buildRow(
  squares: Array<Character>,
  activeIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void,
  i: number
): JSX.Element {
  return (
    <div
      className={buildClassString(cssModule, ['board-row'])}
      key={i}
    >
      {buildSquares(squares, activeIndex, boardHasFocus, handleBoardClick, i)}
    </div>
  );
}

function buildSquares(
  squares: Array<Character>,
  activeIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void,
  i: number
): Array<JSX.Element> {
  return indicesArray(boardWidth).map(
    j => buildSquare(
      squares,
      activeIndex,
      boardHasFocus,
      handleBoardClick,
      i * boardWidth + j
    )
  );
}

function buildSquare(
  squares: Array<Character>,
  activeIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void,
  k: number
): JSX.Element {
  return (
    <Square
      key={k}
      character={squares[k]}
      isActive={activeIndex === k}
      boardHasFocus={boardHasFocus}
      handleSquareClick={(event: React.MouseEvent) => handleBoardClick(event, k)}
      dataTestid={`square-${k}`}
    />
  );
}
