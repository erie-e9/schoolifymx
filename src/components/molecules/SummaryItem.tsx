import React from 'react';
import Input from '../atoms/Input';
import QuantityControl from './QuantityControl';

interface SummaryItemProps {
  id: string;
  name: string;
  qty: number;
  note: string;
  categoryName?: string;
  onUpdateQuantity: (delta: number) => void;
  onUpdateNote: (note: string) => void;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  name,
  qty,
  note,
  categoryName,
  onUpdateQuantity,
  onUpdateNote,
}) => {
  return (
    <div className="bg-white dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-xs text-gray-900 dark:text-white leading-tight truncate">{name}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{categoryName}</p>
        </div>
        <QuantityControl 
          qty={qty} 
          onIncrement={() => onUpdateQuantity(1)} 
          onDecrement={() => onUpdateQuantity(-1)}
          size="sm"
          className="flex-shrink-0"
        />
      </div>
      <Input
        placeholder="Incluir nota (marca, color…)"
        value={note}
        onChange={(e) => onUpdateNote(e.target.value)}
        className="text-[10px] py-1 border-transparent dark:border-transparent bg-gray-50 dark:bg-white/5"
        containerClassName="w-full"
      />
    </div>
  );
};

export default SummaryItem;
