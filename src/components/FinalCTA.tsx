import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const waLink = 'https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20Schoolify.mx';
const waLinkEscuela = 'https://wa.me/521XXXXXXXXXX?text=Hola%2C%20soy%20una%20instituci%C3%B3n%20educativa%20y%20me%20interesa%20Schoolify.mx';

const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="relative py-20 md:py-32 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#FFD000] to-accent dark:from-dark-bg dark:via-secondary/90 dark:to-dark-surface" />

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 dark:bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 dark:bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/40 dark:bg-primary/20 rounded-full" />
      <div className="absolute top-1/6 left-1/3 w-6 h-6 bg-white/50 dark:bg-primary/30 rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" ref={contentRef}>
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-primary/10 backdrop-blur-sm text-text-main dark:text-dark-text font-heading font-600 text-sm px-5 py-2 rounded-full border border-white/30 dark:border-primary/20 mb-6">
          🚀 Empieza hoy mismo
        </div>

        {/* Headline */}
        <h2 className="font-heading font-800 text-4xl md:text-6xl text-text-main dark:text-dark-text leading-tight mb-4">
          Confianza, rapidez y honestidad{' '}
          <span className="text-secondary dark:text-primary">que se reflejan</span>
          {' '}en tu tranquilidad.
        </h2>

        {/* Subtext */}
        <p className="text-text-main/75 dark:text-dark-muted text-xl font-body mb-10 max-w-2xl mx-auto leading-relaxed">
          Soluciones escolares completas, sin estrés. Desde el primer uniforme hasta el último cuaderno.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-text-main dark:bg-primary text-white dark:text-dark-bg font-heading font-700 text-lg px-8 py-5 rounded-2xl shadow-[0_8px_24px_rgba(17,24,39,0.25)] hover:shadow-[0_16px_40px_rgba(17,24,39,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Contactar por WhatsApp
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={waLinkEscuela}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white/25 dark:bg-dark-surface/50 backdrop-blur-sm border-2 border-white/60 dark:border-primary/30 text-text-main dark:text-dark-text font-heading font-700 text-lg px-8 py-5 rounded-2xl hover:bg-white/40 dark:hover:bg-dark-surface hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Building2 className="w-6 h-6 text-secondary dark:text-primary" />
            Soy escuela / institución
          </a>
        </div>

        {/* Social proof footer */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {[
            { icon: '✅', text: 'Sin costo de consulta' },
            { icon: '📞', text: 'Atención personalizada' },
            { icon: '🔒', text: 'Pagos seguros' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-text-main/80 dark:text-dark-muted font-body font-500 text-sm">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
