import React from 'react';
import Board from './Board';
import Options from './Options';
import Suggestions from './Suggestions';
import Help from './Help';
import { boardWidth, boardHeight } from '../utilities/boardSize';
import { isMouseNavigation } from '../utilities/boardNavigation';
import { updateStateDueToKeyPress } from '../utilities/appKeyPress';
import { fetchSuggestions } from '../utilities/fetchSuggestions';
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
      (prevState) => updateStateDueToKeyPress(prevState, event),
      this._updateSuggestions
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
      this._updateSuggestions
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
      this._updateSuggestions
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
      this._updateSuggestions
    );
  }

  handleCanSuggestFillToggle = () => {
    this.setState(
      (prevState) => {
        return { canSuggestFill: ! prevState.canSuggestFill };
      },
      this._updateSuggestions
    );
  }

  handleTypingDirectionToggle = () => {
    this.setState(
      (prevState) => {
        return { isTypingVertical: ! prevState.isTypingVertical };
      }
    );
  }

  _updateSuggestions() {
    const { activeSquareIndex, canSuggestFill, squareValues } = this.state;
    if (! activeSquareIndex) {
      this.setState({ suggestions: null });
      return;
    }
    const data = { activeSquareIndex, canSuggestFill, squareValues, boardWidth, boardHeight };
    fetchSuggestions(data).then((suggestions) => {
      this.setState((state) => {
        if (this._isSuggestionDataOutdated(data, state)) return null;
        return { suggestions };
      });
    }).catch((error) => {
      console.log('Error occurred updating suggestions', error);
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
