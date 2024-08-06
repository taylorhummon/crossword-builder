import { isNumber, integerFromString } from 'utilities/math';


describe('isNumber()', () => {
  it('identifies 7 as a number', () => {
    expect(
      isNumber(7)
    ).toBe(
      true
    );
  });
  it('identifies 0 as a number', () => {
    expect(
      isNumber(0)
    ).toBe(
      true
    );
  });
  it('identifies "a" as not a number', () => {
    expect(
      isNumber('a')
    ).toBe(
      false
    );
  });
  it('identifies NaN as not a number', () => {
    expect(
      isNumber(NaN)
    ).toBe(
      false
    );
  });
  it('identifies Infinity as not a number', () => {
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
});

describe('integerFromString()', () => {
  it('parses base 10 integers from strings', () => {
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
});
