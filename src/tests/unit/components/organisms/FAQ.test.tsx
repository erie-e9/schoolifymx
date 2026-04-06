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

import FAQ from '@components/organisms/FAQ';

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

describe('FAQ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title for supplies', () => {
    render(<FAQ activeService="supplies" />);
    expect(screen.getByText('Sobre surtido de listas.')).toBeInTheDocument();
  });

  it('renders section title for uniforms', () => {
    render(<FAQ activeService="uniforms" />);
    expect(screen.getByText('Sobre nuestros uniformes.')).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<FAQ activeService="supplies" />);
    expect(screen.getByText('Preguntas frecuentes')).toBeInTheDocument();
  });

  it('has proper section styling', () => {
    const { container } = render(<FAQ activeService="supplies" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-surface');
    expect(section).toHaveClass('py-12');
  });

  it('renders FAQ items container', () => {
    const { container } = render(<FAQ activeService="supplies" />);
    expect(container.querySelector('.flex.flex-col')).toBeInTheDocument();
  });

  it('has max-width constraint', () => {
    const { container } = render(<FAQ activeService="supplies" />);
    expect(container.querySelector('.max-w-3xl')).toBeInTheDocument();
  });

  it('renders section for didactic service', () => {
    render(<FAQ activeService="didactic" />);
    expect(screen.getByText('Sobre material didáctico.')).toBeInTheDocument();
  });
});