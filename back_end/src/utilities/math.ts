export function isNumber(
  value: any
): boolean {
  if (isNaN(value)) return false;
  if (value === Infinity) return false;
  if (value === - Infinity) return false;
  return typeof value === 'number';
}

export function remainderAndQuotient(
  numerator: number,
  denominator: number
): Array<number> {
  if (denominator === 0) throw Error('Cannot divide by zero');
  if (numerator < 0 || denominator < 0) throw Error('Expected positive arguments');
  const remainder = numerator % denominator;
  const quotient = (numerator - remainder) / denominator;
  return [remainder, quotient];
}
