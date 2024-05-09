import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Help from '../../components/Help';

const accordionLabelText = 'Need help?';
const accordionBodyRegex = /^Want to write a crossword puzzle\?/;

it('renders the label text', async () => {
  render(<Help />);
  expect(
    screen.queryByText(accordionLabelText)
  ).toBeTruthy();
});

it('does not show the accordion body by default', async () => {
  render(<Help />);
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
});

it('toggles the accordion body on and off by clicking the accordion label', async () => {
  render(<Help />);
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
  await userEvent.click(screen.queryByText(accordionLabelText));
  expect(
    accordionBody
  ).toBeVisible();
  await userEvent.click(screen.queryByText(accordionLabelText));
  expect(
    accordionBody
  ).not.toBeVisible();
});
