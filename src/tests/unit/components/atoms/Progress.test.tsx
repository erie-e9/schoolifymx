import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Progress from '@components/atoms/Progress';

describe('Progress', () => {
  it('renders progress bar correctly', () => {
    const { container } = render(<Progress value={50} max={100} />);
    expect(container.querySelector('.rounded-full')).toBeInTheDocument();
  });

  it('calculates percentage correctly', () => {
    const { container } = render(<Progress value={50} max={100} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveAttribute('style', 'width: 50%;');
  });

  it('caps percentage at 100%', () => {
    const { container } = render(<Progress value={150} max={100} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveAttribute('style', 'width: 100%;');
  });

  it('shows labels when showLabels is true', () => {
    render(<Progress value={50} max={100} showLabels />);
    expect(screen.getByText('Progreso')).toBeInTheDocument();
    expect(screen.getByText('50 / 100')).toBeInTheDocument();
  });

  it('hides labels when showLabels is false', () => {
    render(<Progress value={50} max={100} showLabels={false} />);
    expect(screen.queryByText('Progreso')).not.toBeInTheDocument();
  });

  it('applies default variant (secondary)', () => {
    const { container } = render(<Progress value={50} max={100} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveClass('bg-secondary');
  });

  it('applies primary variant', () => {
    const { container } = render(<Progress value={50} max={100} variant="primary" />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveClass('bg-primary');
  });

  it('applies custom className', () => {
    const { container } = render(<Progress value={50} max={100} className="custom-progress" />);
    expect(container.querySelector('.custom-progress')).toBeInTheDocument();
  });

  it('renders with zero value', () => {
    const { container } = render(<Progress value={0} max={100} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveAttribute('style', 'width: 0%;');
  });

  it('renders progress bar container with proper styling', () => {
    const { container } = render(<Progress value={50} max={100} />);
    const progressContainer = container.querySelector('.rounded-full');
    expect(progressContainer).toHaveClass('bg-gray-200');
    expect(progressContainer).toHaveClass('overflow-hidden');
  });

  it('has transition styles for smooth animation', () => {
    const { container } = render(<Progress value={50} max={100} />);
    const progressBar = container.querySelector('.h-full');
    expect(progressBar).toHaveClass('transition-all');
    expect(progressBar).toHaveClass('duration-1000');
  });
});
