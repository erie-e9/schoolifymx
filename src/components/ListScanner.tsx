import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Upload, CheckCircle, Zap, ChevronRight, X, Loader2, FileDigit } from 'lucide-react';
import WhatsApp from '../assets/whatsapp.svg?react';
import { getWhatsappLink } from '../types';

interface ListScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListScanner: React.FC<ListScannerProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'scanning' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [scanningText, setScanningText] = useState('Iniciando...');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanningSteps = [
    "Detectando caligrafía...",
    "Identificando cuadernos y libretas...",
    "Buscando marcas específicas...",
    "Calculando mejores ofertas...",
    "Finalizando análisis..."
  ];

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
      setStatus('idle');
      setProgress(0);
      setSelectedFile(null);
      setFileType(null);
      setFileName('');
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 20, opacity: 0, scale: 0.98, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  const startSimulation = () => {
    setStatus('scanning');

    // Laser Animation
    gsap.fromTo(laserRef.current,
      { top: '0%' },
      { top: '100%', duration: 1.5, repeat: 4, yoyo: true, ease: "sine.inOut" }
    );

    // Progress and Text Animation
    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('completed');
          return 100;
        }

        // Update text every 20%
        if (Math.floor(prev / 20) > step) {
          step++;
          setScanningText(scanningSteps[step] || scanningSteps[scanningSteps.length - 1]);
        }

        return prev + 1;
      });
    }, 60);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setFileType('pdf');
        setSelectedFile(null);
        setStatus('uploading');
        setTimeout(() => startSimulation(), 1000);
      } else {
        setFileType('image');
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedFile(event.target?.result as string);
          setStatus('uploading');
          setTimeout(() => startSimulation(), 1500);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  if (!isOpen) return null;

  const waMessage = `¡Hola Schoolify! 🚀 Acabo de escanear mi lista de útiles con su herramienta. \n\n📸 Ya tengo la foto lista para enviárselas. ¿Me pueden ayudar con la cotización exacta?`;
  const waLink = getWhatsappLink(waMessage);

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
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg transition-all z-[30] active:scale-90"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>

        <div className="p-8 md:p-12">
          {status === 'idle' && (
            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-secondary dark:text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight">Escáner de Lista Smart</h2>
                <p className="text-text-muted dark:text-dark-muted font-body">Sube una foto de tu lista y nuestra IA la procesará para darte la mejor cotización.</p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary rounded-[2rem] p-10 bg-gray-50/50 dark:bg-dark-bg/30 transition-all hover:bg-primary/5 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={onFileChange}
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-dark-surface rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-heading font-700 text-text-main dark:text-dark-text">Haz clic para subir foto o PDF</span>
                  <span className="text-xs text-text-muted">Imágenes o Documentos PDF</span>
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
                {/* Laser Effect */}
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
            <div className="text-center space-y-10 animate-in zoom-in fade-in duration-500">
              <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-heading font-900 text-text-main dark:text-dark-text tracking-tight">¡Análisis Exitoso!</h2>
                <p className="text-text-muted dark:text-dark-muted font-body text-lg">
                  Nuestra herramienta ha identificado <span className="text-secondary dark:text-primary font-bold">12 artículos</span> en tu lista.
                </p>
                <div className="bg-gray-50 dark:bg-dark-bg/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-left space-y-2">
                  <p className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Resumen detectado:</p>
                  <ul className="grid grid-cols-2 gap-2 text-xs font-body font-600 text-text-main dark:text-dark-text">
                    <li>• Cuadernos (6)</li>
                    <li>• Lápices/Plumas</li>
                    <li>• Colores Premium</li>
                    <li>• Material de Arte</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-4 bg-secondary dark:bg-primary text-white dark:text-text-main font-heading font-900 text-lg py-5 rounded-2xl shadow-xl hover:-translate-y-1.5 active:scale-95 transition-all duration-300 group"
                >
                  <WhatsApp className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Ver mi presupuesto en WhatsApp
                  <ChevronRight className="w-5 h-5" />
                </a>
                <p className="text-[10px] text-text-muted font-body leading-relaxed max-w-xs mx-auto">
                  Presiona el botón para que nuestros asesores te envíen la cotización final por WhatsApp.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ListScanner;
