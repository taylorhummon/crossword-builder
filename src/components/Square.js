import React from 'react';
import './Square.css';

class Square extends React.Component {
  render() {
    const cssClasses = ['square'];
    if (this.props.isActive) cssClasses.push('is-active');
    const className = cssClasses.join(' ');
    return(
      <button
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
