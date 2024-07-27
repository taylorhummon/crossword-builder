import { buildSuggestionsList } from '../utilities/suggestions.js';

export class SuggestionsLists {
  constructor (_, app) {
    this.app = app;
  }

  async create(data) {
    try {
      const wordsFinder = await this.app.service('words').find();
      return buildSuggestionsList(wordsFinder, data);
    } catch (error) {
      console.error('Error occured in create method of suggestions-lists service:', error);
    }
  }
}
