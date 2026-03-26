import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, Check, ChevronRight, Shirt, Plus, Trash2, Info } from 'lucide-react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { getWhatsappLink } from '../types';
import shirtGuide from '../assets/shirt_guide2.png';
import pantsGuide from '../assets/pants_guide_es.png';
import skirtGuide from '../assets/skirt_guide_updated.png';
import jumperGuide from '../assets/jumper_guide.png';

const shoeGuide = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#B9BFBF"/>
  <path d="M100 280C100 280 90 260 90 230C90 200 110 180 130 160C150 140 180 130 210 130C240 130 260 150 270 180C280 210 270 280 270 280H100Z" fill="#222F52" stroke="white" stroke-width="2"/>
  <path d="M100 280L90 295H280L270 280" fill="#222F52" stroke="white" stroke-width="2"/>
  <line x1="90" y1="330" x2="280" y2="330" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
  <path d="M90 320V340M280 320V340" stroke="white" stroke-width="2"/>
  <text x="185" y="365" fill="white" font-family="Arial" font-size="16" font-weight="900" text-anchor="middle">A. LARGO DEL PIE</text>
  <circle cx="185" cy="330" r="12" fill="#FED100"/>
  <text x="185" y="335" fill="#222F52" font-family="Arial" font-size="14" font-weight="900" text-anchor="middle">A</text>
  <text x="200" y="80" fill="#222F52" font-family="Arial" font-size="18" font-weight="900" text-anchor="middle" opacity="0.6">GUÍA DE CALZADO</text>
</svg>
`)}`;

interface UniformSizeHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

const Tooltip = ({ content }: { content: string }) => (
  <div className="group relative whitespace-nowrap z-[100] ml-1.5 inline-flex cursor-pointer">
    <Info className="w-3.5 h-3.5 text-secondary/60 hover:text-secondary dark:text-primary/60 dark:hover:text-primary transition-colors" />
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[150px] whitespace-normal bg-gray-900 text-white text-[10px] font-body p-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl pointer-events-none z-[110]">
      {content}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-spacing-0 border-[4px] border-transparent border-b-gray-900" />
    </div>
  </div>
);

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

const JumperIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 3h12l2 7-2 11H6L4 10l2-7z" />
    <path d="M10 3v4M14 3v4" />
    <path d="M6 10h12" />
  </svg>
);

const ShoeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12h5l2-3h7l2 3h2v4l-3 3H4l-1-7z" />
    <path d="M10 9v3" />
  </svg>
);

interface StudentMeasurement {
  id: string;
  name: string;
  garmentType: string;
  suggestedSize: string;
  advancedNote: string;
  activeTab: 'shirt' | 'pants' | 'skirt' | 'jumper' | 'shoes';
  rawMeasurements: Record<string, number>;
  specialUniformType: string;
  gender?: 'Niño' | 'Niña';
  shoeType?: 'Escolar' | 'Deportivo';
  garmentNote?: string;
}

const UniformSizeHelper: React.FC<UniformSizeHelperProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shirt' | 'pants' | 'skirt' | 'jumper' | 'shoes'>('shirt');
  const [selectedTopTypes, setSelectedTopTypes] = useState<string[]>(['Camisa']);
  const [selectedPantsTypes, setSelectedPantsTypes] = useState<string[]>(['Pantalón']);

  const [students, setStudents] = useState<StudentMeasurement[]>([]);
  const [currentStudentName, setCurrentStudentName] = useState<string>('');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [specialUniformType, setSpecialUniformType] = useState<string>('');
  const [isMultiMode, setIsMultiMode] = useState<boolean>(false);
  const [showNextStepModal, setShowNextStepModal] = useState<boolean>(false);
  const [lastAddedStudentName, setLastAddedStudentName] = useState<string | null>(null);
  const [garmentNote, setGarmentNote] = useState<string>('');

  // Advanced A-F Measures (Shirt/Top)
  const [neck, setNeck] = useState(30);
  const [chest, setChest] = useState(70);
  const [waist, setWaist] = useState(65);
  const [shoulders, setShoulders] = useState(35);
  const [shoulder, setShoulder] = useState(15);
  const [totalLength, setTotalLength] = useState(55);
  const [sleeveLength, setSleeveLength] = useState(45);
  const [armWidth, setArmWidth] = useState(25);
  const [cuffWidth, setCuffWidth] = useState(25);

  // Advanced Measures (Pants)
  const [pWaist, setPWaist] = useState(70);
  const [pHip, setPHip] = useState(85);
  const [pRise, setPRise] = useState(28);
  const [pLength, setPLength] = useState(90);
  const [pCuff, setPCuff] = useState(18);
  const [pRiseToCuff, setPRiseToCuff] = useState(65);

  // Advanced Measures (Skirt)
  const [fWaist, setFWaist] = useState(65);
  const [fHip, setFHip] = useState(85);
  const [fLength, setFLength] = useState(45);
  const [hHip, setWHip] = useState(20);

  // Advanced Measures (Jumper)
  const [jTotalLength, setJTotalLength] = useState(75);
  const [jChest, setJChest] = useState(70);
  const [jWaist, setJWaist] = useState(68);
  const [jNeck, setJNeck] = useState(30);
  const [jShoulder, setJShoulder] = useState(12);
  const [jSkirtLength, setJSkirtLength] = useState(40);

  // Advanced Measures (Shoes)
  const [footLength, setFootLength] = useState(20);
  const [shoeGender, setShoeGender] = useState<'Niño' | 'Niña'>('Niño');
  const [shoeType, setShoeType] = useState<'Escolar' | 'Deportivo'>('Escolar');

  const [showOptional] = useState(false);
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
    } else if (activeTab === 'skirt') {
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
    } else if (activeTab === 'jumper') {
      const c = jChest;
      if (c < 60) size = '2';
      else if (c < 66) size = '4';
      else if (c < 71) size = '6';
      else if (c < 76) size = '8';
      else if (c < 81) size = '10';
      else if (c < 86) size = '12';
      else if (c < 91) size = '14';
      else if (c < 96) size = '16';
      else size = 'CH/M';
    } else if (activeTab === 'shoes') {
      const cm = footLength;
      size = Math.round(cm * 2) / 2 + "";
    }

    setSuggestedSize(size);

    if (resultRef.current) {
      gsap.fromTo(resultRef.current, { scale: 0.8, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
    }
  }, [activeTab, chest, pWaist, fWaist, jChest, footLength]);

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
  const advancedNote = `\n📋 Ficha Técnica ${activeTab === 'shirt'
    ? 'Prendas Superiores'
    : activeTab === 'pants'
      ? 'Pantalón'
      : activeTab === 'skirt'
        ? 'Falda'
        : activeTab === 'jumper'
          ? 'Jumper'
          : 'Calzado'}:\n` +
    (activeTab === 'shirt'
      ? `A. Cuello: ${neck}cm\n B. Pecho: ${chest}cm\n C. Cintura: ${waist}cm\n D. Hombros: ${shoulders}cm\n E. Hombro: ${shoulder}cm\n F. Largo: ${totalLength}cm\n G. Hombro a manga: ${sleeveLength}cm\n H. Brazo: ${armWidth}cm\n I. Muñeca: ${cuffWidth}cm`
      : activeTab === 'pants'
        ? `A. Cintura: ${pWaist}cm\n B. Cadera: ${pHip}cm\n C. Largo tiro: ${pRise}cm\n D. Largo total: ${pLength}cm\n E. Tiro a tobillo: ${pRiseToCuff}cm\n F. Campana: ${pCuff}cm`
        : activeTab === 'skirt'
          ? `A. Cintura: ${fWaist}cm\n B. Cadera: ${fHip}cm\n C. Largo cadera: ${hHip}cm\n D. Largo: ${fLength}cm`
          : activeTab === 'jumper'
            ? `A. Largo Total: ${jTotalLength}cm\n B. Ancho Pecho: ${jChest}cm\n C. Cintura: ${jWaist}cm\n D. Cuello: ${jNeck}cm\n E. Hombro: ${jShoulder}cm\n F. Largo Falda: ${jSkirtLength}cm`
            : `A. Largo del pie: ${footLength}cm\n B. Estilo: ${shoeType}\n C. Género: ${shoeGender}`) +
    (garmentNote ? `\n\n📝 Nota adicional:\n ${garmentNote}` : '');

  const currentGarmentType = (activeTab === 'shirt'
    ? selectedTopTypes.join(', ')
    : activeTab === 'pants'
      ? selectedPantsTypes.join(', ')
      : activeTab === 'skirt'
        ? 'Falda'
        : activeTab === 'jumper'
          ? 'Jumper'
          : 'Calzado') + (specialUniformType ? ` (${specialUniformType})` : '');

  const handleAddStudent = () => {
    if (!currentStudentName.trim()) {
      alert("Por favor, ingresa el nombre del estudiante para agregarlo a la lista.");
      return;
    }

    const raw = {
      neck, chest, waist, shoulders, shoulder, totalLength, sleeveLength, armWidth, cuffWidth,
      pWaist, pHip, pRise, pLength, pCuff,
      fWaist, fHip, fLength,
      jTotalLength, jChest, jWaist, jNeck, jShoulder, jSkirtLength,
      footLength
    };

    const newStudent: StudentMeasurement = {
      id: editingStudentId || Date.now().toString(),
      name: currentStudentName.trim(),
      garmentType: currentGarmentType,
      suggestedSize,
      advancedNote,
      activeTab,
      rawMeasurements: raw,
      specialUniformType: specialUniformType.trim(),
      shoeType: activeTab === 'shoes' ? shoeType : undefined,
      gender: activeTab === 'shoes' ? shoeGender : undefined,
      garmentNote: garmentNote.trim()
    };

    if (editingStudentId) {
      setStudents(prev => prev.map(s => s.id === editingStudentId ? newStudent : s));
      setEditingStudentId(null);
      setCurrentStudentName('');
      setSpecialUniformType('');
      setGarmentNote('');
    } else {
      setStudents(prev => [...prev, newStudent]);
      setLastAddedStudentName(newStudent.name);
      setShowNextStepModal(true);
      // Mantener currentStudentName y specialUniformType para la siguiente prenda
      setGarmentNote('');
    }
  };

  const handleEditStudent = (student: StudentMeasurement) => {
    setActiveTab(student.activeTab);
    setCurrentStudentName(student.name);
    setSpecialUniformType(student.specialUniformType || '');
    setGarmentNote(student.garmentNote || '');
    setEditingStudentId(student.id);

    const r = student.rawMeasurements;
    if (r) {
      if (r.neck !== undefined) setNeck(r.neck);
      if (r.chest !== undefined) setChest(r.chest);
      if (r.waist !== undefined) setWaist(r.waist);
      if (r.shoulders !== undefined) setShoulders(r.shoulders);
      if (r.shoulder !== undefined) setShoulder(r.shoulder);
      if (r.totalLength !== undefined) setTotalLength(r.totalLength);
      if (r.sleeveLength !== undefined) setSleeveLength(r.sleeveLength);
      if (r.armWidth !== undefined) setArmWidth(r.armWidth);
      if (r.cuffWidth !== undefined) setCuffWidth(r.cuffWidth);

      if (r.pWaist !== undefined) setPWaist(r.pWaist);
      if (r.pHip !== undefined) setPHip(r.pHip);
      if (r.pRise !== undefined) setPRise(r.pRise);
      if (r.pLength !== undefined) setPLength(r.pLength);
      if (r.pCuff !== undefined) setPCuff(r.pCuff);

      if (r.fWaist !== undefined) setFWaist(r.fWaist);
      if (r.fHip !== undefined) setFHip(r.fHip);
      if (r.fLength !== undefined) setFLength(r.fLength);

      if (r.jTotalLength !== undefined) setJTotalLength(r.jTotalLength);
      if (r.jChest !== undefined) setJChest(r.jChest);
      if (r.jWaist !== undefined) setJWaist(r.jWaist);
      if (r.jNeck !== undefined) setJNeck(r.jNeck);
      if (r.jShoulder !== undefined) setJShoulder(r.jShoulder);
      if (r.jSkirtLength !== undefined) setJSkirtLength(r.jSkirtLength);

      if (r.footLength !== undefined) setFootLength(r.footLength);
      if (student.gender) setShoeGender(student.gender);
      if (student.shoeType) setShoeType(student.shoeType);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setCurrentStudentName('');
    setSpecialUniformType('');
    setGarmentNote('');
  };

  const handleRemoveStudent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de eliminar las tallas de este estudiante?')) {
      setStudents(students.filter(s => s.id !== id));
      if (editingStudentId === id) handleCancelEdit();
    }
  };

  const handleClearStudents = () => {
    if (window.confirm('¿Estás seguro de borrar toda la lista de estudiantes?')) {
      setStudents([]);
      handleCancelEdit();
    }
  };

  let waMessage = '';
  if (students.length > 0) {
    waMessage = `¡Hola Schoolify! 👋 Les comparto tallas para mi grupo:\n\n`;
    students.forEach(s => {
      waMessage += `👤 Estudiante: ${s.name}\n👕 Prenda: ${s.garmentType}\n${s.advancedNote}\n✅ Talla Sugerida: ${s.suggestedSize}\n\n`;
    });
  } else {
    waMessage = `¡Hola Schoolify! 👋 He usado su Asistente de Tallas para: ${currentGarmentType}\n${advancedNote}\n👕 Talla sugerida: ${suggestedSize}.`;
  }
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
        className="relative w-full max-w-4xl bg-white dark:bg-dark-surface rounded-[2rem] shadow-2xl border border-primary/20 dark:border-primary/10 overflow-hidden opacity-0 max-h-[90vh] flex flex-col"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Header */}
        <div className="p-8 pb-2 md:p-8 md:pb-2 border-b border-gray-100 dark:border-primary/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-yellow animate-float flex-shrink-0">
                <Shirt className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight leading-tight">
                  Asistente de <span className="text-secondary dark:text-primary">Tallas</span>.
                </h2>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                  Elige una o más prendas y toma las medidas al estudiante e ingrésalas para estimar su talla recomendada al instante.
                </p>
              </div>
            </div>

            <a
              href={getWhatsappLink('Hola, necesito cotizar una prenda o accesorio que no se encuentra en el Asistente de Tallas.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] text-text-main dark:text-white hover:scale-105 transition-transform font-heading font-800 tracking-wider shrink-0 bg-primary/20 dark:bg-primary/20 shadow-sm px-5 py-2.5 rounded-xl"
            >
              ¿No está la prenda que buscas? Contáctanos
            </a>
          </div>
        </div>

        {/* Multi-Level Selectors */}
        <div className="px-5 pt-4 space-y-3 shrink-0">
          {/* Main Tabs */}
          <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded-2xl relative shadow-inner h-11">
            <div
              className="absolute inset-y-1 bg-primary dark:bg-primary dark:bg-dark-surface rounded-xl shadow-md transition-all duration-300 ease-out z-0"
              style={{
                width: 'calc(20% - 4px)',
                left: activeTab === 'shirt' ? '4px' : activeTab === 'pants' ? '20%' : activeTab === 'skirt' ? '40%' : activeTab === 'jumper' ? '60%' : '80%'
              }}
            />

            <button
              onClick={() => setActiveTab('shirt')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[8px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'shirt' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <Shirt className="w-3.5 h-3.5" />
              <span className="hidden md:block">Parte superior</span>
            </button>
            <button
              onClick={() => setActiveTab('pants')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[8px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'pants' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <PantsIcon className="w-3.5 h-3.5" />
              <span className="hidden md:block">Pantalón</span>
            </button>
            <button
              onClick={() => setActiveTab('skirt')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[8px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'skirt' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <SkirtIcon className="w-3.5 h-3.5" />
              <span className="hidden md:block">Falda</span>
            </button>
            <button
              onClick={() => setActiveTab('jumper')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[8px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'jumper' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <JumperIcon className="w-3.5 h-3.5" />
              <span className="hidden md:block">Jumper</span>
            </button>
            <button
              onClick={() => setActiveTab('shoes')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[8px] font-heading font-900 tracking-widest transition-colors ${activeTab === 'shoes' ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'}`}
            >
              <ShoeIcon className="w-3.5 h-3.5" />
              <span className="hidden md:block">Calzado</span>
              <span className="absolute top-0 -right-1 bg-secondary dark:bg-secondary text-white text-[8px] px-1.5 py-0.5 rounded-lg font-800 tracking-tighter leading-none whitespace-nowrap">
                Próximamente
              </span>
            </button>
          </div>

          {/* Sub-selector for Top Garments */}
          {activeTab === 'shirt' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pt-1 pb-2 animate-fade-in">
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

          {/* Sub-selector for Pants */}
          {activeTab === 'pants' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pt-1 pb-2 animate-fade-in">
              {['Pantalón', 'Pantalón Deportivo'].map((type) => {
                const isSelected = selectedPantsTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPantsTypes(prev => {
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
            {/* Left Column: Image Area */}
            <div className="w-full md:w-[320px] lg:w-[400px] bg-gray-50 dark:bg-dark-bg/30 p-8 border-l border-gray-100 dark:border-primary/5 relative shrink-0">
              <div className="lg:sticky lg:top-8 flex flex-col items-center">
                <div className="mb-3 text-center space-y-1">
                  <p className="text-[10px] font-heading font-900 text-text-main dark:text-dark-text tracking-widest uppercase">Referencia Visual</p>
                  <p className="text-[9px] text-text-muted dark:text-dark-muted font-body leading-relaxed">
                    Utiliza esta guía para identificar los puntos de medición correctos en tu prenda.
                  </p>
                </div>
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-dark-surface group">
                  <img
                    src={
                      activeTab === 'shirt'
                        ? shirtGuide
                        : activeTab === 'pants'
                          ? pantsGuide
                          : activeTab === 'skirt'
                            ? skirtGuide
                            : activeTab === 'jumper'
                              ? jumperGuide
                              : activeTab === 'shoes'
                                ? shoeGuide
                                : shirtGuide
                    }
                    alt={`Guía de medidas de ${activeTab}`}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column: Guide Image */}
            <div className="flex-1 p-5 space-y-6">
              {/* Ficha Técnica (PRIMARY FOR CALCULATION) */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {activeTab === 'shirt' ? (
                    <>
                      {/* (A) Neck */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">A.</span> Cuello (al rededor)<Tooltip content="Mide alrededor de la base del cuello, dejando un dedo de holgura." /></label>
                          <input type="number" value={neck} onChange={(e) => setNeck(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="20" max="60" value={neck} onChange={(e) => setNeck(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (B) Chest */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center "><span className="mr-1">B.</span> Pecho (circunferencia)<Tooltip content="Mide debajo de las axilas, en la parte más ancha del pecho." /></label>
                          <input type="number" value={chest} onChange={(e) => setChest(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="50" max="140" value={chest} onChange={(e) => setChest(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (C) Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">C.</span> Cintura (circunferencia)<Tooltip content="Mide alrededor de la cintura, justo por encima del ombligo." /></label>
                          <input type="number" value={waist} onChange={(e) => setWaist(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="130" value={waist} onChange={(e) => setWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (D) Shoulders */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">D.</span> Hombros<Tooltip content="Mide cruzando la espalda, de costura a costura." /></label>
                          <input type="number" value={shoulders} onChange={(e) => setShoulders(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="20" max="65" value={shoulders} onChange={(e) => setShoulders(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (E) Shoulder */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">E.</span> Hombro<Tooltip content="Mide desde la base del cuello hasta donde inicia la manga." /></label>
                          <input type="number" value={shoulder} onChange={(e) => setShoulder(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="5" max="25" value={shoulder} onChange={(e) => setShoulder(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (F) Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">F.</span> Largo<Tooltip content="Mide desde la base trasera del cuello hasta el bajo de la camisa." /></label>
                          <input type="number" value={totalLength} onChange={(e) => setTotalLength(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="30" max="110" value={totalLength} onChange={(e) => setTotalLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (G) Shoulder to Sleeve */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">G.</span> Hombro a Manga<Tooltip content="Mide con el brazo doblado, desde el hombro hasta la muñeca." /></label>
                          <input type="number" value={sleeveLength} onChange={(e) => setSleeveLength(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="30" max="90" value={sleeveLength} onChange={(e) => setSleeveLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (H) Arm Width */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">H.</span> Brazo (circunferencia)<Tooltip content="Mide alrededor del bíceps en la parte más ancha." /></label>
                          <input type="number" value={armWidth} onChange={(e) => setArmWidth(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="15" max="55" value={armWidth} onChange={(e) => setArmWidth(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (I) Cuff Width */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">I.</span> Muñeca (circunferencia)<Tooltip content="Medida de la circunferencia de la muñeca o puño." /></label>
                          <input type="number" value={cuffWidth} onChange={(e) => setCuffWidth(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="15" max="55" value={cuffWidth} onChange={(e) => setCuffWidth(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                    </>
                  ) : activeTab === 'pants' ? (
                    <>
                      {/* Pants Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">A.</span> Cintura (circunferencia)<Tooltip content="Mide alrededor de la cintura, justo por encima del ombligo." /></label>
                          <input type="number" value={pWaist} onChange={(e) => setPWaist(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="130" value={pWaist} onChange={(e) => setPWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Hip */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">B.</span> Cadera (circunferencia)<Tooltip content="Mide alrededor de la parte más prominente de los glúteos." /></label>
                          <input type="number" value={pHip} onChange={(e) => setPHip(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="60" max="150" value={pHip} onChange={(e) => setPHip(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Rise Height*/}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">C.</span> Largo de Tiro<Tooltip content="Mide desde la entrepierna hasta la cintura superior." /></label>
                          <input type="number" value={pRise} onChange={(e) => setPRise(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="15" max="50" value={pRise} onChange={(e) => setPRise(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Rise Width */}
                      {/* <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900"><span className="mr-1">D.</span> Ancho de Tiro</label>
                          <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{pRise}</span>
                        </div>
                        <input type="range" min="15" max="50" value={pRise} onChange={(e) => setPRise(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div> */}

                      {/* Pants Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">D.</span> Largo Total<Tooltip content="Mide por el costado desde la cintura lateral hasta el tobillo." /></label>
                          <input type="number" value={pLength} onChange={(e) => setPLength(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="140" value={pLength} onChange={(e) => setPLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Rise to Cuff */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">E.</span> Tiro a Tobillo<Tooltip content="Mide por el interior de la pierna, desde la entrepierna hasta el tobillo." /></label>
                          <input type="number" value={pRiseToCuff} onChange={(e) => setPRiseToCuff(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="110" value={pRiseToCuff} onChange={(e) => setPRiseToCuff(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* Cuff */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">F.</span> Campana<Tooltip content="Mide la circunferencia del bajo del pantalón." /></label>
                          <input type="number" value={pCuff} onChange={(e) => setPCuff(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="10" max="40" value={pCuff} onChange={(e) => setPCuff(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                    </>
                  ) : activeTab === 'skirt' ? (
                    <>
                      {/* (A) Skirt Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">A.</span> Cintura (circunferencia)<Tooltip content="Mide alrededor de la cintura." /></label>
                          <input type="number" value={fWaist} onChange={(e) => setFWaist(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="110" value={fWaist} onChange={(e) => setFWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (B) Lenght Hip */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">B.</span> Cadera (circunferencia)<Tooltip content="Mide alrededor de la parte más prominente." /></label>
                          <input type="number" value={fHip} onChange={(e) => setFHip(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="50" max="130" value={fHip} onChange={(e) => setFHip(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (C) Width Hip */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">C.</span> Largo Cadera<Tooltip content="Mide por el costado desde la cintura hasta la cadera." /></label>
                          <input type="number" value={hHip} onChange={(e) => setWHip(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="20" max="80" value={hHip} onChange={(e) => setWHip(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (D) Skirt Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">D.</span> Largo<Tooltip content="Mide por el costado desde la cintura hasta la altura deseada." /></label>
                          <input type="number" value={fLength} onChange={(e) => setFLength(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="20" max="80" value={fLength} onChange={(e) => setFLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                    </>
                  ) : activeTab === 'jumper' ? (
                    <>
                      {/* (A) Total Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">A.</span> Largo Total<Tooltip content="Mide desde el hombro hasta el bajo del jumper." /></label>
                          <input type="number" value={jTotalLength} onChange={(e) => setJTotalLength(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="150" value={jTotalLength} onChange={(e) => setJTotalLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (B) Chest */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">B.</span> Ancho Pecho<Tooltip content="Mide debajo de las axilas, en la parte más ancha del pecho." /></label>
                          <input type="number" value={jChest} onChange={(e) => setJChest(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="40" max="130" value={jChest} onChange={(e) => setJChest(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (C) Waist */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">C.</span> Cintura<Tooltip content="Mide alrededor de la cintura." /></label>
                          <input type="number" value={jWaist} onChange={(e) => setJWaist(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="30" max="120" value={jWaist} onChange={(e) => setJWaist(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (D) Neck */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">D.</span> Cuello<Tooltip content="Mide alrededor de la base del cuello." /></label>
                          <input type="number" value={jNeck} onChange={(e) => setJNeck(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="15" max="60" value={jNeck} onChange={(e) => setJNeck(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (E) Shoulder */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">E.</span> Hombro<Tooltip content="Mide desde la base del cuello hasta el inicio de la sisa." /></label>
                          <input type="number" value={jShoulder} onChange={(e) => setJShoulder(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="5" max="25" value={jShoulder} onChange={(e) => setJShoulder(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>

                      {/* (F) Skirt Length */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center"><span className="mr-1">F.</span> Largo Falda<Tooltip content="Mide desde la cintura hasta el bajo deseado." /></label>
                          <input type="number" value={jSkirtLength} onChange={(e) => setJSkirtLength(parseInt(e.target.value) || 0)} className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none" />
                        </div>
                        <input type="range" min="20" max="100" value={jSkirtLength} onChange={(e) => setJSkirtLength(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                      </div>
                    </>
                  ) : (
                    <div className="col-span-full space-y-6">
                      {/* Shoe Type Selection */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-heading font-800 text-text-muted dark:text-dark-muted tracking-widest uppercase text-center">Tipo de Calzado</p>
                        <div className="flex items-center justify-center flex-wrap gap-2 pt-1 pb-2">
                          {(['Escolar', 'Deportivo'] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setShoeType(type)}
                              className={`px-3 py-1.5 rounded-full text-[8px] font-heading font-900 tracking-widest border transition-all ${shoeType === type ? 'bg-primary/20 border-primary text-text-main dark:text-dark-text' : 'bg-transparent border-gray-100 dark:border-primary/10 text-text-white opacity-90'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Gender Selection */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-heading font-800 text-text-muted dark:text-dark-muted tracking-widest uppercase text-center">Género</p>
                        <div className="flex items-center justify-center flex-wrap gap-2 pt-1 pb-2">
                          {(['Niño', 'Niña'] as const).map((g) => (
                            <button
                              key={g}
                              onClick={() => setShoeGender(g)}
                              className={`px-3 py-1.5 rounded-full text-[8px] font-heading font-900 tracking-widest border transition-all ${shoeGender === g ? 'bg-primary/20 border-primary text-text-main dark:text-dark-text' : 'bg-transparent border-gray-100 dark:border-primary/10 text-text-white opacity-90'}`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* (A) Foot Length */}
                      <div className="space-y-3 border-t border-gray-100 dark:border-primary/5 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-heading font-800 tracking-widest px-1">
                          <label className="text-text-muted dark:text-dark-muted font-900 flex items-center uppercase"><span className="mr-2 text-secondary dark:text-primary">A.</span> Largo del pie (cm)<Tooltip content="Mide desde la punta del dedo gordo hasta el talón." /></label>
                          <div className="flex items-center gap-1.5">
                            <input type="number" step="0.5" value={footLength} onChange={(e) => setFootLength(parseFloat(e.target.value) || 0)} className="w-16 bg-gray-50 dark:bg-dark-bg/50 text-center outline-none font-heading font-900 text-lg text-secondary dark:text-primary rounded-lg py-1 appearance-none border border-transparent focus:border-primary" />
                            <span className="text-[10px] text-text-muted dark:text-dark-muted">CM</span>
                          </div>
                        </div>
                        <div className="px-2">
                          <input type="range" min="10" max="32" step="0.5" value={footLength} onChange={(e) => setFootLength(parseFloat(e.target.value))} className="w-full h-1.5 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Section (Height/Weight for support) */}
              {/* <div className="pb-1">
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
                      <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                        <label className="text-text-muted dark:text-dark-muted">Estatura (cm)</label>
                        <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{height}</span>
                      </div>
                      <input type="range" min="90" max="190" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
                        <label className="text-text-muted dark:text-dark-muted">Peso (kg)</label>
                        <span className="text-sm font-heading font-900 text-text-main dark:text-dark-text">{weight}</span>
                      </div>
                      <input type="range" min="15" max="120" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Note Input */}
              <div className="pt-2">
                <input
                  type="text"
                  maxLength={180}
                  placeholder={`Incluir nota adicional (Opcional)`}
                  value={garmentNote}
                  onChange={(e) => setGarmentNote(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 dark:border-primary/20 px-2 py-2 text-[11px] font-body text-text-main dark:text-dark-text outline-none focus:border-primary transition-colors placeholder:dark:text-dark-muted"
                />
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

              {/* Multi-Student Section */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-primary/10">
                {(!isMultiMode && students.length === 0) ? (
                  <button
                    onClick={() => setIsMultiMode(true)}
                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 dark:bg-dark-bg/50 dark:hover:bg-dark-bg/80 text-secondary dark:text-primary rounded-xl font-heading font-800 text-sm transition-colors flex items-center justify-center gap-2 border border-primary/20"
                  >
                    <Plus className="w-5 h-5" /> Registrar múltiples estudiantes
                  </button>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <label htmlFor="studentName" className="text-[10px] uppercase font-heading font-800 tracking-widest text-text-muted dark:text-dark-muted block">
                        {editingStudentId ? 'Editando Estudiante' : 'Datos de estudiante'}
                      </label>
                      <div className="flex flex-col gap-2 relative">
                        <input
                          id="studentName"
                          type="text"
                          maxLength={50}
                          placeholder="Nombre del Estudiante (Ej. Eric Torres)*"
                          value={currentStudentName}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Basic validation: letters, spaces, common accents
                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-\.]*$/.test(val)) {
                              setCurrentStudentName(val);
                            }
                          }}
                          className="w-full bg-gray-50/80 dark:bg-dark-bg/50 border border-gray-200 dark:border-primary/5 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-body text-text-main dark:text-dark-text outline-none"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={40}
                            placeholder="Tipo de Uniforme (Escolar, escolta, otro...)"
                            value={specialUniformType}
                            onChange={(e) => setSpecialUniformType(e.target.value)}
                            className="flex-1 bg-gray-50/80 dark:bg-dark-bg/50 border border-gray-200 dark:border-primary/5 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-body text-text-main dark:text-dark-text outline-none"
                          />
                          <button
                            onClick={handleAddStudent}
                            className={`shrink-0 ${editingStudentId ? 'bg-primary text-text-main' : 'bg-primary/10 hover:bg-primary/20 text-secondary dark:text-primary'} px-4 py-3 rounded-xl transition-colors flex items-center justify-center border border-primary/20 hover:border-primary/50 whitespace-nowrap font-heading font-800 text-sm`}
                          >
                            {editingStudentId ? 'Actualizar' : <><Plus className="w-5 h-5 lg:mr-1" /> <span className="hidden lg:inline">Añadir</span></>}
                          </button>
                          {editingStudentId && (
                            <button
                              onClick={handleCancelEdit}
                              className="shrink-0 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-text-main dark:text-dark-text px-4 py-3 rounded-xl transition-colors flex items-center justify-center text-sm font-heading font-800"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {students.length > 0 && (
                      <div className="bg-gray-50/50 dark:bg-dark-bg/20 rounded-xl p-3 border border-gray-100 dark:border-primary/10">
                        <div className="flex justify-between items-center mb-2.5 px-1">
                          <h4 className="text-[10px] uppercase font-heading font-800 tracking-widest text-text-main dark:text-dark-text">
                            Estudiantes Listos ({students.length})
                          </h4>
                          <button onClick={handleClearStudents} className="flex flex-row gap-1 text-[10px] text-red-500 hover:text-red-700 font-bold cursor-pointer transition-colors block p-1">
                            <Trash2 className="w-3.5 h-3.5 group-hover/del:scale-110 transition-transform text-red-500 hover:text-red-700" /> Borrar todos
                          </button>
                        </div>
                        <div className="max-h-[140px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                          {students.map(student => (
                            <div key={student.id} onClick={() => handleEditStudent(student)} className={`bg-white dark:bg-dark-surface p-3 rounded-xl flex items-center justify-between shadow-sm border cursor-pointer hover:border-primary/50 transition-colors ${editingStudentId === student.id ? 'border-primary' : 'border-gray-100 dark:border-primary/5'}`}>
                              <div className="flex flex-col gap-0.5 max-w-[70%]">
                                <span className="font-heading font-800 text-xs text-text-main dark:text-dark-text truncate">{student.name}</span>
                                <div className="flex flex-row gap-0.5 text-text-muted dark:text-dark-muted">{student.garmentType === 'Camisa' ? <Shirt className="w-3.5 h-3.5" /> : student.garmentType === 'Pantalón' ? <PantsIcon className="w-3.5 h-3.5" /> : student.garmentType === 'Falda' ? <SkirtIcon className="w-3.5 h-3.5" /> : student.garmentType === 'Jumper' ? <JumperIcon className="w-3.5 h-3.5" /> : <ShoeIcon className="w-3.5 h-3.5" />}<span className="text-[9px] text-text-muted dark:text-dark-muted font-body line-clamp-1">{student.garmentType} - Talla {student.suggestedSize}</span></div>
                              </div>
                              <button
                                onClick={(e) => handleRemoveStudent(student.id, e)}
                                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 rounded-lg transition-colors group/del shrink-0"
                                title="Eliminar Estudiante"
                              >
                                <Trash2 className="w-3.5 h-3.5 group-hover/del:scale-110 transition-transform" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-secondary dark:bg-primary text-white dark:text-text-main font-heading font-900 text-base py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
                >
                  <WhatsApp className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  {students.length > 0 ? `Pedir prenda${students.length > 1 ? 's' : ''}` : "Pedir esta talla"}
                  <ChevronRight className="w-4 h-4" />
                </a>
                <p className="text-center text-[10px] text-text-muted dark:text-dark-muted font-body leading-relaxed max-w-md mx-auto">
                  *Confirmaremos disponibilidad según tu selección.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Inner Modal for Next Steps */}
        {showNextStepModal && (
          <div className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-surface p-6 rounded-3xl shadow-2xl w-full max-w-sm space-y-4 border border-primary/20 animate-fade-in text-center shadow-yellow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success/50 via-success to-success/50" />
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-1">
                <Check className="w-6 h-6 text-success animate-bounce-subtle" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-900 text-xl text-text-main dark:text-dark-text leading-tight">¡Medidas Guardadas!</h3>
                <p className="text-sm font-body text-text-muted dark:text-dark-muted">Se ha agregado la prenda a <strong>{lastAddedStudentName}</strong>.</p>
              </div>
              <div className="grid grid-cols-1 gap-2.5 pt-3">
                {activeTab === 'shirt' && (
                  <>
                    <button onClick={() => { setActiveTab('pants'); setShowNextStepModal(false); setGarmentNote(''); }} className="w-full bg-primary/10 hover:bg-primary/20 text-text-secondary py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer border border-primary/20 flex items-center justify-center gap-2">
                      <PantsIcon className="w-4 h-4" /> Continuar con Pantalón
                    </button>
                    <button onClick={() => { setActiveTab('skirt'); setShowNextStepModal(false); setGarmentNote(''); }} className="w-full bg-primary/10 hover:bg-primary/20 text-text-secondary py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer border border-primary/20 flex items-center justify-center gap-2">
                      <SkirtIcon className="w-4 h-4" /> Continuar con Falda
                    </button>
                    <button onClick={() => { setActiveTab('jumper'); setShowNextStepModal(false); setGarmentNote(''); }} className="w-full bg-primary/10 hover:bg-primary/20 text-text-secondary py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer border border-primary/20 flex items-center justify-center gap-2">
                      <JumperIcon className="w-4 h-4" /> Continuar con Jumper
                    </button>
                    <button onClick={() => { setActiveTab('shoes'); setShowNextStepModal(false); setGarmentNote(''); }} className="w-full bg-primary/10 hover:bg-primary/20 text-text-secondary py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer border border-primary/20 flex items-center justify-center gap-2">
                      <ShoeIcon className="w-4 h-4" /> Continuar con Calzado
                    </button>
                  </>
                )}
                {activeTab === 'jumper' && (
                  <>
                    <button onClick={() => { setActiveTab('shoes'); setShowNextStepModal(false); setGarmentNote(''); }} className="w-full bg-primary/10 hover:bg-primary/20 text-text-secondary py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer border border-primary/20 flex items-center justify-center gap-2">
                      <ShoeIcon className="w-4 h-4" /> Continuar con Calzado
                    </button>
                  </>
                )}
                {(activeTab === 'pants' || activeTab === 'skirt') && (
                  <>
                    <button onClick={() => { setActiveTab('shoes'); setShowNextStepModal(false); setGarmentNote(''); }} className="w-full bg-primary/10 hover:bg-primary/20 text-text-secondary py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer border border-primary/20 flex items-center justify-center gap-2">
                      <ShoeIcon className="w-4 h-4" /> Continuar con Calzado
                    </button>
                  </>
                )}
                <button onClick={() => { setCurrentStudentName(''); setSpecialUniformType(''); setGarmentNote(''); setShowNextStepModal(false); }} className="w-full bg-secondary dark:bg-primary text-white dark:text-text-main py-3.5 rounded-xl font-heading font-800 text-sm transition-colors cursor-pointer shadow-lg hover:-translate-y-0.5 mt-1 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Registrar Otro Estudiante
                </button>
                <button onClick={() => setShowNextStepModal(false)} className="mt-2 text-xs font-heading font-800 text-text-muted hover:text-text-main dark:hover:text-dark-text underline cursor-pointer transition-colors p-2">
                  Cerrar y Ver Lista
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default React.memo(UniformSizeHelper);
