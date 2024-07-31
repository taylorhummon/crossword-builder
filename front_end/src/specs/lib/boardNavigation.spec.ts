import { State } from '../../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../../lib/constants';
import {
  isArrowKey,
  indexDeterminedByArrowKey,
  indexOneBeforeActive,
  indexOneAfterActive
} from '../../lib/boardNavigation';

jest.mock('../../lib/constants', () => {
  // using a non-square board for testing
  return {
    BOARD_WIDTH: 5,
    BOARD_HEIGHT: 7,
    FILLED_SQUARE_CHARACTER: '~'
  };
});

describe('isArrowKey()', () => {
  it('recognizes left arrow', () => {
    expect(
      isArrowKey('ArrowLeft')
    ).toEqual(
      true
    );
  });
  it('recognizes right arrow', () => {
    expect(
      isArrowKey('ArrowRight')
    ).toEqual(
      true
    );
  });
  it('recognizes up arrow', () => {
    expect(
      isArrowKey('ArrowUp')
    ).toEqual(
      true
    );
  });
  it('recognizes down arrow', () => {
    expect(
      isArrowKey('ArrowDown')
    ).toEqual(
      true
    );
  });
  it('does not recognize garbage', () => {
    expect(
      isArrowKey('BowAndArrow')
    ).toEqual(
      false
    );
  });
});

describe('indexDeterminedByArrowKey()', () => {
  describe('when not allowing wrap', () => {
    const allowWrap = false;
    describe('when pressing the left arrow key', () => {
      const key = 'ArrowLeft';
      it('moves left if theres room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          1
        );
      });
      it('does not move left when in first row and first column', () => {
        const activeSquareIndex = 0;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('does not move left when in last row and first column', () => {
        const activeSquareIndex = BOARD_WIDTH * (BOARD_HEIGHT - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * (BOARD_HEIGHT - 1)
        );
      });
    });
    describe('when pressing the right arrow key', () => {
      const key = 'ArrowRight';
      it('moves right if theres room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          3
        );
      });
      it('does not move right when in first row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH - 1
        );
      });
      it('does not move right when in last row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH * BOARD_HEIGHT - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * BOARD_HEIGHT - 1
        );
      });
    });
    describe('when pressing the up arrow key', () => {
      const key = 'ArrowUp';
      it('moves up if theres room', () => {
        const activeSquareIndex = BOARD_WIDTH;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('does not move up when in first row and first column', () => {
        const activeSquareIndex = 0;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('does not move up when in first row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH - 1
        );
      });
    });
    describe('when pressing the down arrow key', () => {
      const key = 'ArrowDown';
      it('moves down if theres room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          2 + BOARD_WIDTH
        );
      });
      it('does not move down when in last row and first column', () => {
        const activeSquareIndex = BOARD_WIDTH * (BOARD_HEIGHT - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * (BOARD_HEIGHT - 1)
        );
      });
      it('does not move down when in last row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH * BOARD_HEIGHT - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * BOARD_HEIGHT - 1
        );
      });
    });
  });
  describe('when allowing wrap', () => {
    const allowWrap = true;
    describe('when pressing the left arrow key', () => {
      const key = 'ArrowLeft';
      it('moves left if theres room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          1
        );
      });
      it('wraps when in first row and first column', () => {
        const activeSquareIndex = 0;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH - 1
        );
      });
      it('wraps when in last row and first column', () => {
        const activeSquareIndex = BOARD_WIDTH * (BOARD_HEIGHT - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * BOARD_HEIGHT - 1
        );
      });
    });
    describe('when pressing the right arrow key', () => {
      const key = 'ArrowRight';
      it('moves right if theres room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          3
        );
      });
      it('wraps when in first row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('wraps when in last row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH * BOARD_HEIGHT - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * (BOARD_HEIGHT - 1)
        );
      });
    });
    describe('when pressing the up arrow key', () => {
      const key = 'ArrowUp';
      it('moves up if theres room', () => {
        const activeSquareIndex = BOARD_WIDTH;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('wraps when in first row and first column', () => {
        const activeSquareIndex = 0;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * (BOARD_HEIGHT - 1)
        );
      });
      it('wraps when in first row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH * BOARD_HEIGHT - 1
        );
      });
    });
    describe('when pressing the down arrow key', () => {
      const key = 'ArrowDown';
      it('moves down if theres room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          2 + BOARD_WIDTH
        );
      });
      it('wraps when in last row and first column', () => {
        const activeSquareIndex = BOARD_WIDTH * (BOARD_HEIGHT - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('wraps when in last row and last column', () => {
        const activeSquareIndex = BOARD_WIDTH * BOARD_HEIGHT - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          BOARD_WIDTH - 1
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
      it('moves one left when theres room', () => {
        const activeSquareIndex = 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
      it('does not move when theres no room', () => {
        const activeSquareIndex = 2 * BOARD_WIDTH;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2 * BOARD_WIDTH
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      it('moves one up when theres room', () => {
        const activeSquareIndex = BOARD_WIDTH * 2 + 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH + 3
        );
      });
      it('does not move when theres no room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex, isTypingVertical } as State;
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
      it('moves one left when theres room', () => {
        const activeSquareIndex = 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
      it('wraps when theres no room', () => {
        const activeSquareIndex = 2 * BOARD_WIDTH;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          3 * BOARD_WIDTH - 1
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      it('moves one up when theres room', () => {
        const activeSquareIndex = BOARD_WIDTH * 2 + 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH + 3
        );
      });
      it('wraps when theres no room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2 + BOARD_WIDTH * (BOARD_HEIGHT - 1)
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
      it('moves one right when theres room', () => {
        const activeSquareIndex = 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          4
        );
      });
      it('does not move when theres no room', () => {
        const activeSquareIndex = BOARD_WIDTH - 1;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH - 1
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      it('moves one down when theres room', () => {
        const activeSquareIndex = 1;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH + 1
        );
      });
      it('does not move when theres no room', () => {
        const activeSquareIndex = BOARD_WIDTH * (BOARD_HEIGHT - 1) + 2;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH * (BOARD_HEIGHT - 1) + 2
        );
      });
    });
  });
  describe('when allowing wrap', () => {
    const allowWrap = true;
    describe('when typing horizontally', () => {
      const isTypingVertical = false;
      it('moves one right when theres room', () => {
        const activeSquareIndex = 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          4
        );
      });
      it('wraps when theres no room', () => {
        const activeSquareIndex = 2 * BOARD_WIDTH - 1;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      it('moves one down when theres room', () => {
        const activeSquareIndex = 1;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          BOARD_WIDTH + 1
        );
      });
      it('wraps when theres no room', () => {
        const activeSquareIndex = 2 + BOARD_WIDTH * (BOARD_HEIGHT - 1);
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          2
        );
      });
    });
  });
});
