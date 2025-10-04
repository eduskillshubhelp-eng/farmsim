import React from 'react';
import { Heart, ShoppingCart, Beef } from 'lucide-react';
import { Livestock, AnimalType } from '../types';
import { ANIMALS, ANIMAL_COST } from '../gameData';

interface LivestockPanelProps {
  livestock: Livestock[];
  onBuyAnimal: (type: AnimalType) => void;
  onFeedAnimal: (id: string) => void;
  onCollectProduction: (id: string) => void;
}

export const LivestockPanel: React.FC<LivestockPanelProps> = ({
  livestock,
  onBuyAnimal,
  onFeedAnimal,
  onCollectProduction,
}) => {
  return (
    <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Livestock Management</h3>
        <Beef className="text-amber-300" size={24} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="text-sm text-amber-200 mb-2">Purchase Animals ({ANIMAL_COST} coins each):</div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(ANIMALS).map(([key, animal]) => (
            <button
              key={key}
              onClick={() => onBuyAnimal(key as AnimalType)}
              className="bg-amber-800 hover:bg-amber-700 text-white py-3 px-2 rounded-lg transition-colors flex flex-col items-center gap-1"
              title={`Sustainability impact: ${animal.sustainabilityImpact > 0 ? '+' : ''}${animal.sustainabilityImpact}`}
            >
              <span className="text-2xl">{animal.icon}</span>
              <span className="text-xs">{animal.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-amber-700 pt-4">
        <div className="text-sm text-amber-200 mb-3">Your Livestock:</div>
        {livestock.length === 0 ? (
          <div className="text-amber-300/50 text-center py-6 text-sm">
            No livestock yet. Purchase animals to start production!
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {livestock.map(animal => (
              <div
                key={animal.id}
                className="bg-amber-800/50 rounded-lg p-3 border border-amber-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ANIMALS[animal.type].icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {ANIMALS[animal.type].name}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Heart size={12} className={animal.health > 50 ? 'text-red-400' : 'text-red-600'} />
                        <span className={animal.health > 50 ? 'text-green-300' : 'text-red-300'}>
                          {Math.round(animal.health)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-amber-900 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      animal.health > 70 ? 'bg-green-500' : animal.health > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${animal.health}%` }}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onFeedAnimal(animal.id)}
                    className="flex-1 bg-green-700 hover:bg-green-600 text-white text-xs py-2 px-3 rounded transition-colors"
                  >
                    Feed ({ANIMALS[animal.type].feedCost}c)
                  </button>
                  <button
                    onClick={() => onCollectProduction(animal.id)}
                    disabled={animal.health < 50}
                    className="flex-1 bg-yellow-700 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs py-2 px-3 rounded transition-colors"
                  >
                    Collect ({ANIMALS[animal.type].productionValue}c)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 bg-amber-950/50 rounded-lg p-4 border border-amber-700">
        <p className="text-amber-200 text-xs leading-relaxed">
          <strong>Management Tips:</strong> Keep animals healthy by feeding them regularly. Chickens are most sustainable, while cows have a higher environmental impact. Collect production when animals are healthy (50%+ health).
        </p>
      </div>
    </div>
  );
};
