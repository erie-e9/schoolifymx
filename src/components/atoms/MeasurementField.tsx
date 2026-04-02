import React from 'react';
import Tooltip from './Tooltip';

interface MeasurementFieldProps {
  label: string;
  prefix?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  tooltipContent?: string;
}

const MeasurementField: React.FC<MeasurementFieldProps> = ({
  label,
  prefix,
  value,
  min,
  max,
  step = 1,
  onChange,
  tooltipContent,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[9px] font-heading font-800 tracking-widest">
        <label className="text-text-muted dark:text-dark-muted font-900 flex items-center">
          {prefix && <span className="mr-1">{prefix}.</span>}
          {label}
          {tooltipContent && <Tooltip content={tooltipContent} />}
        </label>
        <div className="flex items-center">
          <input
            type="number"
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-12 bg-transparent text-right outline-none font-heading font-900 text-sm text-text-main dark:text-dark-text border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-primary m-0 p-0 appearance-none"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-gray-100 dark:bg-dark-bg rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
};

export default MeasurementField;
