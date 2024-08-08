import { useState, useEffect } from 'react';

import Board from 'components/board/Board';
import Options from 'components/options/Options';
import Suggestions from 'components/suggestions/Suggestions';
import Help from 'components/help/Help';
import { boardWidth, boardHeight } from 'environment/board';
import { isMouseNavigation } from 'lib/navigation';
import { nextStateDueToKeyPress } from 'lib/keyPress';
import { updateSuggestions } from 'models/suggestions/update';
import { EMPTY_SQUARE } from 'utilities/character';
import { buildClassString } from 'utilities/css';

import cssModule from './App.module.scss';


export interface State {
  squares: Array<string>;
  activeIndex: number | null;
  bookmarkedIndex: number | null;
  boardHasFocus: boolean;
  canSuggestFilled: boolean;
  isTypingVertical: boolean;
  suggestions: Array<string>;
}

export default function App(): JSX.Element {
  const [state, setState] = useState<State>({
    squares: Array(boardWidth * boardHeight).fill(EMPTY_SQUARE),
    activeIndex: null,
    bookmarkedIndex: 0,
    boardHasFocus: false,
    canSuggestFilled: true,
    isTypingVertical: false,
    suggestions: []
  });
  const { squares, activeIndex, canSuggestFilled } = state;
  useEffect(
    () => {
      updateSuggestions(setState, squares, activeIndex, canSuggestFilled);
    },
    [squares, activeIndex, canSuggestFilled]
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
      activeIndex: index,
      bookmarkedIndex: null,
      boardHasFocus: true
    }));
  }

  function handleBoardFocus(): void {
    if (isMouseNavigation()) return; // we'll update state in handleBoardClick instead
    setState((latestState: State) => ({
      ...latestState,
      activeIndex: latestState.bookmarkedIndex,
      bookmarkedIndex: null,
      boardHasFocus: true
    }));
  }

  function handleBoardBlur(): void {
    setState((latestState: State) => ({
      ...latestState,
      activeIndex: null,
      bookmarkedIndex: latestState.activeIndex,
      boardHasFocus: false
    }));
  }

  function handleCanSuggestFillToggle(): void {
    setState(latestState => ({
      ...latestState,
      canSuggestFilled: ! latestState.canSuggestFilled
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
            squares={state.squares}
            activeIndex={state.activeIndex}
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
            canSuggestFilled={state.canSuggestFilled}
            handleCanSuggestFillToggle={handleCanSuggestFillToggle}
          />
          <Suggestions
            suggestions={state.suggestions}
            canSuggestFilled={state.canSuggestFilled}
          />
        </div>
      </div>
      <Help />
    </div>
  );
}
