import { Words } from './words.class.js';

export function setupWordsService(app) {
  const options = {};
  app.use('/words', new Words(options, app));
  const service = app.service('words');
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
