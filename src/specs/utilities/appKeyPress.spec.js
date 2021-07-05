import { updateStateDueToKeyPress } from '../../utilities/appKeyPress';
import { boardWidth, boardHeight } from '../../utilities/boardSize';
import { arrayOfSize } from '../../utilities/arrays';
import { filledSquareCharacter } from '../../utilities/alphabet';

jest.mock('../../utilities/boardSize', () => {
  // using a non-square board for testing
  return {
    boardWidth: 3,
    boardHeight: 4
  };
});

describe('updateStateDueToKeyPress()', () => {
  it('handles arrow keys', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'ArrowDown' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      { activeSquareIndex: 4 }
    );
  });
  it('handles uppercase letter keys', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Q' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        activeSquareIndex: 2,
        squareValues: [
          null, 'Q', null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('handles lowercase letter keys', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'b' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        activeSquareIndex: 2,
        squareValues: [
          null, 'B', null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('handles the enter key', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Enter' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        activeSquareIndex: 2,
        squareValues: [
          null, filledSquareCharacter, null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('handles the space key', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: ' ' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        activeSquareIndex: 2,
        squareValues: [
          null, filledSquareCharacter, null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('handles the backspace key when the active square is unoccupied', () => {
    const prevState = {
      squareValues: [
        'A', null, null,
        null, null, null,
        null, null, null,
        null, null, null
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Backspace' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        activeSquareIndex: 0,
        squareValues: [
          null, null, null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('handles the backspace key when the active square is occupied', () => {
    const prevState = {
      squareValues: [
        'A', 'B', null,
        null, null, null,
        null, null, null,
        null, null, null
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Backspace' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        squareValues: [
          'A', null, null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('handles the delete key', () => {
    const prevState = {
      squareValues: [
        'A', 'B', null,
        null, null, null,
        null, null, null,
        null, null, null
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Delete' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      {
        squareValues: [
          'A', null, null,
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }
    );
  });
  it('ignores unknown keys', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: '.' };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      null
    );
  });
  it('ignores keystrokes that involves a control modifier key', () => {
    const prevState = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = {
      key: 'a',
      ctrlKey: true
    };
    expect(
      updateStateDueToKeyPress(prevState, event)
    ).toEqual(
      null
    );
  });
});