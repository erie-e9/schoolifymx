import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuantityControl from '@components/molecules/QuantityControl';

describe('QuantityControl', () => {
  const defaultProps = {
    qty: 5,
    onIncrement: vi.fn(),
    onDecrement: vi.fn(),
  };

  it('renders quantity correctly', () => {
    render(<QuantityControl {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onIncrement when plus button is clicked', () => {
    render(<QuantityControl {...defaultProps} />);
    const plusButton = screen.getByLabelText('Aumentar cantidad');
    fireEvent.click(plusButton);
    expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when minus button is clicked', () => {
    render(<QuantityControl {...defaultProps} />);
    const minusButton = screen.getByLabelText('Disminuir cantidad');
    fireEvent.click(minusButton);
    expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
  });

  it('applies small size styles when size is sm', () => {
    const { container } = render(<QuantityControl {...defaultProps} size="sm" />);
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      expect(btn).toHaveClass('w-6', 'h-6');
    });
  });

  it('applies medium size styles by default', () => {
    const { container } = render(<QuantityControl {...defaultProps} />);
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      expect(btn).toHaveClass('h-7', 'w-7');
    });
  });

  it('applies custom className', () => {
    const { container } = render(<QuantityControl {...defaultProps} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('renders with default styling', () => {
    const { container } = render(<QuantityControl {...defaultProps} />);
    expect(container.querySelector('.bg-gray-100')).toBeInTheDocument();
    expect(container.querySelector('.rounded-lg')).toBeInTheDocument();
  });

  it('has proper dark mode styles', () => {
    const { container } = render(<QuantityControl {...defaultProps} />);
    expect(container.querySelector('.dark\\:bg-white\\/10')).toBeInTheDocument();
  });

  it('renders minus icon', () => {
    const { container } = render(<QuantityControl {...defaultProps} />);
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('stops propagation on decrement button click', () => {
    const parentClick = vi.fn();
    const { container } = render(
      <div onClick={parentClick}>
        <QuantityControl {...defaultProps} />
      </div>
    );
    const minusButton = container.querySelector('button[aria-label="Disminuir cantidad"]');
    fireEvent.click(minusButton!);
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('stops propagation on increment button click', () => {
    const parentClick = vi.fn();
    const { container } = render(
      <div onClick={parentClick}>
        <QuantityControl {...defaultProps} />
      </div>
    );
    const plusButton = container.querySelector('button[aria-label="Aumentar cantidad"]');
    fireEvent.click(plusButton!);
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('displays quantity with proper font styling', () => {
    const { container } = render(<QuantityControl {...defaultProps} />);
    const qtySpan = container.querySelector('span.font-bold');
    expect(qtySpan).toBeInTheDocument();
  });

  it('applies small text size for sm variant', () => {
    const { container } = render(<QuantityControl {...defaultProps} size="sm" />);
    const qtySpan = container.querySelector('span');
    expect(qtySpan).toHaveClass('text-xs');
  });
});
