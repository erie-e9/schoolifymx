import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_CONTENT } from '../../types';
import type { ServiceType } from '../../types';
import StatCard from '../molecules/StatCard';
import Badge from '../atoms/Badge';

gsap.registerPlugin(ScrollTrigger);

interface StatsProps {
  activeService: ServiceType;
}

const Stats: React.FC<StatsProps> = ({ activeService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  const stats = SERVICES_CONTENT[activeService]?.stats || [];

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
    <section id="stats" className="py-4 md:py-16 bg-white dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" ref={titleRef}>
          <Badge variant="tag" size='lg' className="mb-4">Impacto medible</Badge>
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
          {stats?.map((stat, i) => (
            <StatCard
              key={`${activeService}-${i}`}
              stat={stat}
              active={countersActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Stats);
