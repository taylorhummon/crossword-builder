import React from 'react';
import './Help.css';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: false,
    };
  }

  render() {
    return (
      <div className="help accordion">
        <input
          type="checkbox"
          id="help-accordion"
          name="accordion-checkbox"
          checked={this.state.isAccordionOpen}
          onChange={this.handleToggleChecked}
          hidden
        />
        <label
          className="accordion-header"
          htmlFor="help-accordion"
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
        >
          <i className="icon icon-arrow-right mr-1" />
          Need help?
        </label>
        <div className="accordion-body">
          <p>
            Want to write a crossword puzzle? Click on the board and start typing!
            Press the space bar to fill in a square with black.
          </p>
          <p>
            The suggested letters section provides hints at possible completions based on
            common crossword puzzle answers. Once you're about done adding filled squares,
            you can turn off "Can suggest filled square" to get better quality suggestions.
            But also, feel free to ignore the suggestions: it's your puzzle after all!
          </p>
        </div>
      </div>
    );
  }

  handleToggleChecked = () => {
    this.setState((prevState) => {
      return { isAccordionOpen: ! prevState.isAccordionOpen };
    });
  }

  handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      this.handleToggleChecked();
      return;
    }
  }
}

export default Help;
