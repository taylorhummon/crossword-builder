import React from 'react';
import './Suggestions.css';
import filledSquareImage from '../images/filledSquare.svg';

class Suggestions extends React.Component {
  render() {
    return (
      <div className="suggestions">
        <h4>Suggestions</h4>
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
