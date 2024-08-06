import {
  buildLowercaseAlphabet,
  buildUppercaseAlphabet,
  isLetter
} from '../../utilities/alphabet';


describe('buildLowercaseAlphabet()', () => {
  it('builds the lowercase alphabet', () => {
    expect(
      buildLowercaseAlphabet().length
    ).toBe(
      26
    );
    expect(
      buildLowercaseAlphabet()[0]
    ).toBe(
      'a'
    );
    expect(
      buildLowercaseAlphabet()[25]
    ).toBe(
      'z'
    );
  });
});

describe('buildUppercaseAlphabet()', () => {
  it('builds the uppercase alphabet', () => {
    expect(
      buildUppercaseAlphabet().length
    ).toBe(
      26
    );
    expect(
      buildUppercaseAlphabet()[0]
    ).toBe(
      'A'
    );
    expect(
      buildUppercaseAlphabet()[25]
    ).toBe(
      'Z'
    );
  });
});

describe('isLetter()', () => {
  it('can identify letters', () => {
    expect(
      isLetter('g')
    ).toBe(
      true
    );
    expect(
      isLetter('Q')
    ).toBe(
      true
    );
    expect(
      isLetter('hi')
    ).toBe(
      false
    );
    expect(
      isLetter(null)
    ).toBe(
      false
    );
  });
});
