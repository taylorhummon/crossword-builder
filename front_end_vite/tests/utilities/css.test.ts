import { test, expect } from 'vitest';

import { buildClassString } from 'src/utilities/css';


const cssModule = {
  'red': 'abc-red',
  'fish': 'abc-fish',
  'blue': 'abc-blue'
};

test('buildClassString() works correctly when all arguments are provided', () => {
  expect(
    buildClassString(
      cssModule,
      ['red', 'blue'],
      ['red', 'fish']
    )
  ).toBe(
    'abc-red abc-blue red fish'
  );
});

test('buildClassString() works correctly when the last argument is omitted', () => {
  expect(
    buildClassString(
      cssModule,
      ['red', 'blue']
    )
  ).toBe(
    'abc-red abc-blue'
  );
});

test('buildClassString() works correctly when the middle argument is omitted', () => {
  expect(
    buildClassString(
      cssModule,
      undefined,
      ['red', 'fish']
    )
  ).toBe(
    'red fish'
  );
});

test('buildClassString() works correctly when the last two arguments are omitted', () => {
  expect(
    buildClassString(
      cssModule
    )
  ).toBe(
    ''
  );
});
