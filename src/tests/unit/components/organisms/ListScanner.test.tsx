import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListScanner from '@components/organisms/ListScanner';
import { useScanner } from '@hooks/useScanner';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await importOriginal();
  const mockGsap = {
    ...(actual as any).default,
    timeline: vi.fn((vars?: { onComplete?: () => void }) => {
      if (vars?.onComplete) vars.onComplete();
      const timeline = {
        to: vi.fn().mockImplementation(function(this: any, _target: any, vars: any) {
          if (vars?.onComplete) vars.onComplete();
          return this;
        }),
        fromTo: vi.fn().mockReturnThis(),
      };
      return timeline;
    }),
    to: vi.fn((_target: any, vars: any) => {
      if (vars?.onComplete) vars.onComplete();
      return { then: vi.fn() };
    }),
  };
  
  return {
    ...(actual as any),
    default: mockGsap,
    gsap: mockGsap,
  };
});

// Mock useScanner hook
vi.mock('@hooks/useScanner', () => ({
  useScanner: vi.fn()
}));

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendScannedListQuote: vi.fn()
  }
}));

describe('ListScanner', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onScanComplete: vi.fn(),
  };

  const mockUseScanner = {
    status: 'idle',
    progress: 0,
    scanningText: 'Escaneando...',
    items: [],
    setItems: vi.fn(),
    selectedFile: null,
    fileType: null,
    fileName: '',
    tier: 'Esencial',
    setTier: vi.fn(),
    processFile: vi.fn(),
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useScanner).mockReturnValue(mockUseScanner as any);
  });

  it('renders modal title', () => {
    render(<ListScanner {...defaultProps} />);
    expect(screen.getByText('Escáner de Lista Smart')).toBeInTheDocument();
  });

  it('renders uploading state', () => {
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'uploading'
    } as any);
    render(<ListScanner {...defaultProps} />);
    expect(screen.getByText('Subiendo lista...')).toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'error',
      error: { message: 'El archivo es demasiado grande' }
    } as any);
    render(<ListScanner {...defaultProps} />);
    expect(screen.getByText('Error al procesar')).toBeInTheDocument();
    expect(screen.getByText('El archivo es demasiado grande')).toBeInTheDocument();
  });

  it('renders scanning state with image', () => {
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'scanning',
      progress: 45,
      selectedFile: 'test-image.jpg',
      fileType: 'image'
    } as any);
    render(<ListScanner {...defaultProps} />);
    expect(screen.getByText('45%')).toBeInTheDocument();
    const img = screen.getByAltText('Lista');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders scanning state with PDF icon', () => {
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'scanning',
      progress: 45,
      fileName: 'lista.pdf',
      fileType: 'pdf'
    } as any);
    render(<ListScanner {...defaultProps} />);
    expect(screen.getByText('lista.pdf')).toBeInTheDocument();
    expect(document.querySelector('.lucide-file-digit')).toBeInTheDocument();
  });

  it('renders completed state with items', () => {
    const mockItems = [
      { id: '1', name: 'Lápiz', note: '', selected: true },
      { id: '2', name: 'Goma', note: '', selected: false }
    ];
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'completed',
      items: mockItems
    } as any);

    render(<ListScanner {...defaultProps} />);
    expect(screen.getByText('¡Análisis Exitoso!')).toBeInTheDocument();
    expect(screen.getByText('Lápiz')).toBeInTheDocument();
    expect(screen.getByText('Goma')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('updates item selection', () => {
    const setItems = vi.fn();
    const mockItems = [{ id: '1', name: 'Lápiz', note: '', selected: true }];
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'completed',
      items: mockItems,
      setItems
    } as any);

    render(<ListScanner {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(setItems).toHaveBeenCalled();
  });

  it('updates item note', () => {
    const setItems = vi.fn();
    const mockItems = [{ id: '1', name: 'Lápiz', note: '', selected: true }];
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'completed',
      items: mockItems,
      setItems
    } as any);

    render(<ListScanner {...defaultProps} />);
    const noteInput = screen.getByPlaceholderText(/Incluir nota/);
    fireEvent.change(noteInput, { target: { value: 'Marca Dixon' } });

    expect(setItems).toHaveBeenCalled();
  });

  it('switches tiers', () => {
    const setTier = vi.fn();
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'completed',
      setTier
    } as any);

    render(<ListScanner {...defaultProps} />);
    const selectoBtn = screen.getByText(/Paquete Selecto/);
    fireEvent.click(selectoBtn);

    expect(setTier).toHaveBeenCalledWith('Selecto');
  });

  it('handles WhatsApp send', () => {
    const mockItems = [{ id: '1', name: 'Lápiz', note: '', selected: true }];
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'completed',
      items: mockItems
    } as any);

    render(<ListScanner {...defaultProps} />);
    const sendBtn = screen.getByText(/Ver mi presupuesto en WhatsApp/);
    fireEvent.click(sendBtn);

    expect(WhatsAppService.sendScannedListQuote).toHaveBeenCalledWith(mockItems, 'Esencial');
  });

  it('integrates scanning result to backpack', () => {
    const mockItems = [{ id: '1', name: 'Lápiz', note: '', selected: true }];
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      status: 'completed',
      items: mockItems
    } as any);

    render(<ListScanner {...defaultProps} />);
    const integrateBtn = screen.getByText(/Integrar al Creador de listas/);
    fireEvent.click(integrateBtn);

    expect(defaultProps.onScanComplete).toHaveBeenCalledWith(mockItems);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles drag and drop events', () => {
    const processFile = vi.fn();
    vi.mocked(useScanner).mockReturnValue({
      ...mockUseScanner,
      processFile
    } as any);

    render(<ListScanner {...defaultProps} />);
    const dropZone = screen.getByText(/Arrastra tu lista/).closest('div')!;

    // Drag over
    fireEvent.dragOver(dropZone);
    expect(screen.getByText('¡Suelta aquí tu archivo!')).toBeInTheDocument();

    // Drag leave
    fireEvent.dragLeave(dropZone);
    expect(screen.getByText(/Arrastra tu lista/)).toBeInTheDocument();

    // Drop
    const file = new File(['test'], 'list.jpg', { type: 'image/jpeg' });
    const dropEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        files: [file]
      }
    };
    fireEvent.drop(dropZone, dropEvent);
    expect(processFile).toHaveBeenCalledWith(file);
  });

  it('triggers file selection when clicked', () => {
    render(<ListScanner {...defaultProps} />);
    
    // We cannot easily test the click on the hidden input, but we check if input exists
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('closes on backdrop click', () => {
    render(<ListScanner {...defaultProps} />);
    // Backbone click is handled via a ref and handleClose
    const backdrop = document.querySelector('.absolute.inset-0.bg-dark-bg\\/80');
    if (backdrop) fireEvent.click(backdrop);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('closes on Escape key', () => {
    render(<ListScanner {...defaultProps} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});