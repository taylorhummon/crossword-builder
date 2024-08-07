import Square from 'components/square/Square';
import { boardWidth, boardHeight } from 'environment/board';
import { indicesArray } from 'utilities/array';
import { buildClassString } from 'utilities/css';

import cssModule from './Board.module.scss';


interface BoardProps {
  squares: Array<string>;
  activeSquareIndex: number | null;
  boardHasFocus: boolean;
  handleBoardKeyDown: (event: React.KeyboardEvent) => void;
  handleBoardClick: (event: React.MouseEvent, k: number) => void;
  handleBoardFocus: () => void;
  handleBoardBlur: () => void;
}

export default function Board({
  squares,
  activeSquareIndex,
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
      {getRows(squares, activeSquareIndex, boardHasFocus, handleBoardClick)}
    </div>
  );
}

function getRows(
  squares: Array<string>,
  activeSquareIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void
): Array<JSX.Element> {
  return indicesArray(boardHeight).map(
    i => getRow(squares, activeSquareIndex, boardHasFocus, handleBoardClick, i)
  );
}

function getRow(
  squares: Array<string>,
  activeSquareIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void,
  i: number
): JSX.Element {
  return (
    <div
      className={buildClassString(cssModule, ['board-row'])}
      key={i}
    >
      {getSquares(squares, activeSquareIndex, boardHasFocus, handleBoardClick, i)}
    </div>
  );
}

function getSquares(
  squares: Array<string>,
  activeSquareIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void,
  i: number
): Array<JSX.Element> {
  return indicesArray(boardWidth).map(
    j => getSquare(
      squares,
      activeSquareIndex,
      boardHasFocus,
      handleBoardClick,
      i * boardWidth + j
    )
  );
}

function getSquare(
  squares: Array<string>,
  activeSquareIndex: number | null,
  boardHasFocus: boolean,
  handleBoardClick: (event: React.MouseEvent, k: number) => void,
  k: number
): JSX.Element {
  return (
    <Square
      key={k}
      value={squares[k]}
      isActive={activeSquareIndex === k}
      boardHasFocus={boardHasFocus}
      handleSquareClick={(event: React.MouseEvent) => handleBoardClick(event, k)}
      dataTestid={`square-${k}`}
    />
  );
}
