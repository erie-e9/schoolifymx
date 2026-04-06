import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@components/atoms/Input';

describe('Input', () => {
  it('renders without label by default', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-red-500');
  });

  it('applies error border style when error is present', () => {
    const { container } = render(<Input error="Invalid" />);
    expect(container.querySelector('input')).toHaveClass('border-red-500');
  });

  it('renders leftIcon when provided', () => {
    render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightIcon when provided', () => {
    render(<Input rightIcon={<span data-testid="right-icon">✕</span>} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies left padding when leftIcon is present', () => {
    const { container } = render(<Input leftIcon={<span>🔍</span>} />);
    expect(container.querySelector('input')).toHaveClass('pl-10');
  });

  it('applies right padding when rightIcon is present', () => {
    const { container } = render(<Input rightIcon={<span>✕</span>} />);
    expect(container.querySelector('input')).toHaveClass('pr-10');
  });

  it('passes through HTML input props', () => {
    render(
      <Input
        type="email"
        placeholder="Enter email"
        required
        disabled
        id="email-input"
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom container className', () => {
    const { container } = render(<Input containerClassName="custom-container" />);
    expect(container.querySelector('.custom-container')).toBeInTheDocument();
  });

  it('applies custom input className', () => {
    const { container } = render(<Input className="custom-input" />);
    expect(container.querySelector('.custom-input')).toBeInTheDocument();
  });

  it('renders with default styles', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('input')).toHaveClass('bg-gray-100');
    expect(container.querySelector('input')).toHaveClass('rounded-xl');
    expect(container.querySelector('input')).toHaveClass('text-sm');
  });

  it('links label to input with htmlFor', () => {
    render(<Input label="Username" id="username" />);
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('does not show error message when error is undefined', () => {
    render(<Input />);
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});
