import { buildClassString } from 'utilities/css';

import cssModule from './Options.module.scss';


interface OptionsProps {
  isTypingVertical: boolean;
  handleTypingDirectionToggle: (event: React.ChangeEvent) => void;
  canSuggestFilled: boolean;
  handleCanSuggestFillToggle: (event: React.ChangeEvent) => void;
}

export default function Options({
  isTypingVertical,
  handleTypingDirectionToggle,
  canSuggestFilled,
  handleCanSuggestFillToggle
}: OptionsProps): JSX.Element {
  return (
    <div className={buildClassString(cssModule, ['options'], ['form-group'])}>
      <label className={buildClassString(cssModule, [], ['form-switch'])}>
        <input
          name="typeVertically"
          type="checkbox"
          checked={isTypingVertical}
          onChange={handleTypingDirectionToggle}
        />
        <i className={buildClassString(cssModule, [], ['form-icon'])} /> Type vertically
      </label>
      <label className={buildClassString(cssModule, [], ['form-switch'])}>
        <input
          name="canSuggestFillededSquare"
          type="checkbox"
          checked={canSuggestFilled}
          onChange={handleCanSuggestFillToggle}
        />
        <i className={buildClassString(cssModule, [], ['form-icon'])} /> Can suggest filled square
      </label>
    </div>
  );
}
