import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Building2 } from 'lucide-react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { SERVICES_CONTENT, getWhatsappLink } from '../types';
import type { ServiceType } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  activeService: ServiceType;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ activeService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const content = SERVICES_CONTENT[activeService];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const whatsappLink = React.useMemo(() => getWhatsappLink(content.whatsappMessage), [content.whatsappMessage]);
  const whatsappLinkSchool = React.useMemo(() => getWhatsappLink('Hola, soy una institución educativa y me interesa Schoolify.mx'), []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface opacity-95" />

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 dark:bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 dark:bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" ref={contentRef}>
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-primary/10 backdrop-blur-sm text-text-main dark:text-dark-text font-heading font-700 text-sm px-5 py-2 rounded-full border border-white/30 dark:border-primary/20 mb-6 tracking-wider">
          🚀 Empieza hoy mismo
        </div>

        {/* Headline */}
        <h2 className="font-heading font-900 text-4xl md:text-6xl text-text-main dark:text-dark-text leading-[1.1] mb-6">
          Confianza, rapidez y honestidad{' '}
          <span className="text-secondary dark:text-primary">que se reflejan</span>
          {' '}en tu tranquilidad.
        </h2>

        {/* Subtext */}
        <p className="text-text-main/80 dark:text-dark-muted text-lg md:text-xl font-body mb-12 max-w-2xl mx-auto leading-relaxed">
          Soluciones escolares completas para <span className="font-800 underline decoration-secondary dark:decoration-primary decoration-2 underline-offset-4">{content.tag.split(' ')[0]}</span> y más. Sin estrés, desde el primer día.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-text-main dark:bg-primary text-white dark:text-dark-bg font-heading font-800 text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <WhatsApp />
            Escríbenos ahora
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={whatsappLinkSchool}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/30 dark:bg-dark-surface/50 backdrop-blur-md border-2 border-white/60 dark:border-primary/30 text-text-main dark:text-dark-text font-heading font-700 text-lg px-10 py-5 rounded-2xl hover:bg-white/50 dark:hover:bg-dark-surface hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Building2 className="w-6 h-6 text-secondary dark:text-primary" />
            Soy de una institución
          </a>
        </div>

        {/* Social proof footer */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { icon: '✅', text: 'Sin costo de consulta' },
            { icon: '📞', text: 'Atención personalizada' },
            { icon: '🔒', text: 'Pagos seguros' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-text-main dark:text-dark-text font-heading font-700 text-sm md:text-base opacity-90">
              <span className="text-xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FinalCTA);
