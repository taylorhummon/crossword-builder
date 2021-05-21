import React from 'react';
import './Square.css';
import { filledSquare } from '../utilities/alphabet';

class Square extends React.Component {
  render() {
    const displayedValue = isBlack(this.props) ? null : this.props.value;
    return (
      <div
        className={className(this.props)}
        tabIndex="0"
        onClick={this.props.onClick}
      >
        {displayedValue}
      </div>
    );
  }
}

function className(props) {
  const cssClasses = ['square'];
  if (props.isActive) {
    cssClasses.push('is-blue')
  } else if (isBlack(props)) {
    cssClasses.push('is-black');
  }
  return cssClasses.join(' ');
}

function isBlack(props) { // !!! rename
  return props.value === filledSquare;
}

export default Square;
