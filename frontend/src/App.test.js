import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sign in form', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/sign in/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
