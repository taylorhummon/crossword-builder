import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Help from 'src/components/help/Help';


const accordionLabelText = 'Need help?';
const accordionBodyRegex = /^Want to write a crossword puzzle\?/;

test('<Help> renders the label text', () => {
  render(<Help />);
  expect(
    screen.queryByText(accordionLabelText)
  ).toBeTruthy();
});

test('<Help> renders the label text', () => {
  render(<Help />);
  expect(
    screen.queryByText(accordionLabelText)
  ).toBeTruthy();
});

test('<Help> does not show the accordion body by default', () => {
  render(<Help />);
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
});

test('<Help> toggles the accordion body on and off by clicking the accordion label', async () => {
  const user = userEvent.setup();
  render(<Help />);
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
  let htmlElement = null;
  htmlElement = screen.queryByText(accordionLabelText);
  expect(
    htmlElement
  ).toBeTruthy();
  if (! htmlElement) return;
  await user.click(htmlElement);
  expect(
    accordionBody
  ).toBeVisible();
  htmlElement = screen.queryByText(accordionLabelText)
  expect(
    htmlElement
  ).toBeTruthy();
  if (! htmlElement) return;
  await user.click(htmlElement);
  expect(
    accordionBody
  ).not.toBeVisible();
});
