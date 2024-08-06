import { useState, useEffect } from 'react';

import { State } from 'declarations';
import Board from 'components/board/Board';
import Options from 'components/options/Options';
import Suggestions from 'components/suggestions/Suggestions';
import Help from 'components/help/Help';
import { boardWidth, boardHeight } from 'environment/board';
import { isMouseNavigation } from 'lib/navigation';
import { nextStateDueToKeyPress } from 'lib/keyPress';
import { updateSuggestions } from 'models/suggestions/update';
import { buildArrayOfLength } from 'utilities/arrays';
import { buildClassString } from 'utilities/css';

import cssModule from './App.module.scss';


export default function App(): JSX.Element {
  const [state, setState] = useState<State>({
    squareValues: buildArrayOfLength(boardWidth * boardHeight),
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
      updateSuggestions(setState, squareValues, activeSquareIndex, canSuggestFill);
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
    index: number
  ): void {
    setState((latestState: State) => ({
      ...latestState,
      activeSquareIndex: index,
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
    setState(latestState => ({
      ...latestState,
      canSuggestFill: ! latestState.canSuggestFill
    }));
  }

  function handleTypingDirectionToggle(): void {
    setState(latestState => ({
      ...latestState,
      isTypingVertical: ! latestState.isTypingVertical
    }));
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
