import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Sun, Moon, Building2, Trophy } from 'lucide-react';
import Schoolify from '@assets/Schoolify.svg?react';
import SchoolifyLogo from '@assets/logo.svg?react';
import WhatsApp from '@assets/whatsapp.svg?react';
import BrandCarousel from '@components/molecules/BrandCarousel';
import { WhatsAppService } from '@services/WhatsAppService';
import { useTheme } from '@hooks/useTheme';
import Button from '@components/atoms/Button';
import type { ServiceType } from '@types';

const NAV_LINKS = [
  { label: 'Servicios', href: '#features' },
  { label: '¿Cómo funciona?', href: '#process' },
  { label: 'Galería', href: '#galery' },
  { label: 'Beneficios', href: '#stats' },
  { label: 'Preguntas', href: '#faq' },
];

interface NavbarProps {
  activeService?: ServiceType;
  onOpenChallenges?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeService = 'supplies', onOpenChallenges }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waLink = useMemo(() => import.meta.env.VITE_WHATSAPP_MESSAGE_SCHOOL || 'Hola, me gustaría saber más sobre Schoolify.mx', []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    WhatsAppService.sendGenericContact(waLink);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-dark-bg/95 border-b border-gray-100 dark:border-gray-800/50 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <BrandCarousel activeService={activeService} />
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Schoolify">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-yellow group-hover:scale-110 transition-transform">
            <SchoolifyLogo className="w-9 h-9" />
          </div>
          <span className="font-heading font-900 text-xl text-text-main dark:text-dark-text">
            <Schoolify className="h-8 w-auto md:h-10 group-hover:scale-105 transition-transform duration-300" />
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-body font-600 text-text-muted dark:text-dark-muted hover:text-secondary dark:hover:text-primary transition-all duration-200 text-sm tracking-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenChallenges}
            aria-label="Daily challenges"
            className="hidden lg:flex"
          >
            <Trophy className="w-5 h-5 text-secondary dark:text-white/90" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-secondary" />}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleContactClick}
            leftIcon={<WhatsApp className="w-5 h-5 text-black" />}
            aria-label="Contacto para escuelas"
          >
            <span className="hidden lg:inline">Contacto para escuelas</span>
            <Building2 className="w-5 h-5 text-black inline lg:hidden" />
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenChallenges}
            aria-label="Daily challenges"
          >
            <Trophy className="w-4 h-4 text-secondary dark:text-white/90" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 top-[102px] bg-white dark:bg-dark-bg px-6 py-8 flex flex-col gap-6 shadow-2xl animate-fade-in-down h-[calc(100vh-102px)] overflow-y-auto z-[99]" role="dialog" aria-label="Menú de navegación">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="font-heading font-700 text-sm text-text-main dark:text-dark-text hover:text-secondary dark:hover:text-primary py-3 border-b border-gray-50 dark:border-gray-800/50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="mt-auto pb-10 flex flex-col gap-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-lg py-5"
              onClick={handleContactClick}
              leftIcon={<WhatsApp className="w-6 h-6" />}
            >
              Escríbenos ahora
            </Button>
            <p className="text-center text-text-muted dark:text-dark-muted font-body text-sm px-4">
              Atención inmediata de Lunes a Sábado de 9:00 AM a 7:00 PM
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
