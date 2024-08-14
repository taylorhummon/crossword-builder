import { useState } from 'react';

import { buildClassString } from 'src/utilities/css';

import cssModule from './Help.module.css';


export default function Help(): JSX.Element {
  const [isAccordionOpen, setIsAccoordionOpen] = useState(false);
  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleChecked();
      return;
    }
  }
  function handleToggleChecked (): void {
    setIsAccoordionOpen(prevIsAccordionOpen => ! prevIsAccordionOpen);
  }
  return (
    <div className={buildClassString(cssModule, ['help'], ['accordion'])}>
      <input
        type="checkbox"
        id="help-accordion"
        name="accordion-checkbox"
        checked={isAccordionOpen}
        onChange={handleToggleChecked}
        hidden
      />
      <label
        className={buildClassString(cssModule, ['help-header'], ['accordion-header'])}
        htmlFor="help-accordion"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <i className={buildClassString(cssModule, [], ['icon', 'icon-arrow-right', 'mr-1'])} />
        Need help?
      </label>
      <div
        className={buildClassString(cssModule, ['help-body'], ['accordion-body'])}
        style={{ display: isAccordionOpen ? undefined : 'none' }}
      >
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
