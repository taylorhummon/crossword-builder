import React from 'react';
import { buildUppercaseAlphabet, filledSquareCharacter } from '../utilities/alphabet.js';
import { arrayShallowEquivalent } from '../utilities/arrays';
import './Suggestions.css';

class Suggestions extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.canSuggestFill !== nextProps.canSuggestFill) return true;
    if (! arrayShallowEquivalent(this.props.suggestions, nextProps.suggestions)) return true;
    return false;
  }

  render() {
    return (
      <div className="suggestions">
        <h4>Suggested letters</h4>
        {this.renderLetters()}
      </div>
    );
  }

  renderLetters() {
    const letters = buildUppercaseAlphabet();
    if (this.props.canSuggestFill) letters.push(filledSquareCharacter);
    return letters.map(
      letter => this.renderLetter(letter, this.props.suggestions)
    );
  }

  renderLetter(letter, suggestions) {
    return (
      <div
        className={this._className(letter, suggestions)}
        key={letter}
        data-testid={this._testid(letter)}
      >
        {this._letterForDisplay(letter)}
      </div>
    );
  }

  _className(letter, suggestions) {
    const classNames = ['letter'];
    if (suggestions && suggestions.includes(letter)) classNames.push('suggested');
    return classNames.join(' ');
  }

  _testid(letter) {
    if (letter === filledSquareCharacter) return 'suggestion-filled-square';
    return `suggestion-${letter}`;
  }

  _letterForDisplay(letter) {
    if (letter === filledSquareCharacter) {
      return <div className="filled-square" data-testid="letter-filled-square"></div>
    }
    return letter;
  }
}

export default Suggestions;
