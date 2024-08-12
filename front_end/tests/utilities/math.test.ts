import { test, expect } from 'vitest';

import { isNumber, integerFromString } from 'src/utilities/math';


test('isNumber() identifies 7 as a number', () => {
  expect(
    isNumber(7)
  ).toBe(
    true
  );
});

test('isNumber() identifies 0 as a number', () => {
  expect(
    isNumber(0)
  ).toBe(
    true
  );
});

test('isNumber() identifies "a" as not a number', () => {
  expect(
    isNumber('a')
  ).toBe(
    false
  );
});

test('isNumber() identifies NaN as not a number', () => {
  expect(
    isNumber(NaN)
  ).toBe(
    false
  );
});

test('isNumber() identifies Infinity as not a number', () => {
  expect(
    isNumber(Infinity)
  ).toBe(
    false
  );
  expect(
    isNumber(- Infinity)
  ).toBe(
    false
  );
});

test('integerFromString() parses base 10 integers from strings', () => {
  expect(
    integerFromString("23")
  ).toBe(
    23
  );
  expect(
    integerFromString("+23")
  ).toBe(
    23
  );
  expect(
    integerFromString("-23")
  ).toBe(
    -23
  );
  expect(
    integerFromString("0")
  ).toBe(
    0
  );
  expect(
    integerFromString("+0")
  ).toBe(
    0
  );
  expect(
    integerFromString("-0")
  ).toBe(
    -0
  );
});
