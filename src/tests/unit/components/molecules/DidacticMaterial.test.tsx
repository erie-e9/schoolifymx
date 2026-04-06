import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DidacticMaterial from '@components/molecules/DidacticMaterial';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  const mockGsap = {
    ...actual.default,
    to: vi.fn(),
    fromTo: vi.fn(),
    context: vi.fn((fn) => {
      fn();
      return { revert: vi.fn() };
    }),
  };
  return {
    ...actual,
    default: mockGsap,
    gsap: mockGsap,
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

describe('DidacticMaterial', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders title', () => {
    render(<DidacticMaterial />);
    expect(screen.getByText('Material didáctico')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<DidacticMaterial />);
    expect(screen.getByText(/Resolvemos la logística/)).toBeInTheDocument();
  });

  it('renders steps', () => {
    render(<DidacticMaterial />);
    expect(screen.getByText('Pedido')).toBeInTheDocument();
    expect(screen.getByText('Personalización')).toBeInTheDocument();
    expect(screen.getByText('Entrega')).toBeInTheDocument();
  });

  it('renders step icons', () => {
    render(<DidacticMaterial />);
    expect(screen.getByText('📋')).toBeInTheDocument();
    expect(screen.getByText('✨')).toBeInTheDocument();
    expect(screen.getByText('🚚')).toBeInTheDocument();
  });

  it('renders main icon', () => {
    render(<DidacticMaterial />);
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  it('applies active styles when active prop is true', () => {
    const { container } = render(<DidacticMaterial active={true} />);
    expect(container.firstChild).toHaveClass('border-primary/50');
    expect(container.firstChild).toHaveClass('-translate-y-2');
  });

  it('applies inactive styles by default', () => {
    const { container } = render(<DidacticMaterial />);
    expect(container.firstChild).toHaveClass('border-gray-100');
  });

  it('has card styling', () => {
    const { container } = render(<DidacticMaterial />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('has progress bar', () => {
    const { container } = render(<DidacticMaterial />);
    expect(container.querySelector('.h-1\\.5')).toBeInTheDocument();
  });

  it('has hover effect and changes class', () => {
    const { container } = render(<DidacticMaterial />);
    const card = container.firstChild as HTMLElement;
    // The div containing the emoji gets the class
    const iconContainer = screen.getByText('📚');

    fireEvent.mouseEnter(card);
    expect(iconContainer).toHaveClass('bg-primary');

    fireEvent.mouseLeave(card);
    expect(iconContainer).not.toHaveClass('bg-primary');
  });

  it('triggers animation on ScrollTrigger enter', () => {
    render(<DidacticMaterial />);
    
    const createCall = vi.mocked(ScrollTrigger.create).mock.calls[0][0] as any;
    act(() => {
      createCall.onEnter();
    });

    expect(gsap.to).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ width: '100%' })
    );
  });
});
