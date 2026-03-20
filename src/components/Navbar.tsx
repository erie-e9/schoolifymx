import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Schoolify from '../assets/Schoolify.svg?react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { getWhatsappLink } from '../types';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.body.classList.add('dark');
    } else {
      setIsDark(false);
      document.body.classList.remove('dark');
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const links = [
    { label: 'Servicios', href: '#features' },
    { label: '¿Cómo funciona?', href: '#process' },
    { label: 'Galería', href: '#galery' },
    { label: 'Beneficios', href: '#stats' },
    { label: 'Preguntas', href: '#faq' },
  ];

  const waLink = getWhatsappLink(import.meta.env.VITE_WHATSAPP_MESSAGE_SCHOOL || 'Hola, me gustaría saber más sobre Schoolify.mx');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-dark-bg/95 border-b border-gray-100 dark:border-gray-800/50 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="font-heading font-900 text-xl text-text-main dark:text-dark-text">
            <Schoolify className="h-9 w-auto md:h-11 group-hover:scale-105 transition-transform duration-300" />
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map(l => (
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

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-text hover:bg-primary/20 dark:hover:bg-primary/10 transition-all duration-300"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-text-main font-heading font-700 text-sm px-5 py-2.5 rounded-xl shadow-yellow hover:shadow-yellow-lg hover:scale-105 transition-all duration-200"
          >
            <WhatsApp className="w-5 h-5 text-black" />
            Contacto para escuelas
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-text"
          >
            {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white dark:bg-dark-bg px-6 py-8 flex flex-col gap-6 shadow-2xl animate-fade-in-down h-[calc(100vh-72px)] overflow-y-auto z-[99]">
          <div className="flex flex-col gap-2">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="font-heading font-700 text-2xl text-text-main dark:text-dark-text hover:text-secondary dark:hover:text-primary py-3 border-b border-gray-50 dark:border-gray-800/50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="mt-auto pb-10 flex flex-col gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary dark:bg-primary text-secondary font-heading font-800 text-lg px-6 py-5 rounded-2xl text-center shadow-lg active:scale-95 transition-all w-full flex items-center justify-center gap-3"
            >
              <WhatsApp className="w-5 h-5" />
              Escríbenos ahora
            </a>
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
