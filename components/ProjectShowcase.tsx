import React, { useMemo } from 'react';
import { UserProgress } from '../types';
import { PORTFOLIO_CHECKLIST } from '../constants';

interface ProjectShowcaseProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ progress, theme }) => {
  const completedProjects = useMemo(() => {
    return PORTFOLIO_CHECKLIST.filter((_, idx) => progress.portfolioItems[idx]);
  }, [progress.portfolioItems]);

  const portfolioStats = useMemo(() => {
    const completed = progress.portfolioItems.filter(Boolean).length;
    const total = PORTFOLIO_CHECKLIST.length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
      remaining: total - completed
    };
  }, [progress.portfolioItems]);

  return (
    <div className="min-h-screen flex-1 p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">
            💼 Project Showcase
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Display your completed projects and portfolio achievements
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-indigo-900/20 rounded-3xl border border-amber-200 dark:border-amber-800/40 p-8 mb-12 shadow-lg">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-4xl font-black text-amber-600 dark:text-amber-400 mb-2">{portfolioStats.completed}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">{portfolioStats.remaining}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-slate-800 dark:text-white mb-2">{portfolioStats.percentage}%</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Complete</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-500 h-full transition-all duration-500"
              style={{ width: `${portfolioStats.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Your Projects</h2>

          {completedProjects.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-lg">
              <p className="text-3xl mb-4">🚀</p>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                No projects completed yet. Complete portfolio items to showcase them here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedProjects.map((project, idx) => {
                const originalIdx = PORTFOLIO_CHECKLIST.findIndex(p => p === project);
                const badgeColors = [
                  'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
                  'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
                  'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
                  'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
                  'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
                  'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
                  'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                  'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                ];
                const colorClass = badgeColors[originalIdx % badgeColors.length];

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group"
                  >
                    {/* Project Header with Icon */}
                    <div className={`${colorClass} p-6 flex items-center justify-between`}>
                      <div>
                        <h3 className="text-xl font-black mb-1">{project}</h3>
                        <p className="text-sm font-bold opacity-75">Portfolio Item #{originalIdx + 1}</p>
                      </div>
                      <div className="text-4xl opacity-50 group-hover:opacity-100 transition-all">✨</div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          Completed
                        </span>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                        This project showcases your ability to implement and complete complex requirements.
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                          🎯 Achievement Unlocked
                        </p>
                        <span className="text-lg">🏆</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Portfolio Items */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">All Portfolio Items</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_CHECKLIST.map((item, idx) => {
              const isCompleted = progress.portfolioItems[idx];

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className={`font-bold text-sm ${
                      isCompleted
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {item}
                    </p>
                    {isCompleted && (
                      <span className="text-lg">✅</span>
                    )}
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${
                    isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {isCompleted ? 'Completed' : 'Not Started'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-6">
          <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center">
            <i className="fas fa-lightbulb text-indigo-500 mr-2" />
            Portfolio Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✓ Complete all 8 portfolio items to build a comprehensive project showcase</li>
            <li>✓ Each completed project demonstrates a specific technical skill</li>
            <li>✓ Share your portfolio with employers and the community</li>
            <li>✓ These projects form the foundation of your professional profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
