import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquare } from '../utilities/alphabet';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.boardWidth = 6;
    this.boardHeight = 6;
    this.state = {
      squares: arrayOfSize(this.boardWidth * this.boardHeight),
      activeIndex: null,
      suggestedLetters: [],
      allowFillSuggestions: true
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            width={this.boardWidth}
            height={this.boardHeight}
            squares={this.state.squares}
            activeIndex={this.state.activeIndex}
            handleBoardClick={this.handleBoardClick}
            handleBoardKeyUp={this.handleBoardKeyUp}
          />
        </div>
        <div className="game-suggestions">
          <Suggestions
            suggestedLetters={this.state.suggestedLetters}
            allowFillSuggestions={this.state.allowFillSuggestions}
            handleAllowFillInputChange={this.handleAllowFillInputChange}
          />
        </div>
      </div>
    );
  }

  handleBoardClick = (k, event) => {
    this.setState((prevState) => {
      if (prevState.activeIndex === k) {
        return updateSquare(prevState, filledSquare);
      } else {
        // !!! compute suggestions should be computed asynchronously (and probably on the back end)
        const suggestedLetters = computeSuggestions(prevState.squares, this.boardWidth, this.boardHeight, k, prevState.allowFillSuggestions);
        return {
          activeIndex: k,
          suggestedLetters
        };
      }
    });
  }

  handleBoardKeyUp = (event) => {
    this.setState((prevState) => {
      if (prevState.activeIndex === null) return null;
      if (event.key === 'Escape') return { activeIndex: null, suggestedLetters: [] };
      if (event.key === 'Backspace') return updateSquare(prevState, null);
      if (event.key === ' ') return updateSquare(prevState, null);
      if (event.key === 'Enter') return updateSquare(prevState, filledSquare);
      if (/^[A-Za-z]$/.test(event.key)) return updateSquare(prevState, event.key.toUpperCase());
      return null;
    });
  }

  handleAllowFillInputChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox' && target.name === 'allowFillSuggestions') {
      this.setState((prevState) => {
        const allowFillSuggestions = target.checked;
        const suggestedLetters = computeSuggestions(prevState.squares, this.boardWidth, this.boardHeight, prevState.activeIndex, allowFillSuggestions);
        return { allowFillSuggestions, suggestedLetters };
      });
    }
  }
}

function updateSquare(prevState, value) {
  const squares = arrayShallowCopy(prevState.squares);
  squares[prevState.activeIndex] = value;
  return {
    squares,
    activeIndex: null,
    suggestedLetters: []
  };
}

export default Game;
