export function divMod(numerator, denominator) {
  const remainder = numerator % denominator;
  const quotient = (numerator - remainder) / denominator;
  return [remainder, quotient];
}
