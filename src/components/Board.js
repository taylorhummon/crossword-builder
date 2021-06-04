import React from 'react';
import Square from './Square';
import { boardWidth, boardHeight } from '../services/boardNavigation';
import { indicesArray } from '../utilities/arrays';
import './Board.css';

class Board extends React.Component {
  render() {
    const renderedRows = indicesArray(boardHeight).map(
      i => this.renderRow(i)
    );
    return (
      <div
        className={className(this.props)}
        tabIndex="0"
        onKeyDown={this.props.handleBoardKeyDown}
        onFocus={this.props.handleBoardFocus}
        onBlur={this.props.handleBoardBlur}
      >
        {renderedRows}
      </div>
    );
  }

  renderRow(i) {
    const renderedSquares = indicesArray(boardWidth).map(
      j => this.renderSquare(i * boardWidth + j)
    );
    return (
      <div
        className="board-row"
        key={i}
      >
        {renderedSquares}
      </div>
    );
  }

  renderSquare(k) {
    return (
      <Square
        key={k}
        value={this.props.squareValues[k]}
        isActive={this.props.activeSquareIndex === k}
        handleSquareClick={(event) => this.props.handleSquareClick(event, k)}
      />
    );
  }
}

function className(props) {
  const cssClasses = ['board'];
  if (props.boardHasFocus) cssClasses.push('has-focus');
  return cssClasses.join(' ');
}

export default Board;
