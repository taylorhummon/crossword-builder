import assert from 'assert';
import {
  buildBoard,
  leftBound, rightBound, topBound, bottomBound,
  horizontalPatternFor, verticalPatternFor,
} from '../../src/lib/board.js';

function buildData(activeSquareIndex) {
  return {
    squareValues: [
      'A', 'C', 'E', '~',
      '~', 'A', '~', 'O',
      null, 'T', 'A', 'G',
    ],
    boardWidth: 4,
    boardHeight: 3,
    activeSquareIndex
  };
}

describe('buildBoard()', () => {
  it('builds a board object from the data', () => {
    const data = buildData(7);
    const board = buildBoard(data);
    assert.deepEqual(
      board.squareValues,
      data.squareValues
    );
    assert.deepEqual(
      board.width,
      4
    );
    assert.deepEqual(
      board.height,
      3
    );
    assert.strictEqual(
      board.activeColumn,
      3
    );
    assert.strictEqual(
      board.activeRow,
      1
    );
    assert.strictEqual(
      board.squareValueAt(0, 0),
      'A'
    );
    assert.strictEqual(
      board.squareValueAt(0, 2),
      null
    );
    assert.strictEqual(
      board.squareValueAt(3, 1),
      'O'
    );
  });
});
describe('leftBound()', () => {
  it('travels left from the active square as far as possible without hitting a ~', () => {
    assert.strictEqual(
      leftBound(buildBoard(buildData(7))),
      3
    );
    assert.strictEqual(
      leftBound(buildBoard(buildData(6))),
      1
    );
    assert.strictEqual(
      leftBound(buildBoard(buildData(2))),
      0
    );
    assert.strictEqual(
      leftBound(buildBoard(buildData(8))),
      0
    );
  });
});
describe('rightBound()', () => {
  it('travels left from the active square as far as possible without hitting a ~', () => {
    assert.strictEqual(
      rightBound(buildBoard(buildData(0))),
      2
    );
    assert.strictEqual(
      rightBound(buildBoard(buildData(4))),
      1
    );
    assert.strictEqual(
      rightBound(buildBoard(buildData(8))),
      3
    );
  });
});
describe('topBound()', () => {
  it('travels up from the active square as far as possible without hitting a ~', () => {
    assert.strictEqual(
      topBound(buildBoard(buildData(0))),
      0
    );
    assert.strictEqual(
      topBound(buildBoard(buildData(8))),
      2
    );
    assert.strictEqual(
      topBound(buildBoard(buildData(11))),
      1
    );
  });
});
describe('bottomBound()', () => {
  it('travels down from the active square as far as possible without hitting a ~', () => {
    assert.strictEqual(
      bottomBound(buildBoard(buildData(0))),
      0
    );
    assert.strictEqual(
      bottomBound(buildBoard(buildData(1))),
      2
    );
    assert.strictEqual(
      bottomBound(buildBoard(buildData(3))),
      2
    );
  });
});
describe('horizontalPatternFor()', () => {
  it('computes pattern strings from the board', () => {
    assert.strictEqual(
      horizontalPatternFor(buildBoard(buildData(0)), 0, 2),
      '@CE'
    );
    assert.strictEqual(
      horizontalPatternFor(buildBoard(buildData(0)), 0, 1),
      '@C'
    );
    assert.strictEqual(
      horizontalPatternFor(buildBoard(buildData(0)), 0, 0),
      '@'
    );
    assert.strictEqual(
      horizontalPatternFor(buildBoard(buildData(1)), 0, 2),
      'A@E'
    );
    assert.strictEqual(
      horizontalPatternFor(buildBoard(buildData(8)), 0, 3),
      '@TAG'
    );
    assert.strictEqual(
      horizontalPatternFor(buildBoard(buildData(9)), 0, 3),
      '.@AG'
    );
  });
});
describe('verticalPatternFor()', () => {
  it('computes pattern strings from the board', () => {
    assert.strictEqual(
      verticalPatternFor(buildBoard(buildData(1)), 0, 2),
      '@AT'
    );
    assert.strictEqual(
      verticalPatternFor(buildBoard(buildData(5)), 0, 2),
      'C@T'
    );
    assert.strictEqual(
      verticalPatternFor(buildBoard(buildData(4)), 0, 2),
      'A@.'
    );
    assert.strictEqual(
      verticalPatternFor(buildBoard(buildData(8)), 2, 2),
      '@'
    );
  });
});
