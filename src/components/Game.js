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
        onClick={() => this.handleClick(k)}
      />
    );
  }

  handleClick = (k) => {
    this.setState({ activeIndex: k });
  }

  handleKeyUp = (event) => {
    const activeIndex = this.state.activeIndex;
    if (activeIndex === null) return;
    const key = event.key;
    if (key === 'Escape') {
      this.setState({ activeIndex: null });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      const squares = this.state.squares.slice();
      squares[activeIndex] = key.toUpperCase();
      this.setState({ 
        squares,
        activeIndex: null
      });
    }
  }
}

class Square extends React.Component {
  render() {
    return(
      <button
        className="square"
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

function indicesArray(n) {
  const a = [];
  for (let index = 0; index < n; index++) {
    a.push(index);
  }
  return a;
}

export default Game;
