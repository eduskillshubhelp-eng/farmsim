import React from 'react';
import { Plot } from '../types';
import { CROPS, GROWTH_STAGES } from '../gameData';

interface FarmGridProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onPlotClick: (plot: Plot, index: number) => void;
}

export const FarmGrid: React.FC<FarmGridProps> = ({ plots, selectedPlot, onPlotClick }) => {
  const getPlotColor = (plot: Plot) => {
    if (plot.waterLevel < 20) return 'bg-amber-900';
    if (plot.waterLevel < 50) return 'bg-amber-800';
    return 'bg-green-900';
  };

  const getPlotBorder = (plot: Plot) => {
    if (selectedPlot && selectedPlot.x === plot.x && selectedPlot.y === plot.y) {
      return 'border-4 border-yellow-400';
    }
    return 'border-2 border-green-950';
  };

  return (
    <div className="grid grid-cols-6 gap-2 p-4 bg-gradient-to-b from-green-800 to-green-900 rounded-lg shadow-xl">
      {plots.map((plot, index) => (
        <button
          key={`${plot.x}-${plot.y}`}
          onClick={() => onPlotClick(plot, index)}
          className={`
            ${getPlotColor(plot)} ${getPlotBorder(plot)}
            h-20 rounded-lg transition-all duration-200 hover:scale-105
            flex flex-col items-center justify-center text-3xl
            relative overflow-hidden
          `}
        >
          {plot.cropType ? (
            <>
              <div className="absolute top-1 right-1 text-xs bg-black/50 px-1 rounded text-white">
                {plot.growthStage}
              </div>
              <div>{CROPS[plot.cropType].icon}</div>
              {plot.growthStage === 4 && (
                <div className="absolute inset-0 animate-pulse bg-yellow-400/20 rounded" />
              )}
            </>
          ) : (
            <div className="text-2xl">{GROWTH_STAGES[0].icon}</div>
          )}

          {plot.waterLevel < 30 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" />
          )}
        </button>
      ))}
    </div>
  );
};
