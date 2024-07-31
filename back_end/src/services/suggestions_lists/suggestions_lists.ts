import { hooks as schemaHooks } from '@feathersjs/schema';

import type { Application } from '../../declarations';
import { SuggestionsListsService } from './suggestions_lists.class';
import { suggestionsListParamsDataValidator } from './suggestions_lists.schema';
import { suggestionsListsPath, suggestionslistsMethods } from './suggestions_lists.shared';

export * from './suggestions_lists.class';
export * from './suggestions_lists.schema';

export function suggestions_lists(app: Application): void {
  app.use(
    suggestionsListsPath,
    new SuggestionsListsService(app),
    { methods: suggestionslistsMethods }
  );
  app.service(suggestionsListsPath).hooks({
    create: [schemaHooks.validateData(suggestionsListParamsDataValidator)]
  });
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [suggestionsListsPath]: SuggestionsListsService
  }
}
