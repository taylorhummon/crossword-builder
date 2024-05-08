import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { serverUri } from '../configuration.js';

const server = feathers();
const restClient = rest(serverUri);
server.configure(restClient.fetch(window.fetch.bind(window)));

export function fetchSuggestions(data) {
  return server.service('suggestions-lists').create(data).catch((error) => {
    console.log('error occurred fetching suggestions', error);
    return [];
  });
}
