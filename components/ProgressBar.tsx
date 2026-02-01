
import React from 'react';

interface ProgressBarProps {
  progress: number;
  colorClass: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  colorClass, 
  size = 'md',
  label
}) => {
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'md' ? 'h-3' : 'h-5';
  
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
          className={`h-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};
