import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainLayout from '@/components/templates/MainLayout';

// Mock Navbar component
vi.mock('@components/organisms/Navbar', () => ({
  default: vi.fn(() => <header data-testid="navbar">Navbar</header>),
}));

// Mock ScrollToTop component
vi.mock('@components/atoms/ScrollToTop', () => ({
  default: vi.fn(() => <div data-testid="scroll-to-top">ScrollToTop</div>),
}));

// Mock Footer component (lazy loaded)
vi.mock('@components/organisms/Footer', () => ({
  default: vi.fn(() => <footer data-testid="footer">Footer</footer>),
}));

// Mock CookieConsent component (lazy loaded)
vi.mock('@components/organisms/CookieConsent', () => ({
  default: vi.fn(() => <div data-testid="cookie-consent">CookieConsent</div>),
}));

describe('MainLayout', () => {
  const defaultProps = {
    children: <div data-testid="child-content">Test Content</div>,
    isDarkMode: false,
    toggleTheme: vi.fn(),
    onOpenChallenges: vi.fn(),
    activeService: 'supplies' as const,
  };

  it('renders navbar', () => {
    render(<MainLayout {...defaultProps} />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<MainLayout {...defaultProps} />);
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders ScrollToTop component', () => {
    render(<MainLayout {...defaultProps} />);
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });

  it('renders CookieConsent component', () => {
    render(<MainLayout {...defaultProps} />);
    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(<MainLayout {...defaultProps} />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('applies dark mode class when isDarkMode is true', () => {
    const { container } = render(<MainLayout {...defaultProps} isDarkMode={true} />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('dark');
  });

  it('does not apply dark mode class when isDarkMode is false', () => {
    const { container } = render(<MainLayout {...defaultProps} isDarkMode={false} />);
    const wrapper = container.querySelector('div');
    expect(wrapper).not.toHaveClass('dark');
  });

  it('has min-h-screen styling', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('min-h-screen');
  });

  it('has transition-colors styling', () => {
    const { container } = render(<MainLayout {...defaultProps} />);
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('transition-colors');
  });
});