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
    'Soluciones personalizadas para tu familia',
    'Entrega directa y confiable a domicilio',
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT — Content */}
        <div className="flex flex-col gap-8">
          {/* Tag */}
          <span className="inline-flex items-center gap-2 self-start bg-primary/20 text-secondary text-sm font-heading font-600 px-4 py-2 rounded-full border border-primary/40">
            🏫 Soluciones Escolares Integrales
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-800 text-5xl md:text-6xl xl:text-7xl text-text-main leading-[1.08] tracking-tight"
          >
            Todo lo escolar,{' '}
            <span className="relative">
              <span className="relative z-10">sin complicaciones.</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-primary/40 -z-10 rounded-sm" />
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-text-muted text-lg md:text-xl leading-relaxed max-w-xl"
          >
            En <strong className="text-secondary font-600">Schoolify.mx</strong> nos encargamos de uniformes, útiles y papelería para que tú solo te enfoques en lo importante:{' '}
            <em className="text-accent font-600 not-italic">la educación.</em>
          </p>

          {/* Bullet points */}
          <ul ref={bulletsRef} className="flex flex-col gap-3">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-yellow">
                  <Check className="w-3.5 h-3.5 text-text-main font-bold" strokeWidth={3} />
                </span>
                <span className="text-text-main font-body font-500">{item}</span>
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
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contactar por WhatsApp
            </a>

            <a
              href={waLink + '&text=Hola%2C+soy+una+instituci%C3%B3n+educativa'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-secondary text-secondary font-heading font-600 text-base px-7 py-4 rounded-2xl hover:bg-secondary hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Soy institución educativa
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex -space-x-2">
              {['🧑‍🏫', '👩‍👧', '👨‍👩‍👦', '👩‍🎓', '🧑‍💼'].map((emoji, i) => (
                <div key={i} className="w-8 h-8 bg-surface rounded-full border-2 border-white flex items-center justify-center text-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted font-body">
              <span className="font-700 text-text-main">+1,000 familias</span> ya confían en nosotros
            </p>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="relative flex items-center justify-center" ref={imageRef}>
          {/* Main image container */}
          <div className="relative w-full max-w-lg">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 scale-105 blur-sm" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.14)] animate-float">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&q=85&auto=format&fit=crop"
                alt="Niños felices en escuela con útiles escolares"
                className="w-full h-[480px] object-cover"
                loading="eager"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Badge: Pedido Listo */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card-hover px-5 py-4 flex items-center gap-3 border border-gray-100"
            >
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-yellow">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <p className="font-heading font-700 text-text-main text-sm">¡Pedido listo!</p>
                <p className="text-xs text-text-muted">En 48 horas en tu puerta</p>
              </div>
            </div>

            {/* Badge: Calificación */}
            <div className="absolute -top-4 -right-4 bg-secondary text-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <div>
                <p className="font-heading font-700 text-sm">4.9 / 5</p>
                <p className="text-xs text-white/70">+200 reseñas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
