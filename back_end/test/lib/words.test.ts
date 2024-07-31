import 'mocha';
import assert from 'assert';
import { buildWordsFinder } from '../../src/lib/words';
import { buildUppercaseAlphabet } from '../../src/utilities/alphabet';

describe('buildWordsFinder()', () => {
  it('OK', () => {
    assert.ok(
      true,
      'YUP'
    );
  });
  it('finds words of length two', async () => {
    const wordsFinder = await buildWordsFinder();
    const results = wordsFinder(2);
    assert.strictEqual(
      results.length,
      427,
      'There are many words of length two'
    );
  });
  it('finds words of length one', async () => {
    const wordsFinder = await buildWordsFinder();
    const results = wordsFinder(1)
    assert.strictEqual(
      results.length,
      26,
      'Returns twenty six words of length one'
    );
    assert.deepEqual(
      results,
      buildUppercaseAlphabet(),
      'The words of length one are just the letters of the alphabet'
    );
  });
  it('finds no words of length zero', async () => {
    const wordsFinder = await buildWordsFinder();
    const results = wordsFinder(0);
    assert.strictEqual(
      results.length,
      0
    );
  });
  it('finds no words with a very large length', async () => {
    const wordsFinder = await buildWordsFinder();
    const results = wordsFinder(400);
    assert.strictEqual(
      results.length,
      0
    );
  });
});
