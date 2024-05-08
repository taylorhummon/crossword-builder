import React from 'react';
import { filledSquareCharacter } from '../utilities/alphabet';
import './Square.css';

class Square extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.value !== nextProps.value) return true;
    if (this.props.isActive !== nextProps.isActive) return true;
    return false;
  }

  render() {
    return (
      <div
        className={this._className(this.props)}
        onClick={this.props.handleSquareClick}
        data-testid={this.props.dataTestid}
      >
        {this._displayedValue()}
      </div>
    );
  }

  _displayedValue() {
    if (this._isFilled()) return null;
    return this.props.value;
  }

  _className() {
    const cssClasses = ['square'];
    if (this._isFilled())     cssClasses.push('is-filled');
    if (this.props.isActive)  cssClasses.push('is-active');
    return cssClasses.join(' ');
  }

  _isFilled() {
    return this.props.value === filledSquareCharacter;
  }
}

export default Square;
