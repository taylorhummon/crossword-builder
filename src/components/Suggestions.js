import React from 'react';
import './Suggestions.css';

class Suggestions extends React.Component {
  render() {
    return (
      <div className="suggestions">
        Allow fill as a suggestion:
        <input
          name="allowFillSuggestions"
          type="checkbox"
          checked={this.props.allowFillSuggestions}
          onChange={this.props.handleAllowFillInputChange}
        />
        <br />
        Suggestions: {this.props.suggestedLetters.join(', ')}
      </div>
    );
  }
}

export default Suggestions;
