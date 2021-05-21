export function indicesArray(n) {
  const array = [];
  for (let index = 0; index < n; index++) {
    array.push(index);
  }
  return array;
}

export function inclusiveIndicesArray(from, to) {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}