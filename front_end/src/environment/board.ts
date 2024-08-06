import { lookupInEnvironment } from 'utilities/environment';
import { integerFromString } from 'utilities/math'


const naturalNumberRegularExpression = /^\d+$/;

export const boardWidth = lookupInEnvironment({
  environmentVariable: "REACT_APP_BOARD_WIDTH",
  defaultValue: 8,
  clean(
    boardWidthString: string | undefined,
    defaultValue: number
  ): number {
      if (boardWidthString === undefined) return defaultValue;
      if (! naturalNumberRegularExpression.test(boardWidthString)) return defaultValue;
      return integerFromString(boardWidthString);
  }
});

export const boardHeight = lookupInEnvironment({
  environmentVariable: "REACT_APP_BOARD_HEIGHT",
  defaultValue: 8,
  clean(
    boardHeightString: string | undefined,
    defaultValue: number
  ): number {
    if (boardHeightString === undefined) return defaultValue;
    if (! naturalNumberRegularExpression.test(boardHeightString)) return defaultValue;
    return integerFromString(boardHeightString);
  }
});
