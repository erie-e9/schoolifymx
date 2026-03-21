import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { X, Ruler, Check, ChevronRight, ChevronDown, ChevronUp, Shirt } from 'lucide-react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { getWhatsappLink } from '../types';
import shirtGuide from '../assets/shirt_guide.png';
import pantsGuide from '../assets/pants_guide.png';
import skirtGuide from '../assets/skirt_guide.png';

interface UniformSizeHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

const PantsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 3h12l1 18h-5l-1-7-1 7H6L7 3z" />
    <path d="M10 3v8h4V3" />
  </svg>
);

const SkirtIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 4h12l3 16H3L6 4z" />
    <path d="M10 4v4M14 4v4" />
  </svg>
);

const UniformSizeHelper: React.FC<UniformSizeHelperProps> = ({ isOpen, onClose }) => {
  const [height, setHeight] = useState(130);
  const [weight, setWeight] = useState(30);
  const [activeTab, setActiveTab] = useState<'shirt' | 'pants' | 'skirt'>('shirt');
  const [selectedTopTypes, setSelectedTopTypes] = useState<string[]>(['Camisa']);

  // Advanced A-F Measures (Shirt/Top)
  const [chest, setChest] = useState(70);
  const [waist, setWaist] = useState(65);
  const [shoulders, setShoulders] = useState(35);
  const [totalLength, setTotalLength] = useState(55);
  const [sleeveLength, setSleeveLength] = useState(45);
  const [armWidth, setArmWidth] = useState(25);

  // Advanced Measures (Pants)
  const [pWaist, setPWaist] = useState(70);
  const [pHip, setPHip] = useState(85);
  const [pRise, setPRise] = useState(28);
  const [pLength, setPLength] = useState(90);
  const [pCuff, setPCuff] = useState(18);

  // Advanced Measures (Skirt)
  const [fWaist, setFWaist] = useState(65);
  const [fHip, setFHip] = useState(85);
  const [fLength, setFLength] = useState(45);

  const [showOptional, setShowOptional] = useState(false);
  const [suggestedSize, setSuggestedSize] = useState('8');

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const optionalRef = useRef<HTMLDivElement>(null);

  // Independent Sizing Logic (Mexico Standards)
  useEffect(() => {
    let size = '8';

    if (activeTab === 'shirt') {
      const c = chest;
      if (c < 60) size = '2';
      else if (c < 66) size = '4';
      else if (c < 71) size = '6';
      else if (c < 76) size = '8';
      else if (c < 81) size = '10';
      else if (c < 86) size = '12';
      else if (c < 91) size = '14';
      else if (c < 96) size = '16';
      else if (c < 101) size = 'CH';
      else if (c < 106) size = 'M';
      else if (c < 111) size = 'G';
      else size = 'XG';
    } else if (activeTab === 'pants') {
      const w = pWaist;
      if (w < 52) size = '2';
      else if (w < 57) size = '4';
      else if (w < 62) size = '6';
      else if (w < 67) size = '8';
      else if (w < 72) size = '10';
      else if (w < 77) size = '12';
      else if (w < 82) size = '14';
      else if (w < 87) size = '16';
      else if (w < 93) size = '28/30';
      else if (w < 99) size = '32/34';
      else if (w < 105) size = '36/38';
      else size = '40+';
    } else {
      const w = fWaist;
      if (w < 52) size = '2';
      else if (w < 57) size = '4';
      else if (w < 62) size = '6';
      else if (w < 67) size = '8';
      else if (w < 72) size = '10';
      else if (w < 77) size = '12';
      else if (w < 82) size = '14';
      else if (w < 87) size = '16';
      else size = 'CH/M';
    }

    setSuggestedSize(size);

    if (resultRef.current) {
      gsap.fromTo(resultRef.current, { scale: 0.8, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
    }
  }, [activeTab, chest, pWaist, fWaist]);

  // Handle Height/Weight section animation
  useEffect(() => {
    if (optionalRef.current) {
      gsap.to(optionalRef.current, {
        height: showOptional ? 'auto' : 0,
        opacity: showOptional ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [showOptional]);

  // Modal lifecycle GSAP
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(modalRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.4, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  if (!isOpen) return null;

  const advancedNote = `\n📋 Ficha Técnica ${activeTab === 'shirt' ? 'Prendas Superiores' : activeTab === 'pants' ? 'Pantalón' : 'Falda'}:\n` +
    (activeTab === 'shirt'
      ? `A. Pecho: ${chest}cm\n B. Cintura: ${waist}cm\n C. Hombros: ${shoulders}cm\n D. Largo: ${totalLength}cm\n E. Manga: ${sleeveLength}cm\n F. Brazo: ${armWidth}cm`
      : activeTab === 'pants'
        ? `• Cintura: ${pWaist}cm\n • Cadera: ${pHip}cm\n • Largo Tiro: ${pRise}cm\n • Largo Total: ${pLength}cm\n • Botamanga: ${pCuff}cm`
        : `• Cintura: ${fWaist}cm\n • Cadera: ${fHip}cm\n • Largo: ${fLength}cm`);

  const garmentType = activeTab === 'shirt' ? selectedTopTypes.join(', ') : activeTab === 'pants' ? 'Pantalón' : 'Falda';
  const waMessage = `¡Hola Schoolify! 👋 He usado su Asistente de Tallas para: ${garmentType}\n\n🧍 Estatura: ${height}cm\n⚖️ Peso: ${weight}kg${advancedNote}\n👕 Talla sugerida: ${suggestedSize}\n\n¿Por dónde empezamos? ✨`;
  const waLink = getWhatsappLink(waMessage);

  return createPortal(
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl opacity-0"
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white dark:bg-dark-surface rounded-[2rem] shadow-2xl border border-primary/20 dark:border-primary/10 overflow-hidden opacity-0 max-h-[92vh] flex flex-col"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-all z-50 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>

        {/* Header */}
        <div className="p-5 pb-4 border-b border-gray-100 dark:border-primary/5">
          <div className="">
            <span className="inline-flex py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-heading font-800 text-secondary dark:text-primary uppercase tracking-widest"><Ruler className="w-4 h-3" />{' '}Calculadora de Tallas</span>
          </div>
          <h2 className="text-xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight">Asistente de Tallas</h2>

          {/* <h2 className="text-3xl md:text-4xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight leading-tight">
            Asistente de <span className="text-secondary dark:text-primary">Tallas</span>.
          </h2> */}

          <p className="text-text-muted dark:text-dark-muted text-sm font-body max-w-md">
            Toma las medidas al estudiante e ingresalas para estimar su talla.
          </p>
        </div>

        {/* Multi-Level Selectors */}
        <div className="px-5 pt-4 space-y-3 shrink-0">
          {/* Main Tabs */}
          <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded-2xl relative shadow-inner h-11">
            <div
              className="absolute inset-y-1 bg-primary dark:bg-primary dark:bg-dark-surface rounded-xl shadow-md transition-all duration-300 ease-out z-0"
              style={{
                width: 'calc(33.33% - 4px)',
                left: activeTab === 'shirt' ? '4px' : activeTab === 'pants' ? '33.33%' : '66.66%'
              }}
            />

            <button
              onClick={() => setActiveTab('shirt')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[10px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'shirt' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <Shirt className="w-3.5 h-3.5" />
              Parte superior
            </button>
            <button
              onClick={() => setActiveTab('pants')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[10px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'pants' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <PantsIcon className="w-3.5 h-3.5" />
              Pantalón
            </button>
            <button
              onClick={() => setActiveTab('skirt')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[10px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'skirt' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <SkirtIcon className="w-3.5 h-3.5" />
              Falda
            </button>
          </div>

          {/* Sub-selector for Top Garments */}
          {activeTab === 'shirt' && (
            <div className="flex flex-wrap gap-2 pt-1 animate-fade-in">
              {['Camisa', 'Suéter', 'Saco', 'Chamarra'].map((type) => {
                const isSelected = selectedTopTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedTopTypes(prev => {
                        if (isSelected) {
                          if (prev.length === 1) return prev; // Keep at least one
                          return prev.filter(t => t !== type);
                        }
                        return [...prev, type];
                      });
                    }}
                    className={`px-3 py-1.5 rounded-full text-[8px] font-heading font-900 tracking-widest border transition-all ${isSelected ? 'bg-primary/20 border-primary text-text-main dark:text-dark-text' : 'bg-transparent border-gray-100 dark:border-primary/10 text-text-white opacity-90'}`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
          <div className="flex flex-col md:flex-row min-h-0">
            {/* Left Column: Sliders */}
            <div className="flex-1 p-5 space-y-6">
              {/* Ficha Técnica (PRIMARY FOR CALCULATION) */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {activeTab === 'shirt' ? (
                    <>
                      {/* (A) Chest */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">A.</span> Pecho (circunferencia)</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{chest}</span>
                        </div>
                        <input type="range" min="50" max="140" value={chest} onChange={(e) => setChest(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (B) Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">B.</span> Cintura (circunferencia)</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{waist}</span>
                        </div>
                        <input type="range" min="40" max="130" value={waist} onChange={(e) => setWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (C) Shoulders */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">C.</span> Hombros</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{shoulders}</span>
                        </div>
                        <input type="range" min="20" max="65" value={shoulders} onChange={(e) => setShoulders(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (D) Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">D.</span> Largo</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{totalLength}</span>
                        </div>
                        <input type="range" min="30" max="110" value={totalLength} onChange={(e) => setTotalLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (E) Sleeve */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">E.</span> Manga</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{sleeveLength}</span>
                        </div>
                        <input type="range" min="30" max="90" value={sleeveLength} onChange={(e) => setSleeveLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (F) Arm Width */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">F.</span> Brazo (circunferencia)</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{armWidth}</span>
                        </div>
                        <input type="range" min="15" max="55" value={armWidth} onChange={(e) => setArmWidth(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                    </>
                  ) : activeTab === 'pants' ? (
                    <>
                      {/* Pants Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">A.</span> Cintura</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{pWaist}</span>
                        </div>
                        <input type="range" min="40" max="130" value={pWaist} onChange={(e) => setPWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Hip */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">B.</span> Cadera</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{pHip}</span>
                        </div>
                        <input type="range" min="60" max="150" value={pHip} onChange={(e) => setPHip(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Rise */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">C.</span> Largo de Tiro</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{pRise}</span>
                        </div>
                        <input type="range" min="15" max="50" value={pRise} onChange={(e) => setPRise(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Pants Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">D.</span> Largo Total</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{pLength}</span>
                        </div>
                        <input type="range" min="40" max="140" value={pLength} onChange={(e) => setPLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Cuff */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">E.</span> Botamanga</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{pCuff}</span>
                        </div>
                        <input type="range" min="10" max="40" value={pCuff} onChange={(e) => setPCuff(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Skirt Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">A.</span> Cintura</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{fWaist}</span>
                        </div>
                        <input type="range" min="40" max="110" value={fWaist} onChange={(e) => setFWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Skirt Hip */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">B.</span> Cadera</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{fHip}</span>
                        </div>
                        <input type="range" min="50" max="130" value={fHip} onChange={(e) => setFHip(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Skirt Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">C.</span> Largo Falda</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{fLength}</span>
                        </div>
                        <input type="range" min="20" max="80" value={fLength} onChange={(e) => setFLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Optional Section (Height/Weight for support) */}
              <div className="pb-1">
                <button
                  onClick={() => setShowOptional(!showOptional)}
                  className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-50/50 dark:bg-dark-bg/20 rounded-xl border border-gray-100 dark:border-primary/5 hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center">
                      <Ruler className="w-3 h-3 text-text-main dark:text-dark-text opacity-60" />
                    </div>
                    <span className="text-[9px] font-heading font-800 text-text-main dark:text-dark-text tracking-widest">Estatura y Peso (Opcional)</span>
                  </div>
                  {showOptional ? <ChevronUp className="w-3.5 h-3.5 text-primary" /> : <ChevronDown className="w-3.5 h-3.5 text-text-muted" />}
                </button>

                <div ref={optionalRef} className="overflow-hidden h-0 opacity-0 space-y-4">
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                        <label className="text-text-muted dark:text-dark-muted">Estatura (cm)</label>
                        <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{height}</span>
                      </div>
                      <input type="range" min="90" max="190" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] uppercase font-heading font-800 tracking-widest">
                        <label className="text-text-muted dark:text-dark-muted">Peso (kg)</label>
                        <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{weight}</span>
                      </div>
                      <input type="range" min="15" max="120" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Area */}
              <div className="bg-gray-50/80 dark:bg-dark-bg/50 rounded-2xl p-4 border border-gray-100 dark:border-primary/5 flex items-center justify-between gap-4">
                <div ref={resultRef} className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-primary rounded-xl shadow-yellow flex items-center justify-center">
                    <span className="text-xl font-heading font-900 text-text-main">{suggestedSize}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-dark-surface animate-bounce-subtle">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-heading font-800 text-text-main dark:text-dark-text text-sm">Talla Recomendada</p>
                  <p className="text-[9px] text-text-muted dark:text-dark-muted font-body mt-0.5 leading-tight opacity-70">
                    Cómputo basado en Ficha Técnica. Mapeo estándar de México.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-secondary dark:bg-primary text-white dark:text-text-main font-heading font-900 text-base py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
                >
                  <WhatsApp className="w-4 h-4 fill-white dark:fill-text-main group-hover:rotate-12 transition-transform" />
                  Pedir esta talla
                  <ChevronRight className="w-4 h-4" />
                </a>
                <p className="text-center text-[9px] text-text-muted dark:text-dark-muted font-body leading-relaxed max-w-[240px] mx-auto opacity-60">
                  *Confirmaremos disponibilidad según tu selección.
                </p>
              </div>
            </div>

            {/* Right Column: Guide Image */}
            <div className="w-full md:w-[400px] bg-gray-50 dark:bg-dark-bg/30 p-8 flex flex-col items-center justify-center border-l border-gray-100 dark:border-primary/5">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-dark-surface group">
                <img
                  src={activeTab === 'shirt' ? shirtGuide : activeTab === 'pants' ? pantsGuide : skirtGuide}
                  alt="Guía de medidas"
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="mt-6 text-center space-y-1">
                <p className="text-[10px] font-heading font-900 text-text-main dark:text-dark-text tracking-widest uppercase">Referencia Visual</p>
                <p className="text-[9px] text-text-muted dark:text-dark-muted font-body max-w-[200px] leading-relaxed">
                  Utiliza esta guía para identificar los puntos de medición correctos en tu prenda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(UniformSizeHelper);
