import { useState, useEffect, useCallback } from 'react';
import { Farm, Plot, ClimateData, Livestock, CropType, AnimalType, Achievement, Challenge } from '../types';
import { CROPS, GRID_SIZE, WATER_COST, FERTILIZER_COST, SEED_COST, ANIMAL_COST, ANIMALS, XP_PER_HARVEST, XP_PER_LIVESTOCK_COLLECTION, XP_BASE_NEXT_LEVEL, XP_LEVEL_MULTIPLIER, LEVEL_REWARDS } from '../gameData';

const INITIAL_FARM: Farm = {
  name: 'Green Valley Farm',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 1000,
  sustainabilityScore: 50,
  water: 100,
  fertilizer: 50,
  totalHarvests: 0,
  streak: 0,
  lastPlayedDate: new Date().toDateString(),
};

const generateInitialPlots = (): Plot[] => {
  const plots: Plot[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      plots.push({
        x,
        y,
        soilHealth: 70,
        waterLevel: 50,
        fertility: 60,
        cropType: null,
        growthStage: 0,
        plantedAt: null,
        lastWatered: null,
        lastFertilized: null,
      });
    }
  }
  return plots;
};

const generateClimateData = (): ClimateData => {
  return {
    temperature: Math.round(15 + Math.random() * 15),
    precipitation: Math.round(Math.random() * 10 * 10) / 10,
    humidity: Math.round(40 + Math.random() * 40),
    solarRadiation: Math.round(300 + Math.random() * 400),
    soilMoisture: Math.round((0.2 + Math.random() * 0.3) * 100) / 100,
    timestamp: Date.now(),
  };
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_harvest', name: 'First Harvest', description: 'Harvest your first crop', icon: '🌾', unlocked: false, progress: 0, target: 1 },
  { id: 'harvest_10', name: 'Experienced Farmer', description: 'Harvest 10 crops', icon: '🚜', unlocked: false, progress: 0, target: 10 },
  { id: 'harvest_50', name: 'Master Farmer', description: 'Harvest 50 crops', icon: '👨\u200d🌾', unlocked: false, progress: 0, target: 50 },
  { id: 'harvest_100', name: 'Legend', description: 'Harvest 100 crops', icon: '🏆', unlocked: false, progress: 0, target: 100 },
  { id: 'eco_warrior', name: 'Eco Warrior', description: 'Reach 80% sustainability', icon: '🌍', unlocked: false, progress: 0, target: 80 },
  { id: 'rich_farmer', name: 'Wealthy Farmer', description: 'Accumulate 5000 coins', icon: '💰', unlocked: false, progress: 0, target: 5000 },
  { id: 'livestock_master', name: 'Ranch Manager', description: 'Own 5 animals', icon: '🐄', unlocked: false, progress: 0, target: 5 },
  { id: 'level_5', name: 'Rising Star', description: 'Reach Level 5', icon: '⭐', unlocked: false, progress: 0, target: 5 },
];

const generateDailyChallenges = (): Challenge[] => [
  { id: 'daily_harvest', description: 'Harvest 3 crops', reward: 100, type: 'harvest', target: 3, progress: 0, completed: false },
  { id: 'daily_sustainability', description: 'Reach 70% sustainability', reward: 150, type: 'sustainability', target: 70, progress: 0, completed: false },
  { id: 'daily_water', description: 'Water crops 5 times', reward: 75, type: 'water', target: 5, progress: 0, completed: false },
];

export const useGameState = () => {
  const [farm, setFarm] = useState<Farm>(INITIAL_FARM);
  const [plots, setPlots] = useState<Plot[]>(generateInitialPlots());
  const [climateData, setClimateData] = useState<ClimateData>(generateClimateData());
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [message, setMessage] = useState<string>('');
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [challenges, setChallenges] = useState<Challenge[]>(generateDailyChallenges());
  const [showLevelUp, setShowLevelUp] = useState(false);

  const checkStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastPlayed = farm.lastPlayedDate;

    if (lastPlayed !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastPlayed === yesterday.toDateString()) {
        setFarm(prev => ({ ...prev, streak: prev.streak + 1, lastPlayedDate: today }));
      } else {
        setFarm(prev => ({ ...prev, streak: 1, lastPlayedDate: today }));
      }
      setChallenges(generateDailyChallenges());
    }
  }, [farm.lastPlayedDate]);

  const addXP = useCallback((amount: number) => {
    setFarm(prev => {
      const newXP = prev.xp + amount;
      const xpNeeded = prev.xpToNextLevel;

      if (newXP >= xpNeeded) {
        const newLevel = prev.level + 1;
        const nextLevelXP = Math.round(XP_BASE_NEXT_LEVEL * Math.pow(XP_LEVEL_MULTIPLIER, newLevel - 1));
        const reward = LEVEL_REWARDS.find(r => r.level === newLevel);

        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);

        if (reward) {
          showMessage(reward.message);
          return {
            ...prev,
            level: newLevel,
            xp: newXP - xpNeeded,
            xpToNextLevel: nextLevelXP,
            coins: prev.coins + reward.coins,
          };
        }

        return {
          ...prev,
          level: newLevel,
          xp: newXP - xpNeeded,
          xpToNextLevel: nextLevelXP,
        };
      }

      return { ...prev, xp: newXP };
    });
  }, []);

  const checkAchievements = useCallback(() => {
    setAchievements(prev => prev.map(ach => {
      if (ach.unlocked) return ach;

      let progress = ach.progress;

      if (ach.id === 'first_harvest' || ach.id === 'harvest_10' || ach.id === 'harvest_50' || ach.id === 'harvest_100') {
        progress = farm.totalHarvests;
      } else if (ach.id === 'eco_warrior') {
        progress = farm.sustainabilityScore;
      } else if (ach.id === 'rich_farmer') {
        progress = farm.coins;
      } else if (ach.id === 'livestock_master') {
        progress = livestock.length;
      } else if (ach.id === 'level_5') {
        progress = farm.level;
      }

      const unlocked = progress >= ach.target;

      if (unlocked && !ach.unlocked) {
        showMessage(`🎉 Achievement Unlocked: ${ach.name}!`);
        addXP(50);
      }

      return { ...ach, progress, unlocked };
    }));
  }, [farm.totalHarvests, farm.sustainabilityScore, farm.coins, livestock.length, farm.level, addXP]);

  useEffect(() => {
    checkStreak();
  }, []);

  useEffect(() => {
    checkAchievements();
  }, [farm.totalHarvests, farm.sustainabilityScore, farm.coins, livestock.length, farm.level]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setPlots(prevPlots =>
        prevPlots.map(plot => {
          if (plot.cropType && plot.plantedAt && plot.growthStage < 4) {
            const crop = CROPS[plot.cropType];
            const elapsed = now - plot.plantedAt;
            const progress = elapsed / crop.growthTime;
            const newStage = Math.min(4, Math.floor(progress * 4));

            let newWaterLevel = plot.waterLevel - 0.5;
            let newFertility = plot.fertility - 0.3;

            if (plot.lastWatered && now - plot.lastWatered < 30000) {
              newWaterLevel = Math.max(newWaterLevel, plot.waterLevel - 0.1);
            }

            return {
              ...plot,
              growthStage: newStage,
              waterLevel: Math.max(0, newWaterLevel),
              fertility: Math.max(0, newFertility),
            };
          }
          return plot;
        })
      );

      setLivestock(prevLivestock =>
        prevLivestock.map(animal => {
          const timeSinceFed = animal.lastFed ? now - animal.lastFed : Infinity;
          const healthDrain = timeSinceFed > 60000 ? 0.5 : 0;
          return {
            ...animal,
            health: Math.max(0, animal.health - healthDrain),
          };
        })
      );
    }, 1000);

    const climateInterval = setInterval(() => {
      setClimateData(generateClimateData());
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(climateInterval);
    };
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const plantCrop = useCallback((plotIndex: number, cropType: CropType) => {
    const plot = plots[plotIndex];
    const crop = CROPS[cropType];

    if (farm.coins < SEED_COST) {
      showMessage('Not enough coins to buy seeds!');
      return;
    }

    if (plot.cropType) {
      showMessage('Plot already has a crop!');
      return;
    }

    setFarm(prev => ({ ...prev, coins: prev.coins - SEED_COST }));
    setPlots(prev =>
      prev.map((p, i) =>
        i === plotIndex
          ? { ...p, cropType, growthStage: 1, plantedAt: Date.now() }
          : p
      )
    );
    showMessage(`Planted ${crop.name}!`);
  }, [plots, farm.coins]);

  const waterPlot = useCallback((plotIndex: number) => {
    const plot = plots[plotIndex];

    if (farm.water < 1) {
      showMessage('Not enough water! Purchase more water.');
      return;
    }

    if (!plot.cropType) {
      showMessage('No crop to water!');
      return;
    }

    setFarm(prev => ({ ...prev, water: prev.water - 1 }));
    setPlots(prev =>
      prev.map((p, i) =>
        i === plotIndex
          ? { ...p, waterLevel: Math.min(100, p.waterLevel + 25), lastWatered: Date.now() }
          : p
      )
    );

    setChallenges(prev => prev.map(ch => {
      if (ch.type === 'water' && !ch.completed) {
        const newProgress = ch.progress + 1;
        const completed = newProgress >= ch.target;
        if (completed && !ch.completed) {
          showMessage(`✅ Challenge Complete! +${ch.reward} coins`);
          setFarm(f => ({ ...f, coins: f.coins + ch.reward }));
        }
        return { ...ch, progress: newProgress, completed };
      }
      return ch;
    }));

    showMessage('Watered crop!');
  }, [plots, farm.water]);

  const fertilizePlot = useCallback((plotIndex: number) => {
    const plot = plots[plotIndex];

    if (farm.fertilizer < 1) {
      showMessage('Not enough fertilizer! Purchase more.');
      return;
    }

    if (!plot.cropType) {
      showMessage('No crop to fertilize!');
      return;
    }

    setFarm(prev => ({
      ...prev,
      fertilizer: prev.fertilizer - 1,
      sustainabilityScore: Math.max(0, prev.sustainabilityScore - 1)
    }));
    setPlots(prev =>
      prev.map((p, i) =>
        i === plotIndex
          ? { ...p, fertility: Math.min(100, p.fertility + 30), lastFertilized: Date.now() }
          : p
      )
    );
    showMessage('Applied fertilizer! (-1 sustainability)');
  }, [plots, farm.fertilizer]);

  const harvestCrop = useCallback((plotIndex: number) => {
    const plot = plots[plotIndex];

    if (!plot.cropType || plot.growthStage < 4) {
      showMessage('Crop is not ready to harvest!');
      return;
    }

    const crop = CROPS[plot.cropType];
    const baseYield = crop.yieldAmount * crop.value;
    const waterBonus = plot.waterLevel > 50 ? 1.2 : plot.waterLevel > 20 ? 1 : 0.8;
    const fertilityBonus = plot.fertility > 50 ? 1.2 : plot.fertility > 20 ? 1 : 0.8;
    const levelBonus = 1 + (farm.level * 0.05);
    const totalEarnings = Math.round(baseYield * waterBonus * fertilityBonus * levelBonus);

    setFarm(prev => ({
      ...prev,
      coins: prev.coins + totalEarnings,
      sustainabilityScore: Math.min(100, prev.sustainabilityScore + crop.sustainabilityBonus),
      totalHarvests: prev.totalHarvests + 1,
    }));

    addXP(XP_PER_HARVEST);

    setChallenges(prev => prev.map(ch => {
      if (ch.type === 'harvest' && !ch.completed) {
        const newProgress = ch.progress + 1;
        const completed = newProgress >= ch.target;
        if (completed && !ch.completed) {
          showMessage(`✅ Challenge Complete! +${ch.reward} coins`);
          setFarm(f => ({ ...f, coins: f.coins + ch.reward }));
        }
        return { ...ch, progress: newProgress, completed };
      }
      return ch;
    }));

    setPlots(prev =>
      prev.map((p, i) =>
        i === plotIndex
          ? {
              ...p,
              cropType: null,
              growthStage: 0,
              plantedAt: null,
              soilHealth: Math.max(30, p.soilHealth - 5)
            }
          : p
      )
    );

    showMessage(`Harvested! +${totalEarnings} coins +${XP_PER_HARVEST} XP`);
  }, [plots]);

  const buyResource = useCallback((resource: 'water' | 'fertilizer', amount: number) => {
    const cost = resource === 'water' ? WATER_COST * amount : FERTILIZER_COST * amount;

    if (farm.coins < cost) {
      showMessage('Not enough coins!');
      return;
    }

    setFarm(prev => ({
      ...prev,
      coins: prev.coins - cost,
      [resource]: prev[resource] + amount,
    }));
    showMessage(`Purchased ${amount} ${resource}!`);
  }, [farm.coins]);

  const buyAnimal = useCallback((type: AnimalType) => {
    if (farm.coins < ANIMAL_COST) {
      showMessage('Not enough coins to buy livestock!');
      return;
    }

    const newAnimal: Livestock = {
      id: Date.now().toString(),
      type,
      health: 100,
      lastFed: null,
      productionRate: 1,
    };

    setFarm(prev => ({ ...prev, coins: prev.coins - ANIMAL_COST }));
    setLivestock(prev => [...prev, newAnimal]);
    showMessage(`Purchased ${ANIMALS[type].name}!`);
  }, [farm.coins]);

  const feedAnimal = useCallback((animalId: string) => {
    const animal = livestock.find(a => a.id === animalId);
    if (!animal) return;

    const feedCost = ANIMALS[animal.type].feedCost;

    if (farm.coins < feedCost) {
      showMessage('Not enough coins to buy feed!');
      return;
    }

    setFarm(prev => ({
      ...prev,
      coins: prev.coins - feedCost,
      sustainabilityScore: Math.min(100, Math.max(0, prev.sustainabilityScore + ANIMALS[animal.type].sustainabilityImpact))
    }));

    setLivestock(prev =>
      prev.map(a =>
        a.id === animalId
          ? { ...a, health: Math.min(100, a.health + 20), lastFed: Date.now() }
          : a
      )
    );

    showMessage(`Fed ${ANIMALS[animal.type].name}!`);
  }, [livestock, farm.coins]);

  const collectProduction = useCallback((animalId: string) => {
    const animal = livestock.find(a => a.id === animalId);
    if (!animal || animal.health < 50) {
      showMessage('Animal is not healthy enough to produce!');
      return;
    }

    const value = ANIMALS[animal.type].productionValue;
    setFarm(prev => ({ ...prev, coins: prev.coins + value }));
    addXP(XP_PER_LIVESTOCK_COLLECTION);
    showMessage(`Collected! +${value} coins +${XP_PER_LIVESTOCK_COLLECTION} XP`);
  }, [livestock, addXP]);

  useEffect(() => {
    setChallenges(prev => prev.map(ch => {
      if (ch.type === 'sustainability' && !ch.completed) {
        const newProgress = farm.sustainabilityScore;
        const completed = newProgress >= ch.target;
        if (completed && !ch.completed) {
          showMessage(`✅ Challenge Complete! +${ch.reward} coins`);
          setFarm(f => ({ ...f, coins: f.coins + ch.reward }));
        }
        return { ...ch, progress: newProgress, completed };
      }
      return ch;
    }));
  }, [farm.sustainabilityScore]);

  return {
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
  };
};
