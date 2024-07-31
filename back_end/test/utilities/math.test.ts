import 'mocha';
import assert from 'assert';
import { isNumber, remainderAndQuotient } from '../../src/utilities/math';

describe('"math" utility', () => {
  describe('isNumber()', () => {
    it('identifies 7 as a number', () => {
      assert.strictEqual(
        isNumber(7),
        true
      );
    });
    it('identifies 0 as a number', () => {
      assert.strictEqual(
        isNumber(0),
        true
      );
    });
    it('identifies "a" as not a number', () => {
      assert.strictEqual(
        isNumber('a'),
        false
      );
    });
    it('identifies NaN as not a number', () => {
      assert.strictEqual(
        isNumber(NaN),
        false
      );
    });
    it('identifies Infinity as not a number', () => {
      assert.strictEqual(
        isNumber(Infinity),
        false
      );
      assert.strictEqual(
        isNumber(- Infinity),
        false
      );
    });
  });
  describe('remainderAndQuotient()', () => {
    it('returns an array with the remainder at index zero', () => {
      assert.strictEqual(
        remainderAndQuotient(14, 3)[0],
        2
      );
      assert.strictEqual(
        remainderAndQuotient(2, 3)[0],
        2
      );
      assert.strictEqual(
        remainderAndQuotient(0, 3)[0],
        0
      );
    });
    it('returns an array with the quotient at index one', () => {
      assert.strictEqual(
        remainderAndQuotient(14, 3)[1],
        4
      );
      assert.strictEqual(
        remainderAndQuotient(2, 3)[1],
        0
      );
      assert.strictEqual(
        remainderAndQuotient(0, 3)[1],
        0
      );
    });
    it('throws an exception when the denominator is zero', () => {
      assert.throws(() => {
        remainderAndQuotient(5, 0);
      });
      assert.throws(() => {
        remainderAndQuotient(0, 0);
      });
    });
  });
});
