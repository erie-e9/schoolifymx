import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Challenge } from '@hooks/useChallenges';
import Progress from '@components/atoms/Progress';

interface ChallengeItemProps {
  challenge: Challenge;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({ challenge }) => {
  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${challenge.completed ? 'bg-primary/5 border-primary/20 opacity-80' : 'bg-gray-50 dark:bg-dark-bg/50 border-transparent'}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-2 rounded-xl ${challenge.completed ? 'bg-secondary dark:bg-primary text-white dark:text-text-main' : 'bg-white dark:bg-dark-surface'}`}>
          {challenge.icon}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-[11px] font-heading font-800 text-text-main dark:text-white tracking-wide">{challenge.title}</h4>
            {challenge.completed ? (
              <CheckCircle2 className="w-4 h-4 text-secondary dark:text-primary" />
            ) : (
              <Circle className="w-4 h-4 text-gray-200 dark:text-gray-700" />
            )}
          </div>
          <p className="text-[9px] text-text-muted dark:text-dark-muted leading-relaxed font-body">
            {challenge.description}
          </p>
          <Progress 
            value={challenge.current} 
            max={challenge.target} 
            showLabels 
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeItem;
