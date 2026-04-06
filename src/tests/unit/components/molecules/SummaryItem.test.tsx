import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SummaryItem from '@components/molecules/SummaryItem';

describe('SummaryItem', () => {
  const defaultProps = {
    id: '1',
    name: 'Test Item',
    qty: 2,
    note: '',
    onUpdateQuantity: vi.fn(),
    onUpdateNote: vi.fn(),
  };

  it('renders item name', () => {
    render(<SummaryItem {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('renders quantity', () => {
    render(<SummaryItem {...defaultProps} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders category name when provided', () => {
    render(<SummaryItem {...defaultProps} categoryName="School Supplies" />);
    expect(screen.getByText('School Supplies')).toBeInTheDocument();
  });

  it('renders note input', () => {
    render(<SummaryItem {...defaultProps} />);
    expect(screen.getByPlaceholderText('Incluir nota (marca, color…)')).toBeInTheDocument();
  });

  it('displays note value', () => {
    render(<SummaryItem {...defaultProps} note="Red color" />);
    expect(screen.getByDisplayValue('Red color')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when incrementing', () => {
    render(<SummaryItem {...defaultProps} />);
    const plusButton = screen.getByLabelText('Aumentar cantidad');
    fireEvent.click(plusButton);
    expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(1);
  });

  it('calls onUpdateQuantity when decrementing', () => {
    render(<SummaryItem {...defaultProps} />);
    const minusButton = screen.getByLabelText('Disminuir cantidad');
    fireEvent.click(minusButton);
    expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(-1);
  });

  it('calls onUpdateNote when typing', () => {
    const onUpdateNote = vi.fn();
    render(<SummaryItem {...defaultProps} onUpdateNote={onUpdateNote} />);
    const input = screen.getByPlaceholderText('Incluir nota (marca, color…)');
    fireEvent.change(input, { target: { value: 'New note' } });
    expect(onUpdateNote).toHaveBeenCalledWith('New note');
  });

  it('applies small size to QuantityControl', () => {
    const { container } = render(<SummaryItem {...defaultProps} />);
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      expect(btn).toHaveClass('w-6', 'h-6');
    });
  });

  it('has card styling', () => {
    const { container } = render(<SummaryItem {...defaultProps} />);
    expect(container.firstChild).toHaveClass('rounded-xl');
    expect(container.firstChild).toHaveClass('border');
  });
});
