import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Clock, TrendingDown, ChevronRight, Check, Camera, Calculator, X } from 'lucide-react';
import { formatNumbers } from '@utils/numbers';
import { useSuppliesEstimation, type Grade, type Bundle } from '@hooks/useSuppliesEstimation';
import Button from '@components/atoms/Button';
import Badge from '@components/atoms/Badge';

interface SuppliesEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScanner: () => void;
}

const GRADES: Grade[] = ['Preescolar', 'Primaria', 'Secundaria'];
const BUNDLES: Bundle[] = ['Esencial', 'Selecto'];

const SuppliesEstimator: React.FC<SuppliesEstimatorProps> = ({ isOpen, onClose, onOpenScanner }) => {
  const {
    grade,
    setGrade,
    bundle,
    setBundle,
    range,
    timeSaved
  } = useSuppliesEstimation();

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(modalRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 lg:p-12">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-surface rounded-[2rem] shadow-2xl border border-primary/20 dark:border-primary/10 opacity-0"
      >
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="p-7 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="space-y-8 py-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-yellow animate-float flex-shrink-0">
                  <Calculator className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight leading-tight">
                    Calcula tu ahorro al <span className="text-secondary dark:text-primary">instante</span>.
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Selecciona el nivel educativo y tipo de surtido de útiles escolares para obtener una estimación inmediata.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="primary" className="w-7 h-7 rounded-full px-0 justify-center">1</Badge>
                    <h4 className="font-heading font-800 text-text-main dark:text-dark-text text-base">¿Cuál es el nivel escolar?</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {GRADES.map((g) => (
                      <button
                        key={g}
                        onClick={() => setGrade(g)}
                        className={`py-3 px-2 rounded-xl text-[11px] font-heading font-800 transition-all border ${grade === g
                          ? 'bg-primary border-primary text-text-main shadow-yellow'
                          : 'bg-gray-50 dark:bg-dark-bg/30 border-gray-100 dark:border-gray-800 text-text-muted dark:text-dark-muted hover:border-primary/50'
                          }`}
                        aria-label={`Seleccionar ${g}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="primary" className="w-7 h-7 rounded-full px-0 justify-center">2</Badge>
                    <h4 className="font-heading font-800 text-text-main dark:text-dark-text text-base">¿Qué tipo de surtido prefieres?</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUNDLES.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBundle(b)}
                        className={`relative py-4 px-5 rounded-2xl text-left transition-all border group ${bundle === b
                          ? 'bg-white dark:bg-dark-bg border-primary shadow-lg ring-1 ring-primary/20'
                          : 'bg-gray-50/50 dark:bg-dark-bg/20 border-gray-100 dark:border-gray-800 grayscale hover:grayscale-0 opacity-80 hover:opacity-100'
                          }`}
                        aria-label={`Seleccionar ${b}`}
                      >
                        <div className={`text-[9px] font-heading font-900 uppercase tracking-widest mb-1 ${bundle === b ? 'text-secondary dark:text-primary' : 'dark:text-dark-muted'}`}>
                          {b}
                        </div>
                        <div className="text-xs font-body font-600 text-text-main dark:text-dark-text leading-tight">
                          {b === 'Esencial' && 'Ajustamos el surtido a lo que realmente se necesita tomando en consideración un presupuesto limitado'}
                          {b === 'Selecto' && 'Marcas reconocidas que destacan por su calidad y durabilidad'}
                        </div>
                        {bundle === b && <Check className="absolute top-4 right-5 w-3 h-3 text-secondary dark:text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 dark:bg-dark-bg/40 rounded-[2.5rem] p-7 md:p-7 border border-gray-200/50 dark:border-gray-800/50 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center space-y-2 relative z-10">
                <p className="text-[10px] font-heading font-900 text-secondary dark:text-primary uppercase tracking-[0.25em]">Estimación Inmediata</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-heading font-900 text-text-main dark:text-dark-text tracking-tighter transition-all">
                    ~ ${formatNumbers(range.min)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white dark:bg-dark-surface p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800/60">
                  <div className="flex items-center gap-1 text-secondary dark:text-primary mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-[9px] font-heading font-900 uppercase tracking-widest">Tiempo que ahorras</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-heading font-900 text-text-main dark:text-dark-text">{timeSaved}</span>
                    <span className="text-xs font-body text-text-muted dark:text-dark-muted font-600">horas</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-dark-surface p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800/60">
                  <div className="flex items-center gap-1 text-green-500 mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-[9px] font-heading font-900 uppercase tracking-widest">Ahorro</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-heading font-900 text-text-main dark:text-dark-text">5-10</span>
                    <span className="text-xs font-body text-text-muted dark:text-dark-muted font-600">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 relative z-10">
                <Button
                  variant="primary"
                  size='md'
                  className="w-full text-base bg-secondary dark:bg-primary text-white dark:text-text-main"
                  onClick={onOpenScanner}
                  leftIcon={<Camera className="w-6 h-6" />}
                  rightIcon={<ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                  aria-label='Subir imagen de mi lista'
                >
                  <span className='hidden md:inline'>Subir imagen de mi lista</span>
                  <span className='inline md:hidden'>Subir mi lista</span>
                </Button>
                <p className="text-center text-[10px] text-text-muted dark:text-dark-muted font-body leading-relaxed max-w-[280px] mx-auto">
                  *Al subir tu lista, nuestros asistentes te podrán compartir precio actual de tu lista.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(SuppliesEstimator);
