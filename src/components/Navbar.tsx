import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import LogoSVG from '../assets/logo.svg?react';
import Schoolify from '../assets/Schoolify.svg?react';

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
    { label: 'Proceso', href: '#process' },
    { label: 'Preguntas', href: '#faq' },
  ];

  const waLink = 'https://wa.me/521XXXXXXXXXX?text=Hola%2C%20me%20interesa%20Schoolify.mx';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-md'
        : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          {/* <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-yellow group-hover:scale-110 transition-transform">
            <LogoSVG className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" />
          </div> */}

          <span className="font-heading font-800 text-xl text-text-main">
            <Schoolify className="h-10 w-20 group-hover:scale-110 transition-transform duration-300" />
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-body font-500 text-text-muted dark:text-dark-muted hover:text-text-main dark:hover:text-dark-text transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-text hover:bg-primary/20 transition-all duration-300"
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
            Escríbenos
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-dark-text"
          >
            {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            className="p-2 rounded-xl hover:bg-surface dark:hover:bg-dark-surface transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6 dark:text-dark-text" /> : <Menu className="w-6 h-6 dark:text-dark-text" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4 shadow-xl">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-body font-500 text-text-muted dark:text-dark-muted hover:text-text-main dark:hover:text-dark-text py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-text-main font-heading font-700 text-sm px-5 py-3 rounded-xl text-center shadow-yellow"
          >
            Contactar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
