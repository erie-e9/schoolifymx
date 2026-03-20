import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, PackageCheck, Truck, Ruler, ClipboardList, PenTool, BookOpen, Sparkles } from 'lucide-react';
import type { ServiceType } from '../types';
import WhatsApp from '../assets/whatsapp.svg?react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessProps {
  activeService: ServiceType;
}

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
      description: 'Coordinamos la toma de medidas en la escuela o enviamos una guía detallada.',
      color: 'bg-secondary',
    },
    {
      icon: PackageCheck,
      number: '03',
      title: 'Confección',
      description: 'Producimos cada prenda en coordinación de tallas y colores de tu escuela.',
      color: 'bg-accent',
    },
    {
      icon: Truck,
      number: '04',
      title: 'Entregas Programadas',
      description: 'Entregamos el kit de uniformes listo para usarse, sin filas.',
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

const Process: React.FC<ProcessProps> = ({ activeService }) => {
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
    <section id="process" className="py-16 md:py-28 bg-primary dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" ref={titleRef}>
          <span className="tag mb-4 shadow-sm">Cómo funciona</span>
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

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={`${activeService}-${i}`}
                className="step-card card p-6 md:p-7 flex flex-col items-start gap-4 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface cursor-default group shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem]"
              >
                {/* Number + icon */}
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${step.color === 'bg-primary' ? 'text-text-main font-bold' : 'text-white'}`} />
                  </div>
                  <span className="font-heading font-800 text-4xl md:text-5xl text-gray-200 dark:text-gray-300/20 leading-none group-hover:text-primary/60 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-700 text-lg text-text-main dark:text-dark-text mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-text-muted dark:text-dark-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
