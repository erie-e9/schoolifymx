import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@components/atoms/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant and size styles', () => {
    const { container } = render(<Button>Default</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('px-5');
  });

  it('applies custom variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.querySelector('button')).toHaveClass('bg-secondary');
  });

  it('applies custom size', () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.querySelector('button')).toHaveClass('px-6');
    expect(container.querySelector('button')).toHaveClass('py-4');
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders leftIcon when provided', () => {
    render(<Button leftIcon={<span data-testid="left-icon">←</span>}>With Icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightIcon when provided', () => {
    render(<Button rightIcon={<span data-testid="right-icon">→</span>}>With Icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('does not render icons when isLoading is true', () => {
    render(
      <Button isLoading leftIcon={<span data-testid="left-icon">←</span>}>
        Loading
      </Button>
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
  });

  it('passes through HTML props', () => {
    render(<Button type="submit" aria-label="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'submit');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>);
    expect(container.querySelector('button')).toHaveClass('custom-class');
  });

  it('applies icon size variant', () => {
    const { container } = render(<Button size="icon">📷</Button>);
    expect(container.querySelector('button')).toHaveClass('p-2.5');
  });

  it('applies outline variant styles', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.querySelector('button')).toHaveClass('border-[1px]');
  });

  it('applies ghost variant styles', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.querySelector('button')).toHaveClass('text-text-muted');
  });

  it('applies danger variant styles', () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    expect(container.querySelector('button')).toHaveClass('bg-red-500');
  });

  it('applies success variant styles', () => {
    const { container } = render(<Button variant="success">Success</Button>);
    expect(container.querySelector('button')).toHaveClass('bg-[#25D366]');
  });

  it('applies xs size styles', () => {
    const { container } = render(<Button size="xs">XS</Button>);
    expect(container.querySelector('button')).toHaveClass('text-[8px]');
  });

  it('applies sm size styles', () => {
    const { container } = render(<Button size="sm">SM</Button>);
    expect(container.querySelector('button')).toHaveClass('text-xs');
  });

  it('applies tertiary variant styles', () => {
    const { container } = render(<Button variant="tertiary">Third</Button>);
    expect(container.querySelector('button')).toHaveClass('bg-gray-100');
  });
});
