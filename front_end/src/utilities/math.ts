export const NATURAL_NUMBER_REGULAR_EXPRESSION = /^\d+$/;

export function isNumber(
  value: any
): boolean {
  if (isNaN(value)) return false;
  if (value === Infinity) return false;
  if (value === - Infinity) return false;
  return typeof value === 'number';
}

export function integerFromString(
  value: string
): number {
  return parseInt(value, 10);
}
