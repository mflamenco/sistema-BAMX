import React from 'react';
import { render, screen } from '@testing-library/react';
import TurnChange from './TurnChange';

test('renders learn react link', () => {
  render(<TurnChange />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
