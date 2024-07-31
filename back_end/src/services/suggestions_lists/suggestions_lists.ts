import type { Application } from '../../declarations';
import { SuggestionsListsService } from './suggestions_lists.class';
import { suggestionsListsPath, suggestionslistsMethods } from './suggestions_lists.shared';

export * from './suggestions_lists.class';

export function suggestions_lists(app: Application): void {
  app.use(
    suggestionsListsPath,
    new SuggestionsListsService(app),
    { methods: suggestionslistsMethods }
  );
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [suggestionsListsPath]: SuggestionsListsService
  }
}
