import React from 'react';
import './Suggestions.css';

class Suggestions extends React.Component {
  render() {
    return (
      <div className="suggestions">
        Can suggest fill:
        <input
          name="canSuggestFill"
          type="checkbox"
          checked={this.props.canSuggestFill}
          onChange={this.props.handleCanSuggestFillChange}
        />
        <br />
        Suggestions: {suggestionString(this.props.suggestedLetters)}
      </div>
    );
  }
}

function suggestionString(letters) {
  if (! letters) return '';
  return letters.join(', ');
}

export default Suggestions;
