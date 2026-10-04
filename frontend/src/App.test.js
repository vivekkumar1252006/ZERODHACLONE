import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import Product from './landing_page/products/universe';
import Login from './landing_page/login/Login';
import Signup from './landing_page/signup/signup';
import About from './landing_page/about/aboutpage';
import Team from './landing_page/about/Team';
import Dashboard from './dashboard/Dashboard';
import { apiRequest, AUTH_TOKEN_KEY } from './api';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('./api', () => ({
  apiRequest: jest.fn(),
  AUTH_TOKEN_KEY: 'zerodha.authToken',
}));

beforeEach(() => {
  apiRequest.mockReset();
  sessionStorage.clear();
});

test('renders homepage content', () => {
  render(<App />);
  expect(screen.getByText(/Open Account/i)).toBeInTheDocument();
  expect(screen.getAllByAltText('Zerodha awards')[0]).toHaveAttribute(
    'src',
    '/media/home-awards-trophy.jpeg'
  );
  expect(screen.getByAltText('Zerodha trust and support')).toHaveAttribute(
    'src',
    '/media/home-trust-universe.jpeg'
  );
  expect(screen.getByAltText('Education')).toHaveAttribute(
    'src',
    '/media/home-education-varsity.jpeg'
  );

  const localImageSources = screen
    .getAllByRole('img')
    .map((image) => image.getAttribute('src'))
    .filter((source) => source.startsWith('/media/'));
  expect(localImageSources.every((source) => !source.includes(' '))).toBe(true);
});

test('renders product page console section', () => {
  render(<Product />);
  expect(screen.getByText(/Console/i)).toBeInTheDocument();
});

test('login verifies the account before opening the dashboard', async () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  apiRequest.mockResolvedValue({ token: 'session-token' });
  render(<Login />);

  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Continue' }).closest('form'));

  await waitFor(() => expect(navigate).toHaveBeenCalledWith('/dashboard'));
  expect(apiRequest).toHaveBeenCalledWith('/api/auth/login', {
    method: 'POST',
    body: { email: 'user@example.com', password: 'password123' },
  });
  expect(sessionStorage.getItem(AUTH_TOKEN_KEY)).toBe('session-token');
});

test('signup keeps its video and creates an account before opening the dashboard', async () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  apiRequest.mockResolvedValue({ token: 'new-session-token' });
  render(<Signup />);

  expect(screen.getByText('Create your account')).toBeInTheDocument();
  expect(document.querySelectorAll("video source[src='/media/trading-side.mp4']")).toHaveLength(2);
  fireEvent.change(screen.getByLabelText('Mobile number'), { target: { value: '9876543210' } });
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'password123' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Continue' }).closest('form'));

  await waitFor(() => expect(navigate).toHaveBeenCalledWith('/dashboard'));
  expect(apiRequest).toHaveBeenCalledWith('/api/auth/signup', {
    method: 'POST',
    body: { mobile: '9876543210', email: 'user@example.com', password: 'password123' },
  });
  expect(sessionStorage.getItem(AUTH_TOKEN_KEY)).toBe('new-session-token');
});

test('signup rejects mismatched passwords without calling the backend', async () => {
  render(<Signup />);
  fireEvent.change(screen.getByLabelText('Mobile number'), { target: { value: '9876543210' } });
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'different123' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Continue' }).closest('form'));

  expect(await screen.findByRole('alert')).toHaveTextContent('Passwords do not match');
  expect(apiRequest).not.toHaveBeenCalled();
});

test('dashboard loads the signed-in user holdings from the backend', async () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  sessionStorage.setItem(AUTH_TOKEN_KEY, 'session-token');
  apiRequest.mockImplementation((path, options = {}) => {
    if (path === '/api/auth/me') {
      return Promise.resolve({ user: { email: 'user@example.com' } });
    }
    if (path === '/api/holdings' && options.method === 'POST') {
      return Promise.resolve({
        _id: 'holding-2',
        name: 'GOOGL',
        qty: 3,
        price: 150,
        avg: 140,
      });
    }
    return Promise.resolve([{ _id: 'holding-1', name: 'INFY', qty: 2, price: 120, avg: 100 }]);
  });

  render(<Dashboard />);

  expect((await screen.findAllByText('INFY')).length).toBeGreaterThan(0);
  expect(screen.getByText('1 saved instrument')).toBeInTheDocument();
  expect(apiRequest).toHaveBeenCalledWith('/api/auth/me');
  expect(apiRequest).toHaveBeenCalledWith('/api/holdings');

  fireEvent.change(screen.getByLabelText('Symbol'), { target: { value: 'GOOGL' } });
  fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText('Current price (₹)'), { target: { value: '150' } });
  fireEvent.change(screen.getByLabelText('Average price (₹)'), { target: { value: '140' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Save holding' }).closest('form'));

  expect((await screen.findAllByText('GOOGL')).length).toBeGreaterThan(0);
  expect(apiRequest).toHaveBeenCalledWith('/api/holdings', {
    method: 'POST',
    body: { name: 'GOOGL', qty: '3', price: '150', avg: '140' },
  });
});

test('product page uses local image assets without spaced URLs', () => {
  render(<Product />);

  expect(screen.getByAltText('Console trading dashboard')).toHaveAttribute(
    'src',
    '/media/product-console.jpeg'
  );
  expect(screen.getByAltText('Coin mutual fund experience')).toHaveAttribute(
    'src',
    '/media/product-coin.jpeg'
  );
  expect(screen.getByAltText('Ditto')).toHaveAttribute(
    'src',
    '/media/partner-ditto.jpeg'
  );
  const imageSources = screen.getAllByRole('img').map((image) => image.getAttribute('src'));
  expect(imageSources.every((source) => !source.includes(' '))).toBe(true);
  expect(
    imageSources.filter((source) => source.startsWith('/media/') && !source.endsWith('/logo.png'))
  ).toHaveLength(11);
});

test('About page and homepage founder portraits use the local image path', () => {
  const { unmount } = render(<About />);
  expect(screen.getByAltText('Nithin Kamath, founder and CEO of Zerodha')).toHaveAttribute(
    'src',
    '/media/about-founder.jpeg'
  );

  unmount();
  render(<Team />);
  expect(screen.getByAltText('Nithin Kamath, founder of Zerodha')).toHaveAttribute(
    'src',
    '/media/about-founder.jpeg'
  );
});
