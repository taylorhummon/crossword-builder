import React from 'react';
import './Suggestions.css';

class Suggestions extends React.Component {
  render() {
    return (
      <div className="suggestions">
        Suggestions: {this.props.suggestions}
      </div>
    );
  }
}

export default Suggestions;
