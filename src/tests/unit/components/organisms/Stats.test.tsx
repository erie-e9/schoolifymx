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

import Stats from '@components/organisms/Stats';

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

describe('Stats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title', () => {
    render(<Stats activeService="supplies" />);
    expect(screen.getByRole('heading', { level: 2, name: /Números que hablan por sí solos/ })).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<Stats activeService="supplies" />);
    expect(screen.getByText('Impacto medible')).toBeInTheDocument();
  });

  it('renders stats description for supplies', () => {
    render(<Stats activeService="supplies" />);
    expect(screen.getByText(/Más de 2 años surtiendo listas escolares/)).toBeInTheDocument();
  });

  it('renders different description for uniforms', () => {
    render(<Stats activeService="uniforms" />);
    expect(screen.getByText(/Más de 10 años convirtiendo telas/)).toBeInTheDocument();
  });

  it('renders different description for didactic', () => {
    render(<Stats activeService="didactic" />);
    expect(screen.getByText(/Preparando el mejor material/)).toBeInTheDocument();
  });

  it('has proper section styling', () => {
    const { container } = render(<Stats activeService="supplies" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-white');
    expect(section).toHaveClass('py-4');
  });

  it('has grid layout for stat cards', () => {
    const { container } = render(<Stats activeService="supplies" />);
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
  });

  it('renders stat card container', () => {
    const { container } = render(<Stats activeService="supplies" />);
    expect(container.querySelector('.gap-4')).toBeInTheDocument();
  });
});