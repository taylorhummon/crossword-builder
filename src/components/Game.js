import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquare } from '../utilities/alphabet';
import { boardWidth, boardHeight, isArrowKey, moveFocusForArrowKey } from '../services/board_navigation';
import { isKeyboardNavigation, isMouseNavigation } from '../services/navigation';

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
    // !!! only update state if we're actually leaving the component
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
    if (isArrowKey(key)) {
      moveFocusForArrowKey(this.boardRef.current, key, this.state.activeIndex);
      return;
    }
    this.setState((prevState) => {
      if (key === 'Backspace')    return updateSquare(prevState, null);
      if (key === ' ')            return updateSquare(prevState, filledSquare);
      if (key === 'Enter')        return updateSquare(prevState, filledSquare);
      if (/^[A-Za-z]$/.test(key)) return updateSquare(prevState, key.toUpperCase());
    });
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
