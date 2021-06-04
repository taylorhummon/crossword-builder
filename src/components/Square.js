import React from 'react';
import { filledSquareCharacter } from '../utilities/alphabet';
import './Square.css';

class Square extends React.Component {
  render() {
    const displayedValue = isFilled(this.props) ? null : this.props.value;
    return (
      <div
        className={className(this.props)}
        onClick={this.props.handleSquareClick}
      >
        {displayedValue}
      </div>
    );
  }
}

function className(props) {
  const cssClasses = ['square'];
  if (isFilled(props))  cssClasses.push('is-filled');
  if (props.isActive)   cssClasses.push('is-active');
  return cssClasses.join(' ');
}

function isFilled(props) {
  return props.value === filledSquareCharacter;
}

export default Square;
