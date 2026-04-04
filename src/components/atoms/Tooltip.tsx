import React from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  return (
    <div className="group relative whitespace-nowrap z-[100] ml-1.5 inline-flex cursor-pointer">
      <Info className="w-3.5 h-3.5 text-secondary/60 hover:text-secondary dark:text-primary/60 dark:hover:text-primary transition-colors" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[165px] whitespace-normal bg-gray-900 text-white text-[10px] font-body p-2 rounded opacity-100 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl pointer-events-none z-[110]">
        {content}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-spacing-0 border-[4px] border-transparent border-b-gray-900" />
      </div>
    </div>
  );
};

export default Tooltip;
