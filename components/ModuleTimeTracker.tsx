import React, { useMemo } from 'react';
import { UserProgress } from '../types';
import { ROADMAP_DATA } from '../constants';

interface ModuleTimeTrackerProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
}

export const ModuleTimeTracker: React.FC<ModuleTimeTrackerProps> = ({ progress, theme }) => {
  // Calculate time spent per module based on completed tasks
  const moduleTimeData = useMemo(() => {
    const timePerModule: { [key: string]: { moduleName: string; tasksCount: number; estimatedHours: number; taskIds: string[] } } = {};

    // Iterate through all phases and modules
    ROADMAP_DATA.forEach(phase => {
      phase.modules.forEach(module => {
        const completedInModule = module.todos.filter(t => progress.completedTodos.includes(t.id));
        
        if (completedInModule.length > 0) {
          // Calculate estimated hours based on difficulty
          const estimatedMinutes = completedInModule.reduce((sum, task) => {
            const difficulty = task.difficulty || 'default';
            const difficultyMinutes = { 'easy': 15, 'medium': 45, 'hard': 120, 'default': 30 };
            return sum + (difficultyMinutes[difficulty] || 30);
          }, 0);

          timePerModule[module.id] = {
            moduleName: module.name,
            tasksCount: completedInModule.length,
            estimatedHours: Math.round(estimatedMinutes / 60 * 10) / 10, // Round to 1 decimal
            taskIds: completedInModule.map(t => t.id)
          };
        }
      });
    });

    return timePerModule;
  }, [progress.completedTodos]);

  const modules = Object.values(moduleTimeData);
  const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);
  const totalTasks = modules.reduce((sum, m) => sum + m.tasksCount, 0);

  return (
    <div className="min-h-screen flex-1 p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">
            ⏱️ Module Time Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Track how much time you've invested in each module
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{totalTasks}</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-2">
              Tasks Completed
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{modules.length}</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-2">
              Modules Started
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <p className="text-3xl font-black text-orange-600 dark:text-orange-400">{totalHours}h</p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-2">
              Total Time Invested
            </p>
          </div>
        </div>

        {/* Module Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Module Breakdown</h2>

          {modules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Complete tasks to track time spent per module 📊
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((module, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-md transition-all bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-800/50 dark:to-transparent">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                        {module.moduleName}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          <i className="fas fa-tasks" />
                          <span>{module.tasksCount} tasks</span>
                        </span>
                        <span className="inline-flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-lg text-sm font-bold text-orange-600 dark:text-orange-400">
                          <i className="fas fa-clock" />
                          <span>{module.estimatedHours}h</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-800 dark:text-white">{Math.round((module.estimatedHours / totalHours) * 100)}%</p>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">of total time</p>
                    </div>
                  </div>

                  {/* Time visualization bar */}
                  <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all"
                      style={{ width: `${(module.estimatedHours / totalHours) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
              💡 Time Estimates
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Easy</span>
                <p className="text-slate-600 dark:text-slate-400">15 minutes per task</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                <span className="font-bold text-amber-600 dark:text-amber-400">Medium</span>
                <p className="text-slate-600 dark:text-slate-400">45 minutes per task</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                <span className="font-bold text-red-600 dark:text-red-400">Hard</span>
                <p className="text-slate-600 dark:text-slate-400">120 minutes per task</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
