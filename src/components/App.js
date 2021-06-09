import React from 'react';
import Board from './Board';
import Options from './Options';
import Suggestions from './Suggestions';
import Help from './Help';
import { boardWidth, boardHeight, isMouseNavigation } from '../services/boardNavigation';
import { updateStateDueToKeyPress } from '../services/appKeyPress';
import { computeSuggestionsPromise } from '../services/suggestions';
import { arrayOfSize, arrayShallowEquivalent } from '../utilities/arrays';
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
      isTypingVertical: false,
      suggestions: []
    };
  }

  render() {
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
              handleBoardClick={this.handleBoardClick}
              handleBoardFocus={this.handleBoardFocus}
              handleBoardBlur={this.handleBoardBlur}
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
              suggestions={this.state.suggestions}
              canSuggestFill={this.state.canSuggestFill}
            />
          </div>
        </div>
        <Help />
      </div>
    );
  }

  handleBoardKeyDown = (event) => {
    this.setState(
      (prevState) => {
        return updateStateDueToKeyPress(prevState, event);
      },
      () => {
        this._computeSuggestions();
      }
    );
  }

  handleBoardClick = (event, k) => {
    this.setState(
      () => {
        return {
          boardHasFocus: true,
          activeSquareIndex: k,
          bookmarkedIndex: null
        };
      },
      () => {
        this._computeSuggestions();
      }
    );
  }

  handleBoardFocus = () => {
    if (isMouseNavigation()) return; // we'll update state in handleBoardClick instead
    this.setState(
      (prevState) => {
        return {
          boardHasFocus: true,
          activeSquareIndex: prevState.bookmarkedIndex,
          bookmarkedIndex: null
        };
      },
      () => {
        this._computeSuggestions();
      }
    );
  }

  handleBoardBlur = () => {
    this.setState(
      (prevState) => {
        return {
          boardHasFocus: false,
          activeSquareIndex: null,
          bookmarkedIndex: prevState.activeSquareIndex
        };
      },
      () => {
        this._computeSuggestions();
      }
    );
  }

  handleCanSuggestFillToggle = () => {
    this.setState(
      (prevState) => {
        return { canSuggestFill: ! prevState.canSuggestFill };
      },
      () => {
        this._computeSuggestions();
      }
    );
  }

  handleTypingDirectionToggle = () => {
    this.setState(
      (prevState) => {
        return { isTypingVertical: ! prevState.isTypingVertical };
      },
      () => {
        this._computeSuggestions();
      }
    );
  }

  _computeSuggestions() {
    const { activeSquareIndex, canSuggestFill, squareValues } = this.state;
    const data = { activeSquareIndex, canSuggestFill, squareValues, boardWidth, boardHeight };
    if (! activeSquareIndex) {
      this.setState(() => {
        return { suggestions: null };
      });
      return;
    }
    computeSuggestionsPromise(data).then((suggestions) => {
      this.setState((state) => {
        if (this._isSuggestionDataOutdated(data, state)) return null;
        return { suggestions };
      });
    });
  }

  _isSuggestionDataOutdated(data, state) {
    if (data.activeSquareIndex !== state.activeSquareIndex) return true;
    if (data.canSuggestFill !== state.canSuggestFill) return true;
    if (! arrayShallowEquivalent(data.squareValues, state.squareValues)) return true;
    return false;
  }
}

export default App;
