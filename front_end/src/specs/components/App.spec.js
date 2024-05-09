import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../../components/App';
import { boardWidth, boardHeight } from '../../utilities/boardSize';

jest.mock('../../utilities/boardSize', () => {
  // using a non-square board for testing
  return {
    boardWidth: 3,
    boardHeight: 4
  };
});

jest.mock('../../utilities/server', () => {
  return {
    fetchSuggestions() {
      return Promise.resolve([]);
    }
  };
});

test('the app has a board width the correct number of squares', async () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements.length
  ).toEqual(boardWidth * boardHeight);
});

test('toggling the "Can suggest filled square" switch works', async () => {
  render(<App />);
  const labelRegex = /Can suggest filled square$/;
  const inputElement = screen.getByLabelText(labelRegex, { selector: 'input' });
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
  await userEvent.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(false);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(26);
  await userEvent.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
});

test('typing horizontally', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' });
  expect(
    inputElement.checked
  ).toEqual(false);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements[0]
  ).not.toHaveClass('is-active');
  await userEvent.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'D');
  expect(
    letterElements[0].textContent
  ).toEqual('D');
  expect(
    letterElements[1]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'O');
  expect(
    letterElements[1].textContent
  ).toEqual('O');
  expect(
    letterElements[2]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'G');
  expect(
    letterElements[2].textContent
  ).toEqual('G');
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
});

test('typing vertically', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' });
  expect(
    inputElement.checked
  ).toEqual(false);
  await userEvent.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(true);
  const letterElements = screen.queryAllByTestId(/^square-/);
  await userEvent.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'L');
  expect(
    letterElements[0].textContent
  ).toEqual('L');
  expect(
    letterElements[3]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'A');
  expect(
    letterElements[3].textContent
  ).toEqual('A');
  expect(
    letterElements[6]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'M');
  expect(
    letterElements[6].textContent
  ).toEqual('M');
  expect(
    letterElements[9]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), 'B');
  expect(
    letterElements[9].textContent
  ).toEqual('B');
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
});

test('navigating with arrow keys', async () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  await userEvent.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowdown}');
  expect(
    letterElements[3]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowleft}');
  expect(
    letterElements[3]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowright}');
  expect(
    letterElements[4]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowright}');
  expect(
    letterElements[5]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowright}');
  expect(
    letterElements[5]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowup}');
  expect(
    letterElements[2]
  ).toHaveClass('is-active');
  await userEvent.type(screen.getByTestId('board'), '{arrowup}');
  expect(
    letterElements[2]
  ).toHaveClass('is-active');
});

test('typing a filled square', async () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  await userEvent.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  expect(
    letterElements[0]
  ).not.toHaveClass('is-filled');
  await userEvent.type(screen.getByTestId('board'), '{enter}');
  expect(
    letterElements[0]
  ).not.toHaveClass('is-active');
  expect(
    letterElements[0]
  ).toHaveClass('is-filled');
  await userEvent.click(letterElements[0]);
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  expect(
    letterElements[0]
  ).toHaveClass('is-filled');
  await userEvent.type(screen.getByTestId('board'), '{delete}');
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  expect(
    letterElements[0]
  ).not.toHaveClass('is-filled');
});
