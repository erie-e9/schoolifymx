import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BackpackSim from '@components/organisms/BackpackSim';
import { useBackpack } from '@hooks/useBackpack';
import { WhatsAppService } from '@services/WhatsAppService';
import ListScanner from '@components/organisms/ListScanner';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  const mockGsap = {
    ...actual.default,
    timeline: vi.fn((vars?: { onComplete?: () => void }) => {
      const timeline = {
        to: vi.fn().mockImplementation(function (this: any, _target: any, toVars: any) {
          if (toVars?.onComplete) toVars.onComplete();
          return this;
        }),
        fromTo: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
      };
      if (vars?.onComplete) vars.onComplete();
      return timeline;
    }),
    to: vi.fn((_target: any, vars: any) => {
      if (vars?.onComplete) vars.onComplete();
      return { then: vi.fn() };
    }),
    from: vi.fn().mockReturnThis(),
  };

  return {
    ...actual,
    default: mockGsap,
    gsap: mockGsap,
  };
});

// Mock useBackpack hook
vi.mock('@hooks/useBackpack', () => ({
  useBackpack: vi.fn()
}));

// Mock child components
vi.mock('@components/organisms/ListScanner', () => ({
  default: vi.fn(() => null),
}));

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendBackpackQuote: vi.fn()
  }
}));

describe('BackpackSim', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    scannedItems: [],
  };

  const mockUseBackpack = {
    selectedItems: {},
    activeCategory: 'all',
    setActiveCategory: vi.fn(),
    searchQuery: '',
    setSearchQuery: vi.fn(),
    isCompleted: false,
    setIsCompleted: vi.fn(),
    noteOpenId: null,
    setNoteOpenId: vi.fn(),
    scannedSection: [],
    setScannedSection: vi.fn(),
    updateQuantity: vi.fn(),
    updateNote: vi.fn(),
    importScanned: vi.fn(),
    totalItemCount: 0,
    selectedCount: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useBackpack).mockReturnValue(mockUseBackpack as any);
  });

  it('renders modal title', () => {
    render(<BackpackSim {...defaultProps} />);
    expect(screen.getByText('Generador de listas')).toBeInTheDocument();
  });

  it('handles category selection', () => {
    render(<BackpackSim {...defaultProps} />);
    // Select the category button specifically from the category scroll area
    const categoryBtn = screen.getAllByText('Escritura').find(el => el.closest('button')?.className.includes('rounded-full'))!;
    fireEvent.click(categoryBtn);
    expect(mockUseBackpack.setActiveCategory).toHaveBeenCalledWith('escritura');
  });

  it('handles item search', () => {
    render(<BackpackSim {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Buscar artículos...');
    fireEvent.change(searchInput, { target: { value: 'lápiz' } });
    expect(mockUseBackpack.setSearchQuery).toHaveBeenCalledWith('lápiz');
  });

  it('opens scanner when clicking scan button', () => {
    render(<BackpackSim {...defaultProps} />);
    const scanBtn = screen.getByText('Escanear');
    fireEvent.click(scanBtn);
    expect(ListScanner).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: true }), undefined);
  });

  it('renders summary items when items are selected', () => {
    vi.mocked(useBackpack).mockReturnValue({
      ...mockUseBackpack,
      selectedCount: 1,
      totalItemCount: 2,
      selectedItems: {
        'lapiz-grafito': { qty: 2, note: 'HB', name: 'Lápiz de Grafito' }
      }
    } as any);

    render(<BackpackSim {...defaultProps} />);
    expect(screen.getAllByText('Lápiz de Grafito').length).toBeGreaterThan(0);
    expect(screen.getByText(/1 tipo, 2 piezas/)).toBeInTheDocument();
  });

  it('calls importScanned when import button is clicked', () => {
    vi.mocked(useBackpack).mockReturnValue({
      ...mockUseBackpack,
      scannedSection: [{ id: '1', name: 'Item', selected: true, note: '' }]
    } as any);

    render(<BackpackSim {...defaultProps} />);
    const importBtn = screen.getByText('Importar todo');
    fireEvent.click(importBtn);
    expect(mockUseBackpack.importScanned).toHaveBeenCalled();
  });

  it('handles list finalization', () => {
    vi.mocked(useBackpack).mockReturnValue({
      ...mockUseBackpack,
      selectedCount: 1,
      totalItemCount: 1,
      selectedItems: { '1': { qty: 1 } }
    } as any);

    render(<BackpackSim {...defaultProps} />);
    const confirmBtn = screen.getByText(/Confirmar Lista/);
    fireEvent.click(confirmBtn);
    expect(mockUseBackpack.setIsCompleted).toHaveBeenCalledWith(true);
  });

  it('renders completed state and handles WhatsApp send', () => {
    vi.mocked(useBackpack).mockReturnValue({
      ...mockUseBackpack,
      isCompleted: true,
      selectedCount: 1,
      selectedItems: { 'lapiz-grafito': { qty: 1, name: 'Lápiz de Grafito', note: '' } }
    } as any);

    render(<BackpackSim {...defaultProps} />);
    expect(screen.getByText('¡Lista Armada!')).toBeInTheDocument();

    const sendBtn = screen.getByText('Enviar lista');
    fireEvent.click(sendBtn);

    expect(WhatsAppService.sendBackpackQuote).toHaveBeenCalledWith([{
      name: 'Lápiz de Grafito',
      qty: 1,
      note: ''
    }]);
  });

  it('closes modal correctly', () => {
    render(<BackpackSim {...defaultProps} />);
    const closeBtn = screen.getByLabelText('Cerrar');
    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('closes on backdrop click', () => {
    render(<BackpackSim {...defaultProps} />);
    const backdrop = document.querySelector('.bg-black\\/60');
    if (backdrop) fireEvent.click(backdrop);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});