import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check, ChevronRight } from 'lucide-react';

const waLink = 'https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20Schoolify.mx';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
    )
      .fromTo(subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(bulletsRef.current?.querySelectorAll('li') ?? [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(imageRef.current,
        { opacity: 0, scale: 0.92, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(badgeRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      );

    return () => { tl.kill(); };
  }, []);

  const bullets = [
    'Ahorra tiempo y dinero en cada ciclo escolar',
    'Pregunta por nuestro plan de pagos',
    'Entrega directa y confiable en tu escuela o domicilio',
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center bg-white dark:bg-dark-bg overflow-hidden pt-20 transition-colors duration-300"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-15 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT — Content */}
        <div className="flex flex-col gap-8">
          {/* Tag */}
          <span className="inline-flex items-center gap-2 self-start bg-primary/20 dark:bg-primary/10 text-secondary dark:text-primary text-sm font-heading font-600 px-4 py-2 rounded-full border border-primary/40 dark:border-primary/20">
            🏫 Soluciones Escolares
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-800 text-5xl md:text-6xl xl:text-6xl text-text-main dark:text-dark-text leading-[1.08] tracking-tight"
          >
            Todo lo escolar,{' '}
            <span className="relative">
              <span className="relative z-10">sin complicaciones.</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-text-muted dark:text-dark-muted text-lg md:text-xl leading-relaxed max-w-xl"
          >
            En <span className="text-secondary dark:text-white font-600">Schoolify.mx</span> nos encargamos de uniformes, útiles y material didáctico para que tú solo te enfoques en lo importante: la educación. ¡Ahorra hasta un 15% en tu lista completa!
          </p>

          {/* Bullet points */}
          <ul ref={bulletsRef} className="flex flex-col gap-3">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-yellow">
                  <Check className="w-3.5 h-3.5 text-text-main font-bold" strokeWidth={3} />
                </span>
                <span className="text-text-main dark:text-dark-text font-body font-500">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-primary text-text-main font-heading font-700 text-base px-7 py-4 rounded-2xl shadow-yellow hover:shadow-yellow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Contactar por WhatsApp
            </a>

            <a
              href={waLink + '&text=Hola%2C+soy+una+instituci%C3%B3n+educativa'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-secondary dark:border-primary text-secondary dark:text-primary font-heading font-600 text-base px-7 py-4 rounded-2xl hover:bg-secondary dark:hover:bg-primary dark:hover:text-dark-bg hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Soy institución educativa
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex -space-x-2">
              {['🧑‍🏫', '👩‍👧', '👨‍👩‍👦', '👩‍🎓', '🧑‍💼'].map((emoji, i) => (
                <div key={i} className="w-8 h-8 bg-surface dark:bg-dark-surface rounded-full border-2 border-white dark:border-dark-bg flex items-center justify-center text-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted dark:text-dark-muted font-body">
              <span className="font-700 text-text-main dark:text-dark-text">+1,000 familias</span> ya confían en nosotros
            </p>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="relative flex items-center justify-center" ref={imageRef}>
          <div className="relative w-full max-w-lg">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 scale-105 blur-sm dark:from-primary/20 dark:to-accent/10" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.14)] animate-float">
              <img
                src="https://www.unicef.org/honduras/sites/unicef.org.honduras/files/styles/hero_extended/public/WhatsApp%20Image%202023-06-08%20at%204.36.48%20PM_0.jpeg.webp?itok=VETTkvVL"
                alt="Niños felices en escuela con útiles escolares"
                className="w-full h-[480px] object-cover"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Badge: Pedido Listo */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-surface rounded-2xl shadow-card-hover px-5 py-4 flex items-center gap-3 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-yellow">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <p className="font-heading font-700 text-text-main dark:text-dark-text text-sm">¡Pedido listo!</p>
                <p className="text-xs text-text-muted dark:text-dark-muted">Justo a tiempo</p>
              </div>
            </div>

            {/* Badge: Calificación */}
            <div className="absolute -top-4 -right-4 bg-secondary dark:bg-primary text-white dark:text-dark-bg rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
              <span className="text-xl text-yellow-500">⭐</span>
              <div>
                <p className="font-heading font-700 text-sm">4.9 / 5</p>
                <p className="text-xs text-white/70 dark:text-dark-bg/70">+200 reseñas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
