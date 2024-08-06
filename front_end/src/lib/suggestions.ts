import { State, RequestData } from '../declarations';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../lib/constants';
import { arrayShallowEquivalent } from '../utilities/arrays';

export async function updateSuggestions(
  setState: (updater: (latestState: State) => State) => void,
  squareValues: Array<string | null>,
  activeSquareIndex: number | null,
  canSuggestFill: boolean
): Promise<void> {
  if (activeSquareIndex === null) {
    setState((latestState: State) => ({
      ...latestState,
      suggestions: []
    }));
    return;
  }
  const requestData = {
    boardWidth: BOARD_WIDTH,
    boardHeight: BOARD_HEIGHT,
    squareValues,
    activeSquareIndex,
    canSuggestFill
  };
  const suggestions = await fetchSuggestions(requestData);
  setState((latestState: State) => {
    if (areSuggestionsOutdated(latestState, requestData)) {
      return latestState;
    } else {
      return ({
        ...latestState,
        suggestions
      });
    }
  });
}

function areSuggestionsOutdated(
  latestState: State,
  requestData: RequestData
): boolean {
  if (requestData.activeSquareIndex !== latestState.activeSquareIndex) return true;
  if (requestData.canSuggestFill !== latestState.canSuggestFill) return true;
  if (! arrayShallowEquivalent(requestData.squareValues, latestState.squareValues)) return true;
  return false;
}

async function fetchSuggestions(
  requestData: RequestData
): Promise<Array<string>> {
  try {
    const baseServerUri = process.env.REACT_APP_SERVER_URI;
    if (baseServerUri === undefined) {
      throw Error("REACT_APP_SERVER_URI environment variablem must be set");
    }
    const url = `${baseServerUri}/suggestions_lists`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    };
    const response = await fetch(url, options);
    if (! response.ok) throw new Error(`Response status: ${response.status}`);
    const jsonHash = await response.json();
    return deserializeSuggestions(jsonHash);
  } catch (error) {
    console.error(error);
    return [];
  }
}

const SUGGESTION_REGULAR_EXPRESSION = /^([A-Z]|~)$/;

function deserializeSuggestions(
  jsonHash: any
): Array<string> {
  if (! Array.isArray(jsonHash)) throw new Error('Expected response to be an array', jsonHash);
  const suggestions = [] as Array<string>;
  for (const entry of jsonHash) {
    if (typeof entry === "string" && SUGGESTION_REGULAR_EXPRESSION.test(entry)) {
      suggestions.push(entry);
    }
  }
  return suggestions;
}
