import React from 'react';

const logos = [
  { name: 'Colegio Excelsior', emoji: '🏫' },
  { name: 'Instituto Morales', emoji: '📚' },
  { name: 'Primaria San Pablo', emoji: '✏️' },
  { name: 'Secundaria Cervantes', emoji: '🎒' },
  { name: 'Kinder Arcoíris', emoji: '🌈' },
  { name: 'Prepa Alfa', emoji: '🎓' },
  { name: 'I. Montessori MX', emoji: '🌟' },
  { name: 'Colegio Británico', emoji: '🇬🇧' },
];

const LogosCarousel: React.FC = () => {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-text-muted font-body font-500 text-sm uppercase tracking-widest mb-2">
          Confianza comprobada
        </p>
        <h2 className="font-heading font-700 text-2xl md:text-3xl text-text-main">
          Instituciones que ya confían en nosotros
        </h2>
      </div>

      {/* Gradient masks */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="logos-track">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 group cursor-default"
            >
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-card border border-gray-100 hover:shadow-yellow hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                  {logo.emoji}
                </span>
                <span className="font-heading font-600 text-text-muted group-hover:text-text-main text-sm whitespace-nowrap transition-colors duration-300">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosCarousel;
