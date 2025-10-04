import React, { useState } from 'react';
import { Sprout, AlertCircle, Sparkles } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { FarmGrid } from './components/FarmGrid';
import { ResourcePanel } from './components/ResourcePanel';
import { ControlPanel } from './components/ControlPanel';
import { ClimatePanel } from './components/ClimatePanel';
import { LivestockPanel } from './components/LivestockPanel';
import { AchievementPanel } from './components/AchievementPanel';
import { ChallengePanel } from './components/ChallengePanel';
import { CropType } from './types';

function App() {
  const {
    farm,
    plots,
    climateData,
    livestock,
    selectedPlot,
    message,
    achievements,
    challenges,
    showLevelUp,
    setSelectedPlot,
    plantCrop,
    waterPlot,
    fertilizePlot,
    harvestCrop,
    buyResource,
    buyAnimal,
    feedAnimal,
    collectProduction,
  } = useGameState();

  const [selectedPlotIndex, setSelectedPlotIndex] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(true);

  const handlePlotClick = (plot: typeof plots[0], index: number) => {
    setSelectedPlot(plot);
    setSelectedPlotIndex(index);
  };

  const handlePlant = (cropType: CropType) => {
    if (selectedPlotIndex !== null) {
      plantCrop(selectedPlotIndex, cropType);
    }
  };

  const handleWater = () => {
    if (selectedPlotIndex !== null) {
      waterPlot(selectedPlotIndex);
    }
  };

  const handleFertilize = () => {
    if (selectedPlotIndex !== null) {
      fertilizePlot(selectedPlotIndex);
    }
  };

  const handleHarvest = () => {
    if (selectedPlotIndex !== null) {
      harvestCrop(selectedPlotIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-slate-900 to-blue-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2djEwaC0xMFYxNmgxMHptLTEwIDEwdjEwaC0xMFYyNmgxMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <Sprout className="text-green-400" size={40} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              NASA FarmSim
            </h1>
          </div>
          <p className="text-slate-300 text-lg font-medium">
            Level Up Your Sustainable Farming Skills
          </p>
        </header>

        {showHelp && (
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-600/50 rounded-xl p-5 mb-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-blue-200 font-bold text-lg mb-2">Welcome to NASA FarmSim!</h3>
                <p className="text-blue-300 text-sm mb-3 leading-relaxed">
                  Build your farming empire by planting crops, managing resources, and caring for livestock. Complete daily challenges, unlock achievements, and level up to earn bonuses. Use real NASA climate data to make informed decisions!
                </p>
                <button
                  onClick={() => setShowHelp(false)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Farming!
                </button>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in border border-green-400 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-300" size={18} />
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        )}

        {showLevelUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-8 shadow-2xl border-4 border-yellow-400 animate-scale-in text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-2">LEVEL UP!</h2>
              <p className="text-yellow-100 text-xl font-semibold">Level {farm.level}</p>
              <p className="text-yellow-200 text-sm mt-2">Keep farming to unlock more rewards!</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FarmGrid
              plots={plots}
              selectedPlot={selectedPlot}
              onPlotClick={handlePlotClick}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ClimatePanel climateData={climateData} />
              <LivestockPanel
                livestock={livestock}
                onBuyAnimal={buyAnimal}
                onFeedAnimal={feedAnimal}
                onCollectProduction={collectProduction}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChallengePanel challenges={challenges} />
              <AchievementPanel achievements={achievements} />
            </div>
          </div>

          <div className="space-y-6">
            <ResourcePanel farm={farm} onBuyResource={buyResource} />
            <ControlPanel
              selectedPlot={selectedPlot}
              onPlant={handlePlant}
              onWater={handleWater}
              onFertilize={handleFertilize}
              onHarvest={handleHarvest}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          <p>
            Data patterns based on NASA satellite observations (MODIS, GPM, SMAP)
          </p>
          <p className="mt-1">
            Learn more about sustainable agriculture and climate-smart farming
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
