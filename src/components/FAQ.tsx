import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: '¿Cómo funciona el servicio?',
    a: 'Es muy sencillo: nos contactas por WhatsApp, nos compartes tu lista escolar y nosotros nos encargamos de surtir, forrar y etiquetar todo. Recibes un paquete listo para clases en tu escuela o domicilio.',
  },
  {
    q: '¿Qué pasa si un producto no tiene stock?',
    a: 'Te ofrecemos una entrega parcial inmediata con los artículos disponibles y programamos el resto sin costo adicional. Además, incluimos un pequeño detalle de cortesía por la espera.',
  }, {
    q: '¿Garantizan las marcas exactas de la lista?',
    a: 'Sí. Surtimos las marcas solicitadas por tus maestros. En caso de no haber stock, te ofrecemos sustitutos de calidad igual o superior, siempre bajo tu aprobación.',
  },
  {
    q: '¿Tienen opciones de pago flexibles?',
    a: 'Contamos con un Plan de Apartado (pagas en 2 partes) y aceptamos tarjetas de crédito. Al surtir la lista completa, obtienes un 15% de ahorro directo.',
  },
  {
    q: '¿Emiten factura fiscal?',
    a: 'Aún estamos en este proceso, pronto emitiremos facturas electrónicas de inmediato. Solo solicita tu comprobante al momento de realizar tu pedido vía WhatsApp.',
  },

  {
    q: '¿Cuánto tiempo tarda la entrega?',
    a: 'Cualquiera de los servicios se realizan con tiempo anticipación y se entregan en 24–48 horas antes de la fecha designada por la escuela. Los uniformes a medida tienen un tiempo de producción de 5–7 días hábiles dependiendo de la complejidad.',
  },
  {
    q: '¿Dónde realizan las entregas?',
    a: 'Nos estamos abriendo paso en el norte de México, esperando algún día alcanzar toda el Área Metropolitana. También tenemos días de "Entrega Gratuita" directamente en instituciones participantes.',
  }
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
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open
          ? 'border-primary shadow-yellow bg-white dark:bg-dark-surface dark:border-primary/50'
          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-surface hover:border-primary/50'
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
          <span className="font-heading font-600 text-text-main dark:text-dark-text text-base">{item.q}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted dark:text-dark-muted flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-secondary dark:text-primary' : ''}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-6 pb-5">
          <p className="text-text-muted dark:text-dark-muted leading-relaxed font-body text-sm pl-10">{item.a}</p>
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
    <section id="faq" className="py-20 md:py-28 bg-surface dark:bg-dark-bg transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14" ref={titleRef}>
          <span className="tag mb-4">Preguntas frecuentes</span>
          <h2 className="section-title mb-4 dark:text-dark-text">
            Todo lo que necesitas saber.
          </h2>
          <p className="section-subtitle dark:text-dark-muted">
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
