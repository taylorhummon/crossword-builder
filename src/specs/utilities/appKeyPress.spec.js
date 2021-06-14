import { updateStateDueToKeyPress } from '../../utilities/appKeyPress';

describe('updateStateDueToKeyPress', () => {
  it('handles arrow keys', () => {
    const prevState = {
      squareValues: [
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'ArrowLeft' };
    expect(
      updateStateDueToKeyPress(prevState, event).activeSquareIndex
    ).toEqual(
      0
    );
  });
});