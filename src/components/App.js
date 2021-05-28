import React from 'react';
import Board from './Board';
import Suggestions from './Suggestions';
import TypingDirection from './TypingDirection';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquareCharacter } from '../utilities/alphabet';
import {
  boardWidth, boardHeight,
  isArrowKey, moveFocusForArrowKey,
  oneBackwardIndex,
  moveFocusBackward, moveFocusForward
} from '../services/boardNavigation';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareValues: arrayOfSize(boardWidth * boardHeight),
      activeSquareIndex: null, // !!! activeSquareIndex?
      canSuggestFill: true,
      isTypingVertical: false
    };
    this.squareRefs = this.state.squareValues.map(() => React.createRef());
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestedLetters = computeSuggestions(this.state);
    return (
      <div className="app">
        <Board
          width={boardWidth}
          height={boardHeight}
          squareValues={this.state.squareValues}
          activeSquareIndex={this.state.activeSquareIndex}
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

  handleSquareFocus = (k) => {
    this.setState((prevState) => {
      if (prevState.activeSquareIndex === k) return null;
      return { activeSquareIndex: k };
    });
  }

  handleSquareBlur = (k) => {
    // !!! only update state if we're actually leaving the component
    this.setState((prevState) => {
      if (prevState.activeSquareIndex !== k) return null;
      return { activeSquareIndex: null };
    });
  }

  handleBoardKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key;
    if (isArrowKey(key)) {
      moveFocusForArrowKey(this.squareRefs, this.state.activeSquareIndex, false, key);
      return;
    }
    // !!! should _shouldMoveBack be state?
    this._shouldMoveBack = key === 'Backspace' && this.state.squareValues[this.state.activeSquareIndex] === null;
    this.setState(
      (prevState) => {
        const squareValues = prevState.squareValues;
        const index = this._shouldMoveBack ? oneBackwardIndex(prevState.activeSquareIndex, prevState.isTypingVertical) : prevState.activeSquareIndex;
        if (key === 'Delete')       return updateSquare(squareValues, index, null);
        if (key === 'Backspace')    return updateSquare(squareValues, index, null);
        if (key === ' ')            return updateSquare(squareValues, index, filledSquareCharacter);
        if (key === 'Enter')        return updateSquare(squareValues, index, filledSquareCharacter);
        if (/^[A-Za-z]$/.test(key)) return updateSquare(squareValues, index, key.toUpperCase());
        return null;
      },
      () => {
        if (key === 'Backspace' && this._shouldMoveBack) {
          moveFocusBackward(this.squareRefs, this.state.activeSquareIndex, true, this.state.isTypingVertical);
        }
        if (key === ' ' || key === 'Enter' || /^[A-Za-z]$/.test(key)) {
          moveFocusForward(this.squareRefs, this.state.activeSquareIndex, true, this.state.isTypingVertical);
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

function updateSquare(squareValues, index, value) {
  squareValues = arrayShallowCopy(squareValues);
  squareValues[index] = value;
  return { squareValues };
}

export default App;
