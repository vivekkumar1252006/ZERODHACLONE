import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import Product from './landing_page/products/universe';
import Login from './landing_page/login/Login';
import Signup from './landing_page/signup/signup';
import About from './landing_page/about/aboutpage';
import Team from './landing_page/about/Team';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

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

test('clicking Continue with empty fields opens the dashboard', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(<Login />);

  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  expect(navigate).toHaveBeenCalledWith('/dashboard');
});

test('signup page keeps its video and Continue opens the dashboard without field changes', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(<Signup />);

  expect(screen.getAllByText('Sign up with your mobile number').length).toBe(1);
  expect(document.querySelectorAll("video source[src='/media/trading-side.mp4']")).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  expect(navigate).toHaveBeenCalledWith('/dashboard');
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
