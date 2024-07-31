import 'mocha';
import assert from 'assert';
import { isNumber, calculateRemainderAndQuotient } from '../../src/utilities/math';

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
  describe('calculateRemainderAndQuotient()', () => {
    it('returns an object with the remainder and the quotient', () => {
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(14, 3),
        { remainder: 2, quotient: 4 }
      );
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(2, 3),
        { remainder: 2, quotient: 0 }
      );
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(0, 3),
        { remainder: 0, quotient: 0 }
      );
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(-0, 3),
        { remainder: 0, quotient: 0 }
      );
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(-2, 3),
        { remainder: 1, quotient: -1 }
      );
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(-3, 3),
        { remainder: 0, quotient: -1 }
      );
      assert.deepStrictEqual(
        calculateRemainderAndQuotient(-4, 3),
        { remainder: 2, quotient: -2 }
      );
    });
    it('throws an exception when the denominator is zero', () => {
      assert.throws(() => {
        calculateRemainderAndQuotient(5, 0);
      });
      assert.throws(() => {
        calculateRemainderAndQuotient(5, -0);
      });
      assert.throws(() => {
        calculateRemainderAndQuotient(0, 0);
      });
    });
  });
});
