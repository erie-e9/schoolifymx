import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CookieConsent from '@components/organisms/CookieConsent';

// Mock GSAP with proper animation handling
vi.mock('gsap', async (importOriginal) => {
  const actual = await importOriginal();
  const mockGsap = {
    ...(actual as any).default,
    fromTo: vi.fn((_target, _fromVars, toVars) => {
      if (toVars?.onComplete) toVars.onComplete();
      return { then: vi.fn() };
    }),
    to: vi.fn((_target, vars) => {
      if (vars?.onComplete) vars.onComplete();
      return { then: vi.fn() };
    }),
  };
  
  return {
    ...(actual as any),
    default: mockGsap,
    gsap: mockGsap,
  };
});

describe('CookieConsent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('does not render when consent is already given', () => {
    localStorage.setItem('cookie-consent', 'true');
    const { container } = render(<CookieConsent />);
    expect(container.firstChild).toBeNull();
  });

  it('renders after delay when no consent is given', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    // Before delay
    expect(screen.queryByText('Aviso de Cookies')).not.toBeInTheDocument();

    // After delay
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Aviso de Cookies')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('renders cookie icon and title', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Aviso de Cookies')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders accept and decline buttons', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Rechazar')).toBeInTheDocument();
    expect(screen.getByText('Aceptar todo')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('renders description text', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/Utilizamos cookies para personalizar/)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('has proper container styling', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const container = screen.getByText('Aviso de Cookies').closest('.fixed');
    expect(container).toHaveClass('bottom-6');
    expect(container).toHaveClass('z-[201]');

    vi.useRealTimers();
  });

  it('stores consent in localStorage when accept is clicked', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const acceptButton = screen.getByText('Aceptar todo');
    await act(async () => {
      fireEvent.click(acceptButton);
    });

    expect(localStorage.getItem('cookie-consent')).toBe('true');

    vi.useRealTimers();
  });

  it('stores consent in localStorage when decline is clicked', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const declineButton = screen.getByText('Rechazar');
    await act(async () => {
      fireEvent.click(declineButton);
    });

    expect(localStorage.getItem('cookie-consent')).toBe('false');

    vi.useRealTimers();
  });

  it('hides banner after accepting', async () => {
    vi.useFakeTimers();
    render(<CookieConsent />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const acceptButton = screen.getByText('Aceptar todo');
    await act(async () => {
      fireEvent.click(acceptButton);
    });

    // Banner should be hidden after animation
    expect(screen.queryByText('Aviso de Cookies')).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});