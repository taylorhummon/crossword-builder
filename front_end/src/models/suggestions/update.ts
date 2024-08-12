import type { State } from 'src/components/app/App';
import type { Character } from 'src/utilities/character';
import type { SuggestionsRequestData } from 'src/models/suggestions/type';
import { boardWidth, boardHeight } from 'src/environment/board';
import { fetchSuggestions } from 'src/models/suggestions/fetch';
import { arrayShallowEquivalent } from 'src/utilities/array';


export async function updateSuggestions(
  setState: (updater: (latestState: State) => State) => void,
  squares: Array<Character>,
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
