import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── 1. INTERACTIVE CARD — UNIFORMES ─────────────────────────────── */
const UniformesCard: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailsRef.current) {
      gsap.to(detailsRef.current, {
        height: hovered ? 'auto' : 0,
        opacity: hovered ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [hovered]);

  const details = [
    { icon: '📐', text: 'Confección a medida' },
    { icon: '🪡', text: 'Reparaciones incluidas' },
    { icon: '🎽', text: 'Vestuario escolar y eventos' },
  ];

  return (
    <div
      className={`card p-8 cursor-pointer transition-all duration-400 ${hovered ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2' : 'border-gray-100 dark:border-gray-800'
        } border bg-white dark:bg-dark-surface`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          👕
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary uppercase tracking-wider">Servicio #2</span>
          <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Uniformes a la medida</h3>
        </div>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-4">
        Diseñamos y confeccionamos el uniforme escolar de tu hijo con los colores y especificaciones de su colegio. Calidad garantizada.
      </p>

      {/* Hover-reveal details */}
      <div ref={detailsRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-3">
          {details.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg">{d.icon}</span>
              <span className="font-body font-500 text-text-main dark:text-dark-text text-sm">{d.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-primary font-heading font-600 text-sm">
        <span>{hovered ? 'Ver menos ↑' : 'Más detalles →'}</span>
      </div>
    </div>
  );
};

/* ─── 2. VISUAL COMPARATOR — ÚTILES ESCOLARES ─────────────────────── */
const UtileComparator: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const rows = [
    { label: 'Tiempo invertido', bad: '4–6 horas', good: '0 horas' },
    { label: 'Costo promedio', bad: '$1,200–1,800', good: '$1,020–1,530' },
    { label: 'Nivel de estrés', bad: '😤 Alto', good: '😌 Cero' },
    { label: 'Entrega', bad: 'Tú lo transportas', good: 'Nosotros te lo llevamos' },
    { label: 'Garantía', bad: 'Sin garantía', good: '✓ Garantizado' },
  ];

  return (
    <div className="card p-8 border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          ✏️
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary uppercase tracking-wider">Servicio #1</span>
          <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Útiles Escolares</h3>
        </div>
      </div>

      {/* Comparator table */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="grid grid-cols-3 bg-gray-50 dark:bg-dark-bg/50">
          <div className="p-3 text-xs font-heading font-600 text-text-muted dark:text-dark-muted uppercase tracking-wide"></div>
          <div className="p-3 text-center text-xs font-heading font-600 text-red-400 dark:text-red-300 uppercase tracking-wide border-l border-gray-100 dark:border-gray-800">
            Por tu cuenta
          </div>
          <div className="p-3 text-center text-xs font-heading font-700 text-secondary dark:text-primary uppercase tracking-wide border-l border-primary/30 bg-primary/10">
            Con Schoolify.mx
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
    </div>
  );
};

/* ─── 3. TIMELINE — PAPELERÍA ──────────────────────────────────────── */
const DidacticMaterialTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const steps = [
    { icon: '📋', label: 'Pedido', sub: 'Lista via WhatsApp' },
    { icon: '✨', label: 'Personalización', sub: 'Forrado + Etiquetado' },
    { icon: '🚚', label: 'Entrega', sub: 'Listo para clases' },
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
    <div className="card p-8 border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface" ref={timelineRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
          📄
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-accent dark:text-primary uppercase tracking-wider">Servicio #3</span>
          <h3 className="font-heading font-800 text-2xl text-text-main dark:text-dark-text mt-1">Material didáctico</h3>
        </div>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-6">
        Olvídate de las etiquetas y el forrado. Entregamos tus libros y cuadernos <span className="text-secondary dark:text-primary font-600">listos para usarse</span>.
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

/* ─── 4. TRUST CARD — GARANTÍAS ───────────────────────────────────── */
const TrustCard: React.FC = () => {
  const items = [
    { icon: '🏷️', label: 'Garantía de Precio', sub: 'Igualamos o mejoramos' },
    { icon: '💳', label: 'Plan de Apartado', sub: 'Paga poco a poco' },
    { icon: '🧾', label: 'Facturación Beta', sub: 'Digital y al instante' },
  ];

  return (
    <div className="card p-8 border border-gray-100 bg-secondary group">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl group-hover:bg-primary transition-all duration-300">
          🛡️
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-primary uppercase tracking-wider">Compromiso</span>
          <h3 className="font-heading font-800 text-2xl text-white mt-1">Confianza Schoolify</h3>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="font-heading font-700 text-white text-sm">{item.label}</p>
              <p className="text-white/60 text-xs">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── FEATURES SECTION (CONTAINER) ────────────────────────────────── */
const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(gridRef.current?.children ?? [],
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-20 md:py-28 bg-white dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={titleRef}>
          <span className="tag mb-4">Propuesta de Valor</span>
          <h2 className="section-title mb-4 dark:text-dark-text">
            Soluciones escolares,{' '}
            <span className="text-accent dark:text-primary">tranquilidad total.</span>
          </h2>
          <p className="section-subtitle dark:text-dark-muted">
            Entendemos los retos del regreso a clases. Por eso diseñamos servicios que resuelven cada detalle por ti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" ref={gridRef}>
          <div className="grid sm:grid-cols-1 gap-6">
            <UtileComparator />
          </div>

          <div className="grid sm:grid-cols-1 gap-6">
            <UniformesCard />
          </div>

          <div className="grid sm:grid-cols-1 gap-6">
            <DidacticMaterialTimeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
