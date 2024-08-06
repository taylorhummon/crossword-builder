export interface SuggestionsRequestData {
  boardWidth: number,
  boardHeight: number,
  squareValues: Array<string | null>
  activeSquareIndex: number,
  canSuggestFill: boolean
}
