export interface Farm {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  sustainabilityScore: number;
  water: number;
  fertilizer: number;
  totalHarvests: number;
  streak: number;
  lastPlayedDate: string;
}

export interface Plot {
  x: number;
  y: number;
  soilHealth: number;
  waterLevel: number;
  fertility: number;
  cropType: CropType | null;
  growthStage: number;
  plantedAt: number | null;
  lastWatered: number | null;
  lastFertilized: number | null;
}

export type CropType = 'wheat' | 'corn' | 'tomato' | 'lettuce';

export interface CropInfo {
  name: string;
  icon: string;
  growthTime: number;
  waterNeeds: number;
  fertilizerNeeds: number;
  yieldAmount: number;
  value: number;
  sustainabilityBonus: number;
}

export interface ClimateData {
  temperature: number;
  precipitation: number;
  humidity: number;
  solarRadiation: number;
  soilMoisture: number;
  timestamp: number;
}

export interface Livestock {
  id: string;
  type: AnimalType;
  health: number;
  lastFed: number | null;
  productionRate: number;
}

export type AnimalType = 'cow' | 'chicken' | 'sheep';

export interface AnimalInfo {
  name: string;
  icon: string;
  feedCost: number;
  productionValue: number;
  sustainabilityImpact: number;
}

export interface GameAction {
  type: 'plant' | 'water' | 'fertilize' | 'harvest' | 'feed';
  plotId?: string;
  livestockId?: string;
  resource?: string;
  amount: number;
  sustainabilityImpact: number;
  timestamp: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface Challenge {
  id: string;
  description: string;
  reward: number;
  type: 'harvest' | 'sustainability' | 'livestock' | 'water';
  target: number;
  progress: number;
  completed: boolean;
}
