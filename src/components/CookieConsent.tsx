import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Cookie } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Pequeno retraso para que no aparezca de golpe con la carga inicial
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible && bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
      );
    }
  }, [isVisible]);

  const handleAccept = () => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: 'power4.in',
        onComplete: () => {
          setIsVisible(false);
          localStorage.setItem('cookie-consent', 'true');
        }
      });
    }
  };

  const handleDecline = () => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: 'power4.in',
        onComplete: () => {
          setIsVisible(false);
          // Podríamos guardar un 'false' si quisiéramos no volver a mostrarlo pronto
          // pero usualmente solo se guarda si se acepta.
          localStorage.setItem('cookie-consent', 'false');
        }
      });
    }
  }

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-6 left-6 right-6 z-[201] pointer-events-auto flex justify-center"
    >
      <div className="group relative bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 md:py-5 md:px-10 rounded-3xl md:rounded-[3rem] shadow-2xl dark:shadow-primary/5 transition-all overflow-hidden w-full max-w-7xl">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-colors" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative">
          <div className="flex items-center gap-5 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 shadow-sm border border-primary/10 hidden md:flex">
              <Cookie className="w-7 h-7 text-primary" />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-heading font-800 text-text-main dark:text-dark-text text-lg md:text-xl tracking-tight flex items-center justify-center md:justify-start gap-2">
                <Cookie className="w-5 h-5 text-primary md:hidden" />
                Aviso de Cookies
              </h3>
              <p className="text-sm text-text-muted dark:text-dark-muted leading-relaxed font-body max-w-2xl">
                Utilizamos cookies para personalizar tu experiencia y analizar cómo se usa nuestro sitio. <br />¿Nos das tu permiso?
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="#"
              className="text-xs font-body font-600 text-text-muted dark:text-dark-muted hover:text-secondary dark:hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 md:mr-4"
            >
              Política de Privacidad
            </a>
            <div className="flex gap-2 w-full md:w-auto md:text-xs">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-heading font-700 text-text-muted dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-dark-bg transition-all"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="flex-[1] md:flex-none bg-primary text-text-main font-heading font-700 px-8 py-3 rounded-2xl text-sm shadow-yellow hover:shadow-yellow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 md:min-w-[160px]"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
