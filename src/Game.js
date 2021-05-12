import React from 'react';
import './Game.css';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
    
  render() {
    return (
      <div>
        <div className="status">{this.status()}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] || this.calculateWinner()) return;
    squares[i] = this.turn();
    const xIsNext = ! this.state.xIsNext;
    this.setState({ squares, xIsNext });
  }

  status() {
    const winner = this.calculateWinner();
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${this.turn()}`;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.state.squares;
    for (const line of lines) {
      const [a, b, c] = line;
      for (const value of ['X', 'O']) {
        if (squares[a] === value && squares[b] === value && squares[c] === value) {
          return value;
        }
      }
    }
    return null;
  }

  turn() {
    return this.state.xIsNext ? 'X' : 'O';
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

export default Game;
