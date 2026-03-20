import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ServiceType } from './types';
import Hero from './components/Hero';
// import LogosCarousel from './components/LogosCarousel';
import Process from './components/Process';
import Stats from './components/Stats';
import CtaMid from './components/CtaMid';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeService, setActiveService] = useState<ServiceType>('uniforms');

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero activeService={activeService} setActiveService={setActiveService} />
        {/* <LogosCarousel /> */}
        {/* <Features activeService={activeService} /> */}
        <Process activeService={activeService} />
        <CtaMid activeService={activeService} />
        <Stats activeService={activeService} />
        <FAQ activeService={activeService} />
        <FinalCTA activeService={activeService} />
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
