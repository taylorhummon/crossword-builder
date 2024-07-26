import {
  arrayOfSize,
  arrayShallowEquivalent,
  indicesArray,
  inclusiveIndicesArray
} from '../../utilities/arrays';

describe('arrayOfSize()', () => {
  it('creates an array of size zero', () => {
    expect(
      arrayOfSize(0).length
    ).toBe(
      0
    );
  });
  it('creates an array of size three', () => {
    expect(
      arrayOfSize(3).length
    ).toBe(
      3
    );
  });
  it('creates initializes each of the values in the array to null', () => {
    expect(
      arrayOfSize(3)
    ).toEqual(
      [null, null, null]
    );
  });
});
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
describe('inclusiveIndicesArray()', () => {
  it('works when both starting and ending arguments are included', () => {
    expect(
      inclusiveIndicesArray(3, 7)
    ).toEqual(
      [3, 4, 5, 6, 7]
    );
  });
  it('is a singleton array when the arguments are equal', () => {
    expect(
      inclusiveIndicesArray(4, 4)
    ).toEqual(
      [4]
    );
  });
  it('throws an exception if missing an argument', () => {
    expect(() => {
      // @ts-ignore: this line is intentionally incorrect
      inclusiveIndicesArray(6);
    }).toThrow();
  });
});
