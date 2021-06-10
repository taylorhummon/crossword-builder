import { server } from './server.js';

export function fetchSuggestions(data) {
  return server.service('suggestions-lists').create(data).catch((error) => {
    console.log('error occurred fetching suggestions', error);
    return [];
  });
}