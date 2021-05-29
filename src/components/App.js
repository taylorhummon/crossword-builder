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
      if (prevState.activeSquareIndex === k) return null;
      return { activeSquareIndex: k };
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
    this._willMoveFocusTo = null;
    this.setState(
      (prevState) => {
        const key = event.key;
        const squareValues = prevState.squareValues;
        const activeSquareIndex = prevState.activeSquareIndex;
        if (isLetter(key)) {
          this._willMoveFocusTo = indexOneAfterActive(prevState, true);
          return updateSquare(squareValues, activeSquareIndex, key.toUpperCase());
        }
        if (key === 'Enter' || key === ' ') {
          this._willMoveFocusTo = indexOneAfterActive(prevState, true);
          return updateSquare(squareValues, activeSquareIndex, filledSquareCharacter);
        }
        if (key === 'Delete') {
          this._willMoveFocusTo = null;
          return updateSquare(squareValues, activeSquareIndex, null);
        }
        if (key === 'Backspace') {
          const onEmptySquare = squareValues[activeSquareIndex] === null;
          if (onEmptySquare) {
            const index = indexOneBeforeActive(prevState, true);
            this._willMoveFocusTo = index;
            return updateSquare(squareValues, index, null);
          } else { // act like a delete key if the square isn't empty
            this._willMoveFocusTo = null;
            return updateSquare(squareValues, activeSquareIndex, null);
          }
        }
        if (isArrowKey(key)) {
          this._willMoveFocusTo = indexDeterminedByArrowKey(prevState, false, key);
          return null;
        }
        return null;
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
    const index = this._willMoveFocusTo;
    if (typeof index !== 'number') return;
    const element = this.squareRefs[index].current;
    if (! element) throw Error(`Somehow the dom element for square ${index} was missing`);
    element.focus();
    this._willMoveFocusTo = null;
  }
}

function updateSquare(squareValues, index, value) {
  squareValues = arrayShallowCopy(squareValues);
  squareValues[index] = value;
  return { squareValues };
}

export default App;
