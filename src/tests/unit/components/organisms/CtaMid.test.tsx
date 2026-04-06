import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CtaMid from '@components/organisms/CtaMid';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  const mockGsap = {
    ...actual.default,
    set: vi.fn(),
    to: vi.fn().mockReturnThis(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
    })),
  };
  return {
    ...actual,
    default: mockGsap,
    gsap: mockGsap,
  };
});

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendGenericContact: vi.fn(),
  },
}));

// Mock SERVICES_CONTENT
vi.mock('@types', async (importOriginal) => {
  const actual = await (importOriginal() as Promise<any>);
  return {
    ...actual,
    SERVICES_CONTENT: {
      supplies: {
        tag: 'Útiles',
        whatsappMessage: 'Msg Supplies',
        ctaCarousel: [
          { type: 'Type S1', title: 'Title S1', description: 'Desc S1', image: 'img1.jpg' },
          { type: 'Type S2', title: 'Title S2', description: 'Desc S2', image: 'img2.jpg' },
        ],
      },
      uniforms: {
        tag: 'Uniformes',
        whatsappMessage: 'Msg Uniforms',
        ctaCarousel: [
          { type: 'Type U1', title: 'Title U1', description: 'Desc U1', image: 'u1.jpg' },
        ],
      },
    },
  };
});

describe('CtaMid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('renders initial content correctly', () => {
    render(<CtaMid activeService="supplies" />);
    expect(screen.getByText(/Title S1/)).toBeInTheDocument();
    expect(screen.getByText('Desc S1')).toBeInTheDocument();
  });

  it('navigates through carousel slides', () => {
    render(<CtaMid activeService="supplies" />);
    const nextBtn = screen.getByLabelText('Next slide');
    
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Title S2/)).toBeInTheDocument();

    const prevBtn = screen.getByLabelText('Previous slide');
    fireEvent.click(prevBtn);
    expect(screen.getByText(/Title S1/)).toBeInTheDocument();
  });

  it('auto-slides after interval', () => {
    render(<CtaMid activeService="supplies" />);
    expect(screen.getByText(/Title S1/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(12000);
    });

    expect(screen.getByText(/Title S2/)).toBeInTheDocument();
  });

  it('opens and closes image modal', () => {
    render(<CtaMid activeService="supplies" />);
    const slide = screen.getAllByRole('img')[0].closest('div')!;
    
    // Open modal
    fireEvent.click(slide);
    const closeBtn = screen.getByLabelText('Close modal');
    expect(closeBtn).toBeInTheDocument();
    expect(screen.getAllByText(/Title S1/).length).toBeGreaterThan(0);

    // Close modal
    fireEvent.click(closeBtn);
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls WhatsAppService on button click', () => {
    render(<CtaMid activeService="supplies" />);
    const ctaBtn = screen.getByText('Escríbenos ahora');
    fireEvent.click(ctaBtn);
    expect(WhatsAppService.sendGenericContact).toHaveBeenCalledWith('Msg Supplies');
  });

  it('resets index when activeService changes', () => {
    const { rerender } = render(<CtaMid activeService="supplies" />);
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(screen.getByText(/Title S2/)).toBeInTheDocument();

    rerender(<CtaMid activeService="uniforms" />);
    expect(screen.getByText(/Title U1/)).toBeInTheDocument();
  });
});
