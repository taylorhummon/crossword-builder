export function isNumber(
  value: any
): boolean {
  if (isNaN(value)) return false;
  if (value === Infinity) return false;
  if (value === - Infinity) return false;
  return typeof value === 'number';
}

interface RemainderAndQuotient {
  remainder: number,
  quotient: number
}

export function calculateRemainderAndQuotient(
  numerator: number,
  denominator: number
): RemainderAndQuotient {
  if (denominator <= 0) throw Error('calculateRemainderAndQuotient(): expects positive denominator');
  const remainder = replaceNegativeZero(calculateRemainder(numerator, denominator));
  const quotient = replaceNegativeZero((numerator - remainder) / denominator);
  return { remainder, quotient };
}

function calculateRemainder(
  numerator: number,
  denominator: number
): number {
  const possiblyNegative = numerator % denominator;
  if (possiblyNegative < 0) {
    return possiblyNegative + denominator;
  } else { // possiblyNegative >= 0
    return possiblyNegative;
  }
}

function replaceNegativeZero(
  value: number
): number {
  return value === -0 ? 0 : value;
}
