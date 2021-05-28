import React from 'react';
import Square from './Square';
import { boardWidth, boardHeight } from '../services/boardNavigation';
import { indicesArray } from '../utilities/arrays';
import './Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const indices = indicesArray(boardWidth * boardHeight);
    this.handleSquareFocusCallbacks = indices.map(
      k => event => this.props.handleSquareFocus(event, k)
    );
    this.handleSquareBlurCallbacks = indices.map(
      k => event => this.props.handleSquareBlur(event, k)
    );
  }

  render() {
    const renderedRows = indicesArray(boardHeight).map(
      i => this.renderRow(i)
    );
    return (
      <div
        className="board"
        onKeyDown={this.props.handleBoardKeyDown}
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
        squareRef={this.props.squareRefs[k]}
        handleSquareFocus={this.handleSquareFocusCallbacks[k]}
        handleSquareBlur={this.handleSquareBlurCallbacks[k]}
      />
    );
  }
}

export default Board;
