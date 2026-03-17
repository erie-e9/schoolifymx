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
    <section className="relative py-20 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#FFD000] to-accent" />

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/40 rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/60 rounded-full" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/30 rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" ref={contentRef}>
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-text-main font-heading font-600 text-sm px-5 py-2 rounded-full border border-white/30 mb-6">
          🚀 Empieza hoy mismo
        </div>

        {/* Headline */}
        <h2 className="font-heading font-800 text-4xl md:text-6xl text-text-main leading-tight mb-4">
          Confianza, rapidez y honestidad{' '}
          <span className="text-secondary">que se reflejan</span>
          {' '}en tu tranquilidad.
        </h2>

        {/* Subtext */}
        <p className="text-text-main/75 text-xl font-body mb-10 max-w-2xl mx-auto leading-relaxed">
          Soluciones escolares completas, sin estrés. Desde el primer uniforme hasta el último cuaderno.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-text-main text-white font-heading font-700 text-lg px-8 py-5 rounded-2xl shadow-[0_8px_24px_rgba(17,24,39,0.25)] hover:shadow-[0_16px_40px_rgba(17,24,39,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contactar por WhatsApp
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={waLinkEscuela}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white/25 backdrop-blur-sm border-2 border-white/60 text-text-main font-heading font-700 text-lg px-8 py-5 rounded-2xl hover:bg-white/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Building2 className="w-6 h-6" />
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
            <div key={i} className="flex items-center gap-2 text-text-main/80 font-body font-500 text-sm">
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
