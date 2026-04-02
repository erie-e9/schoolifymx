import React from 'react';

interface ProgressProps {
  value: number;
  max: number;
  variant?: 'primary' | 'secondary';
  className?: string;
  showLabels?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max,
  variant = 'secondary',
  className = '',
  showLabels = false,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary dark:bg-primary',
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabels && (
        <div className="flex justify-between text-[8px] font-heading font-700 text-text-muted tracking-widest uppercase">
          <span>Progreso</span>
          <span>{value} / {max}</span>
        </div>
      )}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${variants[variant]} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
