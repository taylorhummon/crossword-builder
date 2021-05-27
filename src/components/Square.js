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
      >
        {displayedValue}
      </div>
    );
  }
}

function className(props) {
  const cssClasses = ['square', `square-${props.index}`];
  if (isFilled(props))  cssClasses.push('is-filled');
  if (props.isActive)   cssClasses.push('is-active');
  return cssClasses.join(' ');
}

function isFilled(props) {
  return props.value === filledSquare;
}

export default Square;
