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