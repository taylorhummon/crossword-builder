import { buildUppercaseAlphabet, filledSquareCharacter } from '../utilities/alphabet.js';
import './Suggestions.css';

export default function Suggestions({
  suggestions,
  canSuggestFill
}) {
  return (
    <div className="suggestions">
      <h4>Suggested letters</h4>
      {renderLetters(suggestions, canSuggestFill)}
    </div>
  );
}

function renderLetters(suggestions, canSuggestFill) {
  const letters = buildUppercaseAlphabet();
  if (canSuggestFill) letters.push(filledSquareCharacter);
  return letters.map(
    letter => renderLetter(suggestions, letter)
  );
}

function renderLetter(suggestions, letter) {
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

function className(suggestions, letter) {
  const classNames = ['letter'];
  if (suggestions && suggestions.includes(letter)) classNames.push('suggested');
  return classNames.join(' ');
}

function testid(letter) {
  if (letter === filledSquareCharacter) return 'suggestion-filled-square';
  return `suggestion-${letter}`;
}

function letterForDisplay(letter) {
  if (letter === filledSquareCharacter) {
    return <div className="filled-square" data-testid="letter-filled-square"></div>
  }
  return letter;
}
