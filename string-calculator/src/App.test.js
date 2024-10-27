import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; 

test('renders String Calculator component', () => {
  render(<App />); 

  const heading = screen.getByText(/String Calculator/i);
  expect(heading).toBeInTheDocument();

  const inputBox = screen.getByPlaceholderText(/Enter numbers here.../i);
  expect(inputBox).toBeInTheDocument();

  const calculateButton = screen.getByRole('button', { name: /Calculate/i });
  expect(calculateButton).toBeInTheDocument();
});
