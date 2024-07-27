import { SuggestionsLists } from './suggestions_lists.class.js';
import { Words } from './words.class.js';

export const services = (app) => {
  app.configure(() => {
    app.use('/words', new Words({}, app));
  });
  app.configure(() => {
    app.use('/suggestions-lists', new SuggestionsLists({}, app));
  });
}
