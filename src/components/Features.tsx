import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Ruler, Scissors, Package } from 'lucide-react';

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
      className={`card p-8 cursor-pointer transition-all duration-400 ${
        hovered ? 'shadow-yellow glow-yellow border-primary/50 -translate-y-2' : 'border-gray-100'
      } border`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered ? 'bg-primary shadow-yellow scale-110' : 'bg-surface'}`}>
          👕
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-accent uppercase tracking-wider">Servicio #1</span>
          <h3 className="font-heading font-800 text-2xl text-text-main mt-1">Uniformes a la medida</h3>
        </div>
      </div>

      <p className="text-text-muted leading-relaxed mb-4">
        Diseñamos y confeccionamos el uniforme escolar de tu hijo con los colores y especificaciones de su colegio. Calidad garantizada.
      </p>

      {/* Hover-reveal details */}
      <div ref={detailsRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
          {details.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg">{d.icon}</span>
              <span className="font-body font-500 text-text-main text-sm">{d.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-primary font-heading font-600 text-sm">
        <span>{hovered ? 'Ver menos ↑' : 'Hover para detalles →'}</span>
      </div>
    </div>
  );
};

/* ─── 2. VISUAL COMPARATOR — ÚTILES ESCOLARES ─────────────────────── */
const UtileComparator: React.FC = () => {
  const rows = [
    { label: 'Tiempo invertido', bad: '4–6 horas', good: '0 horas' },
    { label: 'Costo promedio', bad: '$1,200–1,800', good: '$950–1,200' },
    { label: 'Nivel de estrés', bad: '😤 Alto', good: '😌 Cero' },
    { label: 'Entrega', bad: 'Tú lo transportas', good: 'A domicilio' },
    { label: 'Garantía', bad: 'Sin garantía', good: '✓ Garantizado' },
  ];

  return (
    <div className="card p-8 border border-gray-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-3xl">
          ✏️
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-accent uppercase tracking-wider">Servicio #2</span>
          <h3 className="font-heading font-800 text-2xl text-text-main mt-1">Útiles Escolares</h3>
        </div>
      </div>

      {/* Comparator table */}
      <div className="rounded-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="grid grid-cols-3 bg-gray-50">
          <div className="p-3 text-xs font-heading font-600 text-text-muted uppercase tracking-wide"></div>
          <div className="p-3 text-center text-xs font-heading font-600 text-red-400 uppercase tracking-wide border-l border-gray-100">
            Por tu cuenta
          </div>
          <div className="p-3 text-center text-xs font-heading font-700 text-secondary uppercase tracking-wide border-l border-primary/30 bg-primary/10">
            Con Schoolify ✨
          </div>
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
          >
            <div className="p-3 text-xs font-body font-500 text-text-muted">{row.label}</div>
            <div className="p-3 text-center text-xs font-body text-red-500 border-l border-gray-100">{row.bad}</div>
            <div className="p-3 text-center text-xs font-body font-600 text-secondary border-l border-primary/30 bg-primary/5">{row.good}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── 3. TIMELINE — PAPELERÍA ──────────────────────────────────────── */
const PapeleriaTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const steps = [
    { icon: '📋', label: 'Pedido', sub: 'Nos mandas tu lista' },
    { icon: '🏭', label: 'Producción', sub: 'Etiquetas, maquetas, copias' },
    { icon: '🚚', label: 'Entrega', sub: 'En 24-48 horas' },
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
    <div className="card p-8 border border-gray-100" ref={timelineRef}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-3xl">
          📄
        </div>
        <div>
          <span className="text-xs font-heading font-600 text-accent uppercase tracking-wider">Servicio #3</span>
          <h3 className="font-heading font-800 text-2xl text-text-main mt-1">Papelería Escolar</h3>
        </div>
      </div>

      <p className="text-text-muted leading-relaxed mb-6">
        Copias, etiquetas de útiles, forros, maquetas y más. Todo en un solo lugar.
      </p>

      {/* Timeline visual */}
      <div className="relative">
        {/* Track */}
        <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div ref={progressRef} className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: 0 }} />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-2xl mb-2 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-sm">
                {step.icon}
              </div>
              <p className="font-heading font-700 text-text-main text-sm">{step.label}</p>
              <p className="text-text-muted text-xs mt-0.5">{step.sub}</p>
            </div>
          ))}
        </div>
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
    <section id="features" className="py-20 md:py-28 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={titleRef}>
          <span className="tag mb-4">Nuestros Servicios</span>
          <h2 className="section-title mb-4">
            Tres soluciones,{' '}
            <span className="text-accent">un solo lugar.</span>
          </h2>
          <p className="section-subtitle">
            Nos especializamos en todo lo que tu hijo necesita para el ciclo escolar, con la comodidad de recibirlo en casa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" ref={gridRef}>
          <UniformesCard />
          <UtileComparator />
          <PapeleriaTimeline />
        </div>
      </div>
    </section>
  );
};

export default Features;
