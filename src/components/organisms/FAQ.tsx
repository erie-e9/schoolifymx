import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_CONTENT } from '../../types';
import type { ServiceType } from '../../types';
import FAQItem from '../molecules/FAQItem';
import Badge from '../atoms/Badge';

gsap.registerPlugin(ScrollTrigger);

interface FAQProps {
  activeService: ServiceType;
}

const FAQ: React.FC<FAQProps> = ({ activeService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqs = SERVICES_CONTENT[activeService]?.faqs || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeService]);

  return (
    <section id="faq" className="py-12 md:py-24 bg-surface dark:bg-dark-bg transition-colors duration-300 px-4 md:px-6" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14" ref={titleRef}>
          <Badge variant="tag" size='lg' className="mb-4">Preguntas frecuentes</Badge>
          <h2 className="section-title mb-4 dark:text-dark-text text-3xl md:text-5xl">
            {activeService === 'uniforms' && 'Sobre nuestros uniformes.'}
            {activeService === 'supplies' && 'Sobre surtido de listas.'}
            {activeService === 'didactic' && 'Sobre material didáctico.'}
          </h2>
          <p className="section-subtitle dark:text-dark-muted text-sm md:text-base">
            Resolvemos tus dudas más comunes sobre {(SERVICES_CONTENT[activeService]?.tag || '').toLowerCase()}.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {faqs.map((faq, i) => (
            <FAQItem key={`${activeService}-${i}`} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQ);
