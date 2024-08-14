import { FILLED_SQUARE, LETTERS, SuggestableCharacter } from 'src/utilities/character';
import { buildClassString } from 'src/utilities/css';

import cssModule from './Suggestions.module.css';


interface SuggestionsProps {
  suggestions: Array<SuggestableCharacter>;
  canSuggestFilled: boolean;
}

export default function Suggestions({
  suggestions,
  canSuggestFilled
}: SuggestionsProps): JSX.Element {
  return (
    <div className={buildClassString(cssModule, ['suggestions'])}>
      <h4>Suggested letters</h4>
      {renderCharacters(suggestions, canSuggestFilled)}
    </div>
  );
}

function renderCharacters(
  suggestions: Array<SuggestableCharacter>,
  canSuggestFilled: boolean
): Array<JSX.Element> {
  const characters = LETTERS.slice() as Array<SuggestableCharacter>;
  if (canSuggestFilled) characters.push(FILLED_SQUARE);
  return characters.map(
    character => renderCharacter(suggestions, character)
  );
}

function renderCharacter(
  suggestions: Array<SuggestableCharacter>,
  character: SuggestableCharacter
): JSX.Element {
  return (
    <div
      className={className(suggestions, character)}
      key={character}
      data-testid={`suggestion-${character}`}
    >
      {display(character)}
    </div>
  );
}

function className(
  suggestions: Array<SuggestableCharacter>,
  character: SuggestableCharacter
): string {
  const classNames = ['character'];
  if (suggestions.includes(character)) {
    classNames.push('suggested');
  }
  return buildClassString(cssModule, classNames);
}

function display(
  character: SuggestableCharacter
): JSX.Element | string {
  if (character === FILLED_SQUARE) return (
    <div
      className={buildClassString(cssModule, ['filled-square'])}
      data-testid="character-■"
    ></div>
  );
  return character;
}
