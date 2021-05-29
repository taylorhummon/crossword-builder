import React from 'react';
import Board from './Board';
import Suggestions from './Suggestions';
import TypingDirection from './TypingDirection';
import { computeSuggestions } from '../services/suggestions';
import {
  boardWidth, boardHeight,
  isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive
} from '../services/boardNavigation';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { isLetter, filledSquareCharacter } from '../utilities/alphabet';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareValues: arrayOfSize(boardWidth * boardHeight),
      activeSquareIndex: null,
      canSuggestFill: true,
      isTypingVertical: false,
      willMoveFocusTo: null
    };
    this.squareRefs = this.state.squareValues.map(() => React.createRef());
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestedLetters = computeSuggestions(this.state);
    return (
      <div className="app">
        <Board
          squareValues={this.state.squareValues}
          activeSquareIndex={this.state.activeSquareIndex}
          squareRefs={this.squareRefs}
          handleSquareFocus={this.handleSquareFocus}
          handleSquareBlur={this.handleSquareBlur}
          handleBoardKeyDown={this.handleBoardKeyDown}
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

  handleSquareFocus = (event, k) => {
    this.setState((prevState) => {
      if (prevState.activeSquareIndex === k && prevState.willMoveFocusTo === null) return null;
      return { activeSquareIndex: k, willMoveFocusTo: null };
    });
  }

  handleSquareBlur = (event, k) => {
    // !!! only update state if we're actually leaving the component
    this.setState((prevState) => {
      if (prevState.activeSquareIndex !== k) return null;
      return { activeSquareIndex: null };
    });
  }

  handleBoardKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    this.setState(
      (prevState) => {
        return updateStateDueToKeyPress(prevState, event.key);
      },
      () => {
        this.moveFocus();
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

  moveFocus() {
    const index = this.state.willMoveFocusTo;
    if (typeof index !== 'number') return;
    if (index < 0 || index >= boardWidth * boardHeight) {
      throw Error(`willMoveFocusTo is out of range`);
    }
    const element = this.squareRefs[index].current;
    if (! element) {
      throw Error(`Somehow the dom element for square ${index} was missing`);
    }
    element.focus();
  }
}

function updateStateDueToKeyPress(prevState, key) {
  const { squareValues, activeSquareIndex } = prevState;
  if (isLetter(key)) {
    const willMoveFocusTo = indexOneAfterActive(prevState, true);
    return updateSquare(squareValues, activeSquareIndex, key.toUpperCase(), willMoveFocusTo);
  }
  if (key === 'Enter' || key === ' ') {
    const willMoveFocusTo = indexOneAfterActive(prevState, true);
    return updateSquare(squareValues, activeSquareIndex, filledSquareCharacter, willMoveFocusTo);
  }
  if (key === 'Delete') {
    return updateSquare(squareValues, activeSquareIndex, null, null);
  }
  if (key === 'Backspace') {
    const onEmptySquare = squareValues[activeSquareIndex] === null;
    if (onEmptySquare) {
      const willMoveFocusTo = indexOneBeforeActive(prevState, true);
      return updateSquare(squareValues, willMoveFocusTo, null, willMoveFocusTo);
    } else { // act like a delete key if the square isn't empty
      return updateSquare(squareValues, activeSquareIndex, null, null);
    }
  }
  if (isArrowKey(key)) {
    return { willMoveFocusTo: indexDeterminedByArrowKey(prevState, false, key) };
  }
  return null;
}

function updateSquare(squareValues, index, value, willMoveFocusTo) {
  squareValues = arrayShallowCopy(squareValues);
  squareValues[index] = value;
  return { squareValues, willMoveFocusTo };
}

export default App;
