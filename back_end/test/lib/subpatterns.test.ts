import 'mocha';
import assert from 'assert';
import {
  computeSubpatternsTrimLeft, computeSubpatternsTrimRight,
  computeSubpatterns,
} from '../../src/lib/subpatterns';

describe('computeSubpatternsTrimLeft()', () => {
  it('computes subpatterns on the left', () => {
    assert.deepStrictEqual(
      computeSubpatternsTrimLeft('a..b.@c.d'),
      ['@c.d', 'b.@c.d', '.b.@c.d', 'a..b.@c.d']
    );
    assert.deepStrictEqual(
      computeSubpatternsTrimLeft('a..b.@'),
      ['@', 'b.@', '.b.@', 'a..b.@']
    );
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
      computeSubpatternsTrimRight('a..b.@c.d'),
      ['a..b.@c', 'a..b.@c.d']
    );
    assert.deepStrictEqual(
      computeSubpatternsTrimRight('@c.d'),
      ['@c', '@c.d']
    );
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
      computeSubpatterns('a..b.@c.d').sort(),
      ['@c', '@c.d', 'b.@c', '.b.@c', 'b.@c.d', '.b.@c.d', 'a..b.@c', 'a..b.@c.d'].sort()
    );
    assert.deepStrictEqual(
      computeSubpatterns('a..b.@c.d').map(pattern => pattern.length),
      [2, 4, 4, 5, 6, 7, 7, 9]
    );
    assert.deepStrictEqual(
      computeSubpatterns('@c.d'),
      ['@c', '@c.d']
    );
    assert.deepStrictEqual(
      computeSubpatterns('a..b.@'),
      ['@', 'b.@', '.b.@', 'a..b.@']
    );
    assert.deepStrictEqual(
      computeSubpatterns('@'),
      ['@']
    );
    assert.throws(() => {
      computeSubpatterns('a..b.c.d');
    });
  });
});
