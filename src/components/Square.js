import React from 'react';
import './Square.css';
import { filledSquare } from '../utilities/alphabet';

class Square extends React.Component {
  render() {
    const displayedValue = isFilled(this.props) ? null : this.props.value;
    return (
      <div
        className={className(this.props)}
        tabIndex="0"
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onClick={this.props.onClick}
      >
        {displayedValue}
      </div>
    );
  }
}

function className(props) {
  const cssClasses = ['square'];
  if (isFilled(props)) cssClasses.push('is-filled');
  return cssClasses.join(' ');
}

function isFilled(props) {
  return props.value === filledSquare;
}

export default Square;
