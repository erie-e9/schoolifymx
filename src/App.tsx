import { useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ServiceType } from './types';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

// Lazy loaded components
const Process = lazy(() => import('./components/Process'));
const Stats = lazy(() => import('./components/Stats'));
const CtaMid = lazy(() => import('./components/CtaMid'));
const FAQ = lazy(() => import('./components/FAQ'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeService, setActiveService] = useState<ServiceType>('uniforms');

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero activeService={activeService} setActiveService={setActiveService} />
        <Suspense fallback={<div className="min-h-[20vh]" />}>
          <Process activeService={activeService} />
          <CtaMid activeService={activeService} />
          <Stats activeService={activeService} />
          <FAQ activeService={activeService} />
          <FinalCTA activeService={activeService} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ScrollToTop />
        <CookieConsent />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
