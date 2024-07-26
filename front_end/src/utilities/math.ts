export function isNumber(
  value: any
): boolean {
  if (isNaN(value)) return false;
  if (value === Infinity) return false;
  if (value === - Infinity) return false;
  return typeof value === 'number';
}
