import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

import { State } from 'src/components/app/App';
import { boardWidth, boardHeight } from 'src/environment/board';
import {
  isLetterKey,
  isArrowKey,
  indexDeterminedByArrowKey,
  indexOneBeforeActive,
  indexOneAfterActive
} from 'src/lib/navigation';
import { EMPTY_SQUARE, FILLED_SQUARE } from 'src/utilities/character';


vi.mock('src/environment/board', () => {
  // using a non-square board for testing
  return {
    boardHeight: 5,
    boardWidth: 7,
  };
});


test('isLetterKey() recognizes uppercase letters', () => {
  expect(
    isLetterKey('R')
  ).toEqual(
    true
  );
});

test('isLetterKey() recognizes lowercase letters', () => {
  expect(
    isLetterKey('t')
  ).toEqual(
    true
  );
});

test('isLetterKey() does not recognize empty square', () => {
  expect(
    isLetterKey(EMPTY_SQUARE)
  ).toEqual(
    false
  );
});

test('isLetterKey() does not recognize filled square', () => {
  expect(
    isLetterKey(FILLED_SQUARE)
  ).toEqual(
    false
  );
});

test('isArrowKey() recognizes left arrow', () => {
  expect(
    isArrowKey('ArrowLeft')
  ).toEqual(
    true
  );
});

test('isArrowKey() recognizes right arrow', () => {
  expect(
    isArrowKey('ArrowRight')
  ).toEqual(
    true
  );
});

test('isArrowKey() recognizes up arrow', () => {
  expect(
    isArrowKey('ArrowUp')
  ).toEqual(
    true
  );
});

test('isArrowKey() recognizes down arrow', () => {
  expect(
    isArrowKey('ArrowDown')
  ).toEqual(
    true
  );
});

test('isArrowKey() does not recognize garbage', () => {
  expect(
    isArrowKey('BowAndArrow')
  ).toEqual(
    false
  );
});


describe('indexDeterminedByArrowKey()', () => {
  describe('when not allowing wrap', () => {
    const allowWrap = false;
    describe('when pressing the left arrow key', () => {
      const key = 'ArrowLeft';
      test('moves left if theres room', () => {
        const activeIndex = 2;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          1
        );
      });
      test('does not move left when in first row and first column', () => {
        const activeIndex = 0;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      test('does not move left when in last row and first column', () => {
        const activeIndex = boardWidth * (boardHeight - 1);
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
        );
      });
    });
    describe('when pressing the right arrow key', () => {
      const key = 'ArrowRight';
      test('moves right if theres room', () => {
        const activeIndex = 2;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          3
        );
      });
      test('does not move right when in first row and last column', () => {
        const activeIndex = boardWidth - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth - 1
        );
      });
      test('does not move right when in last row and last column', () => {
        const activeIndex = boardWidth * boardHeight - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
        );
      });
    });
    describe('when pressing the up arrow key', () => {
      const key = 'ArrowUp';
      test('moves up if theres room', () => {
        const activeIndex = boardWidth;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      test('does not move up when in first row and first column', () => {
        const activeIndex = 0;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      test('does not move up when in first row and last column', () => {
        const activeIndex = boardWidth - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth - 1
        );
      });
    });
    describe('when pressing the down arrow key', () => {
      const key = 'ArrowDown';
      test('moves down if theres room', () => {
        const activeIndex = 2;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          2 + boardWidth
        );
      });
      test('does not move down when in last row and first column', () => {
        const activeIndex = boardWidth * (boardHeight - 1);
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
        );
      });
      test('does not move down when in last row and last column', () => {
        const activeIndex = boardWidth * boardHeight - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
        );
      });
    });
  });
  describe('when allowing wrap', () => {
    const allowWrap = true;
    describe('when pressing the left arrow key', () => {
      const key = 'ArrowLeft';
      test('moves left if theres room', () => {
        const activeIndex = 2;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          1
        );
      });
      test('wraps when in first row and first column', () => {
        const activeIndex = 0;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth - 1
        );
      });
      test('wraps when in last row and first column', () => {
        const activeIndex = boardWidth * (boardHeight - 1);
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
        );
      });
    });
    describe('when pressing the right arrow key', () => {
      const key = 'ArrowRight';
      test('moves right if theres room', () => {
        const activeIndex = 2;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          3
        );
      });
      test('wraps when in first row and last column', () => {
        const activeIndex = boardWidth - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      test('wraps when in last row and last column', () => {
        const activeIndex = boardWidth * boardHeight - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
        );
      });
    });
    describe('when pressing the up arrow key', () => {
      const key = 'ArrowUp';
      test('moves up if theres room', () => {
        const activeIndex = boardWidth;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      test('wraps when in first row and first column', () => {
        const activeIndex = 0;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
        );
      });
      test('wraps when in first row and last column', () => {
        const activeIndex = boardWidth - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
        );
      });
    });
    describe('when pressing the down arrow key', () => {
      const key = 'ArrowDown';
      test('moves down if theres room', () => {
        const activeIndex = 2;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          2 + boardWidth
        );
      });
      test('wraps when in last row and first column', () => {
        const activeIndex = boardWidth * (boardHeight - 1);
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      test('wraps when in last row and last column', () => {
        const activeIndex = boardWidth * boardHeight - 1;
        const state = { activeIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth - 1
        );
      });
    });
  });
});

describe('indexOneBeforeActive()', () => {
  describe('when not allowing wrap', () => {
    const allowWrap = false;
    describe('when typing horizontally', () => {
      const isTypingVertical = false;
      test('moves one left when theres room', () => {
        const activeIndex = 3;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
      test('does not move when theres no room', () => {
        const activeIndex = 2 * boardWidth;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2 * boardWidth
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      test('moves one up when theres room', () => {
        const activeIndex = boardWidth * 2 + 3;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          boardWidth + 3
        );
      });
      test('does not move when theres no room', () => {
        const activeIndex = 2;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
    });
  });
  describe('when allowing wrap', () => {
    const allowWrap = true;
    describe('when typing horizontally', () => {
      const isTypingVertical = false;
      test('moves one left when theres room', () => {
        const activeIndex = 3;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
      test('wraps when theres no room', () => {
        const activeIndex = 2 * boardWidth;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          3 * boardWidth - 1
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      test('moves one up when theres room', () => {
        const activeIndex = boardWidth * 2 + 3;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          boardWidth + 3
        );
      });
      test('wraps when theres no room', () => {
        const activeIndex = 2;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2 + boardWidth * (boardHeight - 1)
        );
      });
    });
  });
});

describe('indexOneAfterActive()', () => {
  describe('when not allowing wrap', () => {
    const allowWrap = false;
    describe('when typing horizontally', () => {
      const isTypingVertical = false;
      test('moves one right when theres room', () => {
        const activeIndex = 3;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          4
        );
      });
      test('does not move when theres no room', () => {
        const activeIndex = boardWidth - 1;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth - 1
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      test('moves one down when theres room', () => {
        const activeIndex = 1;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth + 1
        );
      });
      test('does not move when theres no room', () => {
        const activeIndex = boardWidth * (boardHeight - 1) + 2;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth * (boardHeight - 1) + 2
        );
      });
    });
  });
  describe('when allowing wrap', () => {
    const allowWrap = true;
    describe('when typing horizontally', () => {
      const isTypingVertical = false;
      test('moves one right when theres room', () => {
        const activeIndex = 3;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          4
        );
      });
      test('wraps when theres no room', () => {
        const activeIndex = 2 * boardWidth - 1;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      test('moves one down when theres room', () => {
        const activeIndex = 1;
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth + 1
        );
      });
      test('wraps when theres no room', () => {
        const activeIndex = 2 + boardWidth * (boardHeight - 1);
        const state = { activeIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
    });
  });
});
