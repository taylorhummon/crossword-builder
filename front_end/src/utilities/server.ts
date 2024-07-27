import { feathers, Application } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

let server: Application<any,any> | null = null;

export function getServer(): Application<any,any> {
  if (server === null) {
    server = createServer();
  }
  return server;
}

function createServer(): Application<any,any> {
  const server = feathers();
  const restClient = rest(process.env.REACT_APP_SERVER_URI);
  server.configure(restClient.fetch(window.fetch.bind(window)));
  return server;
}
