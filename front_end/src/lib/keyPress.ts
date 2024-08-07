import { State } from 'components/app/App';
import { FILLED_SQUARE_CHARACTER, EMPTY_SQUARE_CHARACTER, isLetter } from 'utilities/alphabet';
import {
  isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive
} from 'lib/navigation';


export function nextStateDueToKeyPress(
  state: State,
  event: React.KeyboardEvent
): State {
  if (event.altKey || event.ctrlKey || event.metaKey) return state;
  const { key } = event;
  if (isArrowKey(key))      return dueToArrowKey(state, key);
  if (isLetter(key))        return dueToLetterKey(state, key);
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
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, key.toUpperCase()),
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
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, FILLED_SQUARE_CHARACTER),
    activeSquareIndex: indexOneAfterActive(state, true)
  };
}

function dueToBackspaceKey(
  state: State
): State {
  const { squareValues, activeSquareIndex } = state;
  if (activeSquareIndex !== null && squareValues[activeSquareIndex] !== EMPTY_SQUARE_CHARACTER) {
    return dueToDeleteKey(state);
  }
  const willMoveFocusTo = indexOneBeforeActive(state, true);
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, willMoveFocusTo, EMPTY_SQUARE_CHARACTER),
    activeSquareIndex: willMoveFocusTo
  };
}

function dueToDeleteKey(
  state: State
): State {
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, EMPTY_SQUARE_CHARACTER)
  };
}

function updatedSquareValues(
  prevSquareValues: Array<string>,
  index: number | null,
  value: string
): Array<string> {
  const squareValues = [...prevSquareValues];
  if (index !== null) {
    squareValues[index] = value;
  }
  return squareValues;
}
