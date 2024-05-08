import { SuggestionsLists } from './suggestions_lists.class.js';

export function setupSuggestionsListsService(app) {
  const options = {};
  app.use('/suggestions-lists', new SuggestionsLists(options, app));
  const service = app.service('suggestions-lists');
  service.hooks({
    around: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
}
