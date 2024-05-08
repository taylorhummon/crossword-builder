import assert from 'assert';
import {
  firstCharacter, lastCharacter,
  trimFirstCharacter, trimLastCharacter,
} from '../../src/utilities/strings.js';

describe('"strings" utility', () => {
  describe('firstCharacter()', () => {
    it('returns the first character for a non-empty string', () => {
      assert.strictEqual(
        firstCharacter('gazebo'),
        'g'
      );
    });
    it('returns the empty string for an empty string', () => {
      assert.strictEqual(
        firstCharacter(''),
        ''
      );
    });
  });
  describe('lastCharacter()', () => {
    it('returns the last character for a non-empty string', () => {
      assert.strictEqual(
        lastCharacter('gazebo'),
        'o'
      );
    });
    it('returns the empty string for an empty string', () => {
      assert.strictEqual(
        lastCharacter(''),
        ''
      );
    });
  });
  describe('trimFirstCharacter()', () => {
    it('returns all of the string except the first character', () => {
      assert.strictEqual(
        trimFirstCharacter('gazebo'),
        'azebo'
      );
    });
    it('returns the empty string for an empty string', () => {
      assert.strictEqual(
        trimFirstCharacter(''),
        ''
      );
    });
  });
  describe('trimLastCharacter()', () => {
    it('returns all of the string except the last character', () => {
      assert.strictEqual(
        trimLastCharacter('gazebo'),
        'gazeb'
      );
    });
    it('returns the empty string for an empty string', () => {
      assert.strictEqual(
        trimLastCharacter(''),
        ''
      );
    });
  });
});
