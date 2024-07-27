import assert from 'assert';
import { app } from '../../src/app.js';
import { buildUppercaseAlphabet } from '../../src/utilities/alphabet.js';

const wordsForMock = buildUppercaseAlphabet().concat([
  'AC', 'AT', 'OG', 'LA',
  'CAT', 'ABS', 'ACE', 'DOG', 'SAT', 'SOG',
  'ACED', 'ACES', 'ACER', 'CATS', 'DOGS', 'RACE', 'SOGS'
]);

describe('"suggestions_lists" service', () => {
  it('registered the service', () => {
    const service = app.service('suggestions-lists');
    assert.ok(
      service,
      'Registered the service'
    );
  });
  describe('create()', () => {
    let originalWordService;
    before(() => {
      originalWordService = app.service('/words');
      const mockedWordService = {
        async find() {
          function wordsFinder(length) {
            return wordsForMock.filter(word => word.length === length);
          }
          return wordsFinder;
        }
      };
      app.unuse('/words'); // stop using the original word service
      app.use('/words', mockedWordService);
    });
    after(() => {
      app.unuse('/words'); // stop using the mocked word service
      app.use('/words', originalWordService);
    });
    it('returns the suggestions list', async () => {
      const data = {
        boardWidth: 4,
        boardHeight: 1,
        squareValues: [
          'A', 'C', 'E', null,
        ],
        activeSquareIndex: 3,
        canSuggestFill: false
      };
      const results = await app.service('suggestions-lists').create(data);
      assert.deepEqual(
        results,
        ['D', 'R', 'S']
      );
    });
  });
});
