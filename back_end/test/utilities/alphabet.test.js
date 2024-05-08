import assert from 'assert';
import { buildLowercaseAlphabet, buildUppercaseAlphabet } from '../../src/utilities/alphabet.js';

describe('"alphabet" utility', () => {
  describe('buildLowercaseAlphabet()', () => {
    it('builds the lowercase alphabet', () => {
      assert.strictEqual(
        buildLowercaseAlphabet().length,
        26,
      );
      assert.strictEqual(
        buildLowercaseAlphabet()[0],
        'a',
      );
      assert.strictEqual(
        buildLowercaseAlphabet()[25],
        'z',
      );
    });
  });
  describe('buildUppercaseAlphabet()', () => {
    it('builds the uppercase alphabet', () => {
      assert.strictEqual(
        buildUppercaseAlphabet().length,
        26,
      );
      assert.strictEqual(
        buildUppercaseAlphabet()[0],
        'A',
      );
      assert.strictEqual(
        buildUppercaseAlphabet()[25],
        'Z',
      );
    });
  });
});
