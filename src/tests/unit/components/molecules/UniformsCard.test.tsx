import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UniformsCard from '@components/molecules/UniformsCard';

// Mock GSAP
vi.mock('gsap', async () => {
  const actual = await vi.importActual('gsap');
  return {
    ...(actual as object),
    default: {
      ...(actual as any).default,
      to: vi.fn(),
    },
  };
});

// Mock child component
vi.mock('@components/organisms/UniformSizeHelper', () => ({
  default: vi.fn(({ isOpen, onClose }) => isOpen ? <div data-testid="size-helper">Helper</div> : null),
}));

describe('UniformsCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders title', () => {
    render(<UniformsCard />);
    expect(screen.getByText('Uniformes a la medida')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<UniformsCard />);
    expect(screen.getByText(/Confeccionamos, reparamos y entregamos/)).toBeInTheDocument();
  });

  it('renders main icon', () => {
    render(<UniformsCard />);
    expect(screen.getByText('👕')).toBeInTheDocument();
  });

  it('renders detail items', () => {
    render(<UniformsCard />);
    expect(screen.getByText('Confección a medida')).toBeInTheDocument();
    expect(screen.getByText('Reparaciones y ajustes')).toBeInTheDocument();
    expect(screen.getByText('Vestuario escolar y eventos')).toBeInTheDocument();
  });

  it('renders detail icons', () => {
    render(<UniformsCard />);
    expect(screen.getByText('📐')).toBeInTheDocument();
    expect(screen.getByText('🪡')).toBeInTheDocument();
    expect(screen.getByText('🎽')).toBeInTheDocument();
  });

  it('renders size helper button', () => {
    render(<UniformsCard />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens size helper when button is clicked', async () => {
    render(<UniformsCard />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByTestId('size-helper')).toBeInTheDocument();
    });
  });

  it('applies active styles when active prop is true', () => {
    const { container } = render(<UniformsCard active={true} />);
    expect(container.firstChild).toHaveClass('border-primary/50');
    expect(container.firstChild).toHaveClass('-translate-y-2');
  });

  it('applies inactive styles by default', () => {
    const { container } = render(<UniformsCard />);
    expect(container.firstChild).toHaveClass('border-gray-100');
  });

  it('has card styling', () => {
    const { container } = render(<UniformsCard />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  it('has Ruler icon in button', () => {
    const { container } = render(<UniformsCard />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });
});
