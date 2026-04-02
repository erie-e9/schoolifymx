import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { SERVICES_CONTENT, getWhatsappLink } from '../../types';
import type { ServiceType } from '../../types';
import WhatsApp from '../../assets/whatsapp.svg?react';
import Badge from '../atoms/Badge';

interface CtaMidProps {
  activeService: ServiceType;
}

const CtaMid: React.FC<CtaMidProps> = ({ activeService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const content = SERVICES_CONTENT[activeService];
  const carouselItems = content.ctaCarousel;
  const currentItem = carouselItems[currentIndex];
  const waLink = React.useMemo(() => getWhatsappLink(content.whatsappMessage), [content.whatsappMessage]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 12000);
    return () => clearInterval(timer);
  }, [currentIndex, carouselItems.length]);

  // Reset index when service changes
  useEffect(() => {
    setCurrentIndex(0);
    if (carouselRef.current) {
      gsap.set(carouselRef.current, { xPercent: 0 });
    }
  }, [activeService]);

  // Carousel Animation
  useEffect(() => {
    if (carouselRef.current) {
      // Calculate individual slide percentage relative to the container
      const slidePercentage = 100 / carouselItems.length;
      gsap.to(carouselRef.current, {
        xPercent: -slidePercentage * currentIndex,
        duration: 0.8,
        ease: 'expo.out',
      });
    }
  }, [currentIndex, carouselItems.length]);

  // Left Content Text Animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to([titleRef.current, descRef.current], {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.in',
    })
      .set([titleRef.current, descRef.current], { y: -10 })
      .to([titleRef.current, descRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
  }, [currentIndex]);

  return (
    <section id="galery" className="py-20 md:py-32 bg-surface dark:bg-dark-bg transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-5 md:mb-5" ref={titleRef}>
          <Badge variant="tag" size="lg" className="mb-4">Algunos de nuestros trabajos</Badge>
        </div>
        <div className="bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-xl dark:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Column: Info synced with image */}
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-gradient-to-br from-white to-gray-50 dark:from-dark-surface dark:to-dark-bg/20" ref={leftContentRef}>
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />

              <div className="mb-6">
                {currentItem?.type && <span className="tag mb-4">{currentItem.type}</span>}
                <h2
                  ref={titleRef}
                  className="font-heading font-900 text-4xl md:text-5xl text-text-main dark:text-dark-text leading-[1.1]"
                >
                  {currentItem?.title}
                  <span className="text-secondary dark:text-primary">.</span>
                </h2>
              </div>

              <p
                ref={descRef}
                className="text-text-muted dark:text-dark-muted text-sm md:text-base lg:text-md leading-relaxed max-w-xl opacity-90"
              >
                {currentItem?.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-auto">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-heading font-700 transition-all duration-300 active:scale-95 bg-primary text-text-main shadow-yellow hover:shadow-yellow-lg hover:scale-105 hover:bg-primary/90 px-8 py-4 text-base rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex-shrink-0"><WhatsApp className="w-5 h-5 text-black" /></span> Escríbenos ahora
                </a>
              </div>
            </div>

            {/* Right Column: Carousel (Clean version) */}
            <div className="lg:w-1/2 bg-gray-50 dark:bg-dark-bg/50 relative group h-[450px] md:h-[500px] lg:h-auto">
              <div className="h-full overflow-hidden">
                <div
                  className="flex h-full will-change-transform"
                  ref={carouselRef}
                  style={{ width: `${carouselItems.length * 100}%` }}
                >
                  {carouselItems.map((item, i) => (
                    <div
                      key={i}
                      className="carousel-slide h-full relative"
                      style={{ width: `${100 / carouselItems.length}%` }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent text-white">
                        <h4 className="font-heading font-800 text-xl md:text-2xl mb-1 md:mb-2">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all pointer-events-auto shadow-lg"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all pointer-events-auto shadow-lg"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-primary w-8' : 'bg-white/40'
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CtaMid);
