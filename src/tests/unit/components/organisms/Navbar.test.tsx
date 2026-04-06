import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '@components/organisms/Navbar';
import { useTheme } from '@hooks/useTheme';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock useTheme hook
vi.mock('@hooks/useTheme', () => ({
  useTheme: vi.fn()
}));

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendGenericContact: vi.fn(),
  },
}));

// Mock BrandCarousel component
vi.mock('@components/molecules/BrandCarousel', () => ({
  default: vi.fn(() => <div data-testid="brand-carousel">BrandCarousel</div>),
}));

// Mock SVG imports
vi.mock('../../assets/Schoolify.svg?react', () => ({
  default: vi.fn(() => <svg data-testid="schoolify-svg" />),
}));
vi.mock('../../assets/logo.svg?react', () => ({
  default: vi.fn(() => <svg data-testid="logo-svg" />),
}));
vi.mock('../../assets/whatsapp.svg?react', () => ({
  default: vi.fn(() => <svg data-testid="whatsapp-svg" />),
}));

describe('Navbar', () => {
  const defaultProps = {
    activeService: 'supplies' as const,
    onOpenChallenges: vi.fn(),
  };

  const mockUseTheme = {
    isDark: false,
    toggleDarkMode: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue(mockUseTheme as any);
    window.scrollY = 0;
  });

  it('renders branding and navigation', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    expect(screen.getByText('Galería')).toBeInTheDocument();
    expect(screen.getByText('Beneficios')).toBeInTheDocument();
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
  });

  it('handles scroll events to change background', async () => {
    const { container } = render(<Navbar {...defaultProps} />);
    const header = container.querySelector('header')!;
    expect(header).toHaveClass('bg-transparent');

    await act(async () => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    expect(header).toHaveClass('bg-white/95');
  });

  it('calls toggleDarkMode on theme button click', () => {
    render(<Navbar {...defaultProps} />);
    const themeButtons = screen.getAllByLabelText('Toggle dark mode');
    fireEvent.click(themeButtons[0]); // Desktop button
    expect(mockUseTheme.toggleDarkMode).toHaveBeenCalled();
  });

  it('calls WhatsAppService on contact click', () => {
    render(<Navbar {...defaultProps} />);
    const contactBtn = screen.getByText('Contacto para escuelas');
    fireEvent.click(contactBtn);
    expect(WhatsAppService.sendGenericContact).toHaveBeenCalled();
  });

  it('toggles mobile menu and handles link clicks', () => {
    render(<Navbar {...defaultProps} />);
    const toggleBtn = screen.getByLabelText('Toggle menu');

    // Open menu
    fireEvent.click(toggleBtn);
    const mobileLink = screen.getAllByText('Servicios')[1]; // Second one is in mobile menu
    expect(mobileLink).toBeVisible();

    // Click link should close menu
    fireEvent.click(mobileLink);
    expect(screen.queryByText('Escríbenos ahora')).not.toBeInTheDocument();
  });

  it('renders trophy button on mobile', () => {
    render(<Navbar {...defaultProps} />);
    // There are two trophy buttons (desktop/mobile)
    const trophyButtons = screen.getAllByRole('button').filter(b => b.querySelector('.lucide-trophy'));
    expect(trophyButtons.length).toBeGreaterThan(1);
    fireEvent.click(trophyButtons[1]); // Mobile one
    expect(defaultProps.onOpenChallenges).toHaveBeenCalled();
  });

  it('shows correct theme icon', () => {
    vi.mocked(useTheme).mockReturnValue({ isDark: true, toggleDarkMode: vi.fn() } as any);
    render(<Navbar {...defaultProps} />);
    // Sun icon should be present in dark mode
    expect(document.querySelector('.lucide-sun')).toBeInTheDocument();
  });
});