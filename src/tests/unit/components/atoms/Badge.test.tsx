import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '@components/atoms/Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant and size', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.querySelector('span')).toHaveClass('bg-primary');
    expect(container.querySelector('span')).toHaveClass('text-[10px]');
  });

  it('applies primary variant', () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    expect(container.querySelector('span')).toHaveClass('bg-primary');
    expect(container.querySelector('span')).toHaveClass('text-text-main');
  });

  it('applies secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.querySelector('span')).toHaveClass('bg-secondary');
    expect(container.querySelector('span')).toHaveClass('text-white');
  });

  it('applies success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.querySelector('span')).toHaveClass('bg-success/10');
    expect(container.querySelector('span')).toHaveClass('text-success');
    expect(container.querySelector('span')).toHaveClass('border-success/20');
  });

  it('applies warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.querySelector('span')).toHaveClass('bg-amber-100');
    expect(container.querySelector('span')).toHaveClass('text-amber-700');
  });

  it('applies info variant', () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    expect(container.querySelector('span')).toHaveClass('bg-blue-100');
    expect(container.querySelector('span')).toHaveClass('text-blue-700');
  });

  it('applies outline variant', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    expect(container.querySelector('span')).toHaveClass('border-gray-200');
    expect(container.querySelector('span')).toHaveClass('text-text-muted');
  });

  it('applies tag variant', () => {
    const { container } = render(<Badge variant="tag">Tag</Badge>);
    expect(container.querySelector('span')).toHaveClass('tag');
    expect(container.querySelector('span')).toHaveClass('font-200');
    expect(container.querySelector('span')).toHaveClass('p-12');
  });

  it('applies xs size', () => {
    const { container } = render(<Badge size="xs">XS</Badge>);
    expect(container.querySelector('span')).toHaveClass('text-[8px]');
    expect(container.querySelector('span')).toHaveClass('px-1.5');
  });

  it('applies sm size', () => {
    const { container } = render(<Badge size="sm">SM</Badge>);
    expect(container.querySelector('span')).toHaveClass('text-[10px]');
  });

  it('applies md size', () => {
    const { container } = render(<Badge size="md">MD</Badge>);
    expect(container.querySelector('span')).toHaveClass('text-xs');
    expect(container.querySelector('span')).toHaveClass('px-2');
  });

  it('applies lg size', () => {
    const { container } = render(<Badge size="lg">LG</Badge>);
    expect(container.querySelector('span')).toHaveClass('text-[14px]');
    expect(container.querySelector('span')).toHaveClass('px-4');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-badge">Custom</Badge>);
    expect(container.querySelector('span')).toHaveClass('custom-badge');
  });

  it('renders with multiple children', () => {
    render(
      <Badge>
        <span>Icon</span> Text
      </Badge>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
