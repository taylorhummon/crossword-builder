import React from 'react';
import { buildUppercaseAlphabet, filledSquareCharacter } from '../utilities/alphabet.js';
import filledSquareImage from '../images/filledSquare.svg';
import './Suggestions.css';

class Suggestions extends React.Component {
  render() {
    const suggestions = this.props.suggestions;
    const letters = getLetters(this.props.canSuggestFill);
    return (
      <div className="suggestions">
        <h4>Suggested letters</h4>
        {letters.map(letter => this.renderLetter(letter, suggestions))}
      </div>
    );
  }

  renderLetter(letter, suggestions) {
    return (
      <div
        className={className(letter, suggestions)}
        key={letter}
      >
        {letterForDisplay(letter)}
      </div>
    );
  }
}

function getLetters(canSuggestFill) {
  const letters = buildUppercaseAlphabet();
  if (canSuggestFill) letters.push(filledSquareCharacter);
  return letters;
}

function className(letter, suggestions) {
  const classNames = ['letter'];
  if (suggestions && suggestions.includes(letter)) classNames.push('suggested');
  return classNames.join(' ');
}

function letterForDisplay(letter) {
  if (letter === filledSquareCharacter) {
    return <img src={filledSquareImage} className="filled-square" alt="filled square" />
  }
  return letter;
}

export default Suggestions;
