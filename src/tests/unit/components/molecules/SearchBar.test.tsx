import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@components/molecules/SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  };

  it('renders input field', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar {...defaultProps} placeholder="Search items..." />);
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<SearchBar {...defaultProps} value="test" />);
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<SearchBar {...defaultProps} onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('renders search icon', () => {
    const { container } = render(<SearchBar {...defaultProps} />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('applies custom className', () => {
    const { container } = render(<SearchBar {...defaultProps} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('renders rightElement when provided', () => {
    render(<SearchBar {...defaultProps} rightElement={<button data-testid="right-btn">Action</button>} />);
    expect(screen.getByTestId('right-btn')).toBeInTheDocument();
  });

  it('uses flex layout', () => {
    const { container } = render(<SearchBar {...defaultProps} />);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('gap-2');
  });

  it('has flexible input container', () => {
    const { container } = render(<SearchBar {...defaultProps} />);
    expect(container.querySelector('.flex-1')).toBeInTheDocument();
  });
});
