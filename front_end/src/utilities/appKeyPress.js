import {
  isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive
} from './boardNavigation';
import { isLetter, filledSquareCharacter } from './alphabet';

export function nextStateDueToKeyPress(state, event) {
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

function dueToArrowKey(state, key) {
  return {
    ...state,
    activeSquareIndex: indexDeterminedByArrowKey(state, false, key)
  };
}

function dueToLetterKey(state, key) {
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, key.toUpperCase()),
    activeSquareIndex: indexOneAfterActive(state, true)
  };
}

function dueToEnterKey(state) {
  return dueToSpaceKey(state);
}

function dueToSpaceKey(state) {
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, filledSquareCharacter),
    activeSquareIndex: indexOneAfterActive(state, true)
  };
}

function dueToBackspaceKey(state) {
  const { squareValues, activeSquareIndex } = state;
  if (squareValues[activeSquareIndex] !== null) {
    return dueToDeleteKey(state);
  }
  const willMoveFocusTo = indexOneBeforeActive(state, true);
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, willMoveFocusTo, null),
    activeSquareIndex: willMoveFocusTo
  };
}

function dueToDeleteKey(state) {
  const { squareValues, activeSquareIndex } = state;
  return {
    ...state,
    squareValues: updatedSquareValues(squareValues, activeSquareIndex, null)
  };
}

function updatedSquareValues(prevSquareValues, index, value) {
  const squareValues = [...prevSquareValues];
  squareValues[index] = value;
  return squareValues;
}
