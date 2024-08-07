import { State } from 'components/app/App';
import { boardWidth, boardHeight } from 'environment/board';
import { nextStateDueToKeyPress } from 'lib/keyPress';


jest.mock('environment/board', () => {
  // using a non-square board for testing
  return {
    boardWidth: 3,
    boardHeight: 4,
  };
});

describe('nextStateDueToKeyPress()', () => {
  it('handles arrow keys', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'ArrowDown' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeSquareIndex
    ).toEqual(
      4
    );
  });
  it('handles uppercase letter keys', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Q' } as React.KeyboardEvent;
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
        '□', 'Q', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('handles lowercase letter keys', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'b' } as React.KeyboardEvent;
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
        '□', 'B', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('handles the enter key', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Enter' } as React.KeyboardEvent;
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
        '□', '■', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('handles the space key', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: ' ' } as React.KeyboardEvent;
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
        '□', '■', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('handles the backspace key when the active square is unoccupied', () => {
    const state = {
      squareValues: [
        'A', '□', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Backspace' } as React.KeyboardEvent;
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
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('handles the backspace key when the active square is occupied', () => {
    const state = {
      squareValues: [
        'A', 'B', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Backspace' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.squareValues
    ).toEqual(
      [
        'A', '□', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('handles the delete key', () => {
    const state = {
      squareValues: [
        'A', 'B', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ],
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Delete' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.squareValues
    ).toEqual(
      [
        'A', '□', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ]
    );
  });
  it('ignores unknown keys', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: '.' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState
    ).toEqual(
      state
    );
  });
  it('ignores keystrokes that involves a control modifier key', () => {
    const state = {
      squareValues: Array(boardWidth * boardHeight).fill('□'),
      activeSquareIndex: 1,
      isTypingVertical: false
    } as State;
    const event = {
      key: 'a',
      ctrlKey: true
    } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState
    ).toEqual(
      state
    );
  });
});
