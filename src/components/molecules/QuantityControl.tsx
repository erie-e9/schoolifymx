import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  qty,
  onIncrement,
  onDecrement,
  size = 'md',
  className = '',
}) => {
  const isSm = size === 'sm';
  const btnSize = isSm ? 'w-6 h-6' : 'h-7 w-7';
  const iconSize = isSm ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <div className={`flex items-center gap-1 bg-gray-100 dark:bg-white/10 rounded-lg p-0.5 ${className}`}>
      <button
        onClick={(e) => { e.stopPropagation(); onDecrement(); }}
        className={`${btnSize} rounded-md flex items-center justify-center bg-white dark:bg-white/20 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-all active:scale-90 shadow-sm`}
        aria-label="Disminuir cantidad"
      >
        <Minus className={iconSize} />
      </button>
      <span className={`font-bold ${isSm ? 'text-xs min-w-[18px]' : 'text-sm flex-1'} text-gray-900 dark:text-white text-center`}>
        {qty}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onIncrement(); }}
        className={`${btnSize} rounded-md flex items-center justify-center bg-primary text-gray-900 hover:scale-105 active:scale-90 transition-all shadow-sm`}
        aria-label="Aumentar cantidad"
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
};

export default QuantityControl;
