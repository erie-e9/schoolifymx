import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Ruler } from 'lucide-react';
import UniformSizeHelper from '@components/organisms/UniformSizeHelper';

const UNIFORM_DETAILS = [
  { icon: '📐', text: 'Confección a medida' },
  { icon: '🪡', text: 'Reparaciones y ajustes' },
  { icon: '🎽', text: 'Vestuario escolar y eventos' },
];

interface UniformsCardProps {
  active?: boolean;
}

const UniformsCard: React.FC<UniformsCardProps> = ({ active }) => {
  const [hovered, setHovered] = useState(false);
  const [isSizeHelperOpen, setIsSizeHelperOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className={`card p-6 md:p-8 cursor-pointer transition-all duration-400 ${hovered || active
        ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2'
        : 'border-gray-100 dark:border-gray-800'
        } border bg-white dark:bg-dark-surface ${active ? 'ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          👕
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Uniformes a la medida</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSizeHelperOpen(true);
              }}
              className="flex items-center justify-center bg-primary/20 border-primary text-text-main dark:text-dark-text hover:bg-primary p-2 rounded-xl transition-all duration-300 border hover:shadow-yellow hover:-translate-y-0.5 group/btn"
            >
              <Ruler className="w-5 h-5 transition-transform group-hover:rotate-12 dark:text-white animate-shake-icon" />
            </button>
          </div>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">Pedidos anticipados entregados justo a tiempo y a medida de cada estudiante y nivel educativo.</span>
        </div>
      </div>

      <UniformSizeHelper isOpen={isSizeHelperOpen} onClose={() => setIsSizeHelperOpen(false)} />
      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-4">
        Confeccionamos, reparamos y entregamos el uniforme escolar <span className="text-secondary dark:text-primary font-600">con los colores, tela y especificaciones</span> de cada escuela.
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
    </div>
  );
};

export default React.memo(UniformsCard);
