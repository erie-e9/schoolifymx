import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '@components/atoms/ScrollToTop';

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;
  const originalScrollHeight = document.documentElement.scrollHeight;
  const originalClientHeight = document.documentElement.clientHeight;
  const originalScrollTop = document.documentElement.scrollTop;

  beforeEach(() => {
    window.scrollTo = vi.fn();
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 2000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 0,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: originalScrollHeight,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: originalClientHeight,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: originalScrollTop,
    });
    vi.useRealTimers();
  });

  it('renders the scroll to top button', () => {
    render(<ScrollToTop />);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('is hidden by default (not scrolled)', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('pointer-events-none');
  });

  it('becomes visible after scrolling past threshold', () => {
    render(<ScrollToTop />);

    // Simulate scroll past 15% threshold
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 200,
    });

    fireEvent.scroll(window);
    vi.advanceTimersByTime(100);

    const button = screen.getByLabelText('Scroll to top');
    expect(button).toHaveClass('opacity-100');
    expect(button).not.toHaveClass('pointer-events-none');
  });

  it('hides when scrolling back to top', () => {
    render(<ScrollToTop />);

    // Scroll down to show button
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 500,
    });
    fireEvent.scroll(window);
    vi.advanceTimersByTime(100);

    // Scroll back up
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 0,
    });
    fireEvent.scroll(window);
    vi.advanceTimersByTime(100);

    const button = screen.getByLabelText('Scroll to top');
    expect(button).toHaveClass('opacity-0');
  });

  it('calls window.scrollTo on click', () => {
    render(<ScrollToTop />);

    // Make button visible
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 500,
    });
    fireEvent.scroll(window);
    vi.advanceTimersByTime(100);

    fireEvent.click(screen.getByLabelText('Scroll to top'));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('renders with ArrowUp icon', () => {
    render(<ScrollToTop />);
    // The button should contain an SVG icon
    const button = screen.getByLabelText('Scroll to top');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('has proper button styling', () => {
    render(<ScrollToTop />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toHaveClass('fixed');
    expect(button).toHaveClass('bottom-6');
    expect(button).toHaveClass('right-6');
    expect(button).toHaveClass('z-[60]');
  });
});
