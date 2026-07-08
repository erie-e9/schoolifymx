import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import type { BrandLogo } from '@components/organisms/BrandComparatorModal';

interface BrandDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  row: {
    product: string;
    esencial: BrandLogo[];
    selecto: BrandLogo[];
  } | null;
}

const BrandLogos: React.FC<{ logos: BrandLogo[]; colorClass: string }> = ({ logos, colorClass }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 py-1">
    {logos.map((logo, i) => (
      <div
        key={i}
        className={`flex items-center justify-center rounded-lg px-2 py-1 bg-dark-bg/90 dark:bg-dark-bg border ${colorClass} shadow-sm`}
        title={logo.alt}
      >
        {
          React.createElement(logo.src as React.ElementType, {
            className: "h-5 w-auto object-contain"
          })
        }
      </div>
    ))}
  </div>
);

const BrandDetailModal: React.FC<BrandDetailModalProps> = ({ isOpen, onClose, row }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(
          modalRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.2'
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  };

  if (!isOpen || !row) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      {/* Backdrop with stronger blur */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/70 backdrop-blur-lg opacity-0"
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        className="p-2 relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-surface rounded-xl shadow-2xl border border-primary/20 dark:border-primary/10 opacity-0"
      >
        {/* Header */}
        <div className="flex flex-col justify-between p-4 border-b border-gray-100 dark:border-primary/5 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl align-left font-heading font-900 text-text-main dark:text-dark-text">{row.product}</h2>
          <p className="text-[11px] mt-1 text-text-muted dark:text-dark-muted font-body leading-relaxed">
            *Cualquiera de estas marcas pueden incluirse en tu lista de útiles, de acuerdo al paquete que elijas.
          </p>
          <button onClick={handleClose} aria-label="Cerrar" className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Esencial section */}
        <section className="p-4">
          <span className="p-1 text-center text-[11px] font-heading font-bold text-amber-500 uppercase tracking-widest border-gray-100 dark:border-gray-800">Paquete Esencial</span>
          <span className="text-[8px] font-heading font-700 text-text-muted dark:text-dark-muted uppercase tracking-wider">(economía)</span>
          <BrandLogos logos={row.esencial} colorClass="border-amber-100 dark:border-amber-900/30" />
        </section>
        {/* Selecto section */}
        <section className="p-4 border-t border-gray-100 dark:border-dark-muted/40">
          <span className="p-1 text-center text-[11px] font-heading font-bold text-secondary dark:text-primary uppercase tracking-widest border-primary/30">Paquete Selecto</span>
          <span className="text-[8px] font-heading font-700 text-text-muted dark:text-dark-muted uppercase tracking-wider">(calidad)</span>
          <BrandLogos logos={row.selecto} colorClass="border-primary/20" />
        </section>
      </div>
    </div>,
    document.body
  );
};

export default BrandDetailModal;
