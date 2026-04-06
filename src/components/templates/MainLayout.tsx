import React, { Suspense } from 'react';
import Navbar from '@components/organisms/Navbar';
import ScrollToTop from '@components/atoms/ScrollToTop';
import type { ServiceType } from '@types';

const Footer = React.lazy(() => import('../organisms/Footer'));
const CookieConsent = React.lazy(() => import('../organisms/CookieConsent'));

interface MainLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenChallenges: () => void;
  activeService: ServiceType;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isDarkMode,
  onOpenChallenges,
  activeService,
}) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <Navbar activeService={activeService} onOpenChallenges={onOpenChallenges} />
      <main>{children}</main>
      <Suspense fallback={null}>
        <ScrollToTop />
        <CookieConsent />
        <Footer />
      </Suspense>

    </div>
  );
};

export default MainLayout;

