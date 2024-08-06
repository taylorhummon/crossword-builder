const naturalNumberRegularExpression = /^\d+$/;

const defaultServerBaseUrl = "http://localhost";
export const serverBaseUrl = cleanServerBaseUrl(process.env["REACT_APP_SERVER_BASE_URL"])

function cleanServerBaseUrl(
  serverBaseUrl?: string
): string {
  if (serverBaseUrl === undefined) return defaultServerBaseUrl;
  return serverBaseUrl;
}

const defaultServerPort = "8000";
export const serverPort = cleanServerPort(process.env["REACT_APP_SERVER_PORT"]);

function cleanServerPort(
  serverPort?: string
): string {
  if (serverPort === undefined) return defaultServerPort;
  return defaultServerPort
}

const defaultBoardWidth = 8;
export const boardWidth = cleanBoardWidth(process.env["REACT_APP_BOARD_WIDTH"])

function cleanBoardWidth(
  boardWidthString?: string
): number {
  if (boardWidthString === undefined) return defaultBoardWidth;
  if (! naturalNumberRegularExpression.test(boardWidthString)) return defaultBoardWidth;
  return parseInt(boardWidthString, 10); // !!! move parseInt to a utility function
}

const defaultBoardHeight = 8;
export const boardHeight = cleanBoardHeight(process.env["REACT_APP_BOARD_HEIGHT"])

function cleanBoardHeight(
  boardHeightString?: string
): number {
  if (boardHeightString === undefined) return defaultBoardHeight;
  if (! naturalNumberRegularExpression.test(boardHeightString)) return defaultBoardHeight;
  return parseInt(boardHeightString, 10);
}
