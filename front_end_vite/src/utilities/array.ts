import { isNumber } from 'src/utilities/math';


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
  if (! isNumber(a)) throw new Error('indicesArray requires one or two number arguments');
  if (isNumber(b)) {
    return buildIndicesArray(a, b as number);
  } else {
    return buildIndicesArray(0, a);
  }
}

function buildIndicesArray(
  from: number,
  to: number
): Array<number> {
  const array = [] as Array<number>;
  for (let index = from; index < to; index++) {
    array.push(index);
  }
  return array;
}
