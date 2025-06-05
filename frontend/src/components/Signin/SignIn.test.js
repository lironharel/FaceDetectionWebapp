import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signin from './SignIn';

describe('Signin', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('shows error message on failed login', async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ error: 'invalid credentials' })
    });

    render(<Signin loadUser={jest.fn()} setRoute={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'bad' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => screen.getByText(/invalid credentials/i));
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('calls loadUser on successful login', async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ user: { id: 1 } })
    });

    const loadUser = jest.fn();
    const setRoute = jest.fn();
    render(<Signin loadUser={loadUser} setRoute={setRoute} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'good' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(loadUser).toHaveBeenCalled());
  });
});
