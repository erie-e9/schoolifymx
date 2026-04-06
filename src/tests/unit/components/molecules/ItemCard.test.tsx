import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from '@components/molecules/ItemCard';

describe('ItemCard', () => {
  const mockItem = { id: '1', name: 'Lápiz' };
  const defaultProps = {
    item: mockItem,
    qty: 0,
    onUpdateQuantity: vi.fn(),
    onUpdateNote: vi.fn(),
    isNoteOpen: false,
    onToggleNote: vi.fn(),
    noteValue: '',
    categoryName: 'Papelería',
  };

  it('renders correctly when not selected', () => {
    render(<ItemCard {...defaultProps} />);
    expect(screen.getByText('Lápiz')).toBeInTheDocument();
    expect(screen.getByText('Papelería')).toBeInTheDocument();
    expect(screen.getByText('Agregar')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when Agregar button is clicked', () => {
    render(<ItemCard {...defaultProps} />);
    fireEvent.click(screen.getByText('Agregar'));
    expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(1);
  });

  it('renders selected state correctly', () => {
    render(<ItemCard {...defaultProps} qty={2} />);
    expect(screen.getByLabelText('Agregar Lápiz')).toBeInTheDocument();
    // Check for checkmark icon (selected badge)
    expect(document.querySelector('.lucide-check')).toBeInTheDocument();
  });

  it('toggles note input', () => {
    render(<ItemCard {...defaultProps} qty={1} />);
    fireEvent.click(screen.getByLabelText('Agregar nota'));
    expect(defaultProps.onToggleNote).toHaveBeenCalled();
  });

  it('renders note input when isNoteOpen is true', () => {
    render(<ItemCard {...defaultProps} qty={1} isNoteOpen={true} />);
    expect(screen.getByPlaceholderText(/Incluir nota/)).toBeInTheDocument();
  });

  it('calls onUpdateNote when note input changes', () => {
    render(<ItemCard {...defaultProps} qty={1} isNoteOpen={true} />);
    const input = screen.getByPlaceholderText(/Incluir nota/);
    fireEvent.change(input, { target: { value: 'Color rojo' } });
    expect(defaultProps.onUpdateNote).toHaveBeenCalledWith('Color rojo');
  });

  it('calls onUpdateQuantity delta from main button even when selected', () => {
    // When selected, the top button still increments
    render(<ItemCard {...defaultProps} qty={1} />);
    fireEvent.click(screen.getByLabelText('Agregar Lápiz'));
    expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(1);
  });
});
