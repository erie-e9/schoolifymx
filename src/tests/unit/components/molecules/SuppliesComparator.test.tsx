import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SuppliesComparator from '@components/molecules/SuppliesComparator';
import SuppliesEstimator from '@components/organisms/SuppliesEstimator';
import ListScanner from '@components/organisms/ListScanner';
import BackpackSim from '@components/organisms/BackpackSim';

import type { ScannedItem } from '@types';

// Mock child components
vi.mock('@components/organisms/SuppliesEstimator', () => ({
  default: vi.fn(() => null),
}));

vi.mock('@components/organisms/ListScanner', () => ({
  default: vi.fn(() => null),
}));

vi.mock('@components/organisms/BackpackSim', () => ({
  default: vi.fn(() => null),
}));

describe('SuppliesComparator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles mouse enter and leave events', () => {
    const { container } = render(<SuppliesComparator />);
    const card = container.firstChild as HTMLElement;
    // We want the div containing the emoji that has the background class
    const iconContainer = screen.getByText('✏️').closest('.rounded-2xl');

    fireEvent.mouseEnter(card);
    expect(iconContainer).toHaveClass('bg-primary');

    fireEvent.mouseLeave(card);
    expect(iconContainer).not.toHaveClass('bg-primary');
  });

  it('opens and closes estimator modal', () => {
    render(<SuppliesComparator />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(SuppliesEstimator).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: true }), undefined);

    const estimatorProps = vi.mocked(SuppliesEstimator).mock.calls[vi.mocked(SuppliesEstimator).mock.calls.length - 1][0] as any;
    act(() => { estimatorProps.onClose(); });
  });

  it('opens scanner from estimator', () => {
    render(<SuppliesComparator />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    const estimatorProps = vi.mocked(SuppliesEstimator).mock.calls[vi.mocked(SuppliesEstimator).mock.calls.length - 1][0] as any;
    act(() => { estimatorProps.onOpenScanner(); });

    expect(ListScanner).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: true }), undefined);
  });

  it('handles scan completion', () => {
    render(<SuppliesComparator />);

    const scannerProps = vi.mocked(ListScanner).mock.calls[0][0] as any;
    const mockItems: ScannedItem[] = [{ id: '1', name: 'Item 1', note: '', selected: true }];
    
    act(() => { scannerProps.onScanComplete(mockItems); });

    expect(BackpackSim).toHaveBeenLastCalledWith(expect.objectContaining({
      isOpen: true,
      scannedItems: mockItems
    }), undefined);
  });

  it('opens backpack directly', () => {
    render(<SuppliesComparator />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(BackpackSim).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: true }), undefined);
  });

  it('renders title', () => {
    render(<SuppliesComparator />);
    expect(screen.getByText('Útiles Escolares')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<SuppliesComparator />);
    expect(screen.getByText(/Nosotros lo hacemos por ti/)).toBeInTheDocument();
  });

  it('renders comparison table headers', () => {
    render(<SuppliesComparator />);
    expect(screen.getByText('Por tu cuenta')).toBeInTheDocument();
    expect(screen.getByText('Con Schoolify')).toBeInTheDocument();
  });

  it('renders comparison rows', () => {
    render(<SuppliesComparator />);
    expect(screen.getByText('Tiempo invertido')).toBeInTheDocument();
    expect(screen.getByText('Costo promedio + extras')).toBeInTheDocument();
    expect(screen.getByText('Nivel de estrés')).toBeInTheDocument();
  });

  it('renders main icon', () => {
    render(<SuppliesComparator />);
    expect(screen.getByText('✏️')).toBeInTheDocument();
  });

  it('renders backpack button', () => {
    render(<SuppliesComparator />);
    // Buttons are rendered with SVG icons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders calculator button', () => {
    render(<SuppliesComparator />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('applies active styles when active prop is true', () => {
    const { container } = render(<SuppliesComparator active={true} />);
    expect(container.firstChild).toHaveClass('border-primary/50');
    expect(container.firstChild).toHaveClass('-translate-y-2');
  });

  it('applies inactive styles by default', () => {
    const { container } = render(<SuppliesComparator />);
    expect(container.firstChild).toHaveClass('border-gray-100');
  });

  it('has card styling', () => {
    const { container } = render(<SuppliesComparator />);
    expect(container.firstChild).toHaveClass('card');
  });

  it('has comparison table', () => {
    const { container } = render(<SuppliesComparator />);
    expect(container.querySelector('.rounded-2xl')).toBeInTheDocument();
    expect(container.querySelector('.overflow-hidden')).toBeInTheDocument();
  });

  it('has proper grid layout', () => {
    const { container } = render(<SuppliesComparator />);
    expect(container.querySelector('.grid-cols-3')).toBeInTheDocument();
  });
});
