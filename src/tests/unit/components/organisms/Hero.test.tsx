import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '@components/organisms/Hero';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock matchMedia
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

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  const mockGsap = {
    ...actual.default,
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockImplementation(function (this: any, _t, vars) {
        if (vars?.onComplete) vars.onComplete();
        return this;
      }),
      from: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    context: vi.fn((fn) => {
      fn();
      return { revert: vi.fn() };
    }),
    to: vi.fn().mockImplementation((_target, vars) => {
      if (vars?.onComplete) vars.onComplete();
      return { then: (cb: any) => cb?.() };
    }),
    fromTo: vi.fn().mockReturnThis(),
    registerPlugin: vi.fn(),
  };

  return {
    ...actual,
    default: mockGsap,
    gsap: mockGsap,
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

// Mock child components
vi.mock('@components/molecules/UniformsCard', () => ({
  default: vi.fn(() => <div data-testid="uniforms-card">UniformsCard</div>),
}));

vi.mock('@components/molecules/SuppliesComparator', () => ({
  default: vi.fn(() => <div data-testid="supplies-comparator">SuppliesComparator</div>),
}));

vi.mock('@components/molecules/DidacticMaterial', () => ({
  default: vi.fn(() => <div data-testid="didactic-material">DidacticMaterial</div>),
}));

describe('Hero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  const defaultProps = {
    activeService: 'supplies' as const,
    setActiveService: vi.fn(),
  };

  it('renders section heading and initial service content', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText('Tu lista de útiles completa, en un solo lugar.')).toBeInTheDocument();
  });

  it('calls setActiveService when service button is clicked', () => {
    render(<Hero {...defaultProps} />);
    const uniformsButton = screen.getByText('👕').closest('button')!;
    fireEvent.click(uniformsButton);
    expect(defaultProps.setActiveService).toHaveBeenCalledWith('uniforms');
  });

  it('handles CTA click - WhatsApp', () => {
    render(<Hero {...defaultProps} />);
    const ctaBtn = screen.getByText('Escríbenos ahora');
    fireEvent.click(ctaBtn);
    expect(WhatsAppService.sendGenericContact).toHaveBeenCalled();
  });

  it('handles secondary CTA click - Scroll to process', () => {
    // Create element to scroll to
    const target = document.createElement('div');
    target.id = 'process';
    document.body.appendChild(target);

    render(<Hero {...defaultProps} />);
    const secondaryBtn = screen.getByText('Conoce cómo funciona');
    fireEvent.click(secondaryBtn);

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    document.body.removeChild(target);
  });

  it('switches displayed component based on activeService', async () => {
    const { rerender } = render(<Hero {...defaultProps} activeService="supplies" />);
    expect(screen.getByTestId('supplies-comparator')).toBeInTheDocument();

    rerender(<Hero {...defaultProps} activeService="didactic" />);
    // Wait for GSAP onComplete to update the displayedService
    expect(await screen.findByTestId('didactic-material')).toBeInTheDocument();
  });

  it('renders bullet points from content', () => {
    render(<Hero {...defaultProps} activeService="supplies" />);
    expect(screen.getByText('Para alumnos y maestros')).toBeInTheDocument();
  });

  it('renders trust indicators with split text', () => {
    render(<Hero {...defaultProps} />);
    // Trust text is "Surtimos más de 500 listas escolares cada año"
    // Use a matcher that looks for the paragraph containing the full text
    expect(screen.getByText((_content, element) => {
      const text = element?.textContent || '';
      const isPara = element?.tagName.toLowerCase() === 'p';
      return isPara && text.includes('Surtimos') && text.includes('más de 500 listas');
    })).toBeInTheDocument();
  });

  it('renders decorative blobs and parallax wrappers', () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container.querySelector('.hero-blob-1')).toBeInTheDocument();
    expect(container.querySelector('.hero-parallax-display')).toBeInTheDocument();
  });
});