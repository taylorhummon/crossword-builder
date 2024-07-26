import { useState, useEffect } from 'react';
import Board from './Board';
import Options from './Options';
import Suggestions from './Suggestions';
import Help from './Help';
import { boardWidth, boardHeight } from '../utilities/boardSize';
import { isMouseNavigation } from '../utilities/boardNavigation';
import { nextStateDueToKeyPress } from '../utilities/appKeyPress';
import { fetchSuggestions } from '../utilities/server';
import { arrayOfSize, arrayShallowEquivalent } from '../utilities/arrays';
import { isNumber } from '../utilities/math';
import { buildClassString } from '../utilities/css';
import cssModule from './App.module.scss';

export default function App() {
  const [state, setState] = useState({
    squareValues: arrayOfSize(boardWidth * boardHeight),
    activeSquareIndex: null,
    bookmarkedIndex: 0,
    boardHasFocus: false,
    canSuggestFill: true,
    isTypingVertical: false,
    suggestions: []
  });
  const { squareValues, activeSquareIndex, canSuggestFill } = state;
  useEffect(
    () => {
      if (! isNumber(activeSquareIndex)) {
        setState(latestState => ({ ...latestState, suggestions: [] }));
        return;
      }
      const requestData = { boardWidth, boardHeight, squareValues, activeSquareIndex, canSuggestFill };
      fetchSuggestions(requestData).then(suggestions => {
        setState(latestState => {
          if (_areSuggestionsOutdated(latestState, requestData)) return latestState;
          return ({ ...latestState, suggestions });
        });
      }).catch(error => {
        console.log('Error occurred updating suggestions', error);
      });
    },
    [squareValues, activeSquareIndex, canSuggestFill]
  );
  function handleBoardKeyDown(event) {
    setState(latestState => nextStateDueToKeyPress(latestState, event));
  }
  function handleBoardClick (_, k) {
    setState(latestState => ({
      ...latestState,
      activeSquareIndex: k,
      bookmarkedIndex: null,
      boardHasFocus: true
    }));
  }
  function handleBoardFocus() {
    if (isMouseNavigation()) return; // we'll update state in handleBoardClick instead
    setState(latestState => ({
      ...latestState,
      activeSquareIndex: latestState.bookmarkedIndex,
      bookmarkedIndex: null,
      boardHasFocus: true
    }));
  }
  function handleBoardBlur() {
    setState(latestState => ({
      ...latestState,
      activeSquareIndex: null,
      bookmarkedIndex: latestState.activeSquareIndex,
      boardHasFocus: false
    }));
  }
  function handleCanSuggestFillToggle() {
    setState(latestState => ({ ...latestState, canSuggestFill: ! latestState.canSuggestFill }));
  }
  function handleTypingDirectionToggle() {
    setState(latestState => ({ ...latestState, isTypingVertical: ! latestState.isTypingVertical }));
  }
  return (
    <div className={buildClassString(cssModule, ['app'])}>
      <h1>Create a Crossword Puzzle</h1>
      <div className={buildClassString(cssModule, ['content'])}>
        <div className={buildClassString(cssModule, ['content-column', 'content-column-left'])}>
          <Board
            squareValues={state.squareValues}
            activeSquareIndex={state.activeSquareIndex}
            boardHasFocus={state.boardHasFocus}
            handleBoardKeyDown={handleBoardKeyDown}
            handleBoardClick={handleBoardClick}
            handleBoardFocus={handleBoardFocus}
            handleBoardBlur={handleBoardBlur}
          />
        </div>
        <div className={buildClassString(cssModule, ['content-column', 'content-column-right'])}>
          <Options
            isTypingVertical={state.isTypingVertical}
            handleTypingDirectionToggle={handleTypingDirectionToggle}
            canSuggestFill={state.canSuggestFill}
            handleCanSuggestFillToggle={handleCanSuggestFillToggle}
          />
          <Suggestions
            suggestions={state.suggestions}
            canSuggestFill={state.canSuggestFill}
          />
        </div>
      </div>
      <Help />
    </div>
  );
}

function _areSuggestionsOutdated(latestState, data) {
  if (data.activeSquareIndex !== latestState.activeSquareIndex) return true;
  if (data.canSuggestFill !== latestState.canSuggestFill) return true;
  if (! arrayShallowEquivalent(data.squareValues, latestState.squareValues)) return true;
  return false;
}
