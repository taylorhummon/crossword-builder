import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

const server = feathers();
const restClient = rest(process.env.REACT_APP_SERVER_URI);
server.configure(restClient.fetch(window.fetch.bind(window)));

export function fetchSuggestions(data) {
  return server.service('suggestions-lists').create(data).catch((error) => {
    console.log('error occurred fetching suggestions', error);
    return [];
  });
}
