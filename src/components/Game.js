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
    const key = event.key;
    const shouldReturnEarly = this.processArrowKey(key);
    if (shouldReturnEarly) return;
    this.setState((prevState) => {
      if (key === 'Backspace')    return updateSquare(prevState, null);
      if (key === ' ')            return updateSquare(prevState, filledSquare);
      if (key === 'Enter')        return updateSquare(prevState, filledSquare);
      if (key === 'ArrowUp') {
        if (prevState.activeIndex < boardWidth) return null;
        return { activeIndex: prevState.activeIndex - boardWidth };
      }
      if (/^[A-Za-z]$/.test(key)) return updateSquare(prevState, key.toUpperCase());
    });
  }

  processArrowKey(key) {
    if (key === 'ArrowLeft') {
      const activeIndex = this.state.activeIndex; // !!! looking up stale state
      if (activeIndex % boardWidth === 0) return true;
      adjustFocus(activeIndex, activeIndex - 1);
      return true;
    };
    if (key === 'ArrowRight') {
      const activeIndex = this.state.activeIndex;
      if (activeIndex % boardWidth === boardWidth - 1) return true;
      adjustFocus(activeIndex, activeIndex + 1);
      return true;
    };
    if (key === 'ArrowUp') {
      const activeIndex = this.state.activeIndex;
      if (activeIndex < boardWidth) return true;
      adjustFocus(activeIndex, activeIndex - boardWidth);
      return true;
    };
    if (key === 'ArrowDown') {
      const activeIndex = this.state.activeIndex;
      if (activeIndex >= (boardWidth - 1) * boardHeight) return true;
      adjustFocus(activeIndex, activeIndex + boardWidth);
      return true;
    };
    return false;
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

function adjustFocus(activeIndex, toFocus) {
  const square = document.getElementById(`square-${toFocus}`);
  if (! square) throw Error(`Could not find square at index ${toFocus}`);
  square.focus();
}

export default Game;
