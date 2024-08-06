import { State, RequestData } from '../declarations';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../lib/constants';
import { arrayShallowEquivalent } from '../utilities/arrays';
import { fetchSuggestions } from './fetchSuggestions';


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
