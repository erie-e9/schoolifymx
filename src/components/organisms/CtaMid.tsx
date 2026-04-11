import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { SERVICES_CONTENT } from '@types';
import type { ServiceType } from '@types';
import WhatsApp from '@assets/whatsapp.svg?react';
import Badge from '@components/atoms/Badge';
import Button from '@components/atoms/Button';
import { WhatsAppService } from '@services/WhatsAppService';

interface CtaMidProps {
  activeService: ServiceType;
}

const CtaMid: React.FC<CtaMidProps> = ({ activeService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const content = SERVICES_CONTENT[activeService];
  const carouselItems = content.ctaCarousel;
  const currentItem = carouselItems[currentIndex];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    WhatsAppService.sendGenericContact(content?.whatsappMessage);
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  // Auto-slide effect — paused while modal is open so the selected image stays fixed
  useEffect(() => {
    if (isImageModalOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 12000);
    return () => clearInterval(timer);
  }, [currentIndex, carouselItems.length, isImageModalOpen]);

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
    <section id="galery" className="py-12 md:py-24 bg-surface dark:bg-dark-bg transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-5 md:mb-5" ref={titleRef}>
          <Badge variant="tag" size="lg" className="mb-4">Algunos de nuestros trabajos</Badge>
        </div>
        <div className="bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-xl dark:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row min-h-[525px]">
            {/* Left Column: Info synced with image */}
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-gradient-to-br from-white to-gray-50 dark:from-dark-surface dark:to-dark-bg/20" ref={leftContentRef}>
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />

              <div className="mb-6">
                {currentItem?.type && <span className="tag mb-4">{currentItem.type}</span>}
                <h2
                  ref={titleRef}
                  className="font-heading font-900 text-4xl md:text-3xl text-text-main dark:text-dark-text leading-[1.1]"
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

              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCtaClick}
                  leftIcon={<WhatsApp className="w-5 h-5 text-black" />}
                >
                  Escríbenos ahora
                </Button>
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
                      className="carousel-slide h-full relative border-none cursor-pointer group/slide"
                      style={{ width: `${100 / carouselItems.length}%` }}
                      onClick={() => setIsImageModalOpen(true)}
                    >
                      {/* Blurred backdrop + Contained Image for best visibility */}
                      <div className="absolute inset-0 bg-black/5 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title || "Evidencia del trabajo de Schoolify.mx"}
                          loading="lazy"
                          decoding="async"
                        />
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

      {/* Image Modal Fullscreen */}
      {isImageModalOpen && ( // Only selected image: pending 
        <div className="fixed inset-0 z-[1002] flex items-center justify-center bg-black/95 backdrop-blur-lg animate-fade-in">
          <button
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Close modal"
            className="absolute top-6 right-6 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center animate-scale-in">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={currentItem.image}
                alt={currentItem.title || "Evidencia del trabajo de Schoolify.mx"}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/50 to-transparent rounded-b-xl text-white text-center flex flex-col items-center justify-end">
              <h4 className="font-heading font-900 text-2xl md:text-3xl mb-4 text-shadow-sm">{currentItem.title}</h4>
              {currentItem.description && (
                <p className="text-white/90 max-w-3xl mx-auto font-body text-base md:text-sm leading-relaxed text-shadow-sm">
                  {currentItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(CtaMid);
