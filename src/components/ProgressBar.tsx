import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  color = 'blue',
  showPercentage = false,
  height = 'md',
}) => {
  const percentage = Math.min(100, (current / max) * 100);

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-300">{label}</span>
          {showPercentage && (
            <span className="text-slate-400">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-700/50 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} ${heightClasses[height]} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
