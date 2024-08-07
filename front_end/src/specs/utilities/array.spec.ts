import {
  arrayShallowEquivalent,
  indicesArray
} from 'utilities/array';


describe('arrayShallowEquivalent()', () => {
  it('says that equal arrays are equivalent', () => {
    const a = ['a', 'b', 'c'];
    expect(
      arrayShallowEquivalent(a, a)
    ).toBe(
      true
    );
  });
  it('correctly identifies equivalent, non-equal arrays', () => {
    expect(
      arrayShallowEquivalent([1, 2, 3], [1, 2, 3])
    ).toBe(
      true
    );
  });
  it('correctly identifies non-equivalent arrays', () => {
    expect(
      arrayShallowEquivalent([1, 2, 3], [1, 3, 2])
    ).toBe(
      false
    );
  });
});
describe('indicesArray()', () => {
  it('works when both starting and ending arguments are included', () => {
    expect(
      indicesArray(3, 7)
    ).toEqual(
      [3, 4, 5, 6]
    );
  });
  it('is an empty array when the arguments are equal', () => {
    expect(
      indicesArray(4, 4)
    ).toEqual(
      []
    );
  });
  it('starts at zero when only one argument is included', () => {
    expect(
      indicesArray(3)
    ).toEqual(
      [0, 1, 2]
    );
  });
  it('is an empty array when the only argument is zero', () => {
    expect(
      indicesArray(0)
    ).toEqual(
      []
    );
  });
});
