import React from 'react';
import { render, screen } from '@testing-library/react';

import Suggestions from '../../components/Suggestions';
import { filledSquareCharacter } from '../../utilities/alphabet.js';

it('shows all 26 letters when none are suggested and cannot suggest fill', async () => {
  const suggestions = [];
  const canSuggestFill = false;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFill={canSuggestFill}
    />
  );
  const letterElements = screen.queryAllByTestId(/^suggestion-/);
  expect(
    letterElements.length
  ).toEqual(26);
  expect(
    letterElements[0].textContent
  ).toEqual('A');
  expect(
    letterElements[25].textContent
  ).toEqual('Z');
  letterElements.forEach(letterElement => {
    expect(
      letterElement
    ).not.toHaveClass('suggested');
  });
});

it('emphasizes the suggested letters when cannot suggest fill', async () => {
  const suggestions = ['A', 'E', 'C'];
  const canSuggestFill = false;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFill={canSuggestFill}
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

it('shows all 27 letters when none are suggested and can suggest fill', async () => {
  const suggestions = [];
  const canSuggestFill = true;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFill={canSuggestFill}
    />
  );
  const letterElements = screen.queryAllByTestId(/^suggestion-/);
  expect(
    letterElements.length
  ).toEqual(27);
  expect(
    letterElements[0].textContent
  ).toEqual('A');
  expect(
    letterElements[25].textContent
  ).toEqual('Z');
  expect(
    letterElements[26]
  ).toContainElement(screen.getByTestId('letter-filled-square'));
  letterElements.forEach(letterElement => {
    expect(
      letterElement
    ).not.toHaveClass('suggested');
  });
});

it('emphasizes the suggested letters when can suggest fill', async () => {
  const suggestions = ['A', filledSquareCharacter, 'C'];
  const canSuggestFill = true;
  render(
    <Suggestions
      suggestions={suggestions}
      canSuggestFill={canSuggestFill}
    />
  );
  expect(
    screen.queryByTestId(/^suggestion-A$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-filled-square$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-C$/)
  ).toHaveClass('suggested');
  expect(
    screen.queryByTestId(/^suggestion-B$/)
  ).not.toHaveClass('suggested');
});
