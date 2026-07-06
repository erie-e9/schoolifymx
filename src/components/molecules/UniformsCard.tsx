import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ExpandIcon, Ruler, X } from 'lucide-react';
import UniformSizeHelper from '@components/organisms/UniformSizeHelper';

const UNIFORM_DETAILS = [
  { icon: '📐', text: 'Confección a medida' },
  { icon: '🪡', text: 'Reparaciones y ajustes' },
  { icon: '🪄', text: 'Personalización de prendas, logos y nombres' },
  { icon: '💃🏻', text: 'Vestuario escolar y eventos' },
];

interface UniformsCardProps {
  active?: boolean;
}

const UniformsCard: React.FC<UniformsCardProps> = ({ active }) => {
  const [hovered, setHovered] = useState(false);
  const [isSizeHelperOpen, setIsSizeHelperOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  useEffect(() => {
    if (detailsRef.current) {
      gsap.to(detailsRef.current, {
        height: (hovered || active) ? 'auto' : 0,
        opacity: (hovered || active) ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [hovered, active]);

  useEffect(() => {
    const checkUrlAndSync = () => {
      const params = new URLSearchParams(window.location.search);
      const isParamOpen = params.get('modal') === 'uniforms';
      setIsSizeHelperOpen(isParamOpen);
    };

    checkUrlAndSync();

    window.addEventListener('popstate', checkUrlAndSync);
    return () => window.removeEventListener('popstate', checkUrlAndSync);
  }, []);

  const openModal = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('modal', 'uniforms');
    window.history.pushState({ isModal: true, modalName: 'uniforms' }, '', url.toString());
    setIsSizeHelperOpen(true);
  };

  const closeModal = () => {
    setIsSizeHelperOpen(false);
    if (window.history.state?.isModal && window.history.state?.modalName === 'uniforms') {
      window.history.back();
    } else {
      const url = new URL(window.location.href);
      if (url.searchParams.get('modal') === 'uniforms') {
        url.searchParams.delete('modal');
        window.history.replaceState(null, '', url.toString());
      }
    }
  };

  return (
    <div
      className={`card p-6 md:p-8 cursor-pointer transition-all duration-400 ${hovered || active
        ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2'
        : 'border-gray-100 dark:border-gray-800'
        } border bg-white dark:bg-dark-surface ${active ? 'ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          👕
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <p className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Uniformes a la medida</p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                className="flex items-center justify-center bg-primary/20 border-primary text-text-main dark:text-dark-text hover:bg-primary p-2 rounded-xl transition-all duration-300 border hover:shadow-yellow hover:-translate-y-0.5 group/btn"
                aria-label="Abrir asistente de tallas"
              >
                <Ruler className="w-5 h-5 transition-transform group-hover:rotate-12 dark:text-white animate-shake-icon" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                aria-label="Expandir tarjeta" className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
              >
                <ExpandIcon className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
              </button>
            </div>
          </div>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">Pedidos anticipados entregados justo a tiempo y a medida de cada estudiante y nivel educativo.</span>
        </div>
      </div>

      <UniformSizeHelper
        isOpen={isSizeHelperOpen}
        onClose={closeModal}
      />
      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-4">
        Confeccionamos, reparamos, personalizamos y entregamos el uniforme escolar <span className="text-secondary dark:text-primary font-600">con los colores, tela y especificaciones</span> de cada escuela.
      </p>

      <div ref={detailsRef} className="overflow-hidden">
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-3">
          {UNIFORM_DETAILS.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg">{d.icon}</span>
              <span className="font-body font-500 text-text-main dark:text-dark-text text-sm">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Expanded Modal */}
      {isExpanded && createPortal(
        <div
          className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in cursor-default"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative w-full max-w-5xl mx-auto max-h-[90vh] md:max-h-[85vh] flex flex-col bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-6 md:p-10 overflow-y-auto animate-scale-in border border-gray-100 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
              aria-label="Cerrar vista expandida"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Grid layout */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-4 items-center">
              {/* Left Column: Visuals & Intro */}
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-4xl shadow-yellow">
                  👕
                </div>
                <div>
                  <h3 className="font-heading font-800 text-2xl md:text-3xl text-text-main dark:text-dark-text mb-2">
                    Uniformes a la medida
                  </h3>
                  <span className="text-xs font-heading font-600 text-accent dark:text-primary tracking-wider uppercase block mb-4">
                    Pedidos anticipados justo a tiempo y a medida
                  </span>
                  <p className="text-text-muted dark:text-dark-muted leading-relaxed text-sm md:text-base">
                    Confeccionamos, reparamos, personalizamos y entregamos el uniforme escolar <span className="text-secondary dark:text-primary font-600">con los colores, tela y especificaciones</span> de cada escuela. Garantizamos ajuste perfecto para cada estudiante y nivel educativo.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      openModal();
                    }}
                    className="flex items-center gap-2 bg-primary text-text-main hover:bg-primary-hover px-5 py-3 rounded-2xl font-heading font-700 text-sm transition-all duration-300 shadow-lg hover:shadow-yellow active:scale-95 border border-primary/20"
                  >
                    <Ruler className="w-5 h-5" />
                    Abrir asistente de tallas
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed List */}
              <div className="border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-6 md:pt-0 md:pl-10">
                <h4 className="font-heading font-700 text-md text-text-main dark:text-dark-text mb-6">
                  Detalles del servicio
                </h4>
                <div className="flex flex-col gap-5">
                  {UNIFORM_DETAILS.map((d, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-dark-bg/40 border border-gray-100/50 dark:border-gray-800/50 hover:shadow-md transition-shadow">
                      <span className="text-2xl bg-white dark:bg-dark-surface p-2 rounded-xl shadow-sm">{d.icon}</span>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        <span className="font-heading font-800 text-xs md:text-sm text-text-main dark:text-dark-text">{d.text}</span>
                        <span className="font-body text-[11px] md:text-xs text-text-muted dark:text-dark-muted">
                          {i === 0 && 'Ajustado a la complexión de cada estudiante para máxima comodidad diaria.'}
                          {i === 1 && 'Soporte completo para ajustes a lo largo del ciclo escolar.'}
                          {i === 2 && 'Bordado de logotipos oficiales, nombres personalizados y detalles únicos.'}
                          {i === 3 && 'Trajes especiales para escoltas, bandas de guerra y graduaciones.'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default React.memo(UniformsCard);
