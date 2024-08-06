import { FILLED_SQUARE_CHARACTER } from '../lib/constants';
import { buildUppercaseAlphabet } from '../utilities/alphabet';
import { buildClassString } from '../utilities/css';

import cssModule from './Suggestions.module.scss';


interface SuggestionsProps {
  suggestions: Array<string>;
  canSuggestFill: boolean;
}

export default function Suggestions({
  suggestions,
  canSuggestFill
}: SuggestionsProps): JSX.Element {
  return (
    <div className={buildClassString(cssModule, ['suggestions'])}>
      <h4>Suggested letters</h4>
      {renderLetters(suggestions, canSuggestFill)}
    </div>
  );
}

function renderLetters(
  suggestions: Array<string>,
  canSuggestFill: boolean
): Array<JSX.Element> {
  const letters = buildUppercaseAlphabet();
  if (canSuggestFill) letters.push(FILLED_SQUARE_CHARACTER);
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
  if (letter === FILLED_SQUARE_CHARACTER) return 'suggestion-filled-square';
  return `suggestion-${letter}`;
}

function letterForDisplay(
  letter: string
): JSX.Element | string {
  if (letter === FILLED_SQUARE_CHARACTER) {
    return (
      <div
        className={buildClassString(cssModule, ['filled-square'])}
        data-testid="letter-filled-square"
      ></div>
    )
  }
  return letter;
}
