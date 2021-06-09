import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

 // !!!! this needs careful cleanup

const server = feathers();

// Connect to the same as the browser URL (only in the browser)
// const restClient = rest();

// Connect to a different URL
const restClient = rest('http://localhost:3030'); // !!!

// Configure an AJAX library (see below) with that client
server.configure(restClient.fetch(window.fetch)); // !!!

export function fetchSuggestions(data) {
  return server.service('suggestions-lists').create(data).catch((error) => {
    console.log('error occurred fetching suggestions', error);
    return [];
  });
}