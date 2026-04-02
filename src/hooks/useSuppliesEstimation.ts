import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export type Grade = 'Preescolar' | 'Primaria' | 'Secundaria';
export type Bundle = 'Esencial' | 'Selecto';

const SUPPLIES_DATA = {
  Preescolar: {
    Esencial: { min: 800, max: 1200, time: 4 },
    Selecto: { min: 1200, max: 1800, time: 5 },
  },
  Primaria: {
    Esencial: { min: 1080, max: 1300, time: 5 },
    Selecto: { min: 1300, max: 1630, time: 6 },
  },
  Secundaria: {
    Esencial: { min: 1300, max: 1400, time: 6 },
    Selecto: { min: 1500, max: 2000, time: 7 },
  },
};

export const useSuppliesEstimation = () => {
  const [grade, setGrade] = useState<Grade>('Primaria');
  const [bundle, setBundle] = useState<Bundle>('Selecto');
  const [range, setRange] = useState({ min: 1500, max: 2200 });
  const [timeSaved, setTimeSaved] = useState(5);

  useEffect(() => {
    const newStats = SUPPLIES_DATA[grade][bundle];
    const targetMin = newStats.min;
    const targetMax = newStats.max;

    const proxy = { min: range.min, max: range.max };
    gsap.to(proxy, {
      min: targetMin,
      max: targetMax,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => setRange({ min: Math.round(proxy.min), max: Math.round(proxy.max) }),
    });

    setTimeSaved(newStats.time);
  }, [grade, bundle]);

  return {
    grade,
    setGrade,
    bundle,
    setBundle,
    range,
    timeSaved
  };
};
