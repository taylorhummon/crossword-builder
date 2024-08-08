import { FILLED_SQUARE, buildLetters } from 'utilities/character';
import { buildClassString } from 'utilities/css';

import cssModule from './Suggestions.module.scss';


interface SuggestionsProps {
  suggestions: Array<string>;
  canSuggestFilled: boolean;
}

export default function Suggestions({
  suggestions,
  canSuggestFilled
}: SuggestionsProps): JSX.Element {
  return (
    <div className={buildClassString(cssModule, ['suggestions'])}>
      <h4>Suggested letters</h4>
      {renderLetters(suggestions, canSuggestFilled)}
    </div>
  );
}

function renderLetters(
  suggestions: Array<string>,
  canSuggestFilled: boolean
): Array<JSX.Element> {
  const letters = buildLetters();
  if (canSuggestFilled) letters.push(FILLED_SQUARE);
  return letters.map(
    letter => renderLetter(suggestions, letter)
  );
}

function renderLetter(
  suggestions: Array<string>,
  letter: string
): JSX.Element {
  return (
    <div
      className={className(suggestions, letter)}
      key={letter}
      data-testid={testid(letter)}
    >
      {letterForDisplay(letter)}
    </div>
  );
}

function className(
  suggestions: Array<string>,
  letter: string
): string {
  const classNames = ['letter'];
  if (suggestions.includes(letter)) {
    classNames.push('suggested');
  }
  return buildClassString(cssModule, classNames);
}

function testid(
  letter: string
): string {
  if (letter === FILLED_SQUARE) return 'suggestion-filled-square';
  return `suggestion-${letter}`;
}

function letterForDisplay(
  letter: string
): JSX.Element | string {
  if (letter === FILLED_SQUARE) return (
    <div
      className={buildClassString(cssModule, ['filled-square'])}
      data-testid="letter-filled-square"
    ></div>
  );
  return letter;
}
