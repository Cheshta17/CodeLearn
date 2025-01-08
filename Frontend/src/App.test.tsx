import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const homeElement = screen.getByText(/CodeLearn/i);
  expect(homeElement).toBeInTheDocument();
});

