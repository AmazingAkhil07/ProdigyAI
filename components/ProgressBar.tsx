
import React from 'react';

interface ProgressBarProps {
  progress: number;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const colorMap: { [key: string]: string } = {
  'phase0': 'bg-purple-500',
  'phase1': 'bg-blue-500',
  'phase2': 'bg-cyan-500',
  'phase3': 'bg-green-500',
  'phase4': 'bg-yellow-500',
  'phase5': 'bg-orange-500',
  'phase6': 'bg-pink-500',
  'phase7': 'bg-red-500',
  'phase8': 'bg-indigo-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  colorClass = 'bg-blue-500',
  size = 'md',
  label
}) => {
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'md' ? 'h-3' : 'h-5';
  
  // Extract phase name from colorClass if it's a phase reference (e.g., "bg-phase1")
  let actualColorClass = colorClass;
  if (colorClass && colorClass.includes('phase')) {
    const phaseMatch = colorClass.match(/phase\d/);
    if (phaseMatch) {
      actualColorClass = colorMap[phaseMatch[0]] || 'bg-blue-500';
    }
  }
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>{label}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heightClass}`}>
        <div 
          className={`h-full transition-all duration-500 ease-out ${actualColorClass}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};
