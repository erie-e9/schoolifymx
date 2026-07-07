import React from 'react';
import scribeSvg from '@assets/scribe2.svg?react';
import crayolaSvg from '@assets/crayola2.svg?react';
import prittSvg from '@assets/pritt2.svg?react';
import mapedSvg from '@assets/maped2.svg?react';
import pelikanSvg from '@assets/pelikan.svg?react';
import M3 from '@assets/3m.svg?react';
import berolSvg from '@assets/berol2.svg?react';
import bicSvg from '@assets/bic.svg?react';
import barrilito2Svg from '@assets/barrilito2.svg?react';
import papermateSvg from '@assets/papermate2.svg?react';
import casioSvg from '@assets/casio.svg?react';
import koresSvg from '@assets/kores.svg?react';
import parisinaSvg from '@assets/parisina2.svg?react';
import modatelasSvg from '@assets/modatelas.svg?react';
import nikeSvg from '@assets/nike.svg?react';
import adidasSvg from '@assets/adidas.svg?react';
import flexiSvg from '@assets/flexi.svg?react';
import azorSvg from '@assets/azor2.svg?react';
import dixonSvg from '@assets/dixon2.svg?react';
import elmersSvg from '@assets/elmers2.svg?react';
import scoolSvg from '@assets/scool.svg?react';
import sharpieSvg from '@assets/sharpie2.svg?react';
import nextepSvg from '@assets/nextep2.svg?react';
import pascuaSvg from '@assets/pascua.svg?react';
import amazonSvg from '@assets/amazon2.svg?react';
import estrellaSvg from '@assets/estrella2.svg?react';
import bacoSvg from '@assets/baco2.svg?react';
import politecSvg from '@assets/politec.svg?react';
import pinguinoSvg from '@assets/pinguino.svg?react';
import delta2Svg from '@assets/delta2.svg?react';
import miradoSvg from '@assets/mirado.svg?react';
import monkySvg from '@assets/monky.svg?react';
import playdohSvg from '@assets/playdoh.svg?react';
import type { ServiceType } from '@types';


const SUPPLIES_BRANDS = [
  { name: 'Scribe', logo: scribeSvg, link: 'https://www.scribe.com.mx' },
  { name: 'Pritt', logo: prittSvg, link: 'https://www.pritt.com' },
  { name: 'Maped', logo: mapedSvg, link: 'https://www.maped.com/es' },
  { name: 'Pelikan', logo: pelikanSvg, link: 'https://www.pelikan.com' },
  { name: 'M3', logo: M3, link: 'https://www.3m.com.mx' },
  { name: 'Berol', logo: berolSvg, link: 'https://www.berol.com' },
  { name: 'Casio', logo: casioSvg, link: 'https://www.casio.com/mx' },
  { name: 'Bic', logo: bicSvg, link: 'https://www.bicworld.com' },
  { name: 'Barrilito', logo: barrilito2Svg, link: 'https://www.barrilito.com.mx' },
  { name: 'Papermate', logo: papermateSvg, link: 'https://www.papermate.mx' }, //isImg: true 
  { name: 'Crayola', logo: crayolaSvg, link: 'https://www.crayola.com' },
  { name: 'Kores', logo: koresSvg, link: 'https://www.crayola.com' },
  { name: 'Azor', logo: azorSvg, link: 'https://www.crayola.com' },
  { name: 'Dixon', logo: dixonSvg, link: 'https://www.crayola.com' },
  { name: 'Elmers', logo: elmersSvg, link: 'https://www.crayola.com' },
  { name: 'Scool', logo: scoolSvg, link: 'https://www.crayola.com' },
  { name: 'Sharpie', logo: sharpieSvg, link: 'https://www.crayola.com' },
  { name: 'Nextep', logo: nextepSvg, link: 'https://www.crayola.com' },
  { name: 'Pascua', logo: pascuaSvg, link: 'https://www.crayola.com' },
  { name: 'Amazon', logo: amazonSvg, link: 'https://www.crayola.com' },
  { name: 'Estrella', logo: estrellaSvg, link: 'https://www.crayola.com' },
  { name: 'Baco', logo: bacoSvg, link: 'https://www.crayola.com' },
  { name: 'Politec', logo: politecSvg, link: 'https://www.crayola.com' },
  { name: 'Pinguino', logo: pinguinoSvg, link: 'https://www.crayola.com' },
  { name: 'Delta', logo: delta2Svg, link: 'https://www.crayola.com' },
  { name: 'Mirado', logo: miradoSvg, link: 'https://www.crayola.com' },
  { name: 'Monky', logo: monkySvg, link: 'https://www.crayola.com' },
  { name: 'Playdoh', logo: playdohSvg, link: 'https://www.crayola.com' },
];

const UNIFORM_BRANDS = [
  { name: 'Parisina', logo: parisinaSvg, link: 'https://www.parisina.com.mx' },
  // { name: 'Kaltex', logo: '', link: 'https://www.kaltex.com' },
  // { name: 'Lafayette', logo: '', link: 'https://www.lafayettemx.com' },
  { name: 'Modatelas', logo: modatelasSvg, link: 'https://www.modatelas.com.mx' },
  // { name: 'Sincatex', logo: '', link: 'https://www.sincatex.com' },
  // { name: 'Telatex', logo: '', link: 'https://www.telatex.com' },
];

const SHOE_BRANDS = [
  // { name: 'Bata', logo: '', link: 'https://www.bata.com.mx' },
  { name: 'Nike', logo: nikeSvg, link: 'https://www.nike.com/mx' },
  { name: 'Adidas', logo: adidasSvg, link: 'https://www.adidas.com.mx' },
  { name: 'Puma', logo: '', link: 'https://www.puma.com/mx' },
  { name: 'Flexi', logo: flexiSvg, link: 'https://www.flexi.com.mx' },
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
  const ACTIVE_BRANDS = isUniforms ? [...UNIFORM_BRANDS, ...SHOE_BRANDS] : SUPPLIES_BRANDS;

  // Dynamically calculate speed based on number of items to keep speed consistent,
  // or allow controlling it directly by scaling duration proportional to list size.
  const durationSec = ACTIVE_BRANDS.length * 3.5; // ~3.5 seconds per original brand item for a complete loop

  return (
    <div className="w-full bg-text-main dark:bg-black h-[30px] flex items-center overflow-hidden relative z-[101]">
      <div 
        className="flex w-max animate-scroll-left hover:pause-scroll"
        style={{ animationDuration: `${durationSec}s` }}
      >
        {[...ACTIVE_BRANDS, ...ACTIVE_BRANDS, ...ACTIVE_BRANDS, ...ACTIVE_BRANDS].map((brand, i) => (
          <a
            key={i}
            href={brand.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-12 md:px-16 opacity-90 hover:opacity-100 transition-opacity"
            title={brand.name}
          >
            {typeof brand.logo === 'string' && brand.logo === '' ? (
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
