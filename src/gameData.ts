import { CropInfo, AnimalInfo } from './types';

export const CROPS: Record<string, CropInfo> = {
  wheat: {
    name: 'Wheat',
    icon: '🌾',
    growthTime: 60000,
    waterNeeds: 30,
    fertilizerNeeds: 20,
    yieldAmount: 3,
    value: 50,
    sustainabilityBonus: 5,
  },
  corn: {
    name: 'Corn',
    icon: '🌽',
    growthTime: 90000,
    waterNeeds: 40,
    fertilizerNeeds: 30,
    yieldAmount: 2,
    value: 80,
    sustainabilityBonus: 3,
  },
  tomato: {
    name: 'Tomato',
    icon: '🍅',
    growthTime: 75000,
    waterNeeds: 35,
    fertilizerNeeds: 25,
    yieldAmount: 4,
    value: 60,
    sustainabilityBonus: 7,
  },
  lettuce: {
    name: 'Lettuce',
    icon: '🥬',
    growthTime: 45000,
    waterNeeds: 25,
    fertilizerNeeds: 15,
    yieldAmount: 5,
    value: 40,
    sustainabilityBonus: 8,
  },
};

export const ANIMALS: Record<string, AnimalInfo> = {
  cow: {
    name: 'Cow',
    icon: '🐄',
    feedCost: 20,
    productionValue: 40,
    sustainabilityImpact: -2,
  },
  chicken: {
    name: 'Chicken',
    icon: '🐔',
    feedCost: 10,
    productionValue: 25,
    sustainabilityImpact: 1,
  },
  sheep: {
    name: 'Sheep',
    icon: '�양',
    feedCost: 15,
    productionValue: 30,
    sustainabilityImpact: 0,
  },
};

export const GROWTH_STAGES = [
  { name: 'Empty', icon: '🟫' },
  { name: 'Seedling', icon: '🌱' },
  { name: 'Growing', icon: '🌿' },
  { name: 'Mature', icon: '🌾' },
  { name: 'Ready', icon: '✨' },
];

export const WATER_COST = 5;
export const FERTILIZER_COST = 10;
export const SEED_COST = 15;
export const ANIMAL_COST = 200;

export const GRID_SIZE = 6;

export const XP_PER_HARVEST = 20;
export const XP_PER_LIVESTOCK_COLLECTION = 15;
export const XP_BASE_NEXT_LEVEL = 100;
export const XP_LEVEL_MULTIPLIER = 1.5;

export const LEVEL_REWARDS = [
  { level: 2, coins: 500, message: 'Unlocked: Advanced Crops!' },
  { level: 3, coins: 750, message: 'Unlocked: Livestock Upgrades!' },
  { level: 5, coins: 1000, message: 'Unlocked: Premium Tools!' },
  { level: 7, coins: 1500, message: 'Master Farmer Status!' },
  { level: 10, coins: 2500, message: 'Legendary Farmer!' },
];
