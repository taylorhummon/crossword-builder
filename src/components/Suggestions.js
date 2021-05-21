import React from 'react';
import './Suggestions.css';

class Suggestions extends React.Component {
  render() {
    return (
      <div className="suggestions">
        Suggestions: {this.props.suggestedLetters.join(', ')}
      </div>
    );
  }
}

export default Suggestions;
