import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Building2 } from 'lucide-react';
import WhatsApp from '../../assets/whatsapp.svg?react';
import { SERVICES_CONTENT, getWhatsappLink } from '../../types';
import type { ServiceType } from '../../types';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { WhatsAppService } from '../../services/WhatsAppService';

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

  const handleCtaClick = () => {
    WhatsAppService.sendGenericContact(content.whatsappMessage);
  };

  const handleInstitutionClick = () => {
    WhatsAppService.sendGenericContact('Hola, soy una institución educativa y me interesa Schoolify.mx');
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface opacity-95" />

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 dark:bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 dark:bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" ref={contentRef}>
        {/* Label */}
        <Badge variant="tag" size='lg' className="mb-6 bg-white/20 dark:bg-primary/10 backdrop-blur-sm px-5 py-2">
          🚀 Empieza hoy mismo
        </Badge>

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
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto text-lg px-10 py-5 bg-text-main dark:bg-primary text-white dark:text-dark-bg"
            onClick={handleCtaClick}
            leftIcon={<WhatsApp />}
            rightIcon={<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          >
            Escríbenos ahora
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-lg px-10 py-5 bg-white/30 dark:bg-dark-surface/50 backdrop-blur-md border-2 border-white/60 dark:border-primary/30"
            onClick={handleInstitutionClick}
            leftIcon={<Building2 className="w-6 h-6 text-secondary dark:text-primary" />}
          >
            Soy de una institución
          </Button>
        </div>

        {/* Social proof footer */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { icon: '✅', text: 'Sin costo de consulta' },
            { icon: '📞', text: 'Atención personalizada' },
            { icon: '⌚️', text: 'Lunes a Sábado de 9:00 AM a 7:00 PM' },
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
