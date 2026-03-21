import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Clock, TrendingDown, ChevronRight, Check } from 'lucide-react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { getWhatsappLink } from '../types';
import { formatNumbers } from '../utils/numbers';

type Grade = 'Preescolar' | 'Primaria' | 'Secundaria';
type Bundle = 'Esencial' | 'Selecto';

interface SuppliesEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuppliesEstimator: React.FC<SuppliesEstimatorProps> = ({ isOpen, onClose }) => {
  const [grade, setGrade] = useState<Grade>('Primaria');
  const [bundle, setBundle] = useState<Bundle>('Selecto');
  const [range, setRange] = useState({ min: 1500, max: 2200 });
  const [timeSaved, setTimeSaved] = useState(5);

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const data = {
    Preescolar: {
      Esencial: { min: 800, max: 1200, time: 4 },
      Selecto: { min: 1200, max: 1800, time: 5 },
    },
    Primaria: {
      Esencial: { min: 1020, max: 1300, time: 5 },
      Selecto: { min: 1300, max: 1530, time: 6 },
    },
    Secundaria: {
      Esencial: { min: 1300, max: 1400, time: 6 },
      Selecto: { min: 1500, max: 2000, time: 7 },
    },
    // Preparatoria: {
    //   Básico: { min: 1000, max: 1600, time: 4 },
    //   Plus: { min: 1600, max: 2500, time: 5 },
    //   Premium: { min: 2500, max: 4000, time: 6 },
    // },
  };

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

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  useEffect(() => {
    const newStats = data[grade][bundle];
    const targetMin = newStats.min;
    const targetMax = newStats.max;

    gsap.to(range, {
      min: targetMin,
      max: targetMax,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => setRange({ min: Math.round(range.min), max: Math.round(range.max) }),
    });

    setTimeSaved(newStats.time);
  }, [grade, bundle]);

  if (!isOpen) return null;

  const waMessage = `Hola Schoolify! 👋 Necesito una cotización exacta para Útiles Escolares:\n\n📚 Grado: ${grade}\n📦 Paquete: ${bundle}\n💰 Estimado: $${range.min} - $${range.max}\n\n¿Por dónde empezamos?`;
  const waLink = getWhatsappLink(waMessage);

  const grades: Grade[] = ['Preescolar', 'Primaria', 'Secundaria'];
  const bundles: Bundle[] = ['Esencial', 'Selecto'];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 lg:p-12">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-surface rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] border border-primary/20 dark:border-primary/10 opacity-0"
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-all z-[20] active:scale-90"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left Column: Interactive Controls */}
            <div className="space-y-8 py-2">
              <div className="space-y-3">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-heading font-800 text-secondary dark:text-primary uppercase tracking-widest">Cotizador Inteligente</span>
                <h2 className="text-3xl md:text-4xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight leading-tight">
                  Calcula tu ahorro al <span className="text-secondary dark:text-primary">instante</span>.
                </h2>
                <p className="text-text-muted dark:text-dark-muted text-sm font-body max-w-md">
                  Selecciona el nivel educativo y tipo de surtido de útiles escolares para obtener una estimación inmediata basada en promedios de mercado.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1: Grade */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-text-main shadow-yellow">1</span>
                    <h4 className="font-heading font-800 text-text-main dark:text-dark-text text-base">¿Cuál es el nivel escolar?</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {grades.map((g) => (
                      <button
                        key={g}
                        onClick={() => setGrade(g)}
                        className={`py-3 px-2 rounded-xl text-[11px] font-heading font-800 transition-all border ${grade === g
                          ? 'bg-primary border-primary text-text-main shadow-yellow'
                          : 'bg-gray-50 dark:bg-dark-bg/30 border-gray-100 dark:border-gray-800 text-text-muted dark:text-dark-muted hover:border-primary/50'
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Bundle */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-text-main shadow-yellow">2</span>
                    <h4 className="font-heading font-800 text-text-main dark:text-dark-text text-base">¿Qué tipo de surtido prefieres?</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bundles.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBundle(b)}
                        className={`relative py-4 px-5 rounded-2xl text-left transition-all border group ${bundle === b
                          ? 'bg-white dark:bg-dark-bg border-primary shadow-lg ring-1 ring-primary/20'
                          : 'bg-gray-50/50 dark:bg-dark-bg/20 border-gray-100 dark:border-gray-800 grayscale hover:grayscale-0 opacity-80 hover:opacity-100'
                          }`}
                      >
                        <div className={`text-[9px] font-heading font-900 uppercase tracking-widest mb-1 ${bundle === b ? 'text-secondary dark:text-primary' : 'text-text-muted'}`}>
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

            {/* Right Column: Dynamic Results Dashboard */}
            <div className="bg-gray-50/50 dark:bg-dark-bg/40 rounded-[2.5rem] p-8 md:p-10 border border-gray-200/50 dark:border-gray-800/50 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center space-y-2 relative z-10">
                <p className="text-[10px] font-heading font-900 text-secondary dark:text-primary uppercase tracking-[0.25em]">Estimación Inmediata</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-heading font-900 text-text-main dark:text-dark-text tracking-tighter transition-all">
                    ${formatNumbers(range.min)}
                  </span>
                  <span className="text-2xl text-white/60 font-heading font-300">-</span>
                  <span className="text-5xl md:text-6xl font-heading font-900 text-text-main dark:text-dark-text tracking-tighter transition-all">
                    ${formatNumbers(range.max)}
                  </span>
                  <span className="text-xl font-heading font-800 text-text-muted ml-1">MXN</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white dark:bg-dark-surface p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800/60 transition-transform active:scale-95">
                  <div className="flex items-center gap-2 text-secondary dark:text-primary mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-heading font-900 uppercase tracking-widest">Tiempo que ahorras</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-heading font-900 text-text-main dark:text-dark-text">{timeSaved}</span>
                    <span className="text-xs font-body text-text-muted dark:text-dark-muted font-600">horas</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-dark-surface p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800/60 transition-transform active:scale-95">
                  <div className="flex items-center gap-2 text-green-500 mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-[10px] font-heading font-900 uppercase tracking-widest">Ahorro</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-heading font-900 text-text-main dark:text-dark-text">15-20</span>
                    <span className="text-xs font-body text-text-muted dark:text-dark-muted font-600">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 relative z-10">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-secondary dark:bg-primary text-white dark:text-text-main font-heading font-900 text-base py-5 rounded-2xl shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 group/btn"
                >
                  <WhatsApp className="w-6 h-6 fill-white dark:fill-text-main" />
                  Cotizar mi lista ahora
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <p className="text-center text-[10px] text-text-muted dark:text-dark-muted font-body leading-relaxed max-w-[280px] mx-auto">
                  *Estimación referencial. El precio final puede variar según la escuela y el fecha en el que se haga la cotización.
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

export default SuppliesEstimator;
