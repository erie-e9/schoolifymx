import React from 'react';
import { ArrowRight } from 'lucide-react';

const waLink = 'https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20Schoolify.mx';

const CtaMid: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-primary dark:bg-dark-surface relative overflow-hidden transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 dark:bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 dark:bg-accent/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="font-heading font-800 text-3xl md:text-5xl text-text-main dark:text-dark-text leading-tight mb-4">
          Nosotros lo hacemos por ti.
        </p>
        <p className="font-heading font-800 text-3xl md:text-5xl text-text-main dark:text-dark-text leading-tight mb-4">
          Ahorra un{' '}
          <span className="text-secondary dark:text-primary">15% en tu lista completa</span> y recíbela gratis en tu escuela.
        </p>
        <p className="text-text-main/70 dark:text-dark-muted text-lg mb-8 font-body max-w-xl mx-auto">
          Nos encargamos de todo: surtido, etiquetado y entrega. Únete a las más de 1,000 familias que ya disfrutan de un regreso a clases sin estrés.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-secondary dark:bg-primary text-white dark:text-dark-bg font-heading font-700 text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:bg-secondary/90 dark:hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Escríbenos por WhatsApp
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trust mini badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['🛡️ Sin compromiso', '⚡ Respuesta en minutos', '📦 Entrega garantizada'].map((badge, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-text-main/10 dark:bg-white/5 text-text-main dark:text-dark-text font-body font-500 text-sm px-4 py-2 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtaMid;
