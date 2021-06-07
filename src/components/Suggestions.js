import React from 'react';
import './Suggestions.css';
import filledSquareImage from './filledSquare.svg';

class Suggestions extends React.Component {
  render() {
    return (
      <div className="suggestions form-group">
        <label className="form-switch">
          <input
            name="canSuggestFill"
            type="checkbox"
            checked={this.props.canSuggestFill}
            onChange={this.props.handleCanSuggestFillToggle}
          />
          <i className="form-icon" /> Can suggest filled square
        </label>
        <br />
        Suggestions:
        <img src={filledSquareImage} className="filled-square" alt="filled square" />
        {suggestionString(this.props.suggestions)}
      </div>
    );
  }
}

function suggestionString(letters) {
  if (! letters) return '';
  return letters.join(', ');
}

export default Suggestions;
