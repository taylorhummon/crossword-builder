import { State } from 'components/app/App';
import { EMPTY_SQUARE, FILLED_SQUARE } from 'utilities/character';
import {
  isLetterKey, isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive
} from 'lib/navigation';


export function nextStateDueToKeyPress(
  state: State,
  event: React.KeyboardEvent
): State {
  if (event.altKey || event.ctrlKey || event.metaKey) return state;
  const { key } = event;
  if (isArrowKey(key))      return dueToArrowKey(state, key);
  if (isLetterKey(key))     return dueToLetterKey(state, key);
  if (key === 'Enter')      return dueToEnterKey(state);
  if (key === ' ')          return dueToSpaceKey(state);
  if (key === 'Backspace')  return dueToBackspaceKey(state);
  if (key === 'Delete')     return dueToDeleteKey(state);
  return state;
}

function dueToArrowKey(
  state: State,
  key: string
): State {
  return {
    ...state,
    activeSquareIndex: indexDeterminedByArrowKey(state, false, key)
  };
}

function dueToLetterKey(
  state: State,
  key: string
): State {
  const { squares, activeSquareIndex } = state;
  const letter = key.toUpperCase();
  return {
    ...state,
    squares: updatedSquareValues(squares, activeSquareIndex, letter),
    activeSquareIndex: indexOneAfterActive(state, true)
  };
}

function dueToEnterKey(
  state: State
): State {
  return dueToSpaceKey(state);
}

function dueToSpaceKey(
  state: State
): State {
  const { squares, activeSquareIndex } = state;
  return {
    ...state,
    squares: updatedSquareValues(squares, activeSquareIndex, FILLED_SQUARE),
    activeSquareIndex: indexOneAfterActive(state, true)
  };
}

function dueToBackspaceKey(
  state: State
): State {
  const { squares, activeSquareIndex } = state;
  if (activeSquareIndex !== null && squares[activeSquareIndex] !== EMPTY_SQUARE) {
    return dueToDeleteKey(state);
  }
  const willMoveFocusTo = indexOneBeforeActive(state, true);
  return {
    ...state,
    squares: updatedSquareValues(squares, willMoveFocusTo, EMPTY_SQUARE),
    activeSquareIndex: willMoveFocusTo
  };
}

function dueToDeleteKey(
  state: State
): State {
  const { squares, activeSquareIndex } = state;
  return {
    ...state,
    squares: updatedSquareValues(squares, activeSquareIndex, EMPTY_SQUARE)
  };
}

function updatedSquareValues(
  prevSquareValues: Array<string>,
  index: number | null,
  value: string
): Array<string> {
  const squares = [...prevSquareValues];
  if (index !== null) {
    squares[index] = value;
  }
  return squares;
}
