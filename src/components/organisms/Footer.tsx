import React from 'react';
import { Heart, Instagram, Facebook, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { getWhatsappLink } from '@types';
import Schoolify from '@assets/Schoolify.svg?react';
import WhatsApp from '@assets/whatsapp.svg?react';
import Youtube from '@assets/youtube.svg?react';
import Tiktok from '@assets/tiktok.svg?react';

const Footer: React.FC = () => {
  const waLink = getWhatsappLink(import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hola, soy una institución educativa y me gustaría conocer más sobre Schoolify.mx');

  const links = [
    {
      title: 'Empresa',
      items: [
        { label: 'Servicios', href: '#features' },
        { label: '¿Cómo funciona?', href: '#process' },
        { label: 'Galería', href: '#galery' },
        { label: 'Beneficios', href: '#stats' },
        { label: 'Preguntas', href: '#faq' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Aviso de Privacidad', href: '#' },
        { label: 'Términos y Condiciones', href: '#' },
        { label: 'Política de Cookies', href: '#' },
      ],
    },
  ];

  const social = [
    { icon: Facebook, href: 'https://facebook.com/schoolify.mx', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/schoolify.mx', label: 'Instagram' },
    { icon: WhatsApp, href: waLink, label: 'WhatsApp' },
    { icon: Youtube, href: 'https://youtube.com/@schoolify.mx', label: 'YouTube' },
    { icon: Tiktok, href: 'https://tiktok.com/@schoolify.mx', label: 'TikTok' },
  ];

  return (
    <footer className="bg-dark-bg text-text-main dark:text-dark-text pt-20 pb-10 transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="xl:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-6 group">
              <Schoolify className="h-9 w-auto md:h-11 group-hover:scale-105 transition-transform duration-300" />
            </a>
            <p className="text-text-muted dark:text-dark-muted text-sm leading-relaxed max-w-sm mb-2 opacity-90">
              Transformamos la experiencia del regreso a clases con soluciones y logísticas inteligentes 📦✨.
            </p>
            <p className="text-text-muted dark:text-dark-muted text-sm leading-relaxed max-w-sm mb-4 opacity-90">
              Ahorra tiempo, dinero y evita filas en la adquisición de uniformes y útiles escolares sin estrés.
            </p>

            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target='_blank'
                  className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 flex items-center justify-center text-text-muted dark:text-dark-muted hover:bg-primary/20 hover:text-text-main dark:hover:text-primary transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5 dark:text-dark-muted" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            <h4 className="font-heading font-800 text-xs uppercase tracking-[0.2em] text-accent dark:text-primary">
              Contacto
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white dark:text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-text-muted dark:text-dark-muted leading-snug">
                  Durango, Dgo<br />México
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white dark:text-primary flex-shrink-0" />
                <a href="mailto:hola@schoolify.mx" className="text-sm text-text-muted dark:text-dark-muted hover:text-white dark:hover:text-primary">
                  hola@schoolify.mx
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white dark:text-primary flex-shrink-0" />
                <a href={waLink} className="text-sm text-text-muted dark:text-dark-muted hover:text-white dark:hover:text-primary">
                  {import.meta.env.VITE_WHATSAPP_NUMBER}
                </a>
              </div>
            </div>
          </div>

          {/* Links Groups */}
          {links.map((group) => (
            <div key={group.title} className="flex flex-col gap-6">
              <h4 className="font-heading font-800 text-xs uppercase tracking-[0.2em] text-accent dark:text-primary">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-1.5 text-text-muted dark:text-dark-muted hover:text-white dark:hover:text-primary transition-all duration-200 text-sm font-body font-500"
                    >
                      {item.label}
                      {item.href.startsWith('http') && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted/90 dark:text-dark-muted/50 text-xs md:text-sm font-body">
            © {new Date().getFullYear()} <span className="font-700">Schoolify.mx</span> — Soluciones Escolares.
          </p>
          <div className="flex items-center gap-2 text-text-muted/90 dark:text-dark-muted/50 text-xs md:text-sm font-body">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
            <span>especialmente para las familias de México</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
