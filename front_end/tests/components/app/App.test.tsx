import { test, expect } from 'vitest';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { boardWidth, boardHeight } from 'src/environment/board';
import App from 'src/components/app/App';
import squareCssModule from 'src/components/square/Square.module.scss';


vi.mock('src/environment/board', () => {
  // using a non-square board for testing
  return {
    boardWidth: 3,
    boardHeight: 4
  };
});

vi.mock('src/models/suggestions/fetch', () => {
  return {
    fetchSuggestions() {
      return [];
    }
  };
});


test('<App> has a board width the correct number of squares', () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements.length
  ).toEqual(boardWidth * boardHeight);
});

test('<App> toggling the "Can suggest filled square" switch works', async () => {
  const user = userEvent.setup();
  render(<App />);
  const labelRegex = /Can suggest filled square$/;
  const inputElement = screen.getByLabelText(labelRegex, { selector: 'input' }) as HTMLInputElement;
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
  await user.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(false);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(26);
  await user.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
});

test('<App> typing horizontally', async () => {
  const user = userEvent.setup();
  render(<App />);
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' }) as HTMLInputElement;
  expect(
    inputElement.checked
  ).toEqual(false);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements[0]
  ).not.toHaveClass(squareCssModule['is-active']);
  await user.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'D');
    expect(
      letterElements[0].textContent
    ).toEqual('D');
    expect(
      letterElements[1]
    ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'O');
  expect(
    letterElements[1].textContent
  ).toEqual('O');
  expect(
    letterElements[2]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'G');
  expect(
    letterElements[2].textContent
  ).toEqual('G');
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
});

test('<App> typing vertically', async () => {
  const user = userEvent.setup();
  render(<App />);
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' }) as HTMLInputElement;
  expect(
    inputElement.checked
  ).toEqual(false);
  await user.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(true);
  const letterElements = screen.queryAllByTestId(/^square-/);
  await user.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'L');
  expect(
    letterElements[0].textContent
  ).toEqual('L');
  expect(
    letterElements[3]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'A');
  expect(
    letterElements[3].textContent
  ).toEqual('A');
  expect(
    letterElements[6]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'M');
  expect(
    letterElements[6].textContent
  ).toEqual('M');
  expect(
    letterElements[9]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), 'B');
  expect(
    letterElements[9].textContent
  ).toEqual('B');
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
});

test('<App> navigating with arrow keys', async () => {
  const user = userEvent.setup();
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  await user.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowdown}');
  expect(
    letterElements[3]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowleft}');
  expect(
    letterElements[3]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowright}');
  expect(
    letterElements[4]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowright}');
  expect(
    letterElements[5]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowright}');
  expect(
    letterElements[5]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowup}');
  expect(
    letterElements[2]
  ).toHaveClass(squareCssModule['is-active']);
  await user.type(screen.getByTestId('board'), '{arrowup}');
  expect(
    letterElements[2]
  ).toHaveClass(squareCssModule['is-active']);
});

test('<App> typing a filled square', async () => {
  const user = userEvent.setup();
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  await user.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
  expect(
    letterElements[0]
  ).not.toHaveClass(squareCssModule['is-filled']);
  await user.type(screen.getByTestId('board'), '{enter}');
  expect(
    letterElements[0]
  ).not.toHaveClass(squareCssModule['is-active']);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-filled']);
  await user.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-filled']);
  await user.type(screen.getByTestId('board'), '{delete}');
  expect(
    letterElements[0]
  ).toHaveClass(squareCssModule['is-active']);
  expect(
    letterElements[0]
  ).not.toHaveClass(squareCssModule['is-filled']);
});
