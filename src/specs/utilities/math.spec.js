import { isNumber } from '../../utilities/math';

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
