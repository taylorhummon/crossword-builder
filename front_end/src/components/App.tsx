import { useState, useEffect } from 'react';
import Board from './Board';
import Options from './Options';
import Suggestions from './Suggestions';
import Help from './Help';
import { State, RequestData } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';
import { isMouseNavigation } from '../utilities/boardNavigation';
import { nextStateDueToKeyPress } from '../utilities/appKeyPress';
import { fetchSuggestions } from '../utilities/server';
import { arrayOfSize, arrayShallowEquivalent } from '../utilities/arrays';
import { isNumber } from '../utilities/math';
import { buildClassString } from '../utilities/css';
import cssModule from './App.module.scss';

export default function App(): JSX.Element {
  const [state, setState] = useState<State>({
    squareValues: arrayOfSize(BOARD_WIDTH * BOARD_HEIGHT),
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
      const requestData = {
        boardWidth: BOARD_WIDTH,
        boardHeight: BOARD_HEIGHT,
        squareValues,
        activeSquareIndex,
        canSuggestFill
      };
      fetchSuggestions(requestData).then(suggestions => {
        setState((latestState: State) => {
          if (_areSuggestionsOutdated(latestState, requestData)) return latestState;
          return ({ ...latestState, suggestions });
        });
      }).catch(error => {
        console.log('Error occurred updating suggestions', error);
      });
    },
    [squareValues, activeSquareIndex, canSuggestFill]
  );
  function handleBoardKeyDown(
    event: React.KeyboardEvent
  ): void {
    setState((latestState: State) => nextStateDueToKeyPress(latestState, event));
  }
  function handleBoardClick (
    _: React.MouseEvent,
    k: number
  ): void {
    setState((latestState: State) => ({
      ...latestState,
      activeSquareIndex: k,
      bookmarkedIndex: null,
      boardHasFocus: true
    }));
  }
  function handleBoardFocus(): void {
    if (isMouseNavigation()) return; // we'll update state in handleBoardClick instead
    setState((latestState: State) => ({
      ...latestState,
      activeSquareIndex: latestState.bookmarkedIndex,
      bookmarkedIndex: null,
      boardHasFocus: true
    }));
  }
  function handleBoardBlur(): void {
    setState((latestState: State) => ({
      ...latestState,
      activeSquareIndex: null,
      bookmarkedIndex: latestState.activeSquareIndex,
      boardHasFocus: false
    }));
  }
  function handleCanSuggestFillToggle(): void {
    setState(latestState => ({ ...latestState, canSuggestFill: ! latestState.canSuggestFill }));
  }
  function handleTypingDirectionToggle(): void {
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

function _areSuggestionsOutdated(
  latestState: State,
  requestData: RequestData
): boolean {
  if (requestData.activeSquareIndex !== latestState.activeSquareIndex) return true;
  if (requestData.canSuggestFill !== latestState.canSuggestFill) return true;
  if (! arrayShallowEquivalent(requestData.squareValues, latestState.squareValues)) return true;
  return false;
}
