import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: '¿Cómo funciona el servicio?',
    a: 'Es muy sencillo: nos contactas por WhatsApp, nos compartes la lista escolar o las necesidades de tu hijo, y nosotros nos encargamos de surtir todo. Recibes todo en la comodidad de tu hogar.',
  },
  {
    q: '¿En dónde realizan las entregas?',
    a: 'Actualmente hacemos entregas en la Zona Metropolitana. Para zonas foráneas, contáctanos para evaluar la cobertura. Nos esforzamos por llegar a más familias.',
  },
  {
    q: '¿Puedo elegir marcas específicas de útiles?',
    a: '¡Por supuesto! Si tienes preferencias de marcas como Scribe, Faber-Castell, Staedtler u otras, solo coméntanos y buscamos cumplir tu solicitud al mejor precio.',
  },
  {
    q: '¿Trabajan con escuelas e instituciones educativas?',
    a: 'Sí, contamos con planes especiales para instituciones. Ofrecemos uniformes institucionales, papelería en volumen y gestión completa de listas escolares para colegios.',
  },
  {
    q: '¿Cuánto tiempo tarda la entrega?',
    a: 'Los pedidos de útiles y papelería se entregan en 24–48 horas. Los uniformes a medida tienen un tiempo de producción de 5–7 días hábiles dependiendo de la complejidad.',
  },
];

const FAQItem: React.FC<{ item: typeof faqs[0]; index: number }> = ({ item, index }) => {
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
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open ? 'border-primary shadow-yellow bg-white' : 'border-gray-200 bg-white hover:border-primary/50'
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-xs font-heading font-700 text-text-main">
            {index + 1}
          </span>
          <span className="font-heading font-600 text-text-main text-base">{item.q}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-secondary' : ''}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-6 pb-5">
          <p className="text-text-muted leading-relaxed font-body text-sm pl-10">{item.a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section id="faq" className="py-20 md:py-28 bg-surface" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14" ref={titleRef}>
          <span className="tag mb-4">Preguntas frecuentes</span>
          <h2 className="section-title mb-4">
            Todo lo que necesitas saber.
          </h2>
          <p className="section-subtitle">
            Resolvemos tus dudas más comunes aquí. Si tienes más preguntas, escríbenos por WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
