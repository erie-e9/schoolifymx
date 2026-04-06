import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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

import FinalCTA from '@components/organisms/FinalCTA';
import { WhatsAppService } from '@services/WhatsAppService';

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

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendGenericContact: vi.fn(),
  },
}));

describe('FinalCTA', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders headline', () => {
    render(<FinalCTA activeService="supplies" />);
    expect(screen.getByText(/Confianza, rapidez y honestidad/)).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<FinalCTA activeService="supplies" />);
    expect(screen.getByText('🚀 Empieza hoy mismo')).toBeInTheDocument();
  });

  it('renders main CTA button', () => {
    render(<FinalCTA activeService="supplies" />);
    expect(screen.getByText('Escríbenos ahora')).toBeInTheDocument();
  });

  it('renders institution button', () => {
    render(<FinalCTA activeService="supplies" />);
    expect(screen.getByText('Soy de una institución')).toBeInTheDocument();
  });

  it('renders social proof items', () => {
    render(<FinalCTA activeService="supplies" />);
    expect(screen.getByText('Sin costo de consulta')).toBeInTheDocument();
    expect(screen.getByText('Atención personalizada')).toBeInTheDocument();
    expect(screen.getByText('Lunes a Sábado de 9:00 AM a 7:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Pagos seguros')).toBeInTheDocument();
  });

  it('renders social proof icons', () => {
    render(<FinalCTA activeService="supplies" />);
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('📞')).toBeInTheDocument();
    expect(screen.getByText('⌚️')).toBeInTheDocument();
    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  it('has gradient background', () => {
    const { container } = render(<FinalCTA activeService="supplies" />);
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
  });

  it('has decorative shapes', () => {
    const { container } = render(<FinalCTA activeService="supplies" />);
    expect(container.querySelectorAll('.blur-3xl')).toHaveLength(2);
  });

  it('has proper section padding', () => {
    const { container } = render(<FinalCTA activeService="supplies" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-24');
  });

  it('calls WhatsApp service on CTA click', () => {
    render(<FinalCTA activeService="supplies" />);
    const ctaButton = screen.getByText('Escríbenos ahora');
    fireEvent.click(ctaButton);
    expect(WhatsAppService.sendGenericContact).toHaveBeenCalled();
  });

  it('calls WhatsApp service on institution click', () => {
    render(<FinalCTA activeService="supplies" />);
    const institutionButton = screen.getByText('Soy de una institución');
    fireEvent.click(institutionButton);
    expect(WhatsAppService.sendGenericContact).toHaveBeenCalled();
  });

  it('renders correctly for uniforms service', () => {
    render(<FinalCTA activeService="uniforms" />);
    expect(screen.getByText(/Confianza, rapidez y honestidad/)).toBeInTheDocument();
    expect(screen.getByText('🚀 Empieza hoy mismo')).toBeInTheDocument();
  });

  it('renders correctly for didactic service', () => {
    render(<FinalCTA activeService="didactic" />);
    expect(screen.getByText(/Confianza, rapidez y honestidad/)).toBeInTheDocument();
    expect(screen.getByText('🚀 Empieza hoy mismo')).toBeInTheDocument();
  });
});