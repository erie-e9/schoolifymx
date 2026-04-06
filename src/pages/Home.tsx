import React, { Suspense } from 'react';
import MainLayout from '@components/templates/MainLayout';
import Hero from '@components/organisms/Hero';
import { useTheme } from '@hooks/useTheme';
import type { ServiceType } from '@types';

const Process = React.lazy(() => import('../components/organisms/Process'));
const CtaMid = React.lazy(() => import('../components/organisms/CtaMid'));
const Stats = React.lazy(() => import('../components/organisms/Stats'));
const FAQ = React.lazy(() => import('../components/organisms/FAQ'));
const FinalCTA = React.lazy(() => import('../components/organisms/FinalCTA'));
const DailyChallenges = React.lazy(() => import('../components/organisms/DailyChallenges'));

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
        <DailyChallenges
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

