export function arrayOfSize(n) {
  return Array(n).fill(null);
}

export function arrayShallowEquivalent(a, b) {
  if (! a && ! b) return true;
  if (! a || ! b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function indicesArray(a, b) {
  if (typeof a !== 'number') {
    throw new Error('indicesArray requires one or two number arguments');
  }
  if (typeof b === 'number') return buildIndicesArray(a, b);
  return buildIndicesArray(0, a);
}

export function inclusiveIndicesArray(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    throw new Error('inclusiveIndicesArray requires two number arguments');
  }
  return buildInclusiveIndicesArray(from, to);
}

function buildIndicesArray(from, to) {
  const array = [];
  for (let i = from; i < to; i++) {
    array.push(i);
  }
  return array;
}

function buildInclusiveIndicesArray(from, to) {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}