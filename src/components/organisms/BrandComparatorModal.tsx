import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { X, Tag, Plus, Search } from 'lucide-react';
import BrandDetailModal from '@components/organisms/BrandDetailModal';
import azorSvg from '@assets/azor2.svg?react';
import barrilito2Svg from '@assets/barrilito2.svg?react';
import berolSvg from '@assets/berol2.svg?react';
import bicSvg from '@assets/bic2.svg?react';
import crayolaSvg from '@assets/crayola2.svg?react';
import dixonSvg from '@assets/dixon2.svg?react';
import elmersSvg from '@assets/elmers2.svg?react';
import koresSvg from '@assets/kores2.svg?react';
import mapedSvg from '@assets/maped2.svg?react';
import papermateSvg from '@assets/papermate2.svg?react';
import pelikanSvg from '@assets/pelikan2.svg?react';
import prittSvg from '@assets/pritt2.svg?react';
import scoolSvg from '@assets/scool2.svg?react';
import scribeSvg from '@assets/scribe2.svg?react';
import sharpieSvg from '@assets/sharpie2.svg?react';
import nextepSvg from '@assets/nextep2.svg?react';
import pascuaSvg from '@assets/pascua2.svg?react';
import amazonSvg from '@assets/amazon2.svg?react';
import estrellaSvg from '@assets/estrella2.svg?react';
import baco2Svg from '@assets/baco2.svg?react';
import politec2Svg from '@assets/politec2.svg?react';
import pinguinoSvg from '@assets/pinguino.svg?react';
import delta2Svg from '@assets/delta2.svg?react';
import mirado2Svg from '@assets/mirado2.svg?react';
import monky2Svg from '@assets/monky.svg?react';
import playdoh2Svg from '@assets/playdoh2.svg?react';
import casioSvg from '@assets/casio.svg?react';

export interface BrandLogo {
  src: string;
  alt: string;
}

interface BrandRow {
  product: string;
  esencial: BrandLogo[];
  selecto: BrandLogo[];
}
const itemsToShow = 3;

// Map products to their applicable grades/levels (preescolar, primaria, secundaria)
const PRODUCT_GRADES: Record<string, string[]> = {
  'Tijeras': ['preescolar', 'primaria', 'secundaria'],
  'Lápiz escritura': ['preescolar', 'primaria', 'secundaria'],
  'Bolígrafo': ['primaria', 'secundaria'],
  'Plumones base agua': ['preescolar', 'primaria', 'secundaria'],
  'Borrador': ['preescolar', 'primaria', 'secundaria'],
  'Plumines': ['primaria', 'secundaria'],
  'Lápiz adhesivo': ['preescolar', 'primaria', 'secundaria'],
  'Pegamento liquido': ['preescolar', 'primaria', 'secundaria'],
  'Marcador permanente': ['primaria', 'secundaria'],
  'Corrector liquido': ['primaria', 'secundaria'],
  'Juego de geometría': ['primaria', 'secundaria'],
  'Pintura acrílica': ['preescolar', 'primaria'],
  'Plastilina moldeable': ['preescolar'],
  'Papel crepe': ['preescolar', 'primaria'],
  'Cuaderno 100h': ['primaria', 'secundaria'],
  'Lápices de colores': ['preescolar', 'primaria', 'secundaria'],
  'Sacapuntas': ['preescolar', 'primaria', 'secundaria'],
  'Cinta masking': ['preescolar', 'primaria', 'secundaria'],
  'Cinta transparente': ['preescolar', 'primaria', 'secundaria'],
  'Calculadora científica': ['secundaria'],
  'Calculadora básica': ['primaria'],
  'Engrapadora': ['secundaria'],
  'Grapas': ['secundaria'],
  'Marca textos': ['primaria', 'secundaria'],
  'Diurex': ['preescolar', 'primaria', 'secundaria'],
  'Silicon líquido': ['preescolar', 'primaria', 'secundaria'],
  'Plastilina': ['preescolar'],
  'Hoja de color (carta)': ['preescolar', 'primaria', 'secundaria'],
  'Hoja blanca (carta)': ['preescolar', 'primaria', 'secundaria'],
  'Hoja bond (lisa y cuadriculada)': ['primaria', 'secundaria'],
  'Papel lustre': ['preescolar', 'primaria'],
  'Carpeta (3 aros)': ['primaria', 'secundaria'],
  'Perforadora': ['secundaria'],
  'Carpeta (carta)': ['primaria', 'secundaria'],
  'Pintarrón': ['preescolar', 'primaria'],
  'Diccionario español': ['primaria', 'secundaria'],
  'Diccionario español-inglés': ['primaria', 'secundaria'],
  'Cinta canela': ['primaria', 'secundaria'],
  'Hule grueso': ['preescolar', 'primaria', 'secundaria'],
  'Hule contact': ['preescolar', 'primaria', 'secundaria']
};

const BRAND_ROWS = [
  {
    product: 'Tijeras',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
      { src: delta2Svg, alt: 'Delta' },
      { src: pascuaSvg, alt: 'Pascua' },
      { src: scoolSvg, alt: 'Scool' },
      { src: baco2Svg, alt: 'Baco' },
    ],
    selecto: [
      { src: barrilito2Svg, alt: 'Barrilito' },
      { src: mapedSvg, alt: 'Maped' },
      { src: pelikanSvg, alt: 'Pelikan' },
    ],
  },
  {
    product: 'Lápiz escritura',
    esencial: [
      { src: amazonSvg, alt: 'Amazon' },
      { src: koresSvg, alt: 'Kores' },
      { src: scoolSvg, alt: 'Scool' },
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
      { src: mirado2Svg, alt: 'Mirado' },
      { src: dixonSvg, alt: 'Dixon' },
      { src: mapedSvg, alt: 'Maped' },
      { src: pelikanSvg, alt: 'Pelikan' },
    ],
  },
  {
    product: 'Bolígrafo',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
      // { src: pinpointSvg, alt: 'Pin Point' },
      { src: bicSvg, alt: 'Bic' },
    ],
    selecto: [
      { src: azorSvg, alt: 'Azor' },
      { src: bicSvg, alt: 'Bic' },
      { src: papermateSvg, alt: 'Paper mate' },
    ],
  },
  {
    product: 'Plumones base agua',
    esencial: [
      { src: berolSvg, alt: 'Berol' },
      { src: nextepSvg, alt: 'Nextep' },
      { src: koresSvg, alt: 'Kores' },
    ],
    selecto: [
      { src: pascuaSvg, alt: 'Pascua' },
      { src: crayolaSvg, alt: 'Crayola' },
      { src: sharpieSvg, alt: 'Sharpie' },
    ],
  },
  {
    product: 'Borrador',
    esencial: [
      { src: koresSvg, alt: 'Kores' },
      { src: scoolSvg, alt: 'Scool' },
    ],
    selecto: [
      { src: pelikanSvg, alt: 'Pelikan' },
      // { src: pelikanSvg, alt: 'Mae' },
    ],
  },
  {
    product: 'Plumines',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Lápiz adhesivo',
    esencial: [
      { src: pascuaSvg, alt: 'Pascua' },
      { src: baco2Svg, alt: 'Baco' },
      { src: elmersSvg, alt: "Elmer's" },
      { src: koresSvg, alt: 'Kores' },
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
      { src: estrellaSvg, alt: 'Estrella' },
      { src: dixonSvg, alt: 'Dixon' },
      { src: prittSvg, alt: 'Pritt' },
    ],
  },
  {
    product: 'Pegamento liquido',
    esencial: [
      { src: koresSvg, alt: 'Kores' },
      { src: elmersSvg, alt: "Elmer's" },
      { src: scoolSvg, alt: 'Scool' },
    ],
    selecto: [
      { src: dixonSvg, alt: 'Dixon' },
      // { src: bullySvg, alt: 'Bully' },
      // { src: bullySvg, alt: 'Resistol' },
    ],
  },
  {
    product: 'Marcador permanente',
    esencial: [
      { src: pascuaSvg, alt: 'Pascua' },
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
      { src: bicSvg, alt: 'Bic' },
      { src: azorSvg, alt: 'Azor' },
      { src: pelikanSvg, alt: 'Pelikan' },
      { src: sharpieSvg, alt: 'Sharpie' },
    ],
  },
  {
    product: 'Corrector liquido',
    esencial: [
      { src: scoolSvg, alt: 'Scool' },
      { src: pascuaSvg, alt: 'Pascua' },
      { src: nextepSvg, alt: 'Nextep' },
      // { src: koresSvg, alt: 'Mae' },
    ],
    selecto: [
      { src: berolSvg, alt: 'Berol' },
      { src: papermateSvg, alt: 'Paper mate' },
      { src: bicSvg, alt: 'Bic' },
      { src: pelikanSvg, alt: 'Pelikan' },
    ],
  },
  {
    product: 'Juego de geometría',
    esencial: [
      { src: scoolSvg, alt: 'Scool' },
    ],
    selecto: [
      { src: mapedSvg, alt: 'Maped' },
      { src: barrilito2Svg, alt: 'Barrilito' },
    ],
  },
  {
    product: 'Pintura acrílica',
    esencial: [
      { src: scoolSvg, alt: 'PintArt' },
      // { src: scoolSvg, alt: 'Vinci' },
      // { src: baco2Svg, alt: 'Baco' },
    ],
    selecto: [
      { src: politec2Svg, alt: 'Politec' },
    ],
  },
  {
    product: 'Plastilina moldeable',
    esencial: [
      { src: pascuaSvg, alt: 'Pascua' },
      { src: baco2Svg, alt: 'Baco' },
    ],
    selecto: [
      { src: pelikanSvg, alt: 'Pelikan' },
      { src: playdoh2Svg, alt: 'Play Doh' },
    ],
  },
  {
    product: 'Papel crepe',
    esencial: [
      { src: pascuaSvg, alt: 'Pascua' },
    ],
    selecto: [
      { src: pinguinoSvg, alt: 'Pingüino' },
    ],
  },
  {
    product: 'Cuaderno 100h',
    esencial: [
      { src: scoolSvg, alt: 'Scool' },
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
      { src: estrellaSvg, alt: 'Estrella' },
      { src: scribeSvg, alt: 'Scribe' },
      { src: monky2Svg, alt: 'Monky' },
    ],
  },
  {
    product: 'Lápices de colores',
    esencial: [
      { src: scoolSvg, alt: 'Scool' },
    ],
    selecto: [
      { src: koresSvg, alt: 'Kores' },
      { src: papermateSvg, alt: 'Paper mate' },
      { src: crayolaSvg, alt: 'Crayola' },
      { src: mapedSvg, alt: 'Maped' },
      { src: bicSvg, alt: 'Bic' }
    ],
  },
  {
    product: 'Sacapuntas',
    esencial: [
      { src: scoolSvg, alt: 'Scool' },
    ],
    selecto: [
      { src: mapedSvg, alt: 'Maped' },
    ],
  },
  {
    product: 'Cinta masking',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [

    ],
  },
  {
    product: 'Cinta transparente',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [

    ],
  },
  {
    product: 'Calculadora científica',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
      { src: casioSvg, alt: 'Casio' },
    ],
  },
  {
    product: 'Calculadora básica',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
      { src: casioSvg, alt: 'Casio' },
    ],
  },
  {
    product: 'Engrapadora',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
    ],
  },
  //--
  {
    product: 'Grapas',
    esencial: [
      { src: nextepSvg, alt: 'Nextep' },
    ],
    selecto: [
    ],
  },
  {
    product: 'Marca textos',
    esencial: [

    ],
    selecto: [
    ],
  },
  {
    product: 'Diurex',
    esencial: [

    ],
    selecto: [
    ],
  },
  {
    product: 'Silicon líquido',
    esencial: [
      { src: pascuaSvg, alt: 'Pascua' },
    ],
    selecto: [
    ],
  },
  {
    product: 'Plastilina',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Hoja de color (carta)',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Hoja blanca (carta)',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Hoja bond (lisa y cuadriculada)',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Papel lustre',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Carpeta (3 aros)',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Perforadora',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Carpeta (carta)',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Pintarrón',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Diccionario español',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Diccionario español-inglés',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Cinta canela',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Hule grueso',
    esencial: [
    ],
    selecto: [
    ],
  },
  {
    product: 'Hule contact',
    esencial: [
    ],
    selecto: [
      { src: barrilito2Svg, alt: 'Barrilito' },
    ],
  },
];

interface BrandComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandLogos: React.FC<{ logos: BrandLogo[]; colorClass: string }> = ({ logos, colorClass }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 py-1">
    {logos.slice(0, itemsToShow).map((logo, i) => (
      <div
        key={i}
        className={`flex items-center justify-center rounded-lg px-2 py-1 bg-dark-bg/90 dark:bg-dark-bg border ${colorClass} shadow-sm`}
        title={logo.alt}
      >
        {React.createElement(logo.src as React.ElementType, {
          className: "h-5 w-auto max-w-[60px] object-contain"
        })}
      </div>
    ))}
  </div>
);

const BrandComparatorModal: React.FC<BrandComparatorModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [detailRow, setDetailRow] = useState<BrandRow | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'todos' | 'preescolar' | 'primaria' | 'secundaria'>('todos');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(
          modalRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.2'
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  };

  const filteredRows = React.useMemo(() => {
    return BRAND_ROWS.filter(row => {
      const matchesSearch = row.product.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedGrade === 'todos') return true;
      const grades = PRODUCT_GRADES[row.product] || [];
      return grades.includes(selectedGrade);
    });
  }, [searchQuery, selectedGrade]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 lg:p-12">

      {/* <div className="fixed inset-0 z-[1002] flex items-center justify-center p-0 md:p-4"> */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />

      {/* Modal — full height on mobile, capped on desktop */}
      <div
        ref={modalRef}
        className="relative w-full h-full md:h-auto md:max-h-[85vh] max-h-[95vh] max-w-3xl flex flex-col bg-white dark:bg-dark-surface md:rounded-[2rem] shadow-2xl border-0 md:border border-primary/20 dark:border-primary/10 opacity-0 overflow-hidden"><button
          onClick={handleClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Sticky Header */}
        <div className="shrink-0 p-6 pb-4 border-b border-gray-100 dark:border-primary/5 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md sticky top-0 z-20 space-y-4">
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-yellow animate-float flex-shrink-0">
              <Tag className="w-5 h-5 text-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight leading-tight">
                Marcas por tipo de <span className="text-secondary dark:text-primary">surtido que elijas</span>.
              </h2>
              <p className="text-[11px] mt-1 text-text-muted dark:text-dark-muted font-body leading-relaxed">
                La diferencia entre un paquete Esencial y uno Selecto esta basada principalemnte en la calidad, costo y características del producto.
              </p>
            </div>
          </div>

          {/* Search and Grade Filter Switches */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full pl-9 pr-4 py-2 text-[10px] bg-gray-50 dark:bg-dark-bg/60 border border-gray-200 dark:border-primary/10 rounded-xl text-text-main dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder-gray-400 dark:placeholder-gray-300"
              />
            </div>

            {/* Level selector switch/tabs */}
            <div className="flex bg-gray-50 dark:bg-dark-bg/60 p-1 rounded-xl border border-gray-200 dark:border-primary/10 select-none">
              {(['todos', 'preescolar', 'primaria', 'secundaria'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-heading font-700 capitlize tracking-wider transition-all whitespace-nowrap ${selectedGrade === grade
                    ? 'bg-primary text-gray-900 shadow-sm'
                    : 'text-text-muted dark:text-dark-muted hover:text-text-main dark:hover:text-dark-text'
                    }`}
                >
                  {grade === 'todos' ? 'Todos' : grade}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-heading font-700 text-text-muted dark:text-dark-muted tracking-wider">*La lista de marcas permanece sujeta a cambios sin previo aviso, esto puede ligeramente afectar el monto final en cada lista escolar. ¿Tienes marcas favoritas o alguna que prefieras evitar? Avísanos.</span>
            </div>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 dark:bg-dark-bg/60">
                <th className="p-3 text-center text-[11px] font-heading font-700 text-gray-400 uppercase tracking-widest w-[25%]">
                  Producto
                </th>
                <th className="p-3 text-center text-[11px] font-heading font-700 text-amber-500 uppercase tracking-widest border-l border-gray-100 dark:border-gray-800 w-[37.5%]">
                  <span>Esencial</span>
                  <span className="text-[8px] font-heading font-700 text-text-muted dark:text-dark-muted uppercase tracking-wider"> (economía)</span>
                </th>
                <th className="p-3 text-center text-[11px] font-heading font-700 text-secondary dark:text-primary uppercase tracking-widest border-l border-primary/30 bg-primary/10 w-[37.5%]">
                  <span>Selecto</span>
                  <span className="text-[8px] font-heading font-700 text-text-muted dark:text-dark-muted uppercase tracking-wider"> (calidad)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-sm font-body text-text-muted dark:text-dark-muted">
                    No se encontraron productos coincidentes.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-100 dark:border-dark-muted/40 transition-colors hover:bg-gray-50/60 dark:hover:bg-dark-bg/30 ${i % 2 === 0
                      ? 'bg-white dark:bg-dark-surface'
                      : 'bg-gray-50/40 dark:bg-dark-bg/20'
                      }`}
                  >
                    {/* Product */}
                    <td className="pl-4 text-xs font-body font-600 text-text-muted dark:text-dark-muted align-middle">
                      {row.product}
                    </td>

                    {/* Esencial */}
                    <td className="p-1.5 border-l border-gray-100 dark:border-dark-muted/40 align-middle justify-center md:flex-row">
                      {row.esencial.length >= 1 ? (
                        <>
                          <BrandLogos logos={row.esencial} colorClass="border-amber-100 dark:border-amber-900/30" />
                          <div className="flex justify-center w-full">
                            <button
                              onClick={() => setDetailRow(row)}
                              className="flex items-center gap-2 text-[10px] font-heading font-700 text-secondary dark:text-primary hover:underline underline-offset-2 transition-all group"
                              aria-label="Ver más marcas"
                            >
                              {row.esencial.length > itemsToShow ? <div className="flex items-center gap-1"><Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />{`${row.esencial.length - itemsToShow} marca${(row.esencial.length - itemsToShow) > 1 ? 's' : ''} más`}</div> : null}
                            </button>
                          </div>
                        </>) : (<>
                          <p className="text-[11px] font-body font-bold text-text-muted dark:text-dark-muted align-middle text-center">
                            No aplica
                          </p>
                        </>)}
                    </td>

                    {/* Selecto */}
                    <td className="p-1.5 border-l border-primary/20 bg-primary/5 align-middle" >
                      {row.selecto.length >= 1 ? (
                        <>
                          <BrandLogos logos={row.selecto} colorClass="border-primary/20" />
                          <div className="flex justify-center w-full">
                            <button
                              onClick={() => setDetailRow(row)}
                              className="flex items-center gap-2 text-[10px] font-heading font-700 text-secondary dark:text-primary hover:underline underline-offset-2 transition-all group"
                              aria-label="Ver más marcas"
                            >
                              {row.selecto.length > itemsToShow ? <div className="flex items-center"><Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />{`${row.selecto.length - itemsToShow} marca${(row.selecto.length - itemsToShow) > 1 ? 's' : ''} más`}</div> : null}
                            </button>
                          </div>
                        </>) : (<>
                          <p className="text-[11px] font-body font-bold text-text-muted dark:text-dark-muted align-middle text-center">
                            No aplica
                          </p>
                        </>)}
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button >
      </div >
      <BrandDetailModal
        isOpen={detailRow !== null}
        onClose={() => setDetailRow(null)}
        row={detailRow}
      />
    </div >,
    document.body
  );
};

export default React.memo(BrandComparatorModal);
