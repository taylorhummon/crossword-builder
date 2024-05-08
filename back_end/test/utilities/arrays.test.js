import assert from 'assert';
import {
  arrayOfSize,
  arrayShallowEquivalent,
  indicesArray,
  inclusiveIndicesArray,
} from '../../src/utilities/arrays.js';

describe('"arrays" utility', () => {
  describe('arrayOfSize()', () => {
    it('creates an array of size zero', () => {
      assert.strictEqual(
        arrayOfSize(0).length,
        0
      );
    });
    it('creates an array of size three', () => {
      assert.strictEqual(
        arrayOfSize(3).length,
        3
      );
    });
    it('creates initializes each of the values in the array to null', () => {
      assert.deepEqual(
        arrayOfSize(3),
        [null, null, null]
      );
    });
  });
  describe('arrayShallowEquivalent()', () => {
    it('says that equal arrays are equivalent', () => {
      const a = ['a', 'b', 'c'];
      assert.strictEqual(
        arrayShallowEquivalent(a, a),
        true
      );
    });
    it('correctly identifies equivalent, non-equal arrays', () => {
      assert.strictEqual(
        arrayShallowEquivalent([1, 2, 3], [1, 2, 3]),
        true
      );
    });
    it('correctly identifies non-equivalent arrays', () => {
      assert.strictEqual(
        arrayShallowEquivalent([1, 2, 3], [1, 3, 2]),
        false
      );
    });
  });
  describe('indicesArray()', () => {
    it('works when both starting and ending arguments are included', () => {
      assert.deepEqual(
        indicesArray(3, 7),
        [3, 4, 5, 6]
      );
    });
    it('is an empty array when the arguments are equal', () => {
      assert.deepEqual(
        indicesArray(4, 4),
        []
      );
    });
    it('starts at zero when only one argument is included', () => {
      assert.deepEqual(
        indicesArray(3),
        [0, 1, 2]
      );
    });
    it('is an empty array when the only argument is zero', () => {
      assert.deepEqual(
        indicesArray(0),
        []
      );
    });
  });
  describe('inclusiveIndicesArray()', () => {
    it('works when both starting and ending arguments are included', () => {
      assert.deepEqual(
        inclusiveIndicesArray(3, 7),
        [3, 4, 5, 6, 7]
      );
    });
    it('is a singleton array when the arguments are equal', () => {
      assert.deepEqual(
        inclusiveIndicesArray(4, 4),
        [4]
      );
    });
    it('throws an exception if missing an argument', () => {
      assert.throws(() => {
        inclusiveIndicesArray(6);
      });
    });
  });
});
