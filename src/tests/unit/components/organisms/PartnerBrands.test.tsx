import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PartnerBrands from '@components/organisms/PartnerBrands';

describe('PartnerBrands', () => {
  it('renders section title', () => {
    render(<PartnerBrands />);
    expect(screen.getByText('Instituciones que ya confían en nosotros')).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<PartnerBrands />);
    expect(screen.getByText('Confianza comprobada')).toBeInTheDocument();
  });

  it('renders partner institutions', () => {
    render(<PartnerBrands />);
    // Use getAllByText since logos are doubled for infinite scroll effect
    const colegioExcelsiorElements = screen.getAllByText('Colegio Excelsior');
    expect(colegioExcelsiorElements.length).toBeGreaterThan(0);

    const institutoMoralesElements = screen.getAllByText('Instituto Morales');
    expect(institutoMoralesElements.length).toBeGreaterThan(0);

    const primariaSanPabloElements = screen.getAllByText('Primaria San Pablo');
    expect(primariaSanPabloElements.length).toBeGreaterThan(0);
  });

  it('renders partner emojis', () => {
    render(<PartnerBrands />);
    // Use getAllByText since emojis appear multiple times
    const schoolEmojis = screen.getAllByText('🏫');
    expect(schoolEmojis.length).toBeGreaterThan(0);

    const bookEmojis = screen.getAllByText('📚');
    expect(bookEmojis.length).toBeGreaterThan(0);

    const pencilEmojis = screen.getAllByText('✏️');
    expect(pencilEmojis.length).toBeGreaterThan(0);
  });

  it('has proper section styling', () => {
    const { container } = render(<PartnerBrands />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-surface');
    expect(section).toHaveClass('py-20');
  });

  it('has gradient overlays', () => {
    const { container } = render(<PartnerBrands />);
    // One gradient-to-r and one gradient-to-l
    const gradientR = container.querySelectorAll('.bg-gradient-to-r');
    const gradientL = container.querySelectorAll('.bg-gradient-to-l');
    expect(gradientR.length).toBe(1);
    expect(gradientL.length).toBe(1);
  });

  it('has logos track', () => {
    const { container } = render(<PartnerBrands />);
    expect(container.querySelector('.logos-track')).toBeInTheDocument();
  });

  it('renders doubled logos for infinite scroll effect', () => {
    render(<PartnerBrands />);
    // Should have multiple instances of each logo (tripled for smooth loop)
    const colegioExcelsiorElements = screen.getAllByText('Colegio Excelsior');
    expect(colegioExcelsiorElements.length).toBeGreaterThan(1);
  });

  it('renders all 8 partner institutions', () => {
    render(<PartnerBrands />);
    const partnerNames = [
      'Colegio Excelsior',
      'Instituto Morales',
      'Primaria San Pablo',
      'Secundaria Cervantes',
      'Kinder Arcoíris',
      'Prepa Alfa',
      'I. Montessori MX',
      'Colegio Británico'
    ];
    partnerNames.forEach(name => {
      const elements = screen.getAllByText(name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});