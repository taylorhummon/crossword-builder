import { isNumber } from './math';

export function arrayOfSize(
  n: number
): Array<null> {
  return Array(n).fill(null);
}

export function arrayShallowEquivalent(
  a: Array<any>,
  b: Array<any>
): boolean {
  if (! a && ! b) return true;
  if (! a || ! b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function indicesArray(
  a: number,
  b?: number
): Array<number> {
  if (! isNumber(a)) {
    throw new Error('indicesArray requires one or two number arguments');
  }
  if (! isNumber(b)) return buildIndicesArray(0, a);
  return buildIndicesArray(a, b as number);
}

export function inclusiveIndicesArray(
  from: number,
  to: number
): Array<number> {
  if (! isNumber(from) || ! isNumber(to)) {
    throw new Error('inclusiveIndicesArray requires two number arguments');
  }
  return buildInclusiveIndicesArray(from, to);
}

function buildIndicesArray(
  from: number,
  to: number
): Array<number> {
  const array = [] as Array<number>;
  for (let i = from; i < to; i++) {
    array.push(i);
  }
  return array;
}

function buildInclusiveIndicesArray(
  from: number,
  to: number
): Array<number> {
  const array = [] as Array<number>;
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}
