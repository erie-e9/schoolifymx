import React, { useState } from 'react';
import { Calculator, Backpack } from 'lucide-react';
import SuppliesEstimator from '@components/organisms/SuppliesEstimator';
import ListScanner from '@components/organisms/ListScanner';
import BackpackSim from '@components/organisms/BackpackSim';

const SUPPLIES_ROWS = [
  { label: 'Tiempo invertido', bad: '4–6 horas', good: '0 horas' },
  { label: 'Costo promedio + extras', bad: '~ $1,200', good: '~ $1,080' },
  { label: 'Nivel de estrés', bad: '😤 Alto', good: '😌 Cero' },
  { label: 'Entrega', bad: 'Tú lo transportas', good: 'Nosotros te lo llevamos' },
  { label: 'Sobrantes', bad: 'Con restos innecesarios', good: '✓ Sin sobrantes' },
  { label: 'Garantía', bad: 'Dudosa procedencia', good: 'Original y con garantía' },
];

interface SuppliesComparatorProps {
  active?: boolean;
}

const SuppliesComparator: React.FC<SuppliesComparatorProps> = ({ active }) => {
  const [hovered, setHovered] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [scannedItems, setScannedItems] = useState<any[]>([]);

  return (
    <div
      className={`card p-6 md:p-8 border transition-all duration-400 border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface ${active ? 'shadow-yellow glow-yellow border-primary/50 dark:border-primary/30 -translate-y-2 ring-2 ring-primary ring-offset-4 dark:ring-offset-dark-bg' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${hovered || active ? 'bg-primary shadow-yellow scale-110' : 'bg-surface dark:bg-dark-bg'}`}>
            ✏️
          </div>
          <div className="flex flex-col gap-0.5 mt-0.5">
            <h3 className="font-heading font-800 text-xl md:text-2xl text-text-main dark:text-dark-text leading-tight">Útiles Escolares</h3>
            <span className="text-[10px] md:text-xs font-heading font-600 text-accent dark:text-primary tracking-wider">
              La solución definitiva al regreso a clases.
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <button
            onClick={() => setIsBackpackOpen(true)}
            className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
          >
            <Backpack className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
          </button>
          <button
            onClick={() => setIsEstimatorOpen(true)}
            className="p-2 bg-primary/20 border border-primary rounded-xl hover:bg-primary transition-all active:scale-95"
          >
            <Calculator className="w-5 h-5 text-gray-900 dark:text-white/90 animate-shake-icon" />
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
            <div className="p-3 text-xs font-body font-500 text-text-muted dark:text-dark-muted">{row.label}</div>
            <div className="p-3 text-center text-xs font-500 text-red-400 border-l border-gray-100 dark:border-gray-800">{row.bad}</div>
            <div className="p-3 text-center text-xs font-bold text-secondary dark:text-primary border-l border-primary/30 bg-primary/5">{row.good}</div>
          </div>
        ))}
      </div>

      <SuppliesEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onOpenScanner={() => {
          setIsEstimatorOpen(false);
          setIsScannerOpen(true);
        }}
      />
      <ListScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanComplete={(items) => {
          setScannedItems(items);
          setIsBackpackOpen(true);
        }}
      />
      <BackpackSim
        isOpen={isBackpackOpen}
        onClose={() => setIsBackpackOpen(false)}
        scannedItems={scannedItems}
      />
    </div>
  );
};

export default React.memo(SuppliesComparator);
