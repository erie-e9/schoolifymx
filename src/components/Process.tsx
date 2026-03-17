import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Search, PackageCheck, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Nos contactas',
    description: 'Escríbenos por WhatsApp o llena el formulario. Te respondemos en minutos.',
    color: 'bg-primary',
  },
  {
    icon: Search,
    number: '02',
    title: 'Analizamos necesidades',
    description: 'Revisamos la lista escolar, tallas y especificaciones de tu institución.',
    color: 'bg-secondary',
  },
  {
    icon: PackageCheck,
    number: '03',
    title: 'Preparamos todo',
    description: 'Surtimos uniformes, útiles y papelería con los mejores proveedores.',
    color: 'bg-accent',
  },
  {
    icon: Truck,
    number: '04',
    title: 'Entregamos listo',
    description: 'Recibe todo en la puerta de tu casa. Sin filas, sin estrés.',
    color: 'bg-secondary',
  },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section id="process" className="py-20 md:py-28 bg-surface" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={titleRef}>
          <span className="tag mb-4">Cómo funciona</span>
          <h2 className="section-title mb-4">
            Simple y rápido.{' '}
            <span className="text-secondary">Así es Schoolify.</span>
          </h2>
          <p className="section-subtitle">
            De la solicitud a la entrega en pocos pasos. Sin complicaciones, sin sorpresas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 relative" ref={stepsRef}>
          {/* Connecting line (desktop) */}
          <div className="hidden xl:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="step-card card p-7 flex flex-col items-start gap-4 hover:-translate-y-2 border border-gray-100 cursor-default group"
              >
                {/* Number + icon */}
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${step.color === 'bg-primary' ? 'text-text-main' : 'text-white'}`} />
                  </div>
                  <span className="font-heading font-800 text-5xl text-gray-100 leading-none ml-auto group-hover:text-primary/30 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-700 text-lg text-text-main mb-2">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
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
