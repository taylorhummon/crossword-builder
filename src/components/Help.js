import React from 'react';
import './Help.css';

class Help extends React.Component {
  render() {
    return (
      <div className="help accordion">
        <input
          type="checkbox"
          id="help-accordion"
          name="accordion-checkbox"
          hidden
        />
        <label
          className="accordion-header"
          htmlFor="help-accordion"
        >
          <i className="icon icon-arrow-right mr-1"></i>
          Need help?
        </label>
        <div className="accordion-body">
          Here are some instructions for using the app...
        </div>
      </div>
    );
  }
}

export default Help;
