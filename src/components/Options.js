import React from 'react';
import './Options.css';

class Options extends React.Component {
  render() {
    return (
      <div className="options form-group">
        <label className="form-switch">
          <input
            name="typeVertically"
            type="checkbox"
            checked={this.props.isTypingVertical}
            onChange={this.props.handleTypingDirectionToggle}
          />
          <i className="form-icon" /> Type vertically
        </label>
        <label className="form-switch">
          <input
            name="canSuggestFilledSquare"
            type="checkbox"
            checked={this.props.canSuggestFill}
            onChange={this.props.handleCanSuggestFillToggle}
          />
          <i className="form-icon" /> Can suggest filled square
        </label>
      </div>
    );
  }
}

export default Options;
