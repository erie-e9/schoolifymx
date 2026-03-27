import React from 'react';
import Scribe from '../assets/scribe.svg?react';
import Crayola from '../assets/crayola1.svg?react';
import Pritt from '../assets/pritt.svg?react';
import Maped from '../assets/maped.svg?react';
import Pelikan from '../assets/pelikan.svg?react';
import M3 from '../assets/3m.svg?react';
import Berol from '../assets/berol.svg?react';
import Bic from '../assets/bic.svg?react';
import Barrilito from '../assets/barrilito2.svg?react';
import Papermate from '../assets/papermate1.svg?react';
import Casio from '../assets/casio.svg?react';
import Parisina from '../assets/parisina.svg?react';
import Modatelas from '../assets/modatelas.svg?react';
import Nike from '../assets/nike.svg?react';
import Adidas from '../assets/adidas.svg?react';
import Flexi from '../assets/flexi.svg?react';
import type { ServiceType } from '../types';

const STATIONERY_BRANDS = [
  { name: 'Scribe', logo: Scribe, link: 'https://www.scribe.com.mx' },
  { name: 'Pritt', logo: Pritt, link: 'https://www.pritt.com' },
  { name: 'Maped', logo: Maped, link: 'https://www.maped.com/es' },
  { name: 'Pelikan', logo: Pelikan, link: 'https://www.pelikan.com' },
  { name: 'M3', logo: M3, link: 'https://www.3m.com.mx' },
  { name: 'Berol', logo: Berol, link: 'https://www.berol.com' },
  { name: 'Casio', logo: Casio, link: 'https://www.casio.com/mx' },
  { name: 'Bic', logo: Bic, link: 'https://www.bicworld.com' },
  { name: 'Barrilito', logo: Barrilito, link: 'https://www.barrilito.com.mx' },
  { name: 'Papermate', logo: Papermate, link: 'https://www.papermate.com' }, //isImg: true 
  { name: 'Crayola', logo: Crayola, link: 'https://www.crayola.com' },
];

const UNIFORM_BRANDS = [
  { name: 'Parisina', logo: Parisina, link: 'https://www.parisina.com.mx' },
  // { name: 'Kaltex', logo: '', link: 'https://www.kaltex.com' },
  // { name: 'Lafayette', logo: '', link: 'https://www.lafayettemx.com' },
  { name: 'Modatelas', logo: Modatelas, link: 'https://www.modatelas.com.mx' },
  // { name: 'Sincatex', logo: '', link: 'https://www.sincatex.com' },
  // { name: 'Telatex', logo: '', link: 'https://www.telatex.com' },
];

const SHOE_BRANDS = [
  // { name: 'Bata', logo: '', link: 'https://www.bata.com.mx' },
  { name: 'Nike', logo: Nike, link: 'https://www.nike.com/mx' },
  { name: 'Adidas', logo: Adidas, link: 'https://www.adidas.com.mx' },
  { name: 'Puma', logo: '', link: 'https://www.puma.com/mx' },
  { name: 'Flexi', logo: Flexi, link: 'https://www.flexi.com.mx' },
  { name: 'Andrea', logo: '', link: 'https://www.andrea.com' },
  { name: 'Coqueta', logo: '', link: 'https://www.coqueta.com.mx' },
  { name: 'Azaleia', logo: '', link: 'https://www.azaleia.com.mx' },
  // { name: 'Vans', logo: '', link: 'https://www.vans.com.mx' },
];

interface BrandCarouselProps {
  activeService?: ServiceType;
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({ activeService = 'supplies' }) => {
  const isUniforms = activeService === 'uniforms';
  const ACTIVE_BRANDS = isUniforms ? [...UNIFORM_BRANDS, ...SHOE_BRANDS] : STATIONERY_BRANDS;

  return (
    <div className="w-full bg-text-main dark:bg-black h-[30px] flex items-center overflow-hidden relative z-[101]">
      <div className="flex w-max animate-scroll-left hover:pause-scroll">
        {[...ACTIVE_BRANDS, ...ACTIVE_BRANDS, ...ACTIVE_BRANDS, ...ACTIVE_BRANDS].map((brand, i) => (
          <a
            key={i}
            href={brand.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-12 md:px-16 opacity-90 hover:opacity-100 transition-opacity"
            title={brand.name}
          >
            {'isImg' in brand && brand.isImg ? (
              <img
                src={brand.logo as string}
                alt={brand.name}
                className="h-3.5 w-auto object-contain"
                loading="lazy"
              />
            ) : brand.logo === '' ? (
              <span className="text-white text-xs font-heading font-700 tracking-widest">{brand.name}</span>
            ) : (
              React.createElement(brand.logo as React.ElementType, {
                className: "h-3.5 w-auto object-contain"
              })
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(BrandCarousel);
