import { setupSuggestionsListsService } from './suggestions_lists/suggestions_lists.js';
import { setupWordsService } from './words/words.js';

export const services = (app) => {
  app.configure(setupSuggestionsListsService);
  app.configure(setupWordsService);
}
