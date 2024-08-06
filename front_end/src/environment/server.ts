import { lookupInEnvironment } from 'utilities/environment';
import { NATURAL_NUMBER_REGULAR_EXPRESSION } from 'utilities/math';


export const serverBaseUrl = lookupInEnvironment({
  environmentVariable: "REACT_APP_SERVER_BASE_URL",
  defaultValue: "http://localhost",
  clean(
    serverBaseUrl: string | undefined,
    defaultValue: string
  ): string {
    return (serverBaseUrl === undefined) ? defaultValue : serverBaseUrl;
  }
});

export const serverPort = lookupInEnvironment({
  environmentVariable: "REACT_APP_SERVER_PORT",
  defaultValue: "8000",
  clean(
    serverPort: string | undefined,
    defaultValue: string
  ): string {
    if (serverPort === undefined) return defaultValue;
    if (! NATURAL_NUMBER_REGULAR_EXPRESSION.test(serverPort)) return defaultValue;
    return serverPort;
  }
});
