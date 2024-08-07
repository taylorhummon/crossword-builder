import { State } from 'components/app/App';
import { boardWidth, boardHeight } from 'environment/board';
import { arrayShallowEquivalent } from 'utilities/array';
import { SuggestionsRequestData } from 'models/suggestions/type';
import { fetchSuggestions } from 'models/suggestions/fetch';


export async function updateSuggestions(
  setState: (updater: (latestState: State) => State) => void,
  squares: Array<string>,
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
  const requestData = { boardWidth, boardHeight, squares, activeSquareIndex, canSuggestFill };
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
  requestData: SuggestionsRequestData
): boolean {
  if (requestData.activeSquareIndex !== latestState.activeSquareIndex) return true;
  if (requestData.canSuggestFill !== latestState.canSuggestFill) return true;
  if (! arrayShallowEquivalent(requestData.squares, latestState.squares)) return true;
  return false;
}
