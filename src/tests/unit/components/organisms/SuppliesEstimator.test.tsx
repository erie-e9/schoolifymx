import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SuppliesEstimator from '@components/organisms/SuppliesEstimator';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  const mockGsap = {
    ...actual.default,
    timeline: vi.fn((vars?: { onComplete?: () => void }) => {
      const timeline = {
        to: vi.fn().mockImplementation(function (this: any, _target: any, tVars: any) {
          if (tVars?.onComplete) tVars.onComplete();
          return this;
        }),
        fromTo: vi.fn().mockImplementation(function (this: any, _t, _f, tVars: any) {
          if (tVars?.onComplete) tVars.onComplete();
          return this;
        }),
      };
      if (vars?.onComplete) vars.onComplete();
      return timeline;
    }),
    to: vi.fn((_target: any, vars: any) => {
      if (vars?.onComplete) vars.onComplete();
      return { then: (cb: any) => cb?.() };
    }),
  };

  return {
    ...actual,
    default: mockGsap,
    gsap: mockGsap,
  };
});

const mockHelpers = {
  setGrade: vi.fn(),
  setBundle: vi.fn(),
};

// Mock useSuppliesEstimation hook
vi.mock('@hooks/useSuppliesEstimation', () => ({
  useSuppliesEstimation: vi.fn(() => ({
    grade: 'Primaria',
    setGrade: mockHelpers.setGrade,
    bundle: 'Esencial',
    setBundle: mockHelpers.setBundle,
    range: { min: 1200, max: 1500 },
    timeSaved: 4,
  })),
}));

// Mock formatNumbers utility
vi.mock('@utils/numbers', () => ({
  formatNumbers: (num: number) => num.toLocaleString(),
}));

describe('SuppliesEstimator', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onOpenScanner: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = 'unset';
  });

  it('renders modal content when open', () => {
    render(<SuppliesEstimator {...defaultProps} />);
    expect(screen.getByText(/Calcula tu ahorro/)).toBeInTheDocument();
    expect(screen.getByText('Preescolar')).toBeInTheDocument();
    expect(screen.getByText('~ $1,200')).toBeInTheDocument();
  });

  it('calls setGrade when a grade button is clicked', () => {
    render(<SuppliesEstimator {...defaultProps} />);
    fireEvent.click(screen.getByText('Secundaria'));
    expect(mockHelpers.setGrade).toHaveBeenCalledWith('Secundaria');
  });

  it('calls setBundle when a bundle card is clicked', () => {
    render(<SuppliesEstimator {...defaultProps} />);
    fireEvent.click(screen.getByText('Selecto'));
    expect(mockHelpers.setBundle).toHaveBeenCalledWith('Selecto');
  });

  it('calls onClose when close button, backdrop, or Escape is used', async () => {
    render(<SuppliesEstimator {...defaultProps} />);
    
    // Close button
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

    // Backdrop
    const backdrop = document.querySelector('.bg-dark-bg\\/60')!;
    fireEvent.click(backdrop);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);

    // Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(3);
  });

  it('manages document body overflow', () => {
    const { rerender } = render(<SuppliesEstimator {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<SuppliesEstimator {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('calls onOpenScanner when upload button is clicked', () => {
    render(<SuppliesEstimator {...defaultProps} />);
    fireEvent.click(screen.getByText(/Subir imagen/i));
    expect(defaultProps.onOpenScanner).toHaveBeenCalled();
  });

  it('renders nothing if isOpen is false', () => {
    render(<SuppliesEstimator {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(/Calcula tu ahorro/)).not.toBeInTheDocument();
  });
});