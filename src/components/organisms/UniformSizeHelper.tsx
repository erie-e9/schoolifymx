import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, Check, Shirt, Plus, Info, Trash2, ChevronRight, Ruler } from 'lucide-react';
import WhatsApp from '@assets/whatsapp.svg?react';
import { WhatsAppService } from '@services/WhatsAppService';
import { useUniformSize } from '@hooks/useUniformSize';
import Button from '@components/atoms/Button';
import Badge from '@components/atoms/Badge';
import MeasurementField from '@components/atoms/MeasurementField';
import Tooltip from '@components/atoms/Tooltip';

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

const UniformSizeHelper: React.FC<UniformSizeHelperProps> = ({ isOpen, onClose }) => {
  const {
    activeTab, setActiveTab,
    selectedTopTypes, setSelectedTopTypes,
    selectedPantsTypes, setSelectedPantsTypes,
    students,
    currentStudentName, setCurrentStudentName,
    editingStudentId, setEditingStudentId,
    specialUniformType, setSpecialUniformType,
    garmentNote, setGarmentNote,
    isMultiMode, setIsMultiMode,
    showNextStepModal, setShowNextStepModal,
    lastAddedStudentName,
    neck, setNeck,
    chest, setChest,
    waist, setWaist,
    shoulders, setShoulders,
    shoulder, setShoulder,
    totalLength, setTotalLength,
    sleeveLength, setSleeveLength,
    armWidth, setArmWidth,
    cuffWidth, setCuffWidth,
    pWaist, setPWaist,
    pHip, setPHip,
    pRise, setPRise,
    pLength, setPLength,
    pCuff, setPCuff,
    pRiseToCuff, setPRiseToCuff,
    fWaist, setFWaist,
    fHip, setFHip,
    fLength, setFLength,
    hHip, setWHip,
    jTotalLength, setJTotalLength,
    jChest, setJChest,
    jWaist, setJWaist,
    jNeck, setJNeck,
    jShoulder, setJShoulder,
    jSkirtLength, setJSkirtLength,
    footLength, setFootLength,
    shoeGender, setShoeGender,
    shoeType, setShoeType,
    suggestedSize,
    handleAddStudent,
    handleEditStudent,
    handleRemoveStudent,
    handleClearStudents
  } = useUniformSize(isOpen);

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const shirtGuide = 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1774639803/shirt_guide2_r7yr51.avif';
  const pantsGuide = 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1774639804/pants_guide_es_aztg4d.avif';
  const skirtGuide = 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1774639803/skirt_guide1_ui7wkz.avif';
  const jumperGuide = 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1774639803/jumper_guide_ptmmm6.avif';
  const shoeGuide = 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1774639803/shoe_guide_rklhd2.avif';
  const shoeGuideGirl = 'https://res.cloudinary.com/dmm5i6xbi/image/upload/v1774639803/shoe_guide_g_bkqwny.avif';

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

  useEffect(() => {
    if (resultRef.current && suggestedSize) {
      gsap.fromTo(resultRef.current,
        { scale: 0.8, opacity: 0.5, rotateY: 90 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.75)' }
      );
    }
  }, [suggestedSize]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.4, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  const currentGarmentType = (activeTab === 'shirt' ? selectedTopTypes.join(', ') : activeTab === 'pants' ? selectedPantsTypes.join(', ') : activeTab === 'skirt' ? 'Falda' : activeTab === 'jumper' ? 'Jumper' : 'Calzado') + (specialUniformType ? ` (${specialUniformType})` : '');

  const advancedNote = `\n📋 Ficha Técnica ${activeTab === 'shirt' ? 'Prendas Superiores' : activeTab === 'pants' ? 'Pantalón' : activeTab === 'skirt' ? 'Falda' : activeTab === 'jumper' ? 'Jumper' : 'Calzado'}:\n` +
    (activeTab === 'shirt'
      ? `- A. Cuello: ${neck}cm\n- B. Pecho: ${chest}cm\n- C. Cintura: ${waist}cm\n- D. Hombros: ${shoulders}cm\n- E. Hombro: ${shoulder}cm\n- F. Largo: ${totalLength}cm\n- G. Hombro a manga: ${sleeveLength}cm\n- H. Brazo: ${armWidth}cm\n- I. Muñeca: ${cuffWidth}cm`
      : activeTab === 'pants'
        ? `- A. Cintura: ${pWaist}cm\n- B. Cadera: ${pHip}cm\n- C. Largo tiro: ${pRise}cm\n- D. Largo total: ${pLength}cm\n- E. Tiro a tobillo: ${pRiseToCuff}cm\n- F. Campana: ${pCuff}cm`
        : activeTab === 'skirt'
          ? `- A. Cintura: ${fWaist}cm\n- B. Cadera: ${fHip}cm\n- C. Largo cadera: ${hHip}cm\n- D. Largo: ${fLength}cm`
          : activeTab === 'jumper'
            ? `- A. Largo Total: ${jTotalLength}cm\n- B. Ancho Pecho: ${jChest}cm\n- C. Cintura: ${jWaist}cm\n- D. Cuello: ${jNeck}cm\n- E. Hombro: ${jShoulder}cm\n- F. Largo Falda: ${jSkirtLength}cm`
            : `- A. Largo del pie: ${footLength}cm\n- B. Estilo: ${shoeType}\n- C. Género: ${shoeGender}`) +
    (garmentNote ? `\n\n📝 Nota adicional: ${garmentNote}` : '');

  const handleWhatsAppSend = () => {
    if (students.length > 0) {
      WhatsAppService.sendMultipleStudentsSizes(students);
    } else {
      const currentGarmentType = (activeTab === 'shirt' ? selectedTopTypes.join(', ') : activeTab === 'pants' ? selectedPantsTypes.join(', ') : activeTab === 'skirt' ? 'Falda' : activeTab === 'jumper' ? 'Jumper' : 'Calzado') + (specialUniformType ? ` (${specialUniformType})` : '');
      WhatsAppService.sendSingleStudentSize(currentGarmentType, advancedNote, suggestedSize);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl opacity-0"
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white dark:bg-dark-surface rounded-[2rem] shadow-2xl border border-primary/20 dark:border-primary/10 overflow-hidden opacity-0 max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-8 pb-4 border-b border-gray-100 dark:border-primary/5 flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-yellow animate-float flex-shrink-0">
              <Ruler className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight leading-tight">
                  Asistente de <span className="text-secondary dark:text-primary">Tallas</span>.
                </h2>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 max-w-md">
                Toma las medidas al estudiante e ingrésalas para estimar su talla recomendada al instante según estándares oficiales.
              </p>
            </div>
          </div>
          <button
            onClick={() => WhatsAppService.sendGenericContact('Hola, necesito cotizar una prenda o accesorio que no se encuentra en el Asistente de Tallas.')}
            className="inline-flex items-center gap-2 text-[10px] text-text-main dark:text-white hover:scale-105 transition-transform font-heading font-800 tracking-wider shrink-0 bg-primary/20 dark:bg-primary/20 shadow-sm px-5 py-2.5 rounded-xl"
          >
            ¿No está la prenda que buscas? Contáctanos
          </button>
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="absolute top-6 right-6 p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-4 space-y-3 shrink-0">
          <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded-2xl relative shadow-inner h-11">
            <div
              className="absolute inset-y-1 bg-primary dark:bg-primary dark:bg-dark-surface rounded-xl shadow-md transition-all duration-300 ease-out z-0"
              style={{
                width: 'calc(20% - 4px)',
                left: activeTab === 'shirt'
                  ? '4px'
                  : activeTab === 'pants'
                    ? '20.2%'
                    : activeTab === 'skirt'
                      ? '40.2%'
                      : activeTab === 'jumper'
                        ? '60.2%'
                        : '80.2%'
              }}
            />
            {[
              { id: 'shirt', label: 'Parte superior', icon: Shirt },
              { id: 'pants', label: 'Pantalón', icon: PantsIcon },
              { id: 'skirt', label: 'Falda', icon: SkirtIcon },
              { id: 'jumper', label: 'Jumper', icon: JumperIcon },
              { id: 'shoes', label: 'Calzado', icon: ShoeIcon, blocked: true, badge: 'Próximamente' },
            ].map((tab) => (
              <button
                key={tab.id}
                disabled={tab.blocked}
                onClick={() => !tab.blocked && setActiveTab(tab.id as any)}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-[8px] font-heading font-900 tracking-widest transition-all duration-300 ${activeTab === tab.id ? 'text-text-main font-900' : 'text-text-main dark:text-white opacity-60 hover:opacity-100'} ${tab.blocked ? 'cursor-not-allowed opacity-50 grayscale-[0.5]' : ''}`}
              >
                {tab.id === 'shirt' && <Shirt className="w-4 h-4" />}
                {tab.id === 'pants' && <PantsIcon className="w-4 h-4" />}
                {tab.id === 'skirt' && <SkirtIcon className="w-4 h-4" />}
                {tab.id === 'jumper' && <JumperIcon className="w-4 h-4" />}
                {tab.id === 'shoes' && <ShoeIcon className="w-4 h-4" />}

                <span className="hidden md:block ml-1">{tab.label}</span>

                {tab.badge && (
                  <Badge
                    variant="secondary"
                    size="sm" className="absolute -top-3 -right-1 px-2 py-0.5 rounded-lg shadow-sm font-800 tracking-tight animate-pulse bg-accent text-white border-none"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
          <div className="flex flex-col md:flex-row min-h-0">

            {/* Left Column: Guides and Result */}
            <div className="w-full md:w-[320px] lg:w-[380px] xl:w-[330px] bg-white dark:bg-dark-bg/30 p-8 border-l border-gray-100 dark:border-primary/5 relative shrink-0">

              {/* Guide Image Container */}
              <div className="flex flex items-center justify-center relative bg-white dark:bg-dark-surface rounded-[1rem] shadow-sm overflow-hidden group">
                <div className="absolute top-1 left-2 z-10">
                  <Badge variant="outline" size="sm" className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border-primary/20">
                    Guía Visual
                    <Tooltip content={'Utiliza esta guía para identificar los puntos de medición correctos en tu prenda. Mide sin apretar demasiado la cinta.'} />
                  </Badge>
                </div>

                <img
                  src={activeTab === 'shirt' ? shirtGuide : activeTab === 'pants' ? pantsGuide : activeTab === 'skirt' ? skirtGuide : activeTab === 'jumper' ? jumperGuide : shoeGender === 'Niño' ? shoeGuide : shoeGuideGirl}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  alt="Guía de medición"
                />
              </div>
            </div>

            {/* Right Column: Measurements */}
            <div className="flex-1 p-5 space-y-4">

              {/* Garment Details & Special Instructions */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Specialized Selection based on Tab */}
                  {activeTab === 'shirt' && (
                    <div className="col-span-1 md:col-span-2 space-y-3">
                      <label className="text-[9px] font-heading font-900 tracking-widest text-text-muted uppercase">Elige una o más prendas</label>
                      <div className="flex flex-wrap gap-2">
                        {['Camisa', 'Suéter', 'Saco', 'Chamarra'].map(type => {
                          return (
                            <Button
                              key={type}
                              onClick={() => setSelectedTopTypes(prev => !prev.includes(type) ? [...prev, type] : prev.length === 1 ? prev : prev.filter(t => t !== type))}
                              size='xs'
                              variant={selectedTopTypes.includes(type) ? 'outline' : 'ghost'}
                              leftIcon={selectedTopTypes.includes(type) && <Check className="w-3 h-3" />}>
                              {type}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'pants' && (
                    <div className="col-span-1 md:col-span-2 space-y-3">
                      <label className="text-[9px] font-heading font-900 tracking-widest text-text-muted uppercase">Tipo de Pantalón</label>
                      <div className="flex flex-wrap gap-2">
                        {['Pantalón', 'Deportivo'].map(type => (
                          <Button
                            key={type}
                            onClick={() => setSelectedPantsTypes(prev => !prev.includes(type) ? [...prev, type] : prev.length === 1 ? prev : prev.filter(t => t !== type))}
                            size='xs'
                            variant={selectedPantsTypes.includes(type) ? 'outline' : 'ghost'}
                            leftIcon={selectedPantsTypes.includes(type) && <Check className="w-3 h-3" />}>
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'shoes' && (
                    <>
                      <div className="space-y-3">
                        <label className="text-[9px] font-heading font-900 tracking-widest text-text-muted uppercase">Género</label>
                        <div className="flex gap-2">
                          {['Niño', 'Niña'].map(g => (
                            <Button
                              key={g}
                              onClick={() => setShoeGender(g as any)}
                              size='sm'
                              variant={shoeGender === g ? 'outline' : 'ghost'}
                              leftIcon={shoeGender === g && <Check className="w-3 h-3" />}
                            >
                              {g}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-heading font-900 tracking-widest text-text-muted uppercase">Tipo de Calzado</label>
                        <div className="flex gap-2">
                          {['Escolar', 'Deportivo'].map(t => (
                            <Button
                              key={t}
                              onClick={() => setShoeType(t as any)}
                              size='sm'
                              variant={shoeType === t ? 'outline' : 'ghost'}
                              leftIcon={shoeType === t && <Check className="w-3 h-3" />}
                            >
                              {t}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* <div className="space-y-3">
                    <label className="text-[9px] font-heading font-900 tracking-widest text-text-muted uppercase">Colegio / Uniforme Especial</label>
                    <input
                      type="text"
                      value={specialUniformType}
                      onChange={(e) => setSpecialUniformType(e.target.value)}
                      placeholder="Ej. Colegio Madrid - Gala"
                      className="w-full bg-gray-50 dark:bg-dark-bg/50 border-none rounded-xl px-4 py-3 text-xs font-heading font-700 outline-none focus:ring-2 ring-primary/30 transition-all dark:text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-heading font-900 tracking-widest text-text-muted uppercase">Observaciones</label>
                    <input
                      type="text"
                      value={garmentNote}
                      onChange={(e) => setGarmentNote(e.target.value)}
                      placeholder="Ej. Manga un poco más larga"
                      className="w-full bg-gray-50 dark:bg-dark-bg/50 border-none rounded-xl px-4 py-3 text-xs font-heading font-700 outline-none focus:ring-2 ring-primary/30 transition-all dark:text-white"
                    />
                  </div> */}
                </div>
              </div>

              {/* Measurement Controls */}
              <div className="space-y-6">
                {/* <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                  <h3 className="text-xs font-heading font-900 tracking-widest text-text-muted dark:text-dark-muted flex items-center gap-2 uppercase">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Panel de Medición (cm)
                  </h3>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                  {activeTab === 'shirt' && (
                    <>
                      <MeasurementField label="Cuello (al rededor)" prefix="A" value={neck} min={20} max={50} onChange={setNeck} tooltipContent="Mide alrededor de la base del cuello, dejando un dedo de holgura." />
                      <MeasurementField label="Pecho (contorno)" prefix="B" value={chest} min={50} max={140} onChange={setChest} tooltipContent="Mide alrededor de la parte más ancha del pecho." />
                      <MeasurementField label="Cintura (contorno)" prefix="C" value={waist} min={40} max={130} onChange={setWaist} tooltipContent="Mide alrededor de la cintura." />
                      <MeasurementField label="Ancho Hombros" prefix="D" value={shoulders} min={20} max={60} onChange={setShoulders} tooltipContent="Mide de costura a costura de los hombros por la espalda." />
                      <MeasurementField label="Largo Hombro" prefix="E" value={shoulder} min={5} max={25} onChange={setShoulder} tooltipContent="Mide desde la base del cuello hasta el inicio del brazo." />
                      <MeasurementField label="Largo Total" prefix="F" value={totalLength} min={30} max={100} onChange={setTotalLength} tooltipContent="Mide desde el hombro hasta el largo deseado." />
                      <MeasurementField label="Hombro a Manga" prefix="G" value={sleeveLength} min={10} max={80} onChange={setSleeveLength} tooltipContent="Con el brazo doblado, mide desde donde inicia el hombro hasta la muñeca." />
                      <MeasurementField label="Ancho Brazo (al rededor)" prefix="H" value={armWidth} min={15} max={50} onChange={setArmWidth} tooltipContent="Mide el contorno del brazo (bíceps)." />
                      <MeasurementField label="Muñeca (al rededor)" prefix="I" value={cuffWidth} min={10} max={20} onChange={setCuffWidth} tooltipContent="Mide el contorno de la muñeca." />
                    </>
                  )}

                  {activeTab === 'pants' && (
                    <>
                      <MeasurementField label="Cintura (contorno)" prefix="A" value={pWaist} min={40} max={130} onChange={setPWaist} tooltipContent="Mide alrededor de la cintura." />
                      <MeasurementField label="Cadera (contorno)" prefix="B" value={pHip} min={50} max={150} onChange={setPHip} tooltipContent="Mide alrededor de la parte más ancha de la cadera." />
                      <MeasurementField label="Largo Tiro" prefix="C" value={pRise} min={15} max={45} onChange={setPRise} tooltipContent="Mide desde la cintura hasta la entrepierna." />
                      <MeasurementField label="Largo Total" prefix="D" value={pLength} min={30} max={120} onChange={setPLength} tooltipContent="Mide desde la cintura hasta el tobillo." />
                      <MeasurementField label="Tiro a Tobillo" prefix="E" value={pRiseToCuff} min={20} max={100} onChange={setPRiseToCuff} tooltipContent="Mide desde la entrepierna hasta el tobillo." />
                      <MeasurementField label="Ancho Campana" prefix="F" value={pCuff} min={10} max={40} onChange={setPCuff} tooltipContent="Mide el ancho deseado de la parte baja del pantalón." />
                    </>
                  )}

                  {activeTab === 'skirt' && (
                    <>
                      <MeasurementField label="Cintura (contorno)" prefix="A" value={fWaist} min={40} max={120} onChange={setFWaist} tooltipContent="Mide alrededor de la cintura." />
                      <MeasurementField label="Cadera (contorno)" prefix="B" value={fHip} min={50} max={140} onChange={setFHip} tooltipContent="Mide alrededor de la parte más ancha de la cadera." />
                      <MeasurementField label="Bajada Cadera" prefix="C" value={hHip} min={10} max={30} onChange={setWHip} tooltipContent="Mide la distancia de la cintura a la parte más ancha de la cadera." />
                      <MeasurementField label="Largo Total" prefix="D" value={fLength} min={20} max={80} onChange={setFLength} tooltipContent="Mide desde la cintura hasta el largo deseado." />
                    </>
                  )}

                  {activeTab === 'jumper' && (
                    <>
                      <MeasurementField label="Largo Total" prefix="A" value={jTotalLength} min={40} max={120} onChange={setJTotalLength} tooltipContent="Mide desde el hombro a largo total deseado." />
                      <MeasurementField label="Ancho Pecho" prefix="B" value={jChest} min={40} max={120} onChange={setJChest} tooltipContent="Mide alrededor de la parte más ancha del pecho." />
                      <MeasurementField label="Cintura" prefix="C" value={jWaist} min={40} max={120} onChange={setJWaist} tooltipContent="Mide alrededor de la cintura." />
                      <MeasurementField label="Cuello" prefix="D" value={jNeck} min={20} max={60} onChange={setJNeck} tooltipContent="Mide alrededor de la base del cuello, dejando un dedo de holgura." />
                      <MeasurementField label="Hombro" prefix="E" value={jShoulder} min={5} max={20} onChange={setJShoulder} tooltipContent="Mide desde la base del cuello hasta el inicio del brazo." />
                      <MeasurementField label="Largo Falda" prefix="F" value={jSkirtLength} min={20} max={70} onChange={setJSkirtLength} tooltipContent="Mide desde la cintura hasta el largo deseado." />
                    </>
                  )}

                  {activeTab === 'shoes' && (
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                      <div className="w-full max-w-sm">
                        <MeasurementField
                          label="Largo del Pie (Centímetros)"
                          prefix="A"
                          value={footLength}
                          min={10}
                          max={35}
                          step={0.5}
                          onChange={setFootLength}
                          tooltipContent="Mide desde el talón hasta la punta del dedo más largo."
                        />
                      </div>
                      <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20 flex gap-4 max-w-sm">
                        <Info className="w-5 h-5 text-secondary/60 dark:text-primary/60 shrink-0" />
                        <p className="text-[10px] text-text-muted dark:text-dark-muted leading-relaxed font-heading font-700">
                          Recomendamos dejar <span className="text-secondary dark:text-primary">0.5cm - 1cm</span> de holgura adicional para mayor comodidad y crecimiento.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
              <div className="bg-gray-50/80 dark:bg-dark-bg/50 lg:w-[75%] rounded-2xl p-4 border border-gray-100 dark:border-primary/5 flex items-center justify-between self-center gap-4">
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
                  <Button
                    onClick={() => setIsMultiMode(true)}
                    variant='ghost'
                    className="w-full bg-gray-50 hover:bg-gray-100 dark:bg-dark-bg/50 dark:hover:bg-dark-bg/80 text-secondary dark:text-primary rounded-xl font-heading font-800 text-sm transition-colors flex items-center justify-center border border-primary/20"
                  >
                    <Plus className="w-5 h-5" /> Registrar múltiples estudiantes
                  </Button>
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
                          placeholder="Nombre completo del estudiante (Ej. Eric Torres)*"
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
                            onClick={() => handleAddStudent(advancedNote, currentGarmentType)}
                            className={`shrink-0 ${editingStudentId ? 'bg-primary text-text-main' : 'bg-primary/10 hover:bg-primary/20 text-secondary dark:text-primary'} px-4 py-3 rounded-xl transition-colors flex items-center justify-center border border-primary/20 hover:border-primary/50 whitespace-nowrap font-heading font-800 text-sm`}
                          >
                            {editingStudentId ? 'Actualizar' : <><Plus className="w-5 h-5 lg:mr-1" /> <span className="hidden lg:inline">Añadir</span></>}
                          </button>
                          {editingStudentId && (
                            <button
                              onClick={() => {
                                setEditingStudentId(null);
                                setCurrentStudentName('');
                                setGarmentNote('');
                                setSpecialUniformType('');
                              }}
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
                                onClick={(e) => { e.stopPropagation(); handleRemoveStudent(student.id); }}
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
                <div className="space-y-2.5 pt-1">
                  <Button
                    onClick={handleWhatsAppSend}
                    data-testid="whatsapp-button"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-secondary dark:bg-primary text-white dark:text-text-main font-heading font-900 text-base rounded-xl shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
                  >
                    <WhatsApp className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    {students.length > 0 ? `Pedir prenda${students.length > 1 ? 's' : ''}` : "Pedir esta talla"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step Modal Overlay */}
        {showNextStepModal && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-dark-bg/60 backdrop-blur-md">
            <div className="bg-white dark:bg-dark-surface rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-primary/20 text-center animate-scale-in">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-950 text-text-main dark:text-dark-text mb-2">¡Listo! {lastAddedStudentName} agregado.</h3>
              <p className="text-xs text-text-muted dark:text-dark-muted mb-8 font-heading font-700">Has registrado con éxito la talla para su <span className="text-primary">{activeTab}</span>. ¿Qué deseas hacer ahora?</p>

              <div className="space-y-3">
                <Button
                  size='md'
                  variant='primary'
                  onClick={() => setShowNextStepModal(false)}
                  className="w-full py-4 tracking-widest hover:scale-[1.02] transition-transform active:scale-95"
                >
                  Registrar otra prenda
                </Button>
                <Button
                  size='md'
                  variant='outline'
                  onClick={() => {
                    setShowNextStepModal(false);
                    setCurrentStudentName('');
                    setSpecialUniformType('');
                    setGarmentNote('');
                  }}
                  className="w-full tracking-widest hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  Registrar otro estudiante
                </Button>
                <Button
                  size='md'
                  variant='ghost'
                  onClick={() => {
                    setShowNextStepModal(false);
                    handleWhatsAppSend();
                  }}
                  className="w-full flex items-center justify-center gap-2 hover:underline mt-4 tracking-tighter"
                >
                  <WhatsApp className="w-4 h-4" /> Enviar lista completa a WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};

export default UniformSizeHelper;
