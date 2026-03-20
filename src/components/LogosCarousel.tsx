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
  const doubled = [...logos, ...logos, ...logos]; // Triple for smoother loop on ultra-wide

  return (
    <section className="py-20 bg-surface dark:bg-dark-bg overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="tag mb-4">Confianza comprobada</span>
        <h2 className="section-title">
          Instituciones que ya confían en nosotros
        </h2>
      </div>

      {/* Gradient masks */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-surface dark:from-dark-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-surface dark:from-dark-bg to-transparent z-10 pointer-events-none" />

        <div className="logos-track py-4">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 md:mx-6 group cursor-default"
            >
              <div className="flex items-center gap-4 bg-white dark:bg-dark-surface px-8 py-5 rounded-2xl shadow-card dark:shadow-none border border-gray-100 dark:border-gray-800 hover:shadow-yellow hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                  {logo.emoji}
                </span>
                <span className="font-heading font-700 text-text-muted dark:text-dark-muted group-hover:text-text-main dark:group-hover:text-dark-text text-base whitespace-nowrap transition-colors duration-300">
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
