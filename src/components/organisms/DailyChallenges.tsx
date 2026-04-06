import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Circle, Zap, ChevronRight, X } from 'lucide-react';
import { useChallenges } from '@hooks/useChallenges';
import { WhatsAppService } from '@services/WhatsAppService';
import Button from '@components/atoms/Button';

interface DailyChallengesProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({ isOpen: propIsOpen = false, onClose }) => {
  const { challenges, completedCount, hasNewCompletion, setHasNewCompletion } = useChallenges();
  const [localIsOpen, setLocalIsOpen] = useState(propIsOpen);
  const prevPropIsOpen = React.useRef(propIsOpen);

  useEffect(() => {
    if (prevPropIsOpen.current !== propIsOpen) {
      setLocalIsOpen(propIsOpen);
      if (propIsOpen) {
        setHasNewCompletion(false);
      }
      prevPropIsOpen.current = propIsOpen;
    }
  }, [propIsOpen, setHasNewCompletion]);

  const handleToggle = () => {
    const nextState = !localIsOpen;
    setLocalIsOpen(nextState);
    if (nextState) {
      setHasNewCompletion(false);
    } else if (onClose) {
      onClose();
    }
  };

  const handleClaimReward = () => {
    const completedMissions = challenges.filter(c => c.completed).map(c => ({ title: c.title }));
    if (completedMissions.length > 0) {
      WhatsAppService.sendMissionRedemption(completedMissions);
    } else {
      alert("Completa al menos una misión para canjear recompensas.");
    }
  };

  return (
    <div className="fixed bottom-24 md:right-8 right-5 z-[200]">
      {/* Balloon Notification */}
      {hasNewCompletion && !localIsOpen && (
        <div
          className="absolute -top-12 right-0 bg-secondary dark:bg-primary text-white dark:text-text-main px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce cursor-pointer whitespace-nowrap"
          onClick={() => { setLocalIsOpen(true); setHasNewCompletion(false); }}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-heading font-900 tracking-widest uppercase">¡Misión Cumplida!</span>
        </div>
      )}

      {/* Challenges Card */}
      {localIsOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-dark-surface rounded-[2rem] shadow-3xl border border-gray-200 dark:border-primary/10 p-6 transform origin-bottom-right transition-all duration-300">
          <div className="flex items-center space-evenly mb-6">
            <div className="space-y-1 flex flex-row">
              <div className="px-3 py-1 rounded-full flex items-start gap-1">
                <Zap className="w-3.5 h-3.5 text-secondary dark:text-primary" />
                <span className="text-[10px] font-heading font-900 text-text-main dark:text-white">{completedCount}/{challenges.length}</span>
                <div>
                  <h3 className="text-sm font-heading font-900 text-text-main dark:text-white tracking-widest">Misiones</h3>
                  <p className="text-[10px] text-text-muted dark:text-dark-muted font-body">Completa tareas para ganar beneficios.</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {challenges.map((challenge) => (
              <div key={challenge.id} className={`p-4 rounded-2xl border transition-all duration-300 ${challenge.completed ? 'bg-primary/5 border-primary/20 opacity-80' : 'bg-gray-50 dark:bg-dark-bg/50 border-transparent'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-2 rounded-xl flex-shrink-0 ${challenge.completed ? 'bg-primary/30 dark:bg-white/10 text-white dark:text-text-main' : 'bg-white dark:bg-dark-surface'}`}>
                    {challenge.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[11px] font-heading font-800 text-text-main dark:text-white tracking-wide">{challenge.title}</h4>
                      {challenge.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-200 dark:text-gray-700" />
                      )}
                    </div>
                    <p className="text-[9px] text-text-muted dark:text-dark-muted leading-relaxed font-body">
                      {challenge.description}
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-heading font-700 text-text-muted dark:text-dark-muted tracking-widest uppercase">
                        <span>Progreso</span>
                        <span>{challenge.current} / {challenge.target}</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary dark:bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-primary/5">
            <Button
              onClick={handleClaimReward}
              className="w-full py-2.5 items-center justify-center group"
              variant="success"
            >
              Canjear recompensas
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DailyChallenges);
