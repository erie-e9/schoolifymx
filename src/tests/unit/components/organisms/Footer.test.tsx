import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@components/organisms/Footer';

// Mock the getWhatsappLink function
vi.mock('@types', () => ({
  getWhatsappLink: () => 'https://wa.me/1234567890',
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders brand name', () => {
    render(<Footer />);
    // The brand appears in multiple places - footer text and copyright
    expect(screen.getAllByText(/Schoolify/).length).toBeGreaterThan(0);
  });

  it('renders mission statement', () => {
    render(<Footer />);
    expect(screen.getByText(/Transformamos la experiencia del regreso a clases/)).toBeInTheDocument();
  });

  it('renders contact section', () => {
    render(<Footer />);
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renders address', () => {
    render(<Footer />);
    // Address is split across elements, use regex to match partial text
    expect(screen.getByText(/Durango/)).toBeInTheDocument();
    expect(screen.getAllByText(/México/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders email', () => {
    render(<Footer />);
    expect(screen.getByText('hola@schoolify.mx')).toBeInTheDocument();
  });

  it('renders enterprise links', () => {
    render(<Footer />);
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument();
    expect(screen.getByText('Galería')).toBeInTheDocument();
    expect(screen.getByText('Beneficios')).toBeInTheDocument();
    expect(screen.getByText('Preguntas')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Aviso de Privacidad')).toBeInTheDocument();
    expect(screen.getByText('Términos y Condiciones')).toBeInTheDocument();
    expect(screen.getByText('Política de Cookies')).toBeInTheDocument();
  });

  it('renders social media icons', () => {
    render(<Footer />);
    // Social links are rendered as SVG icons with aria-labels
    const socialLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.includes('facebook') ||
      link.getAttribute('href')?.includes('instagram') ||
      link.getAttribute('href')?.includes('whatsapp') ||
      link.getAttribute('href')?.includes('youtube') ||
      link.getAttribute('href')?.includes('tiktok')
    );
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/Schoolify.mx/)).toBeInTheDocument();
  });

  it('renders "Hecho con" message', () => {
    render(<Footer />);
    expect(screen.getByText('Hecho con')).toBeInTheDocument();
    expect(screen.getByText('especialmente para las familias de México')).toBeInTheDocument();
  });

  it('has proper footer styling', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-dark-bg');
    expect(footer).toHaveClass('pt-20');
  });

  it('renders heart icon', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});