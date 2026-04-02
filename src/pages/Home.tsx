import React, { Suspense } from 'react';
import MainLayout from '../components/templates/MainLayout';
import Hero from '../components/organisms/Hero';
import FAQ from '../components/organisms/FAQ';
import Process from '../components/organisms/Process';
import CtaMid from '../components/organisms/CtaMid';
import Stats from '../components/organisms/Stats';
import PartnerBrands from '../components/organisms/PartnerBrands';
import FinalCTA from '../components/organisms/FinalCTA';
import DailyChallenges from '../components/organisms/DailyChallenges';
import { useTheme } from '../hooks/useTheme';
import type { ServiceType } from '../types';

const Home: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();
  const [isChallengesOpen, setIsChallengesOpen] = React.useState(false);
  const [activeService, setActiveService] = React.useState<ServiceType>('uniforms');

  return (
    <MainLayout
      isDarkMode={isDark}
      activeService={activeService}
      toggleTheme={toggleDarkMode}
      onOpenChallenges={() => setIsChallengesOpen(true)}
    >
      <Hero activeService={activeService} setActiveService={setActiveService} />
      <Suspense fallback={<div className="min-h-[20vh]" />}>
        <Process activeService={activeService} />
        <CtaMid activeService={activeService} />
        <Stats activeService={activeService} />
        {/* 
        <PartnerBrands />
        <DailyChallenges
        isOpen={isChallengesOpen}
        onClose={() => setIsChallengesOpen(false)}
        /> */}<DailyChallenges
          isOpen={isChallengesOpen}
          onClose={() => setIsChallengesOpen(false)}
        />
        <FAQ activeService={activeService} />
        <FinalCTA activeService={activeService} />
      </Suspense>
    </MainLayout>
  );
};

export default Home;
