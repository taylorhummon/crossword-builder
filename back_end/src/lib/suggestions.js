import { buildUppercaseAlphabet, FILLED_SQUARE_CHARACTER } from '../utilities/alphabet.js';
import { firstCharacter, lastCharacter, trimFirstCharacter, trimLastCharacter } from '../utilities/strings.js';
import { isNumber } from '../utilities/math.js';
import {
  buildBoard,
  leftBound, rightBound, topBound, bottomBound,
  horizontalPatternFor, verticalPatternFor
} from './board.js';
import { computeSubpatterns, computeSubpatternsTrimRight, computeSubpatternsTrimLeft } from './subpatterns.js';

export function buildSuggestionsList(wordsFinder, data) {
  if (! isNumber(data.activeSquareIndex)) return [];
  const board = buildBoard(data);
  if (data.canSuggestFill) {
    return whenCanSuggestFill(wordsFinder, board);
  } else {
    return whenCannotSuggestFill(wordsFinder, board);
  }
}

function whenCannotSuggestFill(wordsFinder, board) {
  const horizontalPattern = horizontalPatternFor(board, leftBound(board), rightBound(board));
  const verticalPattern = verticalPatternFor(board, topBound(board), bottomBound(board));
  const suggestionsSetA = getSuggestionsSetForPattern(wordsFinder, horizontalPattern);
  const suggestionsSetB = getSuggestionsSetForPattern(wordsFinder, verticalPattern);
  return toLettersArray(suggestionsSetA, suggestionsSetB);
}

function whenCanSuggestFill(wordsFinder, board) {
  const horizontalPattern = horizontalPatternFor(board, leftBound(board), rightBound(board));
  const verticalPattern = verticalPatternFor(board, topBound(board), bottomBound(board));
  const suggestionsSetA = getSuggestionsSetForAllSubpatterns(wordsFinder, horizontalPattern);
  const suggestionsSetB = getSuggestionsSetForAllSubpatterns(wordsFinder, verticalPattern);
  const letters = toLettersArray(suggestionsSetA, suggestionsSetB);
  if (willSuggestFill(wordsFinder, board)) return letters.concat(FILLED_SQUARE_CHARACTER);
  return letters;
}

function getSuggestionsSetForAllSubpatterns(wordsFinder, pattern) {
  const suggestionsSet = new Set();
  const subpatterns = computeSubpatterns(pattern);
  for (const subpattern of subpatterns) {
    for (const suggestion of getSuggestionsSetForPattern(wordsFinder, subpattern)) {
      suggestionsSet.add(suggestion);
    }
  }
  return suggestionsSet;
}

function getSuggestionsSetForPattern(wordsFinder, pattern) {
  const suggestionsSet = new Set();
  const index = pattern.indexOf('@');
  const regularExpression = regularExpressionFor(pattern);
  const words = wordsFinder(pattern.length);
  for (const word of words) {
    if (regularExpression.test(word)) {
      suggestionsSet.add(word.charAt(index));
    }
  }
  return suggestionsSet;
}

function regularExpressionFor(pattern) {
  const regularExpressionPatternString = (
    pattern
    .split('')
    .map(character => character === '@' ? '.' : character)
    .join('')
  );
  return new RegExp(`^${regularExpressionPatternString}$`);
}

function willSuggestFill(wordsFinder, board) {
  const leftPattern = horizontalPatternFor(board, leftBound(board), board.activeColumn);
  const rightPattern = horizontalPatternFor(board, board.activeColumn, rightBound(board));
  const topPattern = verticalPatternFor(board, topBound(board), board.activeRow);
  const bottomPattern = verticalPatternFor(board, board.activeRow, bottomBound(board));
  const fillOkForLeft = willSuggestFillTrimLeft(wordsFinder, leftPattern);
  if (! fillOkForLeft) return false;
  const fillOkForRight = willSuggestFillTrimRight(wordsFinder, rightPattern);
  if (! fillOkForRight) return false;
  const fillOkForTop = willSuggestFillTrimLeft(wordsFinder, topPattern);
  if (! fillOkForTop) return false;
  const fillOkForBottom = willSuggestFillTrimRight(wordsFinder, bottomPattern);
  if (! fillOkForBottom) return false;
  return true
}

function willSuggestFillTrimLeft(wordsFinder, pattern) {
  if (lastCharacter(pattern) !== '@') throw new Error('Expected @ as last character');
  const subpatterns = computeSubpatternsTrimLeft(pattern);
  if (subpatterns.includes('@')) return true;
  for (const subpattern of subpatterns) {
    if (hasMatch(wordsFinder, trimLastCharacter(subpattern))) return true;
  }
  return false;
}

function willSuggestFillTrimRight(wordsFinder, pattern) {
  if (firstCharacter(pattern) !== '@') throw new Error('Expected @ as first character');
  const subpatterns = computeSubpatternsTrimRight(pattern);
  if (subpatterns.includes('@')) return true;
  for (const subpattern of subpatterns) {
    if (hasMatch(wordsFinder, trimFirstCharacter(subpattern))) return true;
  }
  return false;
}

function hasMatch(wordsFinder, pattern) {
  const regularExpression = new RegExp(`^${pattern}$`);
  const words = wordsFinder(pattern.length);
  for (const word of words) {
    if (regularExpression.test(word)) return true;
  }
  return false;
}

function toLettersArray(setA, setB) {
  return buildUppercaseAlphabet().filter(
    letter => setA.has(letter) && setB.has(letter)
  );
}
