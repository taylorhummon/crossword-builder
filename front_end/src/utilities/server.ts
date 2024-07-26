import { feathers } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { RequestData } from '../types';

const server = feathers();
const restClient = rest(process.env.REACT_APP_SERVER_URI);
server.configure(restClient.fetch(window.fetch.bind(window)));

export function fetchSuggestions(
  requestData: RequestData
): Promise<Array<string>> {
  return server.service('suggestions-lists').create(requestData).catch((error: Error) => {
    console.log('Error occurred fetching suggestions', error);
    return [];
  });
}
