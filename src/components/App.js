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
      canSuggestFill: true,
      isTypingVertical: false
    };
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestions = computeSuggestions(this.state);
    return (
      <div className="app">
        <h1>Create a Crossword Puzzle</h1>
        <div className="content">
          <div className="content-column content-column-left">
            <Board
              squareValues={this.state.squareValues}
              activeSquareIndex={this.state.activeSquareIndex}
              boardHasFocus={this.state.boardHasFocus}
              handleBoardKeyDown={this.handleBoardKeyDown}
              handleBoardFocus={this.handleBoardFocus}
              handleBoardBlur={this.handleBoardBlur}
              handleBoardClick={this.handleBoardClick}
            />
          </div>
          <div className="content-column content-column-right">
            <Options
              isTypingVertical={this.state.isTypingVertical}
              handleTypingDirectionToggle={this.handleTypingDirectionToggle}
              canSuggestFill={this.state.canSuggestFill}
              handleCanSuggestFillToggle={this.handleCanSuggestFillToggle}
            />
            <Suggestions
              suggestions={suggestions}
              canSuggestFill={this.state.canSuggestFill}
            />
          </div>
        </div>
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
    if (isMouseNavigation()) return; // we'll update state in handleBoardClick instead
    this.setState((prevState) => {
      return {
        boardHasFocus: true,
        activeSquareIndex: prevState.bookmarkedIndex,
        bookmarkedIndex: null
      };
    });
  }

  handleBoardBlur = () => {
    this.setState((prevState) => {
      return {
        boardHasFocus: false,
        activeSquareIndex: null,
        bookmarkedIndex: prevState.activeSquareIndex
      };
    });
  }

  handleBoardClick = (event, k) => {
    this.setState(() => {
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
  if (isArrowKey(key))      return updateDueToArrowKey(prevState, key);
  if (isLetter(key))        return updateDueToLetterKey(prevState, key);
  if (key === 'Enter')      return updateDueToEnterKey(prevState);
  if (key === ' ')          return updateDueToSpaceKey(prevState);
  if (key === 'Backspace')  return updateDueToBackspaceKey(prevState);
  if (key === 'Delete')     return updateDueToDeleteKey(prevState);
  return null;
}

function updateDueToArrowKey(prevState, key) {
  return {
    activeSquareIndex: indexDeterminedByArrowKey(prevState, false, key)
  };
}

function updateDueToLetterKey(prevState, key) {
  return {
    squareValues: updateSquare(prevState.squareValues, prevState.activeSquareIndex, key.toUpperCase()),
    activeSquareIndex: indexOneAfterActive(prevState, true)
  };
}

function updateDueToEnterKey(prevState) {
  return updateDueToSpaceKey(prevState);
}

function updateDueToSpaceKey(prevState) {
  return {
    squareValues: updateSquare(prevState.squareValues, prevState.activeSquareIndex, filledSquareCharacter),
    activeSquareIndex: indexOneAfterActive(prevState, true)
  };
}

function updateDueToBackspaceKey(prevState) {
  if (prevState.squareValues[prevState.activeSquareIndex] !== null) {
    return updateDueToDeleteKey(prevState);
  }
  const willMoveFocusTo = indexOneBeforeActive(prevState, true);
  return {
    squareValues: updateSquare(prevState.squareValues, willMoveFocusTo, null),
    activeSquareIndex: willMoveFocusTo
  };
}

function updateDueToDeleteKey(prevState) {
  return {
    squareValues: updateSquare(prevState.squareValues, prevState.activeSquareIndex, null)
  };
}

function updateSquare(prevSquareValues, index, value) {
  const squareValues = arrayShallowCopy(prevSquareValues);
  squareValues[index] = value;
  return squareValues;
}

export default App;
