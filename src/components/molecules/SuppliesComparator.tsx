import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calculator, Backpack, X, ExpandIcon, Tags } from 'lucide-react';
import SuppliesEstimator from '@components/organisms/SuppliesEstimator';
import ListScanner from '@components/organisms/ListScanner';
import BackpackSim from '@components/organisms/BackpackSim';
import BrandComparatorModal from '@components/organisms/BrandComparatorModal';
import Schoolify from '@assets/Schoolify.svg?react';

const SUPPLIES_ROWS = [
  { label: 'Tiempo invertido', bad: '4–6 horas', good: '0 horas' },
  { label: 'Costo promedio + extras', bad: '~ $1,200', good: '~ $1,080' },
  { label: 'Nivel de estrés', bad: '😤 Alto', good: '😌 Muy bajo' },
  { label: 'Entrega', bad: 'Tú lo transportas', good: 'En tu escuela' },
  { label: 'Pago', bad: '1 único pago', good: 'Hasta 3 abonos' },
  { label: 'Sobrantes', bad: 'Con restos innecesarios', good: '✓ Sin sobrantes' },
  { label: 'Garantía', bad: 'No incluye', good: 'Con garantía' },
];

interface SuppliesComparatorProps {
  active?: boolean;
}

const SuppliesComparator: React.FC<SuppliesComparatorProps> = ({ active }) => {
  const [hovered, setHovered] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [isSuppliesBenefits, setIsSuppliesBenefitsOpen] = useState(false);
  const [scannedItems, setScannedItems] = useState<any[]>([]);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  useEffect(() => {
    if (!isSuppliesBenefits) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal('supplies_benefits', setIsSuppliesBenefitsOpen);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSuppliesBenefits]);

  // Sync state with URL params & handle popstate (back button)
  useEffect(() => {
    const checkUrlAndSync = () => {
      const params = new URLSearchParams(window.location.search);
      const modal = params.get('modal');

      setIsEstimatorOpen(modal === 'supplies_estimator');
      setIsScannerOpen(modal === 'smart_list_scanner');
      setIsBackpackOpen(modal === 'list_generator');
      setIsSuppliesBenefitsOpen(modal === 'supplies_benefits');
      setIsBrandModalOpen(modal === 'supplies_packs');
    };

    checkUrlAndSync();

    window.addEventListener('popstate', checkUrlAndSync);
    return () => window.removeEventListener('popstate', checkUrlAndSync);
  }, []);

  const openModal = (modalName: 'supplies_estimator' | 'smart_list_scanner' | 'list_generator' | 'supplies_benefits' | 'supplies_packs') => {
    const url = new URL(window.location.href);
    url.searchParams.set('modal', modalName);
    window.history.pushState({ isModal: true, modalName }, '', url.toString());

    if (modalName === 'supplies_estimator') setIsEstimatorOpen(true);
    if (modalName === 'smart_list_scanner') setIsScannerOpen(true);
    if (modalName === 'list_generator') setIsBackpackOpen(true);
    if (modalName === 'supplies_benefits') setIsSuppliesBenefitsOpen(true);
    if (modalName === 'supplies_packs') setIsBrandModalOpen(true);
  };

  const closeModal = (modalName: 'supplies_estimator' | 'smart_list_scanner' | 'list_generator' | 'supplies_benefits' | 'supplies_packs', setter: (val: boolean) => void) => {
    setter(false);

    if (window.history.state?.isModal && window.history.state?.modalName === modalName) {
      window.history.back();
    } else {
      const url = new URL(window.location.href);
      if (url.searchParams.get('modal') === modalName) {
        url.searchParams.delete('modal');
        window.history.replaceState(null, '', url.toString());
      }
    }
  };

  const switchModal = (fromModal: 'supplies_estimator' | 'smart_list_scanner' | 'list_generator' | 'supplies_benefits' | 'supplies_packs', toModal: 'supplies_estimator' | 'smart_list_scanner' | 'list_generator' | 'supplies_benefits' | 'supplies_packs') => {
    if (fromModal === 'supplies_estimator') setIsEstimatorOpen(false);
    if (fromModal === 'smart_list_scanner') setIsScannerOpen(false);
    if (fromModal === 'list_generator') setIsBackpackOpen(false);
    if (fromModal === 'supplies_benefits') setIsSuppliesBenefitsOpen(false);
    if (fromModal === 'supplies_packs') setIsBrandModalOpen(false);

    if (toModal === 'supplies_estimator') setIsEstimatorOpen(true);
    if (toModal === 'smart_list_scanner') setIsScannerOpen(true);
    if (toModal === 'list_generator') setIsBackpackOpen(true);
    if (toModal === 'supplies_benefits') setIsSuppliesBenefitsOpen(true);
    if (toModal === 'supplies_packs') setIsBrandModalOpen(true);

    const url = new URL(window.location.href);
    url.searchParams.set('modal', toModal);

    if (window.history.state?.isModal && window.history.state?.modalName === fromModal) {
      window.history.replaceState({ isModal: true, modalName: toModal }, '', url.toString());
    } else {
      window.history.pushState({ isModal: true, modalName: toModal }, '', url.toString());
    }
  };

  return (
    <div
      className={`card p-6 md:p-8 border transition-all duration-400 border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface ${active ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2 ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 md:w-16 md:h-12 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
            ✏️
          </div>
          <div className="flex flex-col gap-0.5 mt-0.5">
            <h3 className="font-heading font-800 text-xl md:text-2xl text-text-main dark:text-dark-text leading-tight">Útiles Escolares</h3>
            <span className="text-[10px] md:text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">
              Una solución inteligente al regreso a clases para estudiantes y docentes.
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('list_generator');
            }}
            className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
            aria-label="Abrir el creador de listas escolares"
          >
            <Backpack className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('supplies_estimator');
            }}
            className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
            aria-label="Abrir calculadora de ahorro instantáneo"
          >
            <Calculator className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('supplies_packs');
            }}
            className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
            aria-label="Ver marcas por tipo de surtido"
          >
            <Tags className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('supplies_benefits')
            }}
            aria-label="Expandir beneficios de útiles"
            className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
          >
            <ExpandIcon className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
          </button>
        </div>
      </div>

      <p className="text-text-muted dark:text-dark-muted leading-relaxed mb-4">
        Nosotros lo hacemos por ti, comparamos, surtimos, ordenamos y transportamos cada paquete individual <span className="text-secondary dark:text-primary font-600">como si lo hicieras tú</span>.
      </p>

      <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-3 bg-gray-50 dark:bg-dark-bg/50">
          <div className="p-3 text-[12px] font-bold text-gray-400 uppercase tracking-wide"></div>
          <div className="p-3 text-center text-[12px] font-700 text-red-400 uppercase tracking-wide border-l border-gray-100 dark:border-gray-800">Por tu cuenta</div>
          <div className="p-3 text-center text-[12px] font-700 text-secondary dark:text-primary uppercase tracking-wide border-l border-primary/30 bg-primary/10">Con Schoolify</div>
        </div>

        {SUPPLIES_ROWS.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 ${i % 2 === 0 ? 'bg-white dark:bg-dark-surface' : 'bg-gray-50/50 dark:bg-dark-bg/20'}`}
          >
            <div className="p-2.5 text-xs font-body font-500 text-text-muted dark:text-dark-muted">{row.label}</div>
            <div className="p-2.5 text-center text-xs font-500 text-red-400 border-l border-gray-100 dark:border-gray-800">{row.bad}</div>
            <div className="p-2.5 text-center text-xs font-bold text-secondary dark:text-primary border-l border-primary/30 bg-primary/5">{row.good}</div>
          </div>
        ))}
      </div>

      <SuppliesEstimator
        isOpen={isEstimatorOpen}
        onClose={() => closeModal('supplies_estimator', setIsEstimatorOpen)}
        onOpenScanner={() => switchModal('supplies_estimator', 'smart_list_scanner')}
      />
      <ListScanner
        isOpen={isScannerOpen}
        onClose={() => closeModal('smart_list_scanner', setIsScannerOpen)}
        onScanComplete={(items) => {
          setScannedItems(items);
          switchModal('smart_list_scanner', 'list_generator');
        }}
      />
      <BackpackSim
        isOpen={isBackpackOpen}
        onClose={() => closeModal('list_generator', setIsBackpackOpen)}
        scannedItems={scannedItems}
      />
      {/* Expanded Modal */}
      {isSuppliesBenefits && createPortal(
        <div
          className="fixed inset-0 z-[1001] flex items-center justify-center backdrop-blur-md p-4 animate-fade-in cursor-default"
          onClick={() => closeModal('supplies_benefits', setIsSuppliesBenefitsOpen)}
        >
          <div
            className="relative h-full max-w-5xl mx-auto max-h-[100vh] md:max-h-[100vh] flex flex-col bg-white dark:bg-dark-surface rounded-3xl shadow-2xl p-6 md:p-10 overflow-y-auto animate-scale-in border border-gray-100 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => closeModal('supplies_benefits', setIsSuppliesBenefitsOpen)}
              aria-label="Cerrar vista expandida"
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-1 gap-8 md:gap-12 mt-4 items-center">
              {/* Large comparison table */}
              <div>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 md:w-40 md:h-12 rounded-2xl flex items-start justify-center text-3xl transition-all duration-300`}>
                    <Schoolify className="h-9 w-auto md:h-11 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] md:text-[1.15rem] font-heading font-600 text-accent dark:text-primary tracking-wider">
                    Servicio para estudiantes y profesores de educación inicial, preescolar, primaria y secundaría
                    <span className="text-[10px] md:text-[7px] font-heading font-600 text-accent dark:text-primary tracking-wider fixed">
                      {' [1]'}
                    </span>.
                  </span>
                </div>
                <div className="flex mb-4 justify-between">
                  <div>
                    <p className="md:text-[1rem] text-text-muted dark:text-dark-muted leading-relaxed">
                      Uniformes (confección, ajustes y reparación), útiles escolares y más.
                    </p>
                    <p className="md:text-[1rem] text-text-muted dark:text-dark-muted leading-relaxed mb-4">
                      Para los que tienen apoyo, que les rinda más <span className="text-secondary dark:text-primary font-600">y para los que no, que les cueste menos</span>.
                    </p>
                  </div>
                  {/* Brand comparator trigger */}
                  <button
                    onClick={() => { setIsSuppliesBenefitsOpen(false); setIsBrandModalOpen(true); }}
                    className="flex items-center gap-2 text-[0.7rem] font-heading font-700 text-secondary dark:text-primary hover:underline underline-offset-2 transition-all group"
                    aria-label="Ver marcas por tipo de surtido"
                  >
                    <Tags className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    Ver marcas por tipo de surtido
                  </button>
                </div>


                <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="grid grid-cols-3 bg-gray-50 dark:bg-dark-bg/50">
                    <div className="p-3 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wide"></div>
                    <div className="p-3 text-center text-[10px] md:text-[1.15rem] font-700 text-red-400 uppercase tracking-wide border-l border-gray-100 dark:border-gray-800">Por tu cuenta</div>
                    <div className="p-3 text-center text-[10px] md:text-[1.15rem] font-700 text-secondary dark:text-primary uppercase tracking-wide border-l border-primary/30 bg-primary/10">Con Schoolify</div>
                  </div>

                  {SUPPLIES_ROWS.map((row, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-3 border-t border-gray-100 dark:border-gray-800 ${i % 2 === 0 ? 'bg-white dark:bg-dark-surface' : 'bg-gray-50/50 dark:bg-dark-bg/20'}`}
                    >
                      <div className="p-3 text-[12px] md:text-[1.1rem] font-body font-500 text-text-muted dark:text-dark-muted">{row.label}</div>
                      <div className="p-3 text-center text-[12px] md:text-[1.1rem] font-500 text-red-400 border-l border-gray-100 dark:border-gray-800">{row.bad}</div>
                      <div className="p-3 text-center text-[12px] md:text-[1.1rem] font-bold text-secondary dark:text-primary border-l border-primary/30 bg-primary/5">{row.good}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}<BrandComparatorModal
        isOpen={isBrandModalOpen}
        onClose={() => closeModal('supplies_packs', setIsBrandModalOpen)}

      />
    </div>
  );
};

export default React.memo(SuppliesComparator);
