import { nextStateDueToKeyPress } from '../../utilities/appKeyPress';
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

describe('nextStateDueToKeyPress()', () => {
  it('handles arrow keys', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'ArrowDown' };
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      4
    );
  });
  it('handles uppercase letter keys', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Q' };
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squareValues
    ).toEqual(
      [
        null, 'Q', null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('handles lowercase letter keys', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'b' };
    const nextState = nextStateDueToKeyPress(state, event)
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squareValues
    ).toEqual(
      [
        null, 'B', null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('handles the enter key', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: 'Enter' };
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squareValues
    ).toEqual(
      [
        null, filledSquareCharacter, null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('handles the space key', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: ' ' };
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squareValues
    ).toEqual(
      [
        null, filledSquareCharacter, null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('handles the backspace key when the active square is unoccupied', () => {
    const state = {
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
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      0
    );
    expect(
      nextState.squareValues
    ).toEqual(
      [
        null, null, null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('handles the backspace key when the active square is occupied', () => {
    const state = {
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
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.squareValues
    ).toEqual(
      [
        'A', null, null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('handles the delete key', () => {
    const state = {
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
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.squareValues
    ).toEqual(
      [
        'A', null, null,
        null, null, null,
        null, null, null,
        null, null, null
      ]
    );
  });
  it('ignores unknown keys', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = { key: '.' };
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState
    ).toEqual(
      state
    );
  });
  it('ignores keystrokes that involves a control modifier key', () => {
    const state = {
      squareValues: arrayOfSize(boardHeight * boardWidth),
      activeSquareIndex: 1,
      isTypingVertical: false
    };
    const event = {
      key: 'a',
      ctrlKey: true
    };
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState
    ).toEqual(
      state
    );
  });
});
