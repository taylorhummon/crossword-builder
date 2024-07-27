export interface State {
  squareValues: Array<string | null>;
  activeSquareIndex: number | null;
  bookmarkedIndex: number | null;
  boardHasFocus: boolean;
  canSuggestFill: boolean;
  isTypingVertical: boolean;
  suggestions: Array<string>;
}

export interface RequestData {
  boardWidth: number,
  boardHeight: number,
  squareValues: Array<string | null>
  activeSquareIndex: number,
  canSuggestFill: boolean
}
