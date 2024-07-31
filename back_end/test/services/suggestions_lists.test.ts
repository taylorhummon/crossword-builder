import 'mocha';
import assert from 'assert';
import { app } from '../../src/app';

describe('"suggestions_lists" service', () => {
  it('registered the service', () => {
    const service = app.service('suggestions-lists');
    assert.ok(
      service,
      'Registered the service'
    );
  });
  describe('create()', () => {
    it('returns the suggestions list', async () => {
      const data = {
        boardWidth: 4,
        boardHeight: 1,
        squareValues: [
          'A', 'C', 'R', null,
        ],
        activeSquareIndex: 3,
        canSuggestFill: false
      };
      const results = await app.service('suggestions-lists').create(data);
      assert.deepEqual(
        results,
        ['E']
      );
    });
  });
});
