import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

import Process from '@components/organisms/Process';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    default: {
      ...(actual as any).default,
      fromTo: vi.fn(),
      context: vi.fn((_fn) => ({ revert: vi.fn() })),
    },
    ScrollTrigger: {
      create: vi.fn(),
    },
  };
});

describe('Process', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title', () => {
    render(<Process activeService="supplies" />);
    expect(screen.getByText(/Simple y rápido/)).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<Process activeService="supplies" />);
    expect(screen.getByText('Cómo funciona')).toBeInTheDocument();
  });

  it('renders 4 process steps for supplies', () => {
    render(<Process activeService="supplies" />);
    expect(screen.getByText('Envías tu Lista')).toBeInTheDocument();
    expect(screen.getByText('Cotización')).toBeInTheDocument();
    expect(screen.getByText('Surtido Completo')).toBeInTheDocument();
    expect(screen.getByText('Entrega Directa')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<Process activeService="supplies" />);
    expect(screen.getByText(/Mándanos una foto o PDF/)).toBeInTheDocument();
    expect(screen.getByText(/Te enviamos un presupuesto/)).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<Process activeService="supplies" />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('renders different content for uniforms service', () => {
    render(<Process activeService="uniforms" />);
    expect(screen.getByText('Nos Contactas')).toBeInTheDocument();
    expect(screen.getByText('Tallas y Medidas')).toBeInTheDocument();
    expect(screen.getByText('Confección')).toBeInTheDocument();
    expect(screen.getByText('Entregas Programadas')).toBeInTheDocument();
  });

  it('renders different content for didactic service', () => {
    render(<Process activeService="didactic" />);
    expect(screen.getByText('Requerimientos')).toBeInTheDocument();
    expect(screen.getByText('Diseño/Personalización')).toBeInTheDocument();
    expect(screen.getByText('Producción')).toBeInTheDocument();
    expect(screen.getByText('Resultado Final')).toBeInTheDocument();
  });

  it('has proper section styling', () => {
    const { container } = render(<Process activeService="supplies" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-primary');
    expect(section).toHaveClass('py-12');
  });

  it('renders connecting line for desktop', () => {
    const { container } = render(<Process activeService="supplies" />);
    expect(container.querySelector('.hidden.lg\\:block')).toBeInTheDocument();
  });

  it('has grid layout', () => {
    const { container } = render(<Process activeService="supplies" />);
    expect(container.querySelector('.grid')).toBeInTheDocument();
  });
});