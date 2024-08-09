import { Character } from 'utilities/character';

export interface SuggestionsRequestData {
  boardWidth: number;
  boardHeight: number;
  squares: Array<Character>;
  activeIndex: number;
  canSuggestFilled: boolean;
}
