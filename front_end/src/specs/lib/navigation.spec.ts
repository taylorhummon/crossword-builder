import { State } from 'declarations';
import { boardWidth, boardHeight } from 'environment/board';
import {
  isArrowKey,
  indexDeterminedByArrowKey,
  indexOneBeforeActive,
  indexOneAfterActive
} from 'lib/navigation';


jest.mock('environment/board', () => {
  // using a non-square board for testing
  return {
    boardHeight: 5,
    boardWidth: 7,
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
        const activeSquareIndex = boardWidth * (boardHeight - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
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
        const activeSquareIndex = boardWidth - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth - 1
        );
      });
      it('does not move right when in last row and last column', () => {
        const activeSquareIndex = boardWidth * boardHeight - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
        );
      });
    });
    describe('when pressing the up arrow key', () => {
      const key = 'ArrowUp';
      it('moves up if theres room', () => {
        const activeSquareIndex = boardWidth;
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
        const activeSquareIndex = boardWidth - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth - 1
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
          2 + boardWidth
        );
      });
      it('does not move down when in last row and first column', () => {
        const activeSquareIndex = boardWidth * (boardHeight - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
        );
      });
      it('does not move down when in last row and last column', () => {
        const activeSquareIndex = boardWidth * boardHeight - 1;
        const state = { activeSquareIndex } as State;
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
          boardWidth - 1
        );
      });
      it('wraps when in last row and first column', () => {
        const activeSquareIndex = boardWidth * (boardHeight - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
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
        const activeSquareIndex = boardWidth - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('wraps when in last row and last column', () => {
        const activeSquareIndex = boardWidth * boardHeight - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * (boardHeight - 1)
        );
      });
    });
    describe('when pressing the up arrow key', () => {
      const key = 'ArrowUp';
      it('moves up if theres room', () => {
        const activeSquareIndex = boardWidth;
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
          boardWidth * (boardHeight - 1)
        );
      });
      it('wraps when in first row and last column', () => {
        const activeSquareIndex = boardWidth - 1;
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          boardWidth * boardHeight - 1
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
          2 + boardWidth
        );
      });
      it('wraps when in last row and first column', () => {
        const activeSquareIndex = boardWidth * (boardHeight - 1);
        const state = { activeSquareIndex } as State;
        expect(
          indexDeterminedByArrowKey(state, allowWrap, key)
        ).toEqual(
          0
        );
      });
      it('wraps when in last row and last column', () => {
        const activeSquareIndex = boardWidth * boardHeight - 1;
        const state = { activeSquareIndex } as State;
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
        const activeSquareIndex = 2 * boardWidth;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          2 * boardWidth
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      it('moves one up when theres room', () => {
        const activeSquareIndex = boardWidth * 2 + 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          boardWidth + 3
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
        const activeSquareIndex = 2 * boardWidth;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          3 * boardWidth - 1
        );
      });
    });
    describe('when typing vertically', () => {
      const isTypingVertical = true;
      it('moves one up when theres room', () => {
        const activeSquareIndex = boardWidth * 2 + 3;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneBeforeActive(state, allowWrap)
        ).toEqual(
          boardWidth + 3
        );
      });
      it('wraps when theres no room', () => {
        const activeSquareIndex = 2;
        const state = { activeSquareIndex, isTypingVertical } as State;
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
        const activeSquareIndex = boardWidth - 1;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth - 1
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
          boardWidth + 1
        );
      });
      it('does not move when theres no room', () => {
        const activeSquareIndex = boardWidth * (boardHeight - 1) + 2;
        const state = { activeSquareIndex, isTypingVertical } as State;
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
        const activeSquareIndex = 2 * boardWidth - 1;
        const state = { activeSquareIndex, isTypingVertical } as State;
        expect(
          indexOneAfterActive(state, allowWrap)
        ).toEqual(
          boardWidth
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
          boardWidth + 1
        );
      });
      it('wraps when theres no room', () => {
        const activeSquareIndex = 2 + boardWidth * (boardHeight - 1);
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
