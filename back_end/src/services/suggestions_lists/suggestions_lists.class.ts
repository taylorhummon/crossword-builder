import { SuggestionsListParams } from './suggestions_lists.schema';
import type { Application } from '../../declarations'
import { buildWordsFinder } from '../../lib/words';
import { buildSuggestionsList } from '../../lib/suggestions';

export class SuggestionsListsService {
  app: Application

  constructor (
    app: Application
  ) {
    this.app = app;
  }

  async create(
    suggestionsListParaams: SuggestionsListParams
  ) {
    try {
      const wordsFinder = await buildWordsFinder();
      return buildSuggestionsList(wordsFinder, suggestionsListParaams);
    } catch (error) {
      console.error('Error occured in create method of suggestions-lists service:', error);
    }
  }
}
