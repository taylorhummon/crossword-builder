import { State } from 'components/app/App';
import { boardWidth, boardHeight } from 'environment/board';
import { SuggestionsRequestData } from 'models/suggestions/type';
import { fetchSuggestions } from 'models/suggestions/fetch';
import { arrayShallowEquivalent } from 'utilities/array';
import { Character } from 'utilities/character';


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
