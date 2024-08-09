import { lookupInEnvironment } from 'src/utilities/environment';
import { NATURAL_NUMBER_REGULAR_EXPRESSION, integerFromString } from 'src/utilities/math';


export const boardWidth = lookupInEnvironment({
  environmentVariable: "VITE_BOARD_WIDTH",
  defaultValue: 8,
  clean(
    boardWidthString: string | undefined,
    defaultValue: number
  ): number {
      if (boardWidthString === undefined) return defaultValue;
      if (! NATURAL_NUMBER_REGULAR_EXPRESSION.test(boardWidthString)) return defaultValue;
      return integerFromString(boardWidthString);
  }
});

export const boardHeight = lookupInEnvironment({
  environmentVariable: "VITE_BOARD_HEIGHT",
  defaultValue: 8,
  clean(
    boardHeightString: string | undefined,
    defaultValue: number
  ): number {
    if (boardHeightString === undefined) return defaultValue;
    if (! NATURAL_NUMBER_REGULAR_EXPRESSION.test(boardHeightString)) return defaultValue;
    return integerFromString(boardHeightString);
  }
});
