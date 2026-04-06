import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tooltip from '@components/atoms/Tooltip';

describe('Tooltip', () => {
  it('renders info icon', () => {
    const { container } = render(<Tooltip content="Helpful information" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders tooltip content on hover', () => {
    const { container } = render(<Tooltip content="Helpful information" />);
    const tooltipElement = container.querySelector('.group');
    expect(tooltipElement).toBeInTheDocument();
  });

  it('displays correct content', () => {
    const { container } = render(<Tooltip content="Test tooltip text" />);
    expect(container).toHaveTextContent('Test tooltip text');
  });

  it('applies proper icon styling', () => {
    const { container } = render(<Tooltip content="Info" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('w-3.5');
    expect(icon).toHaveClass('h-3.5');
    expect(icon).toHaveClass('text-secondary/60');
  });

  it('has tooltip with proper positioning', () => {
    const { container } = render(<Tooltip content="Positioned tooltip" />);
    const tooltipContent = container.querySelector('.absolute.top-full');
    expect(tooltipContent).toBeInTheDocument();
  });

  it('has invisible state by default', () => {
    const { container } = render(<Tooltip content="Hidden by default" />);
    const tooltip = container.querySelector('.opacity-0');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass('invisible');
  });

  it('has proper max-width constraint', () => {
    const { container } = render(<Tooltip content="Long tooltip content that should wrap" />);
    const tooltip = container.querySelector('.max-w-\\[150px\\]');
    expect(tooltip).toBeInTheDocument();
  });

  it('has arrow indicator', () => {
    const { container } = render(<Tooltip content="With arrow" />);
    const arrow = container.querySelector('.border-b-gray-900');
    expect(arrow).toBeInTheDocument();
  });

  it('applies proper z-index', () => {
    const { container } = render(<Tooltip content="High z-index" />);
    const tooltipContainer = container.querySelector('.z-\\[100\\]');
    expect(tooltipContainer).toBeInTheDocument();
  });

  it('has whitespace wrapping for long content', () => {
    const { container } = render(<Tooltip content="This is a very long tooltip that should wrap to multiple lines" />);
    const tooltip = container.querySelector('.whitespace-normal');
    expect(tooltip).toBeInTheDocument();
  });
});
