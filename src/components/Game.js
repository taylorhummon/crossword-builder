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
        isActive={this.state.activeIndex === k}
        onClick={() => this.handleClick(k)}
      />
    );
  }

  handleClick = (k) => {
    this.setState(() => ({ activeIndex: k }));
  }

  handleKeyUp = (event) => {
    this.setState((prevState) => {
      const activeIndex = prevState.activeIndex;
      if (activeIndex === null) return null;
      if (event.key === 'Escape') return { activeIndex: null };
      if (/^[A-Za-z]$/.test(event.key)) {
        const squares = prevState.squares.slice();
        squares[activeIndex] = event.key.toUpperCase();
        return {
          squares,
          activeIndex: null
        };
      }
      return null;
    });
  }

  handleKeyUpAlternative = (event) => {
    this.setState((prevState) => { // updating squares if needed
      const activeIndex = prevState.activeIndex;
      if (activeIndex === null) return null;
      if (event.key === 'Escape') return null;
      if (/^[A-Za-z]$/.test(event.key)) {
        const squares = prevState.squares.slice();
        squares[activeIndex] = event.key.toUpperCase();
        return { squares };
      }
      return null;
    });
    this.setState((prevState) => { // updating activeIndex if needed
      const activeIndex = prevState.activeIndex;
      if (activeIndex === null) return null;
      if (event.key === 'Escape') return { activeIndex: null };
      if (/^[A-Za-z]$/.test(event.key)) return { activeIndex: null };
      return null;
    });
  }
}

class Square extends React.Component {
  render() {
    const cssClasses = ['square'];
    if (this.props.isActive) cssClasses.push('is-active');
    const className = cssClasses.join(' ');
    return(
      <button
        className={className}
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
