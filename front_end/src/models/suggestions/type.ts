export interface SuggestionsRequestData {
  boardWidth: number;
  boardHeight: number;
  squares: Array<string>;
  activeSquareIndex: number;
  canSuggestFill: boolean;
}
