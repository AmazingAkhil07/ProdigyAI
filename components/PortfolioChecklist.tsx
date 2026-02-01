
import React from 'react';
import { PortfolioItem, UserProgress } from '../types';
import { PORTFOLIO_CHECKLIST } from '../constants';

interface PortfolioChecklistProps {
  progress: UserProgress;
  onToggle: (id: string) => void;
}

export const PortfolioChecklist: React.FC<PortfolioChecklistProps> = ({ progress, onToggle }) => {
  const completedCount = progress.portfolioItems.length;
  const totalCount = PORTFOLIO_CHECKLIST.length;
  const percentage = (completedCount / totalCount) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center">
          <i className="fas fa-briefcase mr-2 text-indigo-500" />
          Portfolio Readiness
        </h2>
        <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900 text-amber-600 dark:text-amber-400 px-2 py-1 rounded">
          {completedCount} / {totalCount} Done
        </span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-2">
        {PORTFOLIO_CHECKLIST.map((item) => (
          <label 
            key={item.id}
            className="flex items-center justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group border-b border-slate-50 dark:border-slate-800 last:border-0"
          >
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox"
                checked={progress.portfolioItems.includes(item.id)}
                onChange={() => onToggle(item.id)}
                className="w-4 h-4 rounded text-amber-600 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className={`text-sm ${progress.portfolioItems.includes(item.id) ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                {item.label}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              {item.category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
