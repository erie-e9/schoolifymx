import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { SERVICES_CONTENT } from '../../types';
import type { ServiceType } from '../../types';
import UniformsCard from '../molecules/UniformsCard';
import SuppliesComparator from '../molecules/SuppliesComparator';
import DidacticMaterialTimeline from '../molecules/DidacticMaterial';
import WhatsApp from '../../assets/whatsapp.svg?react';
import { WhatsAppService } from '../../services/WhatsAppService';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;
}

const SERVICES: { id: ServiceType; label: string; icon: string; comingSoon?: boolean }[] = [
  { id: 'uniforms', label: SERVICES_CONTENT['uniforms'].tag, icon: '👕' },
  { id: 'supplies', label: SERVICES_CONTENT['supplies'].tag, icon: '✏️' },
  { id: 'didactic', label: SERVICES_CONTENT['didactic'].tag, icon: '📚', comingSoon: true },
];

const Hero: React.FC<HeroProps> = ({ activeService, setActiveService }) => {
  const [displayedService, setDisplayedService] = useState(activeService);
  const content = SERVICES_CONTENT[displayedService];

  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  // Initial animation
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
      .fromTo(displayRef.current,
        { opacity: 0, scale: 0.95, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.8'
      );

    return () => { tl.kill(); };
  }, []);

  // Parallax ScrollTrigger animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax blobs
      gsap.to('.hero-blob-1', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.hero-blob-2', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Subtle parallax on display card wrap
      gsap.to('.hero-parallax-display', {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        }
      });

      // Subtle parallax on text content with slight fade out
      gsap.to('.hero-content-wrap', {
        y: -40,
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Service change animation
  useEffect(() => {
    if (activeService === displayedService) return;

    const targets = [headlineRef.current, subRef.current, bulletsRef.current, displayRef.current, tagRef.current];

    gsap.to(targets, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setDisplayedService(activeService);
      }
    });
  }, [activeService, displayedService]);

  useEffect(() => {
    const targets = [headlineRef.current, subRef.current, bulletsRef.current, displayRef.current, tagRef.current];
    gsap.fromTo(targets,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, [displayedService]);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    WhatsAppService.sendGenericContact(content?.whatsappMessage);
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="features"
      className="relative min-h-[85vh] lg:min-h-screen flex items-center bg-white dark:bg-dark-bg overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-12 transition-colors duration-300"
    >
      {/* Background decorative blobs */}
      <div className="hero-blob-1 absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="hero-blob-2 absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* LEFT — Content */}
        <div className="hero-content-wrap flex flex-col gap-4">
          <h2 className="mb-1 dark:text-dark-text text-1xl md:text-1xl">
            Soluciones Escolares
          </h2>

          {/* Service Selector */}
          <div className="flex flex-wrap gap-3 p-1.5 bg-surface dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-gray-800 self-start mb-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-700 text-sm transition-all duration-300 ${activeService === s.id
                  ? 'bg-primary text-text-main shadow-yellow scale-105'
                  : 'text-text-muted dark:text-dark-muted hover:bg-primary/40 dark:hover:bg-secondary/40'
                  }`}
              >
                <span>{s.icon}</span>
                <span className="hidden md:block">{s.label}</span>
                {s.comingSoon && (
                  <Badge variant="secondary" size="sm" className="absolute -top-4 -right-1">
                    Próximamente
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-800 text-4xl md:text-4xl xl:text-4xl text-text-main dark:text-dark-text leading-[1.1] tracking-tight"
          >
            {content?.headline}
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-text-muted dark:text-dark-muted text-sm md:text-base lg:text-md leading-relaxed max-w-xl opacity-90"
          >
            {content?.subheadline}
          </p>

          {/* Bullet points */}
          <ul ref={bulletsRef} className="flex flex-col gap-3.5">
            {content?.bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-success font-bold" />
                </span>
                <span className="text-text-main dark:text-dark-text font-body font-500 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleCtaClick}
              leftIcon={<WhatsApp className="w-5 h-5 text-black" />}
            >
              Escríbenos ahora
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSecondaryClick}
              rightIcon={<ChevronRight className="w-5 h-5" />}
            >
              Conoce cómo funciona
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
            <div className="flex -space-x-2.5">
              {content?.trustEmojis.map((emoji, i) => (
                <div key={i} className="w-9 h-9 bg-white dark:bg-dark-surface rounded-full border-2 border-primary/20 dark:border-dark-bg flex items-center justify-center text-sm shadow-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted dark:text-dark-muted font-body leading-tight">
              <span className="font-800 text-text-main dark:text-dark-text text-base">{(content?.trustText || '').split(' ')[0]}</span> {(content?.trustText || '').split(' ').slice(1).join(' ')}
            </p>
          </div>
        </div>

        {/* RIGHT — Dynamic Display */}
        <div className="hero-parallax-display relative flex items-center justify-center order-1 lg:order-2 scale-90 sm:scale-100">
          <div ref={displayRef} className="relative w-full max-w-[500px] lg:max-w-none">
            {/* Decorative background for the component */}
            <div className="absolute inset-x-0 inset-y-0 bg-primary/10 dark:bg-primary/5 rounded-[2.5rem] -rotate-2 scale-105 blur-md" />
            <div className="absolute inset-x-0 inset-y-0 bg-accent/10 dark:bg-accent/5 rounded-[2.5rem] rotate-1 scale-100 blur-sm" />

            <div className="relative animate-float z-10">
              {displayedService === 'uniforms' && <UniformsCard active />}
              {displayedService === 'supplies' && (
                <div className="flex flex-col gap-4">
                  <SuppliesComparator active />
                </div>
              )}
              {displayedService === 'didactic' && <DidacticMaterialTimeline active />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
