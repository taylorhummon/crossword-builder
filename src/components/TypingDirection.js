import React from 'react';
import './TypingDirection.css';

class TypingDirection extends React.Component {
  render() {
    return (
      <div className="typing-direction form-group">
        <label className="form-switch">
          <input
            name="isTypingVertical"
            type="checkbox"
            checked={this.props.isTypingVertical}
            onChange={this.props.handleTypingDirectionToggle}
          />
          <i className="form-icon" /> Type vertically
        </label>
      </div>
    );
  }
}

export default TypingDirection;
