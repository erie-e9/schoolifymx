import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  icon: React.FC<any> | LucideIcon;
  number: string;
  title: string;
  description: string;
  color: string;
  className?: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  icon: Icon,
  number,
  title,
  description,
  color,
  className = '',
}) => {
  return (
    <div className={`step-card card p-6 md:p-7 flex flex-col items-start gap-4 hover:-translate-y-2 border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface cursor-default group shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] ${className}`}>
      {/* Number + icon */}
      <div className="flex items-center justify-between w-full mb-2">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color === 'bg-primary' ? 'text-text-main font-bold' : 'text-white'}`} />
        </div>
        <span className="font-heading font-800 text-4xl md:text-5xl text-gray-200 dark:text-gray-300/20 leading-none group-hover:text-primary/60 transition-colors">
          {number}
        </span>
      </div>

      <div>
        <h3 className="font-heading font-700 text-lg text-text-main dark:text-dark-text mb-2 tracking-tight">{title}</h3>
        <p className="text-text-muted dark:text-dark-muted text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
