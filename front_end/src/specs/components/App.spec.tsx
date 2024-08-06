import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BOARD_WIDTH, BOARD_HEIGHT } from '../../lib/constants';
import App from '../../components/App';


jest.mock('../../lib/constants', () => {
  // using a non-square board for testing
  return {
    BOARD_WIDTH: 3,
    BOARD_HEIGHT: 4,
    FILLED_SQUARE_CHARACTER: '~'
  };
});

jest.mock('../../models/fetchSuggestions', () => {
  return {
    fetchSuggestions() {
      return [];
    }
  };
});


test('the app has a board width the correct number of squares', () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements.length
  ).toEqual(BOARD_WIDTH * BOARD_HEIGHT);
});

test('toggling the "Can suggest filled square" switch works', () => {
  render(<App />);
  const labelRegex = /Can suggest filled square$/;
  const inputElement = screen.getByLabelText(labelRegex, { selector: 'input' }) as HTMLInputElement;
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
  userEvent.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(false);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(26);
  userEvent.click(inputElement);
  expect(
    inputElement.checked
  ).toEqual(true);
  expect(
    screen.queryAllByTestId(/^suggestion-/).length
  ).toEqual(27);
});

test('typing horizontally', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' }) as HTMLInputElement;
  expect(
    inputElement.checked
  ).toEqual(false);
  const letterElements = screen.queryAllByTestId(/^square-/);
  expect(
    letterElements[0]
  ).not.toHaveClass('is-active');
  userEvent.click(letterElements[0]);
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'D');
  await waitFor(async () => {
    expect(
      letterElements[0].textContent
    ).toEqual('D');
    expect(
      letterElements[1]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'O');
  await waitFor(async () => {
    expect(
      letterElements[1].textContent
    ).toEqual('O');
    expect(
      letterElements[2]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'G');
  await waitFor(async () => {
    expect(
      letterElements[2].textContent
    ).toEqual('G');
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
  });
});

test('typing vertically', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Type vertically$/, { selector: 'input' }) as HTMLInputElement;
  expect(
    inputElement.checked
  ).toEqual(false);
  userEvent.click(inputElement);
  await waitFor(async () => {
    expect(
      inputElement.checked
    ).toEqual(true);
  });
  const letterElements = screen.queryAllByTestId(/^square-/);
  userEvent.click(letterElements[0]);
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'L');
  await waitFor(async () => {
    expect(
      letterElements[0].textContent
    ).toEqual('L');
    expect(
      letterElements[3]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'A');
  await waitFor(async () => {
    expect(
      letterElements[3].textContent
    ).toEqual('A');
    expect(
      letterElements[6]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'M');
  await waitFor(async () => {
    expect(
      letterElements[6].textContent
    ).toEqual('M');
    expect(
      letterElements[9]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), 'B');
  await waitFor(async () => {
    expect(
      letterElements[9].textContent
    ).toEqual('B');
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
  });
});

test('navigating with arrow keys', async () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  userEvent.click(letterElements[0]);
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowdown}');
  await waitFor(async () => {
    expect(
      letterElements[3]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowleft}');
  await waitFor(async () => {
    expect(
      letterElements[3]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowright}');
  await waitFor(async () => {
    expect(
      letterElements[4]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowright}');
  await waitFor(async () => {
    expect(
      letterElements[5]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowright}');
  await waitFor(async () => {
    expect(
      letterElements[5]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowup}');
  await waitFor(async () => {
    expect(
      letterElements[2]
    ).toHaveClass('is-active');
  });
  userEvent.type(screen.getByTestId('board'), '{arrowup}');
  await waitFor(async () => {
    expect(
      letterElements[2]
    ).toHaveClass('is-active');
  });
});

test('typing a filled square', async () => {
  render(<App />);
  const letterElements = screen.queryAllByTestId(/^square-/);
  userEvent.click(letterElements[0]);
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
    expect(
      letterElements[0]
    ).not.toHaveClass('is-filled');
  });
  userEvent.type(screen.getByTestId('board'), '{enter}');
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).not.toHaveClass('is-active');
    expect(
      letterElements[0]
    ).toHaveClass('is-filled');
  });
  userEvent.click(letterElements[0]);
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
    expect(
      letterElements[0]
    ).toHaveClass('is-filled');
  });
  userEvent.type(screen.getByTestId('board'), '{delete}');
  await waitFor(async () => {
    expect(
      letterElements[0]
    ).toHaveClass('is-active');
    expect(
      letterElements[0]
    ).not.toHaveClass('is-filled');
  });
});
