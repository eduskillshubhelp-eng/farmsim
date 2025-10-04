import React from 'react';
import { Cloud, Droplet, ThermometerSun, Sun, Waves } from 'lucide-react';
import { ClimateData } from '../types';

interface ClimatePanelProps {
  climateData: ClimateData;
}

export const ClimatePanel: React.FC<ClimatePanelProps> = ({ climateData }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="text-blue-300" size={24} />
        <h3 className="text-xl font-bold text-white">NASA Climate Data</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ThermometerSun className="text-orange-400" size={20} />
            <span className="text-blue-200 text-sm">Temperature</span>
          </div>
          <div className="text-white text-2xl font-bold">{climateData.temperature}°C</div>
        </div>

        <div className="bg-blue-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="text-blue-400" size={20} />
            <span className="text-blue-200 text-sm">Precipitation</span>
          </div>
          <div className="text-white text-2xl font-bold">{climateData.precipitation}mm</div>
        </div>

        <div className="bg-blue-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="text-slate-300" size={20} />
            <span className="text-blue-200 text-sm">Humidity</span>
          </div>
          <div className="text-white text-2xl font-bold">{climateData.humidity}%</div>
        </div>

        <div className="bg-blue-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="text-yellow-400" size={20} />
            <span className="text-blue-200 text-sm">Solar Radiation</span>
          </div>
          <div className="text-white text-2xl font-bold">{climateData.solarRadiation}</div>
          <div className="text-blue-300 text-xs">W/m²</div>
        </div>

        <div className="bg-blue-800/50 rounded-lg p-4 col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="text-cyan-400" size={20} />
            <span className="text-blue-200 text-sm">Soil Moisture (SMAP)</span>
          </div>
          <div className="text-white text-2xl font-bold">{climateData.soilMoisture}</div>
          <div className="text-blue-300 text-xs">Volumetric soil moisture content</div>
        </div>
      </div>

      <div className="mt-4 bg-blue-950/50 rounded-lg p-4 border border-blue-700">
        <p className="text-blue-200 text-xs leading-relaxed">
          <strong>Real-World Data:</strong> This simulation uses patterns based on NASA satellite observations including MODIS for temperature, GPM for precipitation, and SMAP for soil moisture. These measurements help farmers make informed decisions about irrigation and crop selection.
        </p>
      </div>
    </div>
  );
};
