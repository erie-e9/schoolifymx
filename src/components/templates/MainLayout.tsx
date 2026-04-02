import React, { Suspense } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import ScrollToTop from '../atoms/ScrollToTop';
import CookieConsent from '../organisms/CookieConsent';
import type { ServiceType } from '../../types';

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
