import React from 'react';
import './Square.css';

class Square extends React.Component {
  render() {
    const cssClasses = ['square'];
    if (this.props.isActive) cssClasses.push('is-active');
    const className = cssClasses.join(' ');
    return(
      <div
        className={className}
        tabIndex="0"
        onClick={this.props.onClick}
      >
        {this.props.value}
      </div>
    );
  }
}

export default Square;
