import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="group relative whitespace-nowrap z-[100] ml-1.5 inline-flex cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <Info
        className="w-3.5 h-3.5 text-secondary/60 hover:text-secondary dark:text-primary/60 dark:hover:text-primary transition-colors"
        role="button"
        tabIndex={0}
        aria-label="Más información"
      />
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[150px] whitespace-normal bg-gray-900 text-white text-[10px] font-body p-2 rounded transition-all shadow-xl pointer-events-none z-[110] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        role="tooltip"
      >
        {content}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-spacing-0 border-[4px] border-transparent border-b-gray-900" />
      </div>
    </div>
  );
};

export default Tooltip;
