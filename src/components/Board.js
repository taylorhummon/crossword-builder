import React from 'react';
import Square from './Square';
import { boardWidth, boardHeight } from '../utilities/boardSize';
import { indicesArray } from '../utilities/arrays';
import './Board.css';

class Board extends React.Component {
  render() {
    return (
      <div
        className={this._boardClassName()}
        tabIndex="0"
        onKeyDown={this.props.handleBoardKeyDown}
        onFocus={this.props.handleBoardFocus}
        onBlur={this.props.handleBoardBlur}
      >
        {this.renderRows()}
      </div>
    );
  }

  _boardClassName() {
    const cssClasses = ['board'];
    if (this.props.boardHasFocus) cssClasses.push('has-focus');
    return cssClasses.join(' ');
  }

  renderRows() {
    return indicesArray(boardHeight).map(
      i => this.renderRow(i)
    );
  }

  renderRow(i) {
    return (
      <div
        className="board-row"
        key={i}
      >
        {this.renderSquares(i)}
      </div>
    );
  }

  renderSquares(i) {
    return indicesArray(boardWidth).map(
      j => this.renderSquare(i * boardWidth + j)
    );
  }

  renderSquare(k) {
    return (
      <Square
        key={k}
        value={this.props.squareValues[k]}
        isActive={this.props.activeSquareIndex === k}
        handleSquareClick={(event) => this.props.handleBoardClick(event, k)}
      />
    );
  }
}

export default Board;
