import React, { useEffect, useState } from 'react';
import { formatNumbers } from '@utils/numbers';
import type { ServiceStat } from '@types';

interface StatCardProps {
  stat: ServiceStat;
  active: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ stat, active, className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    setCount(0);
    const duration = 1500;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, stat.value);
      setCount(Math.floor(current));
      if (current >= stat.value) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [active, stat.value]);

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-surface dark:bg-dark-surface border border-gray-100 dark:border-gray-800/50 hover:border-primary/40 dark:hover:border-primary/20 transition-all duration-300 shadow-sm md:hover:-translate-y-1 ${className}`}>
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 dark:bg-primary/5 rounded-full blur-xl" />
      <div className="text-center group p-6 md:p-8 transition-all duration-300 h-full flex flex-col justify-center items-center">
        <div className="text-3xl md:text-4xl mb-3 group-hover:rotate-12 transition-transform duration-300">
          {stat.emoji}
        </div>
        <div className="font-heading font-800 text-4xl md:text-6xl text-text-main dark:text-dark-text mb-2 flex items-baseline gap-1">
          <span className="text-secondary dark:text-primary text-2xl md:text-4xl">{stat.prefix}</span>
          <span>{formatNumbers(count)}</span>
          <span className="text-accent dark:text-primary text-xl md:text-3xl">{stat.suffix}</span>
        </div>
        <p className="font-heading font-700 text-base md:text-lg text-text-main dark:text-dark-text mb-1 leading-tight">{stat.label}</p>
        <p className="text-text-muted dark:text-dark-muted text-xs md:text-sm leading-snug max-w-[180px] mx-auto opacity-80">{stat.description}</p>
      </div>
    </div>
  );
});

export default StatCard;
