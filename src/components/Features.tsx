import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ServiceType } from '../types';
import { UniformsCard, SuppliesComparator, DidacticMaterialTimeline } from './ServiceDisplays';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {
  activeService?: ServiceType;
}

/* ─── FEATURES SECTION (CONTAINER) ────────────────────────────────── */
const Features: React.FC<FeaturesProps> = ({ activeService }) => {
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
            <SuppliesComparator active={activeService === 'supplies'} />
          </div>

          <div className="grid sm:grid-cols-1 gap-6">
            <UniformsCard active={activeService === 'uniforms'} />
          </div>

          <div className="grid sm:grid-cols-1 gap-6">
            <DidacticMaterialTimeline active={activeService === 'didactic'} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
