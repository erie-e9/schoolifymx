import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BrandCarousel from '@components/molecules/BrandCarousel';

describe('BrandCarousel', () => {
  it('renders brand carousel for supplies by default', () => {
    render(<BrandCarousel />);
    // Should render multiple brand logos
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders stationery brands when activeService is supplies', () => {
    render(<BrandCarousel activeService="supplies" />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders uniform and shoe brands when activeService is uniforms', () => {
    render(<BrandCarousel activeService="uniforms" />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders brands with links', () => {
    render(<BrandCarousel />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('has carousel container styling', () => {
    const { container } = render(<BrandCarousel />);
    expect(container.firstChild).toHaveClass('bg-text-main');
    expect(container.firstChild).toHaveClass('overflow-hidden');
  });

  it('has animation class', () => {
    const { container } = render(<BrandCarousel />);
    expect(container.querySelector('.animate-scroll-left')).toBeInTheDocument();
  });

  it('has hover pause class', () => {
    const { container } = render(<BrandCarousel />);
    expect(container.querySelector('.hover\\:pause-scroll')).toBeInTheDocument();
  });
});
