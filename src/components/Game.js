import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquareValue } from '../utilities/alphabet';
import {
  boardWidth, boardHeight,
  isArrowKey, moveFocusForArrowKey,
  oneBackwardIndex,
  moveFocusBackward, moveFocusForward
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
      moveFocusForArrowKey(this.boardRef.current, this.state.activeIndex, false, key);
      return;
    }
    this._shouldMoveBack = key === 'Backspace' && this.state.squares[this.state.activeIndex] === null;
    this.setState(
      (prevState) => {
        const squares = prevState.squares;
        const index = this._shouldMoveBack ? oneBackwardIndex(prevState.activeIndex, typingDirection) : prevState.activeIndex;
        if (key === 'Delete')       return updateSquare(squares, index, null);
        if (key === 'Backspace')    return updateSquare(squares, index, null);
        if (key === ' ')            return updateSquare(squares, index, filledSquareValue);
        if (key === 'Enter')        return updateSquare(squares, index, filledSquareValue);
        if (/^[A-Za-z]$/.test(key)) return updateSquare(squares, index, key.toUpperCase());
        return null;
      },
      () => {
        if (key === 'Backspace' && this._shouldMoveBack) {
          moveFocusBackward(this.boardRef.current, this.state.activeIndex, true, typingDirection);
        }
        if (key === ' ' || key === 'Enter' || /^[A-Za-z]$/.test(key)) {
          moveFocusForward(this.boardRef.current, this.state.activeIndex, true, typingDirection);
        }
        this._shouldMoveBack = null;
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

function updateSquare(squares, index, value) {
  squares = arrayShallowCopy(squares);
  squares[index] = value;
  return { squares };
}

export default Game;
