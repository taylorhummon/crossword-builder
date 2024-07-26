import './Options.css';

export default function Options({
  isTypingVertical,
  handleTypingDirectionToggle,
  canSuggestFill,
  handleCanSuggestFillToggle
}) {
  return (
    <div className="options form-group">
      <label className="form-switch">
        <input
          name="typeVertically"
          type="checkbox"
          checked={isTypingVertical}
          onChange={handleTypingDirectionToggle}
        />
        <i className="form-icon" /> Type vertically
      </label>
      <label className="form-switch">
        <input
          name="canSuggestFilledSquare"
          type="checkbox"
          checked={canSuggestFill}
          onChange={handleCanSuggestFillToggle}
        />
        <i className="form-icon" /> Can suggest filled square
      </label>
    </div>
  );
}
