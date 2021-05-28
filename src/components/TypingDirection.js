import React from 'react';
import './TypingDirection.css';

class TypingDirection extends React.Component {
  render() {
    return (
      <div className="typing-direction">
        Typing direction:
        <button
          onClick={this.props.handleTypingDirectionToggle}
        >
          {this.props.isTypingVertical ? '↓' : '→'}
        </button>
      </div>
    );
  }
}

export default TypingDirection;
