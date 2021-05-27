import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquare } from '../utilities/alphabet';
import {
  boardWidth, boardHeight,
  isArrowKey, moveFocusForArrowKey,
  moveFocusForward
} from '../services/board_navigation';

const typingDirection = 'horizontal';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: arrayOfSize(boardWidth * boardHeight),
      activeIndex: null,
      canSuggestFill: true
    };
    this.boardRef = React.createRef();
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestedLetters = computeSuggestions(this.state, boardWidth, boardHeight);
    return (
      <div className="game">
        <div
          className="game-board"
          ref={this.boardRef}
        >
          <Board
            width={boardWidth}
            height={boardHeight}
            squares={this.state.squares}
            activeIndex={this.state.activeIndex}
            handleSquareFocus={this.handleSquareFocus}
            handleSquareBlur={this.handleSquareBlur}
            handleBoardKeyDown={this.handleBoardKeyDown}
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
    this.setState((prevState) => {
      if (prevState.activeIndex === k) return null;
      return { activeIndex: k };
    });
  }

  handleSquareBlur = (k, event) => {
    // !!! only update state if we're actually leaving the component
    this.setState((prevState) => {
      if (prevState.activeIndex !== k) return null;
      return { activeIndex: null };
    });
  }

  handleBoardKeyDown = (event) => {
    const key = event.key;
    if (isArrowKey(key)) {
      moveFocusForArrowKey(this.boardRef.current, this.state.activeIndex, true, key);
      return;
    }
    this.setState(
      (prevState) => {
        if (key === 'Backspace')    return updateSquare(prevState, null);
        if (key === 'Delete')       return updateSquare(prevState, null);
        if (key === ' ')            return updateSquare(prevState, filledSquare);
        if (key === 'Enter')        return updateSquare(prevState, filledSquare);
        if (/^[A-Za-z]$/.test(key)) return updateSquare(prevState, key.toUpperCase());
        return null;
      },
      () => {
        if (key === ' ' || key === 'Enter' || /^[A-Za-z]$/.test(key)) {
          moveFocusForward(this.boardRef.current, this.state.activeIndex, true, typingDirection);
        }
      }
    );
  }

  handleCanSuggestFillChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox' && target.name === 'canSuggestFill') {
      this.setState((prevState) => {
        return { canSuggestFill: target.checked };
      });
    }
  }
}

function updateSquare(prevState, value) {
  const squares = arrayShallowCopy(prevState.squares);
  squares[prevState.activeIndex] = value;
  return { squares };
}

export default Game;
