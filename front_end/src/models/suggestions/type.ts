export interface SuggestionsRequestData {
  boardWidth: number;
  boardHeight: number;
  squares: Array<string>;
  activeIndex: number;
  canSuggestFill: boolean;
}
