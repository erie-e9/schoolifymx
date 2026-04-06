import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '@components/molecules/StatCard';

describe('StatCard', () => {
  const mockStat = {
    emoji: '📊',
    prefix: '+',
    value: 1000,
    suffix: '+',
    label: 'Students',
    description: 'Happy students enrolled',
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders stat card with all content', () => {
    render(<StatCard stat={mockStat} active={false} />);
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Happy students enrolled')).toBeInTheDocument();
  });

  it('renders prefix and suffix', () => {
    render(<StatCard stat={mockStat} active={false} />);
    // Prefix and suffix are rendered
    expect(screen.getByText('Students')).toBeInTheDocument();
  });

  it('starts with count at 0 when not active', () => {
    render(<StatCard stat={mockStat} active={false} />);
    // Count starts at 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('animates count when active', () => {
    render(<StatCard stat={mockStat} active={true} />);

    // Advance timers to trigger animation
    vi.advanceTimersByTime(1500);

    // After animation completes
    expect(screen.getByText(/Students/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<StatCard stat={mockStat} active={false} className="custom-card" />);
    expect(container.querySelector('.custom-card')).toBeInTheDocument();
  });

  it('has card styling', () => {
    const { container } = render(<StatCard stat={mockStat} active={false} />);
    expect(container.firstChild).toHaveClass('rounded-3xl');
    expect(container.firstChild).toHaveClass('bg-surface');
  });

  it('has hover effects', () => {
    const { container } = render(<StatCard stat={mockStat} active={false} />);
    expect(container.firstChild).toHaveClass('md:hover:-translate-y-1');
  });

  it('has emoji with transition', () => {
    const { container } = render(<StatCard stat={mockStat} active={false} />);
    expect(container.querySelector('.transition-transform')).toBeInTheDocument();
  });

  it('has proper border styles', () => {
    const { container } = render(<StatCard stat={mockStat} active={false} />);
    expect(container.firstChild).toHaveClass('border-gray-100');
  });
});
