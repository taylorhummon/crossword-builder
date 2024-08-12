import { test, expect } from 'vitest';

import { arrayShallowEquivalent, indicesArray } from 'src/utilities/array';


test('arrayShallowEquivalent() says that equal arrays are equivalent', () => {
  const a = ['a', 'b', 'c'];
  expect(
    arrayShallowEquivalent(a, a)
  ).toBe(
    true
  );
});

test('arrayShallowEquivalent() correctly identifies equivalent, non-equal arrays', () => {
  expect(
    arrayShallowEquivalent([1, 2, 3], [1, 2, 3])
  ).toBe(
    true
  );
});

test('arrayShallowEquivalent() correctly identifies non-equivalent arrays', () => {
  expect(
    arrayShallowEquivalent([1, 2, 3], [1, 3, 2])
  ).toBe(
    false
  );
});

test('indicesArray() works when both starting and ending arguments are included', () => {
  expect(
    indicesArray(3, 7)
  ).toEqual(
    [3, 4, 5, 6]
  );
});

test('indicesArray() is an empty array when the arguments are equal', () => {
  expect(
    indicesArray(4, 4)
  ).toEqual(
    []
  );
});

test('indicesArray() starts at zero when only one argument is included', () => {
  expect(
    indicesArray(3)
  ).toEqual(
    [0, 1, 2]
  );
});

test('indicesArray() is an empty array when the only argument is zero', () => {
  expect(
    indicesArray(0)
  ).toEqual(
    []
  );
});
