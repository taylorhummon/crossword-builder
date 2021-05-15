import React from 'react';
import './Board.css';
import Square from './Square';
import computeHorizontalSuggestions from '../services/suggestions';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.width = 6;
    this.height = 6;
    this.state = {
      squares: Array(this.width * this.height).fill(null),
      activeIndex: null,
    };
  }
    
  render() {
    const renderedRows = indicesArray(this.height).map(
      i => this.renderRow(i)
    );
    return (
      <div
        className="board"
        onKeyUp={this.handleKeyUp}
      >
        {renderedRows}
      </div>
    );
  }

  renderRow(i) {
    const renderedSquares = indicesArray(this.width).map(
      j => this.renderSquare(i * this.width + j)
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
        value={this.state.squares[k]}
        isActive={this.state.activeIndex === k}
        onClick={(event) => this.handleClick(k, event)}
      />
    );
  }

  handleClick = (k, event) => {
    this.setState((prevState) => {
      if (prevState.activeIndex === k) {
        return updateSquare(prevState, '\n');
      } else {
        computeHorizontalSuggestions(prevState.squares, k, this.width);
        return { activeIndex: k };
      }
    });
  }

  handleKeyUp = (event) => {
    this.setState((prevState) => {
      if (prevState.activeIndex === null) return null;
      if (event.key === 'Escape')         return { activeIndex: null };
      if (event.key === 'Backspace')      return updateSquare(prevState, null);
      if (event.key === ' ')              return updateSquare(prevState, null);
      if (event.key === 'Enter')          return updateSquare(prevState, '\n');
      if (/^[A-Za-z]$/.test(event.key))   return updateSquare(prevState, event.key.toUpperCase());
      return null;
    });
  }
}

function updateSquare(prevState, value) {
  const squares = prevState.squares.slice();
  squares[prevState.activeIndex] = value;
  return {
    squares,
    activeIndex: null
  };
}

function indicesArray(n) {
  const a = [];
  for (let index = 0; index < n; index++) {
    a.push(index);
  }
  return a;
}

export default Board;
