import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator } from 'lucide-react';
import SuppliesEstimator from './SuppliesEstimator';

gsap.registerPlugin(ScrollTrigger);

/* ─── 1. INTERACTIVE CARD — UNIFORMES ─────────────────────────────── */
export const UniformsCard: React.FC<{ active?: boolean }> = ({ active }) => {
  const [hovered, setHovered] = useState(false);
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

  const details = [
    { icon: '📐', text: 'Confección a medida' },
    { icon: '🪡', text: 'Reparaciones y ajustes' },
    { icon: '🎽', text: 'Vestuario escolar y eventos' },
  ];

  return (
    <div
      className={`card p-8 cursor-pointer transition-all duration-400 ${hovered || active
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
        <div>
          <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Uniformes a la medida</h3>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">Pedidos anticipados entregados justo a tiempo y a medida de cada estudiante.</span>
        </div>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-4">
        Confeccionamos, reparamos y entregamos el uniforme escolar de estudiantes <span className="text-secondary dark:text-primary font-600">con los colores, tela y especificaciones</span> de cada escuela.
      </p>

      {/* Hover-reveal details */}
      <div ref={detailsRef} className="overflow-hidden" style={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-3">
          {details.map((d, i) => (
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

/* ─── 2. VISUAL COMPARATOR — ÚTILES ESCOLARES ─────────────────────── */
export const SuppliesComparator: React.FC<{ active?: boolean }> = ({ active }) => {
  const [hovered, setHovered] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const rows = [
    { label: 'Tiempo invertido', bad: '4–6 horas', good: '0 horas' },
    { label: 'Costo promedio + extras', bad: '$1,200–1,800', good: '$1,020–1,530' },
    { label: 'Nivel de estrés', bad: '😤 Alto', good: '😌 Cero' },
    { label: 'Entrega', bad: 'Tú lo transportas', good: 'Nosotros te lo llevamos' },
    { label: 'Sobrantes', bad: 'Con restos de productos innecesarios', good: '✓ Sin sobrantes' },
  ];

  return (
    <div className={`card p-8 border transition-all duration-400 border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface ${active ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2 ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
            ✏️
          </div>
          <div className="flex flex-col gap-0.5 mt-0.5">
            <h3 className="font-heading font-800 text-xl md:text-2xl text-text-main dark:text-dark-text leading-tight">Útiles Escolares</h3>
            <span className="text-[10px] md:text-xs font-heading font-600 text-accent dark:text-primary tracking-wider max-w-[240px] md:max-w-none">
              La solución definitiva al regreso a clases.
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="flex items-center gap-2 bg-primary/10 hover:bg-primary text-text-main font-heading font-800 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all duration-300 border border-primary/20 hover:shadow-yellow hover:-translate-y-0.5 group"
          title="Calculadora de Ahorro"
        >
          <Calculator className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-12 dark:text-white" />
        </button>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-4">
        Nosotros lo hacemos por ti, comparamos, surtimos, ordenamos y transportamos cada paquete individual <span className="text-secondary dark:text-primary font-600">como si lo hicieras tú</span>.
      </p>

      {/* Comparator table */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="grid grid-cols-3 bg-gray-50 dark:bg-dark-bg/50">
          <div className="p-3 text-xs font-heading font-600 text-text-muted dark:text-dark-muted uppercase tracking-wide"></div>
          <div className="p-3 text-center text-xs font-heading font-600 text-red-400 dark:text-red-300 uppercase tracking-wide border-l border-gray-100 dark:border-gray-800">
            Por tu cuenta
          </div>
          <div className="p-3 text-center text-xs font-heading font-700 text-secondary dark:text-primary uppercase tracking-wide border-l border-primary/30 bg-primary/10">
            Con Schoolify
          </div>
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 ${i % 2 === 0 ? 'bg-white dark:bg-dark-surface' : 'bg-gray-50/50 dark:bg-dark-bg/20'}`}
          >
            <div className="p-3 text-xs font-body font-500 text-text-muted dark:text-dark-muted">{row.label}</div>
            <div className="p-3 text-center text-xs font-body text-red-500 dark:text-red-300 border-l border-gray-100 dark:border-gray-800">{row.bad}</div>
            <div className="p-3 text-center text-xs font-body font-600 text-secondary dark:text-primary border-l border-primary/30 bg-primary/5">{row.good}</div>
          </div>
        ))}
      </div>
      <SuppliesEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </div>
  );
};

/* ─── 3. TIMELINE — PAPELERÍA ──────────────────────────────────────── */
export const DidacticMaterialTimeline: React.FC<{ active?: boolean }> = ({ active }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const steps = [
    { icon: '📋', label: 'Pedido', sub: 'Vía WhatsApp' },
    { icon: '✨', label: 'Personalización', sub: 'Ponemos manos a la obra' },
    { icon: '🚚', label: 'Entrega', sub: 'Listo para clases o decoración' },
  ];

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
    <div className={`card p-8 border transition-all duration-400 border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface ${active ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2 ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`} ref={timelineRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          📄
        </div>
        <div>
          <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Material didáctico</h3>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">Hacemos la vida mas sencilla dentro y fuera de las aulas en actividades y decoración.</span>
        </div>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-6">
        Resolvemos la logística entre escuela y padres de familia para ayudar en actividades que no conciernen a los estudiantes <span className="text-secondary dark:text-primary font-600">pero que influyen en su día a día</span>.
      </p>

      {/* Timeline visual */}
      <div className="relative">
        <div className="h-1.5 bg-gray-100 dark:bg-dark-bg rounded-full mb-6 overflow-hidden">
          <div ref={progressRef} className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: 0 }} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-surface dark:bg-dark-bg flex items-center justify-center text-2xl mb-2 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-sm dark:shadow-none">
                {step.icon}
              </div>
              <p className="font-heading font-700 text-text-main dark:text-dark-text text-sm">{step.label}</p>
              <p className="text-text-muted dark:text-dark-muted text-xs mt-0.5">{step.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
