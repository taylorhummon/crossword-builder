import assert from 'assert';
import {
  computeSubpatternsTrimLeft, computeSubpatternsTrimRight,
  computeSubpatterns,
} from '../../src/lib/subpatterns.js';

describe('computeSubpatternsTrimLeft()', () => {
  it('computes subpatterns on the left', () => {
    assert.deepEqual(
      computeSubpatternsTrimLeft('a..b.@c.d'),
      ['@c.d', 'b.@c.d', '.b.@c.d', 'a..b.@c.d']
    );
    assert.deepEqual(
      computeSubpatternsTrimLeft('a..b.@'),
      ['@', 'b.@', '.b.@', 'a..b.@']
    );
    assert.deepEqual(
      computeSubpatternsTrimLeft('@'),
      ['@']
    );
    assert.throws(() => {
      computeSubpatternsTrimLeft('a..b.c.d');
    });
  });
});
describe('computeSubpatternsTrimRight()', () => {
  it('computes subpatterns on the right', () => {
    assert.deepEqual(
      computeSubpatternsTrimRight('a..b.@c.d'),
      ['a..b.@c', 'a..b.@c.d']
    );
    assert.deepEqual(
      computeSubpatternsTrimRight('@c.d'),
      ['@c', '@c.d']
    );
    assert.deepEqual(
      computeSubpatternsTrimRight('@'),
      ['@']
    );
    assert.throws(() => {
      computeSubpatternsTrimRight('a..b.c.d');
    });
  });
});
describe('computeSubpatterns()', () => {
  it('computes subpatterns trimming on both sides', () => {
    assert.deepEqual(
      computeSubpatterns('a..b.@c.d').sort(),
      ['@c', '@c.d', 'b.@c', '.b.@c', 'b.@c.d', '.b.@c.d', 'a..b.@c', 'a..b.@c.d'].sort()
    );
    assert.deepEqual(
      computeSubpatterns('a..b.@c.d').map(pattern => pattern.length),
      [2, 4, 4, 5, 6, 7, 7, 9]
    );
    assert.deepEqual(
      computeSubpatterns('@c.d'),
      ['@c', '@c.d']
    );
    assert.deepEqual(
      computeSubpatterns('a..b.@'),
      ['@', 'b.@', '.b.@', 'a..b.@']
    );
    assert.deepEqual(
      computeSubpatterns('@'),
      ['@']
    );
    assert.throws(() => {
      computeSubpatterns('a..b.c.d');
    });
  });
});
