import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Help from '../../components/Help';

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

const accordionLabelText = 'Need help?';
const accordionBodyRegex = /^Want to write a crossword puzzle\?/;

it('renders the label text', () => {
  act(() => {
    render(<Help />, container);
  });
  expect(
    screen.queryByText(accordionLabelText)
  ).toBeTruthy();
});

it('does not show the accordion body by default', () => {
  act(() => {
    render(<Help />, container);
  });
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
});

it('toggles the accordion body on and off by clicking the accordion label', () => {
  act(() => {
    render(<Help />, container);
  });
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
  act(() => {
    userEvent.click(screen.queryByText(accordionLabelText));
  });
  expect(
    accordionBody
  ).toBeVisible();
  act(() => {
    userEvent.click(screen.queryByText(accordionLabelText));
  });
  expect(
    accordionBody
  ).not.toBeVisible();
});
