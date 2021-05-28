import React from 'react';
import Board from './Board';
import Suggestions from './Suggestions';
import TypingDirection from './TypingDirection';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquareValue } from '../utilities/alphabet';
import {
  boardWidth, boardHeight,
  isArrowKey, moveFocusForArrowKey,
  oneBackwardIndex,
  moveFocusBackward, moveFocusForward
} from '../services/board_navigation';
import './Game.css';

class Game extends React.Component { // !!! rename Game
  constructor(props) {
    super(props);
    this.state = {
      squares: arrayOfSize(boardWidth * boardHeight), // !!! squareValues?
      activeIndex: null, // !!! activeSquareIndex?
      canSuggestFill: true,
      isTypingVertical: false
    };
    this.squareRefs = this.state.squares.map(() => React.createRef());
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestedLetters = computeSuggestions(this.state);
    return (
      <div className="game">
        <Board
          width={boardWidth}
          height={boardHeight}
          squares={this.state.squares}
          activeIndex={this.state.activeIndex}
          handleSquareFocus={this.handleSquareFocus}
          handleSquareBlur={this.handleSquareBlur}
          handleBoardKeyDown={this.handleBoardKeyDown}
          squareRefs={this.squareRefs}
        />
        <Suggestions
          suggestedLetters={suggestedLetters}
          canSuggestFill={this.state.canSuggestFill}
          handleCanSuggestFillToggle={this.handleCanSuggestFillToggle}
        />
        <TypingDirection
          isTypingVertical={this.state.isTypingVertical}
          handleTypingDirectionToggle={this.handleTypingDirectionToggle}
        />
      </div>
    );
  }

  handleSquareFocus = (k, event) => { // !!! consider removing event parameter
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
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key;
    if (isArrowKey(key)) {
      moveFocusForArrowKey(this.squareRefs, this.state.activeIndex, false, key);
      return;
    }
    // !!! should _shouldMoveBack be state?
    this._shouldMoveBack = key === 'Backspace' && this.state.squares[this.state.activeIndex] === null;
    this.setState(
      (prevState) => {
        const squares = prevState.squares;
        const index = this._shouldMoveBack ? oneBackwardIndex(prevState.activeIndex, prevState.isTypingVertical) : prevState.activeIndex;
        if (key === 'Delete')       return updateSquare(squares, index, null);
        if (key === 'Backspace')    return updateSquare(squares, index, null);
        if (key === ' ')            return updateSquare(squares, index, filledSquareValue);
        if (key === 'Enter')        return updateSquare(squares, index, filledSquareValue);
        if (/^[A-Za-z]$/.test(key)) return updateSquare(squares, index, key.toUpperCase());
        return null;
      },
      () => {
        if (key === 'Backspace' && this._shouldMoveBack) {
          moveFocusBackward(this.squareRefs, this.state.activeIndex, true, this.state.isTypingVertical);
        }
        if (key === ' ' || key === 'Enter' || /^[A-Za-z]$/.test(key)) {
          moveFocusForward(this.squareRefs, this.state.activeIndex, true, this.state.isTypingVertical);
        }
        this._shouldMoveBack = null;
      }
    );
  }

  handleCanSuggestFillToggle = () => {
    this.setState((prevState) => {
      return { canSuggestFill: ! prevState.canSuggestFill };
    });
  }

  handleTypingDirectionToggle = () => {
    this.setState((prevState) => {
      return { isTypingVertical: ! prevState.isTypingVertical };
    });
  }
}

function updateSquare(squares, index, value) {
  squares = arrayShallowCopy(squares);
  squares[index] = value;
  return { squares };
}

export default Game;
