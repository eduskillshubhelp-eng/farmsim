import React, { useState } from 'react';
import { Sprout, Droplets, Leaf, Package } from 'lucide-react';
import { Plot, CropType } from '../types';
import { CROPS, SEED_COST } from '../gameData';

interface ControlPanelProps {
  selectedPlot: Plot | null;
  onPlant: (cropType: CropType) => void;
  onWater: () => void;
  onFertilize: () => void;
  onHarvest: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedPlot,
  onPlant,
  onWater,
  onFertilize,
  onHarvest,
}) => {
  const [showCropMenu, setShowCropMenu] = useState(false);

  if (!selectedPlot) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
        <p className="text-slate-400 text-center">Select a plot to manage it</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">
        Plot ({selectedPlot.x + 1}, {selectedPlot.y + 1})
      </h3>

      <div className="space-y-3 mb-6">
        <div className="bg-slate-700/50 rounded p-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Water Level</span>
            <span className="text-blue-400">{Math.round(selectedPlot.waterLevel)}%</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${selectedPlot.waterLevel}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-700/50 rounded p-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Fertility</span>
            <span className="text-green-400">{Math.round(selectedPlot.fertility)}%</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${selectedPlot.fertility}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-700/50 rounded p-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Soil Health</span>
            <span className="text-amber-400">{Math.round(selectedPlot.soilHealth)}%</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${selectedPlot.soilHealth}%` }}
            />
          </div>
        </div>
      </div>

      {selectedPlot.cropType && (
        <div className="bg-green-900/30 rounded-lg p-3 mb-4 border border-green-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{CROPS[selectedPlot.cropType].icon}</span>
            <div>
              <div className="text-white font-medium">{CROPS[selectedPlot.cropType].name}</div>
              <div className="text-sm text-green-300">Growth Stage: {selectedPlot.growthStage}/4</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {!selectedPlot.cropType ? (
          <div className="relative">
            <button
              onClick={() => setShowCropMenu(!showCropMenu)}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Sprout size={20} />
              Plant Crop ({SEED_COST} coins)
            </button>

            {showCropMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 rounded-lg shadow-xl p-2 z-10">
                {Object.entries(CROPS).map(([key, crop]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onPlant(key as CropType);
                      setShowCropMenu(false);
                    }}
                    className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 px-3 rounded mb-2 last:mb-0 flex items-center gap-3 transition-colors"
                  >
                    <span className="text-2xl">{crop.icon}</span>
                    <div className="text-left flex-1">
                      <div className="font-medium">{crop.name}</div>
                      <div className="text-xs text-slate-300">
                        Value: {crop.value}c | Eco: +{crop.sustainabilityBonus}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={onWater}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Droplets size={20} />
              Water Crop
            </button>

            <button
              onClick={onFertilize}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Leaf size={20} />
              Fertilize
            </button>

            {selectedPlot.growthStage === 4 && (
              <button
                onClick={onHarvest}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors animate-pulse"
              >
                <Package size={20} />
                Harvest Crop
              </button>
            )}
          </>
        )}
      </div>

      <div className="mt-6 bg-blue-900/30 rounded-lg p-4 border border-blue-700">
        <p className="text-blue-200 text-xs leading-relaxed">
          <strong>Tip:</strong> Keep water and fertility levels high for better yields. Different crops have different needs and sustainability impacts. Lettuce and tomatoes are most eco-friendly!
        </p>
      </div>
    </div>
  );
};
