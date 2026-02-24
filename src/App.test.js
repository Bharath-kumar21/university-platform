import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UniSearch India header', () => {
  render(<App />);
  const headerElements = screen.getAllByText(/UniSearch India/i);
  expect(headerElements.length).toBeGreaterThan(0);
});
