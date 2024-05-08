import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Suggestions from '../../components/Suggestions';
import { filledSquareCharacter } from '../../utilities/alphabet.js';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function toRender(suggestions, canSuggestFill) {
  return (
    <Suggestions
      suggestions={suggestions}
      canSuggestFill={canSuggestFill}
    />
  );
}

it('shows all 26 letters when none are suggested and cannot suggest fill', () => {
  const suggestions = [];
  const canSuggestFill = false;
  act(() => {
    render(toRender(suggestions, canSuggestFill), container);
  });
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

it('emphasizes the suggested letters when cannot suggest fill', () => {
  const suggestions = ['A', 'E', 'C'];
  const canSuggestFill = false;
  act(() => {
    render(toRender(suggestions, canSuggestFill), container);
  });
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
  const suggestions = [];
  const canSuggestFill = true;
  act(() => {
    render(toRender(suggestions, canSuggestFill), container);
  });
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

it('emphasizes the suggested letters when can suggest fill', () => {
  const suggestions = ['A', filledSquareCharacter, 'C'];
  const canSuggestFill = true;
  act(() => {
    render(toRender(suggestions, canSuggestFill), container);
  });
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