import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Clipboard } from 'lucide-react';
import ProcessStep from '@components/molecules/ProcessStep';

describe('ProcessStep', () => {
  const defaultProps = {
    icon: Clipboard,
    number: '01',
    title: 'Step Title',
    description: 'Step description text',
    color: 'bg-primary',
  };

  it('renders all content correctly', () => {
    render(<ProcessStep {...defaultProps} />);
    expect(screen.getByText('Step Title')).toBeInTheDocument();
    expect(screen.getByText('Step description text')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders icon', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies color to icon container', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.querySelector('.bg-primary')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ProcessStep {...defaultProps} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('has card styling', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('rounded-[2rem]');
  });

  it('has hover effect class', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.firstChild).toHaveClass('hover:-translate-y-2');
  });

  it('has proper border styles', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.firstChild).toHaveClass('border-gray-100');
  });

  it('displays number with proper styling', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    const numberEl = container.querySelector('.font-800.text-4xl');
    expect(numberEl).toBeInTheDocument();
  });

  it('has icon container with rounded corners', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.querySelector('.rounded-xl')).toBeInTheDocument();
  });

  it('has proper text hierarchy', () => {
    const { container } = render(<ProcessStep {...defaultProps} />);
    expect(container.querySelector('h3')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeInTheDocument();
  });
});
