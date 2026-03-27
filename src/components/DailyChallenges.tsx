import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Circle, Star, Zap, ChevronRight } from 'lucide-react';
import { getWhatsappLink } from '../types';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  rewarded: boolean;
  icon: React.ReactNode;
}

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'scan_list',
    title: 'Explorador de Listas',
    description: 'Escanea una lista de útiles con el Smart Scanner.',
    target: 1,
    current: 0,
    completed: false,
    rewarded: false,
    icon: <Zap className="w-4 h-4 text-yellow-400" />,
  },
  {
    id: 'add_student',
    title: 'Sastre Maestro',
    description: 'Calcula y agrega la talla de un estudiante.',
    target: 1,
    current: 0,
    completed: false,
    rewarded: false,
    icon: <Star className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 'backpack_items',
    title: 'Preparado para el Éxito',
    description: 'Agrega 5 artículos a tu mochila personalizada.',
    target: 5,
    current: 0,
    completed: false,
    rewarded: false,
    icon: <Trophy className="w-4 h-4 text-secondary dark:text-primary" />,
  },
];

const DailyChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewCompletion, setHasNewCompletion] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('schoolify_challenges');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withIcons = parsed.map((c: any) => ({
          ...c,
          icon: INITIAL_CHALLENGES.find(ic => ic.id === c.id)?.icon || INITIAL_CHALLENGES[0].icon
        }));
        setChallenges(withIcons);
      } catch (e) {
        setChallenges(INITIAL_CHALLENGES);
      }
    } else {
      setChallenges(INITIAL_CHALLENGES);
    }

    // Listen for custom events to track progress
    const handleProgress = (e: any) => {
      const { missionId, increment = 1 } = e.detail;
      updateChallenge(missionId, increment);
    };

    window.addEventListener('schoolify-mission-progress', handleProgress);
    return () => window.removeEventListener('schoolify-mission-progress', handleProgress);
  }, []);

  const updateChallenge = (id: string, amount: number) => {
    setChallenges(prev => {
      const next = prev.map(c => {
        if (c.id === id && !c.completed) {
          const newCurrent = Math.min(c.current + amount, c.target);
          const isNowCompleted = newCurrent >= c.target;
          if (isNowCompleted) setHasNewCompletion(true);
          return { ...c, current: newCurrent, completed: isNowCompleted };
        }
        return c;
      });
      localStorage.setItem('schoolify_challenges', JSON.stringify(next));
      return next;
    });
  };

  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <div className="fixed bottom-24 md:right-8 right-5 z-[200]">
      {/* Balloon Notification */}
      {hasNewCompletion && !isOpen && (
        <div className="absolute -top-12 right-0 bg-secondary dark:bg-primary text-white dark:text-text-main px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce cursor-pointer whitespace-nowrap"
          onClick={() => { setIsOpen(true); setHasNewCompletion(false); }}>
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-heading font-900 tracking-widest uppercase">¡Misión Cumplida!</span>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setHasNewCompletion(false); }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${isOpen ? 'bg-text-main rotate-90' : 'bg-dark-surface'}`}
      >
        {isOpen ? (
          <ChevronRight className="w-5 h-5 text-white" />
        ) : (
          <div className="relative">
            <Trophy className={`w-5 h-5 transition-colors ${completedCount > 0 ? 'text-white dark:text-white' : 'text-text-muted dark:text-dark-muted'}`} />
            {completedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black dark:text-text-main text-[8px] flex items-center justify-center rounded-full font-900 border-1 border-white dark:border-dark-surface">
                {completedCount}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Challenges Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-dark-surface rounded-[2rem] shadow-3xl border border-gray-100 dark:border-primary/10 p-6 transform origin-bottom-right transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-heading font-900 text-text-main dark:text-white tracking-widest">Misiones</h3>
              <p className="text-[10px] text-text-muted dark:text-dark-muted font-body">Completa tareas para ganar beneficios.</p>
            </div>
            <div className="bg-gray-100 dark:bg-dark-bg px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-secondary dark:text-primary" />
              <span className="text-[10px] font-heading font-900 text-text-main dark:text-white">{completedCount}/{challenges.length}</span>
            </div>
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {challenges.map((challenge) => (
              <div key={challenge.id} className={`p-4 rounded-2xl border transition-all duration-300 ${challenge.completed ? 'bg-primary/5 border-primary/20 opacity-80' : 'bg-gray-50 dark:bg-dark-bg/50 border-transparent'}`}>
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
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-heading font-700 text-text-muted tracking-widest uppercase">
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
            <button
              onClick={() => {
                const completedMissions = challenges.filter(c => c.completed);
                if (completedMissions.length > 0) {
                  const missionList = completedMissions.map(m => `• ${m.title}`).join('\n');
                  const message = `¡Hola Schoolify! 👋 He completado las siguientes misiones y me gustaría reclamar mi premio:\n\n${missionList}\n\n¿Qué beneficios tengo activos? ✨`;
                  window.open(getWhatsappLink(message), '_blank');
                } else {
                  alert("Completa al menos una misión para canjear recompensas.");
                }
              }}
              className="w-full py-2.5 bg-text-main text-white rounded-xl text-[9px] font-heading font-900 tracking-widest flex items-center justify-center gap-2 hover:bg-secondary dark:hover:bg-primary dark:hover:text-text-main transition-colors group"
            >
              Canjear recompensas
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenges;
