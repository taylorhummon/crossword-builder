import React from 'react';
import './Game.css';
import Board from './Board';
import Suggestions from './Suggestions';
import { arrayOfSize, arrayShallowCopy } from '../utilities/arrays';
import { computeSuggestions } from '../services/suggestions';
import { filledSquare } from '../utilities/alphabet';

const boardWidth = 6;
const boardHeight = 6;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: arrayOfSize(boardWidth * boardHeight),
      activeIndex: null,
      canSuggestFill: true
    };
  }

  render() {
    // !!! suggestions should be computed asynchronously (and probably on the back end)
    const suggestedLetters = computeSuggestions(this.state, boardWidth, boardHeight);
    return (
      <div className="game">
        <div className="game-board">
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
    this.setState((prevState) => {
      return { activeIndex: k };
    });
  }

  handleSquareBlur = (k, event) => {
    this.setState((prevState) => {
      // if (prevState.activeIndex !== k) return null; // !!! not sure this is necessary
      return { activeIndex: null };
    });
  }

  handleBoardClick = (k, event) => {
    return; // !!!
  }

  handleBoardKeyUp = (event) => {
    if (event.key === 'Escape') this.updateSquare(event.target, false);
    if (event.key === 'Backspace') this.updateSquare(event.target, true, null);
    if (event.key === ' ') this.updateSquare(event.target, true, null);
    if (event.key === 'Enter') this.updateSquare(event.target, true, filledSquare);
    if (/^[A-Za-z]$/.test(event.key)) this.updateSquare(event.target, true, event.key.toUpperCase());
  }

  handleCanSuggestFillChange = (event) => {
    const target = event.target;
    if (target.type === 'checkbox' && target.name === 'canSuggestFill') {
      this.setState((prevState) => {
        const canSuggestFill = target.checked;
        return { canSuggestFill };
      });
    }
  }

  updateSquare(target, shouldUpdateValue, value) {
    if (! shouldUpdateValue) {
      target.blur();
      return;
    }
    this.setState(
      (prevState) => {
        const squares = arrayShallowCopy(prevState.squares);
        squares[prevState.activeIndex] = value;
        return { squares };
      },
      () => {
        target.blur();
      }
    )
  }
}

export default Game;
