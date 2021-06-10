import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { serverUri } from '../configuration.js';

export const server = feathers();
const restClient = rest(serverUri);
server.configure(restClient.fetch(window.fetch));
