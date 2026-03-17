import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import LogosCarousel from './components/LogosCarousel';
import Features from './components/Features';
import Process from './components/Process';
import Stats from './components/Stats';
import CtaMid from './components/CtaMid';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LogosCarousel />
        <Features />
        <Process />
        <Stats />
        <CtaMid />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
