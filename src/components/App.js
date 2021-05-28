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
  moveFocusBackward, moveFocusForward,
  oneBackwardIndex
} from '../services/boardNavigation';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareValues: arrayOfSize(boardWidth * boardHeight),
      activeSquareIndex: null,
      canSuggestFill: true,
      isTypingVertical: false
    };
    this.squareRefs = this.state.squareValues.map(() => React.createRef());
    this.moveFocusTo = this.moveFocusTo.bind(this);
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
      moveFocusForArrowKey(this.state, this.moveFocusTo, key);
      return;
    }
    this._valueEntered = null;
    this._isBackspaceOnEmptySquare = (
      key === 'Backspace' &&
      this.state.squareValues[this.state.activeSquareIndex] === null
    );
    this.setState(
      (prevState) => {
        const squareValues = prevState.squareValues;
        const index = this.indexOfValueToBeUpdated(prevState);
        if (key === 'Delete' || key === 'Backspace') {
          this._valueEntered = null;
          return updateSquare(squareValues, index, this._valueEntered);
        }
        if (key === 'Enter' || key === ' ') {
          this._valueEntered = filledSquareCharacter;
          return updateSquare(squareValues, index, this._valueEntered);
        }
        if (/^[A-Za-z]$/.test(key)) {
          this._valueEntered = key.toUpperCase();
          return updateSquare(squareValues, index, this._valueEntered);
        }
        return null;
      },
      () => {
        if (this._valueEntered !== null) moveFocusForward(this.state, this.moveFocusTo);
        if (this._isBackspaceOnEmptySquare) moveFocusBackward(this.state, this.moveFocusTo);
        this._valueEntered = null;
        this._isBackspaceOnEmptySquare = null;
      }
    );
  }

  moveFocusTo(index) {
    const element = this.squareRefs[index].current;
    if (! element) throw Error(`Somehow the dom element for square ${index} was missing`);
    element.focus();
  }

  indexOfValueToBeUpdated(prevState) {
    if (this._isBackspaceOnEmptySquare) {
      return oneBackwardIndex(prevState, prevState.activeSquareIndex);
    } else {
      return prevState.activeSquareIndex;
    }
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
