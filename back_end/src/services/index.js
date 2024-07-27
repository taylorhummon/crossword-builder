import { SuggestionsLists } from './suggestions_lists.class.js';

export const services = (app) => {
  app.configure(() => {
    app.use('/suggestions-lists', new SuggestionsLists({}, app));
  });
}
