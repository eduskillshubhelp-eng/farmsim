import React, { useState } from 'react';
import { Trophy, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Achievement } from '../types';
import { ProgressBar } from './ProgressBar';

interface AchievementPanelProps {
  achievements: Achievement[];
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({ achievements }) => {
  const [expanded, setExpanded] = useState(false);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 rounded-xl p-5 shadow-xl border border-yellow-700/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-3"
      >
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400" size={24} />
          <div className="text-left">
            <h3 className="text-lg font-bold text-white">Achievements</h3>
            <p className="text-yellow-300 text-sm">{unlockedCount} / {totalCount} Unlocked</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="text-yellow-400" size={20} />
        ) : (
          <ChevronDown className="text-yellow-400" size={20} />
        )}
      </button>

      {expanded && (
        <div className="space-y-2 mt-4">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`rounded-lg p-3 border transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border-yellow-600'
                  : 'bg-slate-800/50 border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">
                  {achievement.unlocked ? achievement.icon : <Lock size={24} className="text-slate-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-300' : 'text-slate-400'}`}>
                      {achievement.name}
                    </h4>
                    {achievement.unlocked && (
                      <span className="text-yellow-500 text-xs font-bold">+50 XP</span>
                    )}
                  </div>
                  <p className={`text-xs mb-2 ${achievement.unlocked ? 'text-yellow-200/70' : 'text-slate-500'}`}>
                    {achievement.description}
                  </p>
                  {!achievement.unlocked && (
                    <ProgressBar
                      current={achievement.progress}
                      max={achievement.target}
                      color="yellow"
                      height="sm"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
