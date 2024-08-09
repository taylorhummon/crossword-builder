import { render, screen } from '@testing-library/react';

import { FILLED_SQUARE, SuggestableCharacter } from 'utilities/character';
import Suggestions from 'components/suggestions/Suggestions';


it('shows all 26 letters when none are suggested and cannot suggest fill', () => {
  const suggestions = [] as Array<SuggestableCharacter>;
  const canSuggestFilled = false;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFilled={canSuggestFilled}
    />
  );
  const elements = screen.queryAllByTestId(/^suggestion-/);
  expect(
    elements.length
  ).toEqual(26);
  expect(
    elements[0].textContent
  ).toEqual('A');
  expect(
    elements[25].textContent
  ).toEqual('Z');
  elements.forEach(element => {
    expect(
      element
    ).not.toHaveClass('suggested');
  });
});

it('emphasizes the suggested letters when cannot suggest fill', () => {
  const suggestions = ['A', 'E', 'C'] as Array<SuggestableCharacter>;
  const canSuggestFilled = false;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFilled={canSuggestFilled}
    />
  );
  expect(
    screen.queryByTestId(/^suggestion-A$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-E$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-C$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-B$/)
  ).not.toHaveClass('suggested');
});

it('shows all 27 letters when none are suggested and can suggest fill', () => {
  const suggestions = [] as Array<SuggestableCharacter>;
  const canSuggestFilled = true;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFilled={canSuggestFilled}
    />
  );
  const elements = screen.queryAllByTestId(/^suggestion-/);
  expect(
    elements.length
  ).toEqual(27);
  expect(
    elements[0].textContent
  ).toEqual('A');
  expect(
    elements[25].textContent
  ).toEqual('Z');
  expect(
    elements[26]
  ).toContainElement(screen.getByTestId('character-■'));
  elements.forEach(element => {
    expect(
      element
    ).not.toHaveClass('suggested');
  });
});

it('emphasizes the suggested letters when can suggest fill', () => {
  const suggestions = ['A', FILLED_SQUARE, 'C'] as Array<SuggestableCharacter>;
  const canSuggestFilled = true;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFilled={canSuggestFilled}
    />
  );
  expect(
    screen.queryByTestId(/^suggestion-A$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-■$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-C$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-B$/)
  ).not.toHaveClass('suggested');
});
