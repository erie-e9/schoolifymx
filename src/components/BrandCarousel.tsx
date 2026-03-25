import React from 'react';
import Scribe from '../assets/scribe.svg?react';
import Crayola from '../assets/crayola.svg?react';
import Pritt from '../assets/pritt.svg?react';
import Maped from '../assets/maped.svg?react';
import Pelikan from '../assets/pelikan.svg?react';
import M3 from '../assets/3m.svg?react';
import Berol from '../assets/berol.svg?react';
import Bic from '../assets/bic.svg?react';
import Barrilito from '../assets/barrilito2.svg?react';
import Papermate from '../assets/papermate2.png';
import Casio from '../assets/casio.svg?react';
import Parisina from '../assets/parisina.svg?react';
import type { ServiceType } from '../types';

const STATIONERY_BRANDS = [
  { name: 'Scribe', url: Scribe },
  { name: 'Pritt', url: Pritt },
  { name: 'Maped', url: Maped },
  { name: 'Pelikan', url: Pelikan },
  { name: 'M3', url: M3 },
  { name: 'Berol', url: Berol },
  { name: 'Bic', url: Bic },
  { name: 'Barrilito', url: Barrilito },
  { name: 'Papermate', url: Papermate },
  // { name: 'Crayola', url: Crayola },
  { name: 'Casio', url: Casio },
];

const UNIFORM_BRANDS = [
  { name: 'Parisina', url: Parisina },
  { name: 'Kaltex', url: '' },
  { name: 'Lafayette', url: '' },
  { name: 'Modatelas', url: '' },
  { name: 'Sincatex', url: '' },
  { name: 'Telatex', url: '' },
];

interface BrandCarouselProps {
  activeService?: ServiceType;
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({ activeService = 'supplies' }) => {
  const isUniforms = activeService === 'uniforms';
  const ACTIVE_BRANDS = isUniforms ? UNIFORM_BRANDS : STATIONERY_BRANDS;

  return (
    <div className="w-full bg-text-main dark:bg-black h-[30px] flex items-center overflow-hidden relative z-[101]">
      <div className="flex w-max animate-scroll-left hover:pause-scroll">
        {[...ACTIVE_BRANDS, ...ACTIVE_BRANDS, ...ACTIVE_BRANDS, ...ACTIVE_BRANDS].map((brand, i) => (
          <div key={i} className="flex items-center justify-center px-12 md:px-16 opacity-90 hover:opacity-100 transition-opacity">
            {typeof brand.url === 'string' && brand.url !== '' ? (
              <img
                src={brand.url}
                alt={brand.name}
                className="h-3.5 w-auto object-contain"
                loading="lazy"
              />
            ) : brand.url === '' ? (
              <span className="text-white text-xs font-heading font-700 tracking-widest">{brand.name}</span>
            ) : (
              React.createElement(brand.url as React.ElementType, {
                className: "h-3.5 w-auto object-contain"
              })
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(BrandCarousel);
