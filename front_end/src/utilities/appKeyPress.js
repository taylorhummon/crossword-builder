import {
  isArrowKey, indexDeterminedByArrowKey,
  indexOneBeforeActive, indexOneAfterActive
} from './boardNavigation';
import { isLetter, filledSquareCharacter } from './alphabet';

export function updateStateDueToKeyPress(prevState, event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return null;
  const { key } = event;
  if (isArrowKey(key))      return updateDueToArrowKey(prevState, key);
  if (isLetter(key))        return updateDueToLetterKey(prevState, key);
  if (key === 'Enter')      return updateDueToEnterKey(prevState);
  if (key === ' ')          return updateDueToSpaceKey(prevState);
  if (key === 'Backspace')  return updateDueToBackspaceKey(prevState);
  if (key === 'Delete')     return updateDueToDeleteKey(prevState);
  return null;
}

function updateDueToArrowKey(prevState, key) {
  return {
    activeSquareIndex: indexDeterminedByArrowKey(prevState, false, key)
  };
}

function updateDueToLetterKey(prevState, key) {
  return {
    squareValues: updateSquare(prevState.squareValues, prevState.activeSquareIndex, key.toUpperCase()),
    activeSquareIndex: indexOneAfterActive(prevState, true)
  };
}

function updateDueToEnterKey(prevState) {
  return updateDueToSpaceKey(prevState);
}

function updateDueToSpaceKey(prevState) {
  return {
    squareValues: updateSquare(prevState.squareValues, prevState.activeSquareIndex, filledSquareCharacter),
    activeSquareIndex: indexOneAfterActive(prevState, true)
  };
}

function updateDueToBackspaceKey(prevState) {
  if (prevState.squareValues[prevState.activeSquareIndex] !== null) {
    return updateDueToDeleteKey(prevState);
  }
  const willMoveFocusTo = indexOneBeforeActive(prevState, true);
  return {
    squareValues: updateSquare(prevState.squareValues, willMoveFocusTo, null),
    activeSquareIndex: willMoveFocusTo
  };
}

function updateDueToDeleteKey(prevState) {
  return {
    squareValues: updateSquare(prevState.squareValues, prevState.activeSquareIndex, null)
  };
}

function updateSquare(prevSquareValues, index, value) {
  const squareValues = [...prevSquareValues];
  squareValues[index] = value;
  return squareValues;
}
