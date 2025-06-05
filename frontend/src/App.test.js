import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sign in form by default', () => {
  render(<App />);
  const legends = screen.getAllByText(/sign in/i);
  expect(legends.length).toBeGreaterThan(0);
});
