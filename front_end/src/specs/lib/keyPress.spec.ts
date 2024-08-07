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
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'ArrowDown' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeIndex
    ).toEqual(
      4
    );
  });
  it('handles uppercase letter keys', () => {
    const state = {
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Q' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squares
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
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'b' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event)
    expect(
      nextState.activeIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squares
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
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Enter' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squares
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
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: ' ' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeIndex
    ).toEqual(
      2
    );
    expect(
      nextState.squares
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
      squares: [
        'A', '□', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ],
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Backspace' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.activeIndex
    ).toEqual(
      0
    );
    expect(
      nextState.squares
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
      squares: [
        'A', 'B', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ],
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Backspace' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.squares
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
      squares: [
        'A', 'B', '□',
        '□', '□', '□',
        '□', '□', '□',
        '□', '□', '□'
      ],
      activeIndex: 1,
      isTypingVertical: false
    } as State;
    const event = { key: 'Delete' } as React.KeyboardEvent;
    const nextState = nextStateDueToKeyPress(state, event);
    expect(
      nextState.squares
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
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
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
      squares: Array(boardWidth * boardHeight).fill('□'),
      activeIndex: 1,
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
