import { test, expect } from 'vitest';
import { vi } from 'vitest';
import type { KeyboardEvent } from 'react';

import type { State } from 'src/components/app/App';
import { boardWidth, boardHeight } from 'src/environment/board';
import { nextStateDueToKeyPress } from 'src/lib/keyPress';


vi.mock('src/environment/board', () => {
  // using a non-square board for testing
  return {
    boardWidth: 3,
    boardHeight: 4,
  };
});


test('nextStateDueToKeyPress() handles arrow keys', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = { key: 'ArrowDown' } as KeyboardEvent;
  const nextState = nextStateDueToKeyPress(state, event);
  expect(
    nextState.activeIndex
  ).toEqual(
    4
  );
});

test('nextStateDueToKeyPress() handles uppercase letter keys', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = { key: 'Q' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() handles lowercase letter keys', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = { key: 'b' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() handles the enter key', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = { key: 'Enter' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() handles the space key', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = { key: ' ' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() handles the backspace key when the active square is unoccupied', () => {
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
  const event = { key: 'Backspace' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() handles the backspace key when the active square is occupied', () => {
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
  const event = { key: 'Backspace' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() handles the delete key', () => {
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
  const event = { key: 'Delete' } as KeyboardEvent;
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

test('nextStateDueToKeyPress() ignores unknown keys', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = { key: '.' } as KeyboardEvent;
  const nextState = nextStateDueToKeyPress(state, event);
  expect(
    nextState
  ).toEqual(
    state
  );
});

test('nextStateDueToKeyPress() ignores keystrokes that involves a control modifier key', () => {
  const state = {
    squares: Array(boardWidth * boardHeight).fill('□'),
    activeIndex: 1,
    isTypingVertical: false
  } as State;
  const event = {
    key: 'a',
    ctrlKey: true
  } as KeyboardEvent;
  const nextState = nextStateDueToKeyPress(state, event);
  expect(
    nextState
  ).toEqual(
    state
  );
});
