import React from 'react';
import Board from './Board';
import Options from './Options';
import Suggestions from './Suggestions';
import Help from './Help';
import { computeSuggestions } from '../services/suggestions';
import {
  boardWidth, boardHeight,
  isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive,
  isMouseNavigation
} from '../services/boardNavigation';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { isLetter, filledSquareCharacter } from '../utilities/alphabet';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareValues: arrayOfSize(boardWidth * boardHeight),
      boardHasFocus: false,
      activeSquareIndex: null,
      bookmarkedIndex: 0,
      canSuggestFill: false,
      isTypingVertical: false
    };
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestions = computeSuggestions(this.state);
    return (
      <div className="app">
        <h1>Create a Crossword Puzzle</h1>
        <Board
          squareValues={this.state.squareValues}
          activeSquareIndex={this.state.activeSquareIndex}
          boardHasFocus={this.state.boardHasFocus}
          handleBoardKeyDown={this.handleBoardKeyDown}
          handleBoardFocus={this.handleBoardFocus}
          handleBoardBlur={this.handleBoardBlur}
          handleSquareClick={this.handleSquareClick}
        />
        <Options
          isTypingVertical={this.state.isTypingVertical}
          handleTypingDirectionToggle={this.handleTypingDirectionToggle}
          canSuggestFill={this.state.canSuggestFill}
          handleCanSuggestFillToggle={this.handleCanSuggestFillToggle}
        />
        <Suggestions
          suggestions={suggestions}
        />
        <Help />
      </div>
    );
  }

  handleBoardKeyDown = (event) => {
    this.setState((prevState) => {
      return updateStateDueToKeyPress(prevState, event);
    });
  }

  handleBoardFocus = () => {
    // if the focus was due to a click, update boardHasFocus in the click handler to avoid blinking
    // !!! is this still the best way to do this?
    if (isMouseNavigation()) return;
    this.setState(prevState => {
      return {
        boardHasFocus: true,
        activeSquareIndex: prevState.bookmarkedIndex,
        bookmarkedIndex: null
      };
    });
  }

  handleBoardBlur = () => {
    this.setState(prevState => {
      return {
        boardHasFocus: false,
        activeSquareIndex: null,
        bookmarkedIndex: prevState.activeSquareIndex
      };
    });
  }

  handleSquareClick = (event, k) => {
    this.setState((prevState) => {
      if (prevState.activeSquareIndex === k && prevState.boardHasFocus) return null; // !!! is this check useful?
      return {
        boardHasFocus: true,
        activeSquareIndex: k,
        bookmarkedIndex: null
      };
    });
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

function updateStateDueToKeyPress(prevState, event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const { key } = event;
  const { squareValues, activeSquareIndex } = prevState;
  if (isLetter(key)) {
    return {
      squareValues: updateSquare(squareValues, activeSquareIndex, key.toUpperCase()),
      activeSquareIndex: indexOneAfterActive(prevState, true)
    };
  }
  if (key === 'Enter' || key === ' ') {
    return {
      squareValues: updateSquare(squareValues, activeSquareIndex, filledSquareCharacter),
      activeSquareIndex: indexOneAfterActive(prevState, true)
    };
  }
  if (key === 'Delete') {
    return {
      squareValues: updateSquare(squareValues, activeSquareIndex, null)
    };
  }
  if (key === 'Backspace') {
    const onEmptySquare = squareValues[activeSquareIndex] === null;
    if (onEmptySquare) {
      const willMoveFocusTo = indexOneBeforeActive(prevState, true);
      return {
        squareValues: updateSquare(squareValues, willMoveFocusTo, null),
        activeSquareIndex: willMoveFocusTo
      };
    } else { // act like a delete key if the square isn't empty
      return {
        squareValues: updateSquare(squareValues, activeSquareIndex, null)
      };
    }
  }
  if (isArrowKey(key)) {
    return {
      activeSquareIndex: indexDeterminedByArrowKey(prevState, false, key)
    };
  }
  return null;
}

function updateSquare(oldSquareValues, index, value) {
  const squareValues = arrayShallowCopy(oldSquareValues);
  squareValues[index] = value;
  return squareValues;
}

export default App;
