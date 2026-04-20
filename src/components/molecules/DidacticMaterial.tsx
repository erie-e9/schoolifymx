import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DIDACTIC_STEPS = [
  { icon: '📋', label: 'Pedido', sub: 'Vía WhatsApp' },
  { icon: '✨', label: 'Personalización', sub: 'Ponemos manos a la obra' },
  { icon: '🚚', label: 'Entrega', sub: 'Listo para clases o decoración' },
];

interface DidacticMaterialProps {
  active?: boolean;
}

const DidacticMaterial: React.FC<DidacticMaterialProps> = ({ active }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(progressRef.current, {
            width: '100%',
            duration: 1.5,
            ease: 'power2.out',
          });
        },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`card p-6 md:p-8 border transition-all duration-400 border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface ${active ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2 ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`}
      ref={timelineRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          📚
        </div>
        <div>
          <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Material didáctico</h3>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">Hacemos la vida mas sencilla dentro y fuera de las aulas en actividades y decoración.</span>
        </div>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-6">
        Resolvemos la logística entre escuela y padres de familia para ayudar en actividades que no conciernen a los estudiantes <span className="text-secondary dark:text-primary font-600">pero que influyen en su día a día</span>.
      </p>

      <div className="relative">
        <div className="h-1.5 bg-gray-100 dark:bg-dark-bg rounded-full mb-6 overflow-hidden">
          <div ref={progressRef} className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: 0 }} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {DIDACTIC_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-surface dark:bg-dark-bg flex items-center justify-center text-2xl mb-2 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-sm dark:shadow-none">
                {step.icon}
              </div>
              <p className="font-heading font-700 text-text-main dark:text-dark-text text-[12px]">{step.label}</p>
              <p className="text-text-muted dark:text-dark-muted text-[10px] mt-0.5">{step.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DidacticMaterial;
