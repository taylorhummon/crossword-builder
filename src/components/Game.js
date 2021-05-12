import React from 'react';
import './Game.css';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.width = 6;
    this.height = 6;
    this.state = {
      squares: Array(this.width * this.height).fill(null),
    };
  }
    
  render() {
    const renderedRows = indicesArray(this.height).map(
      i => this.renderRow(i)
    );
    return (
      <div className="board">
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
        onClick={() => this.handleClick(k)}
      />
    );
  }

  handleClick(k) {
    const squares = this.state.squares.slice();
    if (squares[k]) return;
    squares[k] = 'X';
    this.setState({ squares });
  }
}

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function indicesArray(n) {
  const a = [];
  for (let index = 0; index < n; index++) {
    a.push(index);
  }
  return a;
}

export default Game;
