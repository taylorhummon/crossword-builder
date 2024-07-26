import Square from './Square';
import { boardWidth, boardHeight } from '../utilities/boardSize';
import { indicesArray } from '../utilities/arrays';
import { buildClassString } from '../utilities/css';
import cssModule from './Board.module.css';

export default function Board({
  squareValues,
  activeSquareIndex,
  boardHasFocus,
  handleBoardKeyDown,
  handleBoardClick,
  handleBoardFocus,
  handleBoardBlur
}) {
  return (
    <div
      className={buildClassString(cssModule, ['board'])}
      tabIndex="0"
      onKeyDown={handleBoardKeyDown}
      onFocus={handleBoardFocus}
      onBlur={handleBoardBlur}
      data-testid="board"
    >
      {getRows({ squareValues, activeSquareIndex, boardHasFocus, handleBoardClick })}
    </div>
  );
}

function getRows({
  squareValues,
  activeSquareIndex,
  boardHasFocus,
  handleBoardClick
}) {
  return indicesArray(boardHeight).map(
    i => getRow({ squareValues, activeSquareIndex, boardHasFocus, handleBoardClick, i })
  );
}

function getRow({
  squareValues,
  activeSquareIndex,
  boardHasFocus,
  handleBoardClick,
  i
}) {
  return (
    <div
      className={buildClassString(cssModule, ['board-row'])}
      key={i}
    >
      {getSquares({ squareValues, activeSquareIndex, boardHasFocus, handleBoardClick, i})}
    </div>
  );
}

function getSquares({
  squareValues,
  activeSquareIndex,
  boardHasFocus,
  handleBoardClick,
  i
}) {
  return indicesArray(boardWidth).map(
    j => getSquare({
      squareValues,
      activeSquareIndex,
      boardHasFocus,
      handleBoardClick,
      k: i * boardWidth + j
    })
  );
}

function getSquare({
  squareValues,
  activeSquareIndex,
  boardHasFocus,
  handleBoardClick,
  k
}) {
  return (
    <Square
      key={k}
      value={squareValues[k]}
      isActive={activeSquareIndex === k}
      boardHasFocus={boardHasFocus}
      handleSquareClick={(event) => handleBoardClick(event, k)}
      dataTestid={`square-${k}`}
    />
  );
}
