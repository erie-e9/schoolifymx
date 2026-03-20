import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { SERVICES_CONTENT } from '../types';
import type { ServiceType, FAQItem as FAQItemType } from '../types';

gsap.registerPlugin(ScrollTrigger);

const FAQItem: React.FC<{ item: FAQItemType; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        gsap.fromTo(contentRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0, opacity: 0, duration: 0.3, ease: 'power2.in'
        });
      }
    }
  }, [open]);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open
        ? 'border-primary shadow-yellow bg-white dark:bg-dark-surface dark:border-primary/50 translate-x-1'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface hover:border-primary/50'
        }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-6 text-left active:bg-gray-50/50 dark:active:bg-dark-bg/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="flex-shrink-0 w-8 h-8 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-xs font-heading font-700 text-text-main shadow-sm">
            {index + 1}
          </span>
          <span className="font-heading font-700 text-text-main dark:text-dark-text text-sm md:text-base leading-snug">{item.q}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted dark:text-dark-muted flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-secondary dark:text-primary' : ''}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-5 pb-6 md:px-6 md:pb-6">
          <p className="text-text-muted dark:text-dark-muted leading-relaxed font-body text-sm pl-11 md:pl-12 opacity-90">{item.a}</p>
        </div>
      </div>
    </div>
  );
};

interface FAQProps {
  activeService: ServiceType;
}

const FAQ: React.FC<FAQProps> = ({ activeService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqs = SERVICES_CONTENT[activeService].faqs;

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
    <section id="faq" className="py-16 md:py-28 bg-surface dark:bg-dark-bg transition-colors duration-300 px-4 md:px-6" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14" ref={titleRef}>
          <span className="tag mb-4 border border-black/30">Preguntas frecuentes</span>
          <h2 className="section-title mb-4 dark:text-dark-text text-3xl md:text-5xl">
            {activeService === 'uniforms' && 'Sobre nuestros uniformes.'}
            {activeService === 'supplies' && 'Sobre surtido de listas.'}
            {activeService === 'didactic' && 'Sobre material didáctico.'}
          </h2>
          <p className="section-subtitle dark:text-dark-muted text-sm md:text-base">
            Resolvemos tus dudas más comunes sobre {SERVICES_CONTENT[activeService].tag.toLowerCase()}.
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

export default FAQ;
