export interface SuggestionsRequestData {
  boardWidth: number;
  boardHeight: number;
  squareValues: Array<string>;
  activeSquareIndex: number;
  canSuggestFill: boolean;
}
