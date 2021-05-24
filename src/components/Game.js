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
      canSuggestFill: true
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
            canSuggestFill={this.state.canSuggestFill}
            handleCanSuggestFillChange={this.handleCanSuggestFillChange}
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
        const suggestedLetters = computeSuggestions(prevState.squares, this.boardWidth, this.boardHeight, k, prevState.canSuggestFill);
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

  handleCanSuggestFillChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox' && target.name === 'canSuggestFill') {
      this.setState((prevState) => {
        const canSuggestFill = target.checked;
        const suggestedLetters = computeSuggestions(prevState.squares, this.boardWidth, this.boardHeight, prevState.activeIndex, canSuggestFill);
        return { canSuggestFill, suggestedLetters };
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
