import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatNumbers } from '../utils/numbers';

gsap.registerPlugin(ScrollTrigger);

interface StatData {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  description: string;
  emoji: string;
}

const stats: StatData[] = [
  { value: 60, suffix: '%', prefix: '+', label: 'Ahorro de tiempo', description: 'vs. hacer las compras tú solo', emoji: '⏱️' },
  { value: 30, suffix: '%', prefix: '+', label: 'Ahorro económico', description: 'por compras en volumen', emoji: '💰' },
  { value: 95, suffix: '%', prefix: '', label: 'Satisfacción', description: 'de nuestros clientes nos recomiendan', emoji: '⭐' },
  { value: 1000, suffix: '+', prefix: '', label: 'Familias atendidas', description: 'en el área metropolitana', emoji: '👨‍👩‍👦' },
];

const StatCounter: React.FC<{ stat: StatData; active: boolean }> = ({ stat, active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, stat.value);
      setCount(Math.floor(current));
      if (current >= stat.value) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, stat.value]);

  return (
    <div className="text-center group p-6 rounded-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-300">
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {stat.emoji}
      </div>
      <div className="font-heading font-800 text-5xl md:text-6xl text-text-main dark:text-dark-text mb-2">
        <span className="text-secondary dark:text-primary">{stat.prefix}</span>
        <span>{formatNumbers(count)}</span>
        <span className="text-accent dark:text-primary">{stat.suffix}</span>
      </div>
      <p className="font-heading font-700 text-lg text-text-main dark:text-dark-text mb-1">{stat.label}</p>
      <p className="text-text-muted dark:text-dark-muted text-sm leading-snug max-w-[160px] mx-auto">{stat.description}</p>
    </div>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setCountersActive(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={titleRef}>
          <span className="tag mb-4">Resultados reales</span>
          <h2 className="section-title mb-4 dark:text-dark-text">
            Números que{' '}
            <span className="text-primary dark:text-primary" style={{ WebkitTextStroke: '1px #111827' }}>hablan</span>{' '}
            por sí solos.
          </h2>
          <p className="section-subtitle dark:text-dark-muted">
            Más de 2 años transformando la experiencia escolar de cientos de familias.
          </p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-3xl bg-surface dark:bg-dark-surface border border-primary/20 dark:border-primary/10 hover:border-primary/60 dark:hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 dark:bg-primary/5 rounded-bl-3xl" />
              <StatCounter stat={stat} active={countersActive} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
