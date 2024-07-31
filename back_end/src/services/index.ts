import type { Application } from '../declarations';
import { suggestions_lists } from './suggestions_lists/suggestions_lists';

export const services = (app: Application) => {
  app.configure(suggestions_lists);
  // All services will be registered here
}
