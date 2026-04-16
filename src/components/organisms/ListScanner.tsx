import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Upload, CheckCircle, Zap, X, Loader2, FileDigit, Backpack, AlertCircle, RefreshCw } from 'lucide-react';
import WhatsApp from '@assets/whatsapp.svg?react';
import { WhatsAppService } from '@services/WhatsAppService';
import { useScanner } from '@hooks/useScanner';
import Button from '@components/atoms/Button';
import type { ScannedItem } from '@types';

interface ListScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete?: (items: ScannedItem[]) => void;
}

const ListScanner: React.FC<ListScannerProps> = ({ isOpen, onClose, onScanComplete }) => {
  const {
    status,
    progress,
    scanningText,
    requestID,
    items,
    setItems,
    selectedFile,
    fileType,
    fileName,
    tier,
    setTier,
    processFile,
    error
  } = useScanner(isOpen);

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .fromTo(modalRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | undefined;
    if (status === 'scanning') {
      ctx = gsap.context(() => {
        gsap.fromTo(
          laserRef.current,
          { top: '0%' },
          { top: '95%', duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
        );
      });
    }
    return () => ctx?.revert();
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 20, opacity: 0, scale: 0.98, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleWhatsAppSend = () => {
    const selected = items.filter(i => i.selected);
    WhatsAppService.sendScannedListQuote(selected, tier, requestID); // pendiente
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-6 lg:p-12">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-xl opacity-0"
        onClick={handleClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-primary/20 dark:border-primary/10 overflow-hidden opacity-0"
      >
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="p-8 md:p-12">
          {status === 'idle' && (
            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-secondary dark:text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight">Escáner de Lista Smart</h2>
                <p className="text-text-muted dark:text-dark-muted font-body">Sube tu lista y nuestra IA la procesará para darte la mejor cotización.</p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) processFile(file);
                }}
                className={`cursor-pointer border-2 border-dashed rounded-[2rem] p-10 transition-all group ${isDraggingOver
                  ? 'border-primary bg-primary/10 scale-[1.02] shadow-yellow'
                  : 'border-primary/30 hover:border-primary bg-gray-50/50 dark:bg-dark-bg/30 hover:bg-primary/5'
                  }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 dark:bg-white/10 rounded-full shadow-sm flex items-center justify-center transition-all ${isDraggingOver ? 'bg-primary scale-125' : 'bg-primary dark:bg-dark-surface group-hover:scale-110'}`}>
                    <Upload className="w-6 h-6 text-secondary dark:text-primary" />
                  </div>
                  {isDraggingOver ? (
                    <span className="font-heading  font-700 text-primary dark:text-primary">¡Suelta aquí tu archivo!</span>
                  ) : (
                    <>
                      <span className="font-heading font-700 text-text-main dark:text-dark-text">Arrastra tu lista o haz clic para subir</span>
                      <span className="text-xs text-text-muted">Selecciona una imagen o documento PDF • Arrastra y suelta aquí</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {status === 'uploading' && (
            <div className="text-center py-20 space-y-6 animate-in fade-in duration-300">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <p className="font-heading font-800 text-xl text-text-main dark:text-dark-text tracking-tight animate-pulse">Subiendo lista...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-16 space-y-6 animate-in fade-in duration-300">
              <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight">Error al procesar</h2>
                <p className="text-text-muted dark:text-dark-muted font-body text-sm max-w-sm mx-auto">
                  {error?.message || 'No pudimos procesar tu lista. Por favor, intenta de nuevo.'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    fileInputRef.current.click();
                  }
                }}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Intentar de nuevo
              </Button>
            </div>
          )}

          {status === 'scanning' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 dark:bg-black/20 border border-primary/20 shadow-inner flex items-center justify-center">
                {fileType === 'pdf' ? (
                  <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
                    <div className="w-24 h-32 bg-red-500/10 rounded-xl border-2 border-red-500/30 flex items-center justify-center relative shadow-lg">
                      <FileDigit className="w-12 h-12 text-red-500" />
                      <div className="absolute bottom-2 right-2 bg-red-500 text-white text-[8px] font-bold px-1 rounded uppercase">PDF</div>
                    </div>
                    <span className="text-xs font-heading font-700 text-text-main dark:text-dark-text max-w-[200px] truncate">{fileName}</span>
                  </div>
                ) : (
                  selectedFile && (
                    <img src={selectedFile} alt="Lista" className="w-full h-full object-contain opacity-50 grayscale" />
                  )
                )}
                <div
                  ref={laserRef}
                  className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(255,215,0,0.8)] z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-heading font-800 text-text-main dark:text-dark-text text-lg">{scanningText}</span>
                  <span className="font-heading font-900 text-secondary dark:text-primary">{progress}%</span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-dark-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-100 ease-linear shadow-yellow"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {status === 'completed' && (
            <div className="max-h-[80vh] text-center space-y-6 animate-in zoom-in fade-in duration-500">
              <div className="space-y-3">
                <h2 className="text-3xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight">¡Análisis Exitoso!</h2>
                <p className="text-text-muted dark:text-dark-muted font-body text-sm">
                  Lista escaneada. Se han identificado <span className="text-secondary dark:text-primary font-bold">{items.length} artículos</span>.
                </p>
                <div className="bg-gray-50 dark:bg-dark-bg/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-left">
                  <p className="text-[9px] uppercase font-bold text-text-muted tracking-widest mb-3">Selecciona los artículos deseados:</p>
                  <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-dark-surface transition-all group">
                          <div className="flex items-center gap-3">
                            <label className="relative flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.selected}
                                onChange={(e) => {
                                  const val = e.target.checked;
                                  setItems(prev => prev.map(i => i.id === item.id ? { ...i, selected: val } : i));
                                }}
                                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 dark:border-gray-600 checked:bg-success checked:border-success transition-all"
                              />
                              <CheckCircle className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none p-0.5" />
                            </label>
                            <span className={`text-[11px] font-body font-600 transition-colors lowercase ${item.selected ? 'text-text-main dark:text-dark-text' : 'text-text-muted line-through opacity-90'}`}>
                              {item.name}
                            </span>
                          </div>
                          {item.selected && (
                            <div className="pl-7 animate-in fade-in slide-in-from-top-1 duration-200">
                              <input
                                type="text"
                                placeholder="Incluir nota (marca, color...)"
                                value={item.note}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setItems(prev => prev.map(i => i.id === item.id ? { ...i, note: val } : i));
                                }}
                                className="w-full bg-gray-100 dark:bg-dark-bg/50 border border-gray-200 dark:border-gray-800 rounded-lg px-2 py-1 text-[10px] font-body focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                              />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-5 pt-4 space-y-3 shrink-0">
                <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded-2xl relative shadow-inner h-11">
                  <div
                    className="absolute inset-y-1 bg-primary dark:bg-primary dark:bg-dark-surface rounded-xl shadow-md transition-all duration-300 ease-out z-0"
                    style={{
                      width: 'calc(50% - 4px)',
                      left: tier === 'Esencial' ? '0%' : '50%'
                    }}
                  />
                  {['Esencial', 'Selecto'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTier(tab as any)}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-2 tracking-widest transition-colors ${tier === tab ? 'text-text-main dark:text-text-main font-900' : 'text-text-main dark:text-white opacity-90 hover:opacity-100'}`}
                    >
                      <span className="text-[12px] font-heading font-900">{tab === 'Esencial' ? '📦 Paquete Esencial' : '❤️ Paquete Selecto'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 px-4 max-w-7xl mx-auto">
                <Button
                  variant="primary"
                  size='md'
                  className="flex-[1.2] bg-secondary dark:bg-primary text-white dark:text-text-main"
                  onClick={handleWhatsAppSend}
                  leftIcon={<WhatsApp className="w-5 h-5" />}
                >
                  <span className="whitespace-nowrap">Ver cotización</span>
                </Button>

                {onScanComplete && (
                  <Button
                    variant="tertiary"
                    size='md'
                    className="flex-[1.2] border-primary/30 dark:border-secondary/30 dark:text-primary"
                    onClick={() => {
                      const selected = items.filter(i => i.selected);
                      onScanComplete(selected);
                      window.dispatchEvent(new CustomEvent('schoolify-mission-progress', {
                        detail: { missionId: 'scan_list' }
                      }));
                      handleClose();
                    }}
                    leftIcon={<Backpack className="w-4 h-4" />}
                  >
                    <span className="leading-tight">Enviar al generador de listas</span>
                  </Button>
                )}
              </div>
            </div>
          )}
          <p className="text-[10px] text-center mt-5 text-text-muted font-body leading-relaxed max-w-md mx-auto">
            El costo final puede variar entre la fecha de cotización y la de pedido realizado, el precio del mercado entre otros factores.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ListScanner;
