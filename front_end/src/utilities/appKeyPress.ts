import { State } from '../types';
import {
  isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive
} from './boardNavigation';
import { isLetter, filledSquareCharacter } from './alphabet';

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
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, filledSquareCharacter),
    activeSquareIndex: indexOneAfterActive(state, true)
  };
}

function dueToBackspaceKey(
  state: State
): State {
  const { squareValues, activeSquareIndex } = state;
  if (activeSquareIndex !== null && squareValues[activeSquareIndex] !== null) {
    return dueToDeleteKey(state);
  }
  const willMoveFocusTo = indexOneBeforeActive(state, true);
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, willMoveFocusTo, null),
    activeSquareIndex: willMoveFocusTo
  };
}

function dueToDeleteKey(
  state: State
): State {
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, null)
  };
}

function updatedSquareValues(
  prevSquareValues: Array<string | null>,
  index: number | null,
  value: string | null
): Array<string | null> {
  const squareValues = [...prevSquareValues];
  if (index !== null) {
    squareValues[index] = value;
  }
  return squareValues;
}
