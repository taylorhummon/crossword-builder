import Square from './Square';
import { boardWidth, boardHeight } from '../utilities/boardSize';
import { indicesArray } from '../utilities/arrays';
import './Board.css';

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
      className={className(boardHasFocus)}
      tabIndex="0"
      onKeyDown={handleBoardKeyDown}
      onFocus={handleBoardFocus}
      onBlur={handleBoardBlur}
      data-testid="board"
    >
      {getRows(squareValues, activeSquareIndex, handleBoardClick)}
    </div>
  );
}

function className(boardHasFocus) {
  const cssClasses = ['board'];
  if (boardHasFocus) cssClasses.push('has-focus');
  return cssClasses.join(' ');
}

function getRows(squareValues, activeSquareIndex, handleBoardClick) {
  return indicesArray(boardHeight).map(
    i => getRow(squareValues, activeSquareIndex, handleBoardClick, i)
  );
}

function getRow(squareValues, activeSquareIndex, handleBoardClick, i) {
  return (
    <div
      className="board-row"
      key={i}
    >
      {getSquares(squareValues, activeSquareIndex, handleBoardClick, i)}
    </div>
  );
}

function getSquares(squareValues, activeSquareIndex, handleBoardClick, i) {
  return indicesArray(boardWidth).map(
    j => getSquare(squareValues, activeSquareIndex, handleBoardClick, i * boardWidth + j)
  );
}

function getSquare(squareValues, activeSquareIndex, handleBoardClick, k) {
  return (
    <Square
      key={k}
      value={squareValues[k]}
      isActive={activeSquareIndex === k}
      handleSquareClick={(event) => handleBoardClick(event, k)}
      dataTestid={`square-${k}`}
    />
  );
}
