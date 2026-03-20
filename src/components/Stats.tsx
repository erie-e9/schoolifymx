import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatNumbers } from '../utils/numbers';
import { SERVICES_CONTENT } from '../types';
import type { ServiceType, ServiceStat } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  stat: ServiceStat;
  active: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({ stat, active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    // Reset and animate
    setCount(0);
    const duration = 1500;
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
    <div className="text-center group p-6 md:p-8 rounded-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-300 h-full flex flex-col justify-center items-center">
      <div className="text-3xl md:text-4xl mb-3 group-hover:rotate-12 transition-transform duration-300">
        {stat.emoji}
      </div>
      <div className="font-heading font-800 text-4xl md:text-6xl text-text-main dark:text-dark-text mb-2 flex items-baseline gap-1">
        <span className="text-secondary dark:text-primary text-2xl md:text-4xl">{stat.prefix}</span>
        <span>{formatNumbers(count)}</span>
        <span className="text-accent dark:text-primary text-xl md:text-3xl">{stat.suffix}</span>
      </div>
      <p className="font-heading font-700 text-base md:text-lg text-text-main dark:text-dark-text mb-1 leading-tight">{stat.label}</p>
      <p className="text-text-muted dark:text-dark-muted text-xs md:text-sm leading-snug max-w-[180px] mx-auto opacity-80">{stat.description}</p>
    </div>
  );
};

interface StatsProps {
  activeService: ServiceType;
}

const Stats: React.FC<StatsProps> = ({ activeService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  const stats = SERVICES_CONTENT[activeService].stats;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => setCountersActive(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeService]);

  return (
    <section id="stats" className="py-16 md:py-28 bg-white dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" ref={titleRef}>
          <span className="tag mb-4 shadow-sm">Impacto medible</span>
          <h2 className="section-title mb-4 dark:text-dark-text text-3xl md:text-5xl">
            Números que{' '}
            <span className="text-primary dark:text-primary" style={{ WebkitTextStroke: '0.5px #111827' }}>hablan</span>{' '}
            por sí solos.
          </h2>
          <p className="section-subtitle dark:text-dark-muted text-sm md:text-base px-2">
            {activeService === 'uniforms' ? 'Más de 10 años convirtiendo telas en nuevas prendas hechas a la medida y reparando ya existentes.' : activeService === 'supplies' ? 'Más de 2 años surtiendo listas escolares que se ajustan a tu presupuesto.' : 'Preparando el mejor material para el éxito académico de tus hijos.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={`${activeService}-${i}`}
              className="relative overflow-hidden rounded-3xl bg-surface dark:bg-dark-surface border border-gray-100 dark:border-gray-800/50 hover:border-primary/40 dark:hover:border-primary/20 transition-all duration-300 shadow-sm md:hover:-translate-y-1"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 dark:bg-primary/5 rounded-full blur-xl" />
              <StatCounter stat={stat} active={countersActive} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
