import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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

test('the app has a board width the correct number of squares', () => {
  act(() => {
    render(<App />, container);
  });
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements.length
  ).toEqual(boardWidth * boardHeight);
});

test('toggling the "Can suggest filled square" switch works', () => {
  act(() => {
    render(<App />, container);
  });
  const labelRegex = /Can suggest filled square$/;
  const inputElement = screen.getByLabelText(labelRegex, { selector: 'input' });
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
  act(() => {
    userEvent.click(inputElement);
  });
  expect(
    inputElement.checked
  ).toEqual(false);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(26);
  act(() => {
    userEvent.click(inputElement);
  });
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
});

test('typing horizontally', () => {
  act(() => {
    render(<App />, container);
  });
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' });
  expect(
    inputElement.checked
  ).toEqual(false);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements[0]
  ).not.toHaveClass('is-active');
  act(() => {
    userEvent.click(letterElements[0]);
  });
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'D');
  });
  expect(
    letterElements[0].textContent
  ).toEqual('D');
  expect(
    letterElements[1]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'O');
  });
  expect(
    letterElements[1].textContent
  ).toEqual('O');
  expect(
    letterElements[2]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'G');
  });
  expect(
    letterElements[2].textContent
  ).toEqual('G');
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
});

test('typing vertically', () => {
  act(() => {
    render(<App />, container);
  });
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' });
  expect(
    inputElement.checked
  ).toEqual(false);
  act(() => {
    userEvent.click(inputElement);
  });
  expect(
    inputElement.checked
  ).toEqual(true);
  const letterElements = screen.queryAllByTestId(/^square-/);
  act(() => {
    userEvent.click(letterElements[0]);
  });
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'L');
  });
  expect(
    letterElements[0].textContent
  ).toEqual('L');
  expect(
    letterElements[3]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'A');
  });
  expect(
    letterElements[3].textContent
  ).toEqual('A');
  expect(
    letterElements[6]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'M');
  });
  expect(
    letterElements[6].textContent
  ).toEqual('M');
  expect(
    letterElements[9]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), 'B');
  });
  expect(
    letterElements[9].textContent
  ).toEqual('B');
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
});

test('navigating with arrow keys', () => {
  act(() => {
    render(<App />, container);
  });
  const letterElements = screen.queryAllByTestId(/^square-/);
  act(() => {
    userEvent.click(letterElements[0]);
  });
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowdown}');
  });
  expect(
    letterElements[3]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowleft}');
  });
  expect(
    letterElements[3]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowright}');
  });
  expect(
    letterElements[4]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowright}');
  });
  expect(
    letterElements[5]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowright}');
  });
  expect(
    letterElements[5]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowup}');
  });
  expect(
    letterElements[2]
  ).toHaveClass('is-active');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{arrowup}');
  });
  expect(
    letterElements[2]
  ).toHaveClass('is-active');
});

test('typing a filled square', () => {
  act(() => {
    render(<App />, container);
  });
  const letterElements = screen.queryAllByTestId(/^square-/);
  act(() => {
    userEvent.click(letterElements[0]);
  });
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  expect(
    letterElements[0]
  ).not.toHaveClass('is-filled');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{enter}');
  });
  expect(
    letterElements[0]
  ).not.toHaveClass('is-active');
  expect(
    letterElements[0]
  ).toHaveClass('is-filled');
  act(() => {
    userEvent.click(letterElements[0]);
  });
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  expect(
    letterElements[0]
  ).toHaveClass('is-filled');
  act(() => {
    userEvent.type(screen.getByTestId('board'), '{delete}');
  });
  expect(
    letterElements[0]
  ).toHaveClass('is-active');
  expect(
    letterElements[0]
  ).not.toHaveClass('is-filled');
});