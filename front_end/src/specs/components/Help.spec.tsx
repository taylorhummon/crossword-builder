import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Help from '../../components/Help';


const accordionLabelText = 'Need help?';
const accordionBodyRegex = /^Want to write a crossword puzzle\?/;

it('renders the label text', () => {
  render(<Help />);
  expect(
    screen.queryByText(accordionLabelText)
  ).toBeTruthy();
});

it('does not show the accordion body by default', () => {
  render(<Help />);
  const accordionBody = screen.queryByText(accordionBodyRegex);
  expect(
    accordionBody
  ).toBeTruthy();
  expect(
    accordionBody
  ).not.toBeVisible();
});

it('toggles the accordion body on and off by clicking the accordion label', () => {
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
  userEvent.click(htmlElement);
  expect(
    accordionBody
  ).toBeVisible();
  htmlElement = screen.queryByText(accordionLabelText)
  expect(
    htmlElement
  ).toBeTruthy();
  if (! htmlElement) return;
  userEvent.click(htmlElement);
  expect(
    accordionBody
  ).not.toBeVisible();
});
