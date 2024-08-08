import { State } from 'components/app/App';
import { boardWidth, boardHeight } from 'environment/board';
import { arrayShallowEquivalent } from 'utilities/array';
import { SuggestionsRequestData } from 'models/suggestions/type';
import { fetchSuggestions } from 'models/suggestions/fetch';


export async function updateSuggestions(
  setState: (updater: (latestState: State) => State) => void,
  squares: Array<string>,
  activeIndex: number | null,
  canSuggestFilled: boolean
): Promise<void> {
  if (activeIndex === null) {
    setState((latestState: State) => ({
      ...latestState,
      suggestions: []
    }));
    return;
  }
  const requestData = { boardWidth, boardHeight, squares, activeIndex, canSuggestFilled };
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
  if (requestData.activeIndex !== latestState.activeIndex) return true;
  if (requestData.canSuggestFilled !== latestState.canSuggestFilled) return true;
  if (! arrayShallowEquivalent(requestData.squares, latestState.squares)) return true;
  return false;
}
