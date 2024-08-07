import {
  EMPTY_SQUARE,
  FILLED_SQUARE,
  buildLetters,
  isLetter,
  isSuggestableCharacter,
  isCharacter
} from 'utilities/character';


describe('buildLetters()', () => {
  it('builds the uppercase alphabet', () => {
    expect(
      buildLetters().length
    ).toBe(
      26
    );
    expect(
      buildLetters()[0]
    ).toBe(
      'A'
    );
    expect(
      buildLetters()[25]
    ).toBe(
      'Z'
    );
  });
});

describe('isLetter()', () => {
  it('can identify (uppercase) letters', () => {
    expect(
      isLetter('Q')
    ).toBe(
      true
    );
    expect(
      isLetter(EMPTY_SQUARE)
    ).toBe(
      false
    );
    expect(
      isLetter(FILLED_SQUARE)
    ).toBe(
      false
    );
    expect(
      isLetter('g')
    ).toBe(
      false
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

describe('isSuggestableCharacter()', () => {
  it('can identify suggestable characters', () => {
    expect(
      isSuggestableCharacter('Q')
    ).toBe(
      true
    );
    expect(
      isSuggestableCharacter(EMPTY_SQUARE)
    ).toBe(
      false
    );
    expect(
      isSuggestableCharacter(FILLED_SQUARE)
    ).toBe(
      true
    );
    expect(
      isSuggestableCharacter('g')
    ).toBe(
      false
    );
    expect(
      isSuggestableCharacter('hi')
    ).toBe(
      false
    );
    expect(
      isSuggestableCharacter(null)
    ).toBe(
      false
    );
  });
});

  describe('isCharacter()', () => {
    it('can identify characters', () => {
      expect(
        isCharacter('Q')
      ).toBe(
        true
      );
      expect(
        isCharacter(EMPTY_SQUARE)
      ).toBe(
        true
      );
      expect(
        isCharacter(FILLED_SQUARE)
      ).toBe(
        true
      );
      expect(
        isCharacter('g')
      ).toBe(
        false
      );
      expect(
        isCharacter('hi')
      ).toBe(
        false
      );
      expect(
        isCharacter(null)
      ).toBe(
        false
      );
    });
});
