import React from 'react';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { Challenge } from '../types';
import { ProgressBar } from './ProgressBar';

interface ChallengePanelProps {
  challenges: Challenge[];
}

export const ChallengePanel: React.FC<ChallengePanelProps> = ({ challenges }) => {
  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-5 shadow-xl border border-blue-700/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target className="text-blue-400" size={24} />
          <div>
            <h3 className="text-lg font-bold text-white">Daily Challenges</h3>
            <p className="text-blue-300 text-sm">{completedCount} / {challenges.length} Complete</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-blue-950/50 px-3 py-1.5 rounded-lg">
          <Clock className="text-blue-400" size={16} />
          <span className="text-blue-300 text-xs font-medium">Resets Daily</span>
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map(challenge => (
          <div
            key={challenge.id}
            className={`rounded-lg p-4 border transition-all ${
              challenge.completed
                ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-600'
                : 'bg-slate-800/50 border-slate-700 hover:border-blue-600'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3 flex-1">
                {challenge.completed ? (
                  <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${challenge.completed ? 'text-green-300' : 'text-white'}`}>
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-400 text-sm font-bold">+{challenge.reward} coins</span>
                    {!challenge.completed && (
                      <span className="text-slate-400 text-xs">
                        ({challenge.progress}/{challenge.target})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {!challenge.completed && (
              <div className="mt-3">
                <ProgressBar
                  current={challenge.progress}
                  max={challenge.target}
                  color="blue"
                  height="md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
