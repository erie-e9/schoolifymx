import { useState, useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import React from 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  rewarded: boolean;
  reward: string;
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
    reward: 'Surtido Preferente',
    icon: React.createElement(Zap, { className: "w-4 h-4 text-yellow-400" }),
  },
  {
    id: 'add_student',
    title: 'Sastre Maestro',
    description: 'Calcula y agrega la talla de un estudiante.',
    target: 1,
    current: 0,
    completed: false,
    rewarded: false,
    reward: 'Envío Gratis',
    icon: React.createElement(Star, { className: "w-4 h-4 text-blue-400" }),
  },
  {
    id: 'backpack_items',
    title: 'Preparado para el Éxito',
    description: 'Agrega 5 artículos a tu mochila personalizada.',
    target: 5,
    current: 0,
    completed: false,
    rewarded: false,
    reward: 'Etiquetas Gratis',
    icon: React.createElement(Trophy, { className: "w-4 h-4 text-secondary dark:text-primary" }),
  },
];

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
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

  return {
    challenges,
    completedCount,
    hasNewCompletion,
    setHasNewCompletion,
    updateChallenge
  };
};
