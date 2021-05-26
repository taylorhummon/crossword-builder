import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquare } from '../utilities/alphabet';

const boardWidth = 6;
const boardHeight = 6;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: arrayOfSize(boardWidth * boardHeight),
      activeIndex: null,
      canSuggestFill: true
    };
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestedLetters = computeSuggestions(this.state, boardWidth, boardHeight);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            width={boardWidth}
            height={boardHeight}
            squares={this.state.squares}
            activeIndex={this.state.activeIndex}
            handleSquareFocus={this.handleSquareFocus}
            handleSquareBlur={this.handleSquareBlur}
            handleBoardClick={this.handleBoardClick}
            handleBoardKeyUp={this.handleBoardKeyUp}
          />
        </div>
        <div className="game-suggestions">
          <Suggestions
            suggestedLetters={suggestedLetters}
            canSuggestFill={this.state.canSuggestFill}
            handleCanSuggestFillChange={this.handleCanSuggestFillChange}
          />
        </div>
      </div>
    );
  }

  handleSquareFocus = (k, event) => {
    if (! isKeyboardNavigation()) return;
    this.setState((prevState) => {
      if (prevState.activeIndex === k) return null;
      return { activeIndex: k };
    });
  }

  handleSquareBlur = (k, event) => {
    this.setState((prevState) => {
      if (prevState.activeIndex !== k) return null;
      return { activeIndex: null };
    });
  }

  handleBoardClick = (k, event) => {
    if (! isMouseNavigation()) return;
    this.setState((prevState) => {
      if (prevState.activeIndex === k) {
        return updateSquare(prevState, filledSquare);
      } else {
        return { activeIndex: k };
      }
    });
  }

  handleBoardKeyUp = (event) => {
    this.setState((prevState) => {
      // if (event.key === 'Escape')
      if (event.key === 'Backspace')    return updateSquare(prevState, null);
      if (event.key === ' ')            return updateSquare(prevState, filledSquare);
      if (event.key === 'Enter')        return updateSquare(prevState, filledSquare);
      if (/^[A-Za-z]$/.test(event.key)) return updateSquare(prevState, event.key.toUpperCase());
    });
  }

  handleCanSuggestFillChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox' && target.name === 'canSuggestFill') {
      this.setState((prevState) => {
        const canSuggestFill = target.checked;
        return { canSuggestFill };
      });
    }
  }
}

function updateSquare(prevState, value) {
  const squares = arrayShallowCopy(prevState.squares);
  squares[prevState.activeIndex] = value;
  return { squares };
}

function isKeyboardNavigation() {
  return document.body.classList.contains('kbd-navigation');
}

function isMouseNavigation() {
  return document.body.classList.contains('mouse-navigation');
}

export default Game;
