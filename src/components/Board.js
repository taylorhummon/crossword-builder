import React from 'react';
import './Board.css';
import Square from './Square';
import { indicesArray } from '../utilities/indices_array';

class Board extends React.Component {
  render() {
    const renderedRows = indicesArray(this.props.height).map(
      i => this.renderRow(i)
    );
    return (
      <div
        className="board"
        onKeyUp={this.props.handleBoardKeyUp}
      >
        {renderedRows}
      </div>
    );
  }

  renderRow(i) {
    const renderedSquares = indicesArray(this.props.width).map(
      j => this.renderSquare(i * this.props.width + j)
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
        value={this.props.squares[k]}
        isActive={this.props.activeIndex === k}
        onClick={(event) => this.props.handleBoardClick(k, event)}
      />
    );
  }
}

export default Board;
