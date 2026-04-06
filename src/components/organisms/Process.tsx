import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, PackageCheck, Truck, Ruler, ClipboardList, PenTool, BookOpen, Sparkles } from 'lucide-react';
import type { ServiceType } from '@types';
import WhatsApp from '@assets/whatsapp.svg?react';
import ProcessStep from '@components/molecules/ProcessStep';
import Badge from '@components/atoms/Badge';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS: Record<ServiceType, any[]> = {
  uniforms: [
    {
      icon: WhatsApp,
      number: '01',
      title: 'Nos Contactas',
      description: 'Iniciamos el proceso vía WhatsApp para conocer tus necesidades básicas.',
      color: 'bg-primary',
    },
    {
      icon: Ruler,
      number: '02',
      title: 'Tallas y Medidas',
      description: 'Nos envías las medidas o coordinamos la toma de medidas en la escuela o enviamos una guía detallada.',
      color: 'bg-secondary',
    },
    {
      icon: PackageCheck,
      number: '03',
      title: 'Confección',
      description: 'Ponemos manos a la obra siguiendo los detalles y especificaciones de tallas y colores de tu escuela.',
      color: 'bg-accent',
    },
    {
      icon: Truck,
      number: '04',
      title: 'Entregas Programadas',
      description: 'Entregamos tus prendas en un punto clave o en la escuela, listas para usarse, sin filas y sin preocupaciones.',
      color: 'bg-secondary',
    },
  ],
  supplies: [
    {
      icon: MessageCircle,
      number: '01',
      title: 'Envías tu Lista',
      description: 'Mándanos una foto o PDF de la lista de útiles de tu escuela.',
      color: 'bg-primary',
    },
    {
      icon: ClipboardList,
      number: '02',
      title: 'Cotización',
      description: 'Te enviamos un presupuesto detallado con las mejores marcas en minutos.',
      color: 'bg-secondary',
    },
    {
      icon: PackageCheck,
      number: '03',
      title: 'Surtido Completo',
      description: 'Armamos tu paquete escolar cuidando cada detalle de la lista.',
      color: 'bg-accent',
    },
    {
      icon: Truck,
      number: '04',
      title: 'Entrega Directa',
      description: 'Recibe tus útiles donde prefieras. ¡Listo para el primer día!',
      color: 'bg-secondary',
    },
  ],
  didactic: [
    {
      icon: MessageCircle,
      number: '01',
      title: 'Requerimientos',
      description: 'Dinos qué material o decoración necesitas para tu aula o evento.',
      color: 'bg-primary',
    },
    {
      icon: PenTool,
      number: '02',
      title: 'Diseño/Personalización',
      description: 'Creamos o adaptamos el material según el grado y temática solicitada.',
      color: 'bg-secondary',
    },
    {
      icon: Sparkles,
      number: '03',
      title: 'Producción',
      description: 'Manos a la obra: forrado, etiquetado y creación de material didáctico.',
      color: 'bg-accent',
    },
    {
      icon: BookOpen,
      number: '04',
      title: 'Resultado Final',
      description: 'Entrega de material listo para inspirar el aprendizaje.',
      color: 'bg-secondary',
    },
  ],
};

const Process: React.FC<{ activeService: ServiceType }> = ({ activeService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = PROCESS_STEPS[activeService];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      const stepCards = stepsRef.current?.querySelectorAll('.step-card') ?? [];
      gsap.fromTo(stepCards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.18, ease: 'power2.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeService]);

  return (
    <section id="process" className="py-12 md:py-24 bg-primary dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" ref={titleRef}>
          <Badge variant="tag" size="lg" className="mb-4">Cómo funciona</Badge>
          <h2 className="section-title mb-4 dark:text-dark-text text-3xl md:text-5xl lg:text-5xl">
            Simple y rápido,{' '}
            <span className="text-secondary dark:text-primary">así es Schoolify</span>.
          </h2>
          <p className="section-subtitle dark:text-dark-muted text-sm md:text-base">
            Así es el paso a paso para obtener <span className="font-700 text-text-main dark:text-primary">
              {activeService === 'uniforms' ? 'Uniformes Escolares' : activeService === 'supplies' ? 'Útiles Escolares' : 'Material Didáctico'}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative" ref={stepsRef}>
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-secondary/20 via-accent/20 to-secondary/20 dark:from-primary/20 dark:via-accent/20 dark:to-primary/20" />

          {steps.map((step, i) => (
            <ProcessStep
              key={`${activeService}-${i}`}
              {...step}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Process);
