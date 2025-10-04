import React from 'react';
import { Droplets, Leaf, Coins, TrendingUp, ShoppingCart, Award, Flame, Zap } from 'lucide-react';
import { Farm } from '../types';
import { ProgressBar } from './ProgressBar';

interface ResourcePanelProps {
  farm: Farm;
  onBuyResource: (resource: 'water' | 'fertilizer', amount: number) => void;
}

export const ResourcePanel: React.FC<ResourcePanelProps> = ({ farm, onBuyResource }) => {
  const getSustainabilityColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-xl p-6 shadow-2xl border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{farm.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Award className="text-yellow-500" size={18} />
            <span className="text-yellow-500 font-bold">Level {farm.level}</span>
          </div>
        </div>
        {farm.streak > 0 && (
          <div className="flex items-center gap-2 bg-orange-900/30 px-3 py-2 rounded-lg border border-orange-700">
            <Flame className="text-orange-500" size={20} />
            <span className="text-orange-400 font-bold">{farm.streak} day streak!</span>
          </div>
        )}
      </div>

      <div className="mb-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-700/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="text-purple-400" size={18} />
            <span className="text-purple-300 font-semibold">Experience</span>
          </div>
          <span className="text-purple-300 text-sm">{farm.xp} / {farm.xpToNextLevel} XP</span>
        </div>
        <ProgressBar current={farm.xp} max={farm.xpToNextLevel} color="purple" height="lg" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-950/30 rounded-lg p-4 border border-yellow-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="text-yellow-400" size={18} />
              <span className="text-yellow-200 text-sm font-medium">Coins</span>
            </div>
            <span className="text-yellow-400 font-bold text-2xl">{farm.coins.toLocaleString()}</span>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-950/30 rounded-lg p-4 border border-green-700/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={getSustainabilityColor(farm.sustainabilityScore)} size={18} />
              <span className="text-green-200 text-sm font-medium">Eco Score</span>
            </div>
            <span className={`${getSustainabilityColor(farm.sustainabilityScore)} font-bold text-2xl`}>
              {farm.sustainabilityScore}%
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-700">
          <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-4 border border-blue-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets className="text-blue-400" size={20} />
                <span className="text-blue-200 font-semibold">Water</span>
              </div>
              <span className="text-blue-300 font-bold text-xl">{farm.water}</span>
            </div>
            <button
              onClick={() => onBuyResource('water', 10)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingCart size={16} />
              Buy 10 for 50 coins
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-4 border border-green-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Leaf className="text-green-400" size={20} />
                <span className="text-green-200 font-semibold">Fertilizer</span>
              </div>
              <span className="text-green-300 font-bold text-xl">{farm.fertilizer}</span>
            </div>
            <button
              onClick={() => onBuyResource('fertilizer', 10)}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingCart size={16} />
              Buy 10 for 100 coins
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-4 mt-4 border border-amber-700/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-amber-400" size={18} />
            <span className="text-amber-300 font-semibold">Total Harvests</span>
          </div>
          <p className="text-amber-200 text-2xl font-bold">{farm.totalHarvests}</p>
          <p className="text-amber-300/70 text-xs mt-1">Keep farming to level up faster!</p>
        </div>
      </div>
    </div>
  );
};
