import assert from 'assert';
import { app } from '../../src/app.js';
import { buildUppercaseAlphabet } from '../../src/utilities/alphabet.js';

describe('"words" service', () => {
  it('registered the service', () => {
    const service = app.service('words');
    assert.ok(
      service,
      'Registered the service'
    );
  });
  it('finds words of length two', async () => {
    const service = app.service('words');
    const results = await service.find({ length: 2 });
    assert.strictEqual(
      results.length,
      427,
      'There are many words of length two'
    );
  });
  it('finds words of length one', async () => {
    const service = app.service('words');
    const results = await service.find({ length: 1 });
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
    const service = app.service('words');
    const results = await service.find({ length: 0 });
    assert.strictEqual(
      results.length,
      0
    );
  });
  it('finds no words with a very large length', async () => {
    const service = app.service('words');
    const results = await service.find({ length: 400 });
    assert.strictEqual(
      results.length,
      0
    );
  });
});
