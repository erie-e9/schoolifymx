import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@pages/Home';
import { useTheme } from '@hooks/useTheme';

// Mock useTheme
vi.mock('@hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

// Mock organisms to avoid lazy loading issues and focus on Home logic
vi.mock('@components/organisms/Hero', () => ({
  default: ({ activeService, setActiveService }: any) => (
    <div data-testid="hero">
      Hero - {activeService}
      <button onClick={() => setActiveService('supplies')}>Switch to Supplies</button>
    </div>
  )
}));

vi.mock('@components/organisms/Process', () => ({ default: () => <div data-testid="process" /> }));
vi.mock('@components/organisms/CtaMid', () => ({ default: ({ activeService }: any) => <div data-testid="cta-mid">{activeService}</div> }));
vi.mock('@components/organisms/Stats', () => ({ default: () => <div data-testid="stats" /> }));
vi.mock('@components/organisms/DailyChallenges', () => ({
  default: ({ isOpen, onClose }: any) => isOpen ? (
    <div data-testid="challenges">
      Challenges
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
}));
vi.mock('@components/organisms/FAQ', () => ({ default: () => <div data-testid="faq" /> }));
vi.mock('@components/organisms/FinalCTA', () => ({ default: () => <div data-testid="final-cta" /> }));

// Mock MainLayout
vi.mock('@components/templates/MainLayout', () => ({
  default: ({ children, onOpenChallenges }: any) => (
    <div data-testid="main-layout">
      <button onClick={onOpenChallenges}>Open Challenges</button>
      {children}
    </div>
  )
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      isDark: false,
      toggleDarkMode: vi.fn(),
    } as any);
  });

  it('renders correctly with initial service', async () => {
    render(<Home />);
    
    expect(screen.getByTestId('hero')).toHaveTextContent('uniforms');
    
    // Since sections are lazy, they might need a tick or Suspense wait
    // But we mocked them, so they should be sync if we didn't use React.lazy in the mock
    await waitFor(() => {
      expect(screen.getByTestId('process')).toBeInTheDocument();
      expect(screen.getByTestId('cta-mid')).toHaveTextContent('uniforms');
    });
  });

  it('updates active service when Hero calls setActiveService', async () => {
    render(<Home />);
    
    const switchBtn = screen.getByText('Switch to Supplies');
    fireEvent.click(switchBtn);
    
    expect(screen.getByTestId('hero')).toHaveTextContent('supplies');
    expect(screen.getByTestId('cta-mid')).toHaveTextContent('supplies');
  });

  it('opens and closes daily challenges', async () => {
    render(<Home />);
    
    // Open
    fireEvent.click(screen.getByText('Open Challenges'));
    expect(screen.getByTestId('challenges')).toBeInTheDocument();
    
    // Close
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('challenges')).not.toBeInTheDocument();
  });
});