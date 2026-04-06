import React from 'react';
import { Check, Plus, StickyNote } from 'lucide-react';
// import type { SupplyItem } from '@types';
import QuantityControl from './QuantityControl';
import Button from '@components/atoms/Button';

interface ItemCardProps {
  item: any;
  qty: number;
  onUpdateQuantity: (delta: number) => void;
  onUpdateNote: (note: string) => void;
  isNoteOpen: boolean;
  onToggleNote: () => void;
  noteValue: string;
  categoryName?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  qty,
  onUpdateQuantity,
  onUpdateNote,
  isNoteOpen,
  onToggleNote,
  noteValue,
  categoryName,
}) => {
  const isSelected = qty > 0;

  return (
    <div
      className={`relative rounded-2xl border-2 transition-all duration-200 ${isSelected
        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-yellow'
        : 'border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/40 hover:bg-primary/5'
        }`}
    >
      {/* Selected badge */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
          <Check className="w-3 h-3 text-gray-900" />
        </div>
      )}

      {/* Main card content — click to add/increment */}
      <button
        onClick={() => onUpdateQuantity(1)}
        className="w-full text-left p-3 pb-2"
        aria-label={`Agregar ${item.name}`}
      >
        <p className={`font-semibold text-xs leading-tight pr-5 ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
          {item.name}
        </p>
        <p className="text-[8px] text-gray-400 mt-1 tracking-wide">
          {categoryName}
        </p>
      </button>

      {/* Controls row */}
      <div className="px-3 pb-3">
        {isSelected ? (
          <div className="flex items-center gap-2">
            <QuantityControl
              qty={qty}
              onIncrement={() => onUpdateQuantity(1)}
              onDecrement={() => onUpdateQuantity(-1)}
              className="flex-1 bg-transparent dark:bg-transparent"
            />
            <button
              onClick={(e) => { e.stopPropagation(); onToggleNote(); }}
              className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all active:scale-90 flex-shrink-0 ${noteValue ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 dark:bg-white/20 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`}
              aria-label="Agregar nota"
            >
              <StickyNote className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size='sm'
            onClick={() => onUpdateQuantity(1)}
            className="w-full h-7 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary text-gray-700 dark:text-gray-200 hover:text-gray-900 py-1 shadow-none"
            leftIcon={<Plus className="w-3 h-3" />}
          >
            Agregar
          </Button>
        )}

        {/* Note input (inline, toggleable) */}
        {isSelected && isNoteOpen && (
          <input
            type="text"
            autoFocus
            placeholder="Incluir nota (marca, color…)"
            value={noteValue}
            onChange={(e) => onUpdateNote(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="mt-2 w-full text-[10px] bg-white dark:bg-white/10 border border-primary/30 rounded-lg px-2.5 py-1.5 outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-300 focus:border-primary transition-colors"
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
