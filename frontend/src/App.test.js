import { fireEvent, render, screen } from '@testing-library/react';
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

test('login opens the demo dashboard directly and keeps the trading video background', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(<Login />);

  expect(document.querySelector('.login-background-video video source')).toHaveAttribute(
    'src',
    '/media/trading-side.mp4'
  );
  expect(screen.getByRole('button', { name: 'Continue' }).form).toHaveAttribute('novalidate');
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  expect(navigate).toHaveBeenCalledWith('/dashboard');
  expect(apiRequest).not.toHaveBeenCalled();
  expect(sessionStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
});

test('signup opens the demo dashboard directly and keeps its video', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(<Signup />);

  expect(screen.getByText('Create your account')).toBeInTheDocument();
  expect(document.querySelectorAll("video source[src='/media/trading-side.mp4']")).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  expect(navigate).toHaveBeenCalledWith('/dashboard');
  expect(apiRequest).not.toHaveBeenCalled();
  expect(sessionStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
});

test('dashboard opens without login and displays the original demo portfolio', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  render(<Dashboard />);

  expect(screen.getByText('Available margin')).toBeInTheDocument();
  expect(screen.getByText('Market open')).toBeInTheDocument();
  expect(apiRequest).not.toHaveBeenCalled();
  expect(navigate).not.toHaveBeenCalled();
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
