import { buildWordsFinder } from '../lib/words.js';
import { buildSuggestionsList } from '../lib/suggestions.js';

export class SuggestionsLists {
  constructor (_, app) {
    this.app = app;
  }

  async create(data) {
    try {
      const wordsFinder = await buildWordsFinder();
      return buildSuggestionsList(wordsFinder, data);
    } catch (error) {
      console.error('Error occured in create method of suggestions-lists service:', error);
    }
  }
}
