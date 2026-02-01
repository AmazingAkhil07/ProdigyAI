import React, { useState, useMemo } from 'react';
import { UserProgress } from '../types';
import { ROADMAP_DATA } from '../constants';

interface WeeklySchedulerProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
}

// Task difficulty time estimates (in minutes)
const DIFFICULTY_MINUTES: { [key: string]: number } = {
  'easy': 15,
  'medium': 45,
  'hard': 120,
  'default': 30
};

export const WeeklyScheduler: React.FC<WeeklySchedulerProps> = ({ progress, theme }) => {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [monthsToComplete, setMonthsToComplete] = useState(6);
  const [schedule, setSchedule] = useState<any>(null);

  // Find current phase based on progress
  const getCurrentPhaseIndex = () => {
    for (let phaseIdx = 0; phaseIdx < ROADMAP_DATA.length; phaseIdx++) {
      const phase = ROADMAP_DATA[phaseIdx];
      const phaseTasks = phase.modules.flatMap(m => m.todos);
      const allTasksCompleted = phaseTasks.every(t => progress.completedTodos.includes(t.id));
      
      if (!allTasksCompleted) {
        return phaseIdx;
      }
    }
    return ROADMAP_DATA.length - 1; // Last phase if all done
  };

  const currentPhaseIndex = getCurrentPhaseIndex();
  const currentPhase = ROADMAP_DATA[currentPhaseIndex];

  // Get tasks for current phase only
  const allTasksInCurrentPhase = useMemo(() => {
    return currentPhase.modules.flatMap(m => ({
      ...m.todos,
      moduleName: m.name,
      phaseTitle: currentPhase.title
    }));
  }, [currentPhase]);

  // Filter only remaining (not completed) tasks in current phase
  const remainingTasksInPhase = useMemo(() => {
    return allTasksInCurrentPhase.filter(t => !progress.completedTodos.includes(t.id));
  }, [allTasksInCurrentPhase, progress.completedTodos]);

  // Get phase progress
  const phaseProgress = useMemo(() => {
    const completed = allTasksInCurrentPhase.filter(t => progress.completedTodos.includes(t.id)).length;
    return {
      completed,
      total: allTasksInCurrentPhase.length,
      percentage: Math.round((completed / allTasksInCurrentPhase.length) * 100)
    };
  }, [allTasksInCurrentPhase, progress.completedTodos]);

  // Calculate total time needed for remaining tasks
  const calculateTotalMinutes = (tasks: any[]) => {
    return tasks.reduce((sum, task) => {
      const difficulty = task.difficulty || 'default';
      return sum + (DIFFICULTY_MINUTES[difficulty] || DIFFICULTY_MINUTES['default']);
    }, 0);
  };

  const generateSmartSchedule = () => {
    if (remainingTasksInPhase.length === 0) {
      return {
        phaseComplete: true,
        nextPhaseIndex: currentPhaseIndex + 1,
        nextPhaseTitle: currentPhaseIndex + 1 < ROADMAP_DATA.length ? ROADMAP_DATA[currentPhaseIndex + 1].title : null
      };
    }

    const totalMinutesNeeded = calculateTotalMinutes(remainingTasksInPhase);
    const totalMinutesAvailable = hoursPerWeek * 60 * 4.33 * monthsToComplete; // 4.33 weeks per month
    const minutesPerWeek = hoursPerWeek * 60;

    // Sort tasks by difficulty (hard first)
    const difficultyOrder = { 'hard': 3, 'medium': 2, 'easy': 1, 'default': 2 };
    const sortedTasks = [...remainingTasksInPhase].sort((a, b) => {
      const diffA = a.difficulty || 'default';
      const diffB = b.difficulty || 'default';
      return (difficultyOrder[diffB] || 2) - (difficultyOrder[diffA] || 2);
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const minutesPerDay = Math.floor(minutesPerWeek / 7);
    const weeksNeeded = Math.ceil(totalMinutesNeeded / minutesPerWeek);

    // Build schedule by distributing tasks across days
    const schedule: any[] = [];
    let taskIndex = 0;

    for (let dayIdx = 0; dayIdx < days.length && taskIndex < sortedTasks.length; dayIdx++) {
      const dayTasks = [];
      let dayMinutes = 0;

      // Fill up to available minutes per day
      while (taskIndex < sortedTasks.length && dayMinutes < minutesPerDay) {
        const task = sortedTasks[taskIndex];
        const taskMinutes = DIFFICULTY_MINUTES[task.difficulty || 'default'] || 30;

        dayTasks.push({
          ...task,
          estimatedMinutes: taskMinutes,
          difficulty: task.difficulty || 'default'
        });

        dayMinutes += taskMinutes;
        taskIndex++;
      }

      if (dayTasks.length > 0) {
        schedule.push({
          day: days[dayIdx],
          tasks: dayTasks,
          totalMinutes: dayMinutes,
          totalHours: (dayMinutes / 60).toFixed(1)
        });
      }
    }

    const isOnTrack = totalMinutesNeeded <= totalMinutesAvailable;
    const daysUntilDeadline = monthsToComplete * 30;
    const estimatedDaysNeeded = Math.ceil((totalMinutesNeeded / 60) / hoursPerWeek * 7);

    return {
      phaseComplete: false,
      currentPhaseIndex,
      currentPhaseTitle: currentPhase.title,
      nextPhaseIndex: currentPhaseIndex + 1,
      hasNextPhase: currentPhaseIndex + 1 < ROADMAP_DATA.length,
      totalMinutesNeeded,
      totalMinutesAvailable,
      minutesPerWeek,
      minutesPerDay,
      weeksNeeded,
      schedule,
      isOnTrack,
      daysUntilDeadline,
      estimatedDaysNeeded,
      percentageOfTimeline: Math.round((estimatedDaysNeeded / daysUntilDeadline) * 100),
      remainingTasksCount: remainingTasksInPhase.length,
      completedTasksInPhase: phaseProgress.completed,
      totalTasksInPhase: phaseProgress.total,
      phasePercentage: phaseProgress.percentage
    };
  };

  const handleGenerateSchedule = () => {
    const newSchedule = generateSmartSchedule();
    setSchedule(newSchedule);
  };

  return (
    <div className="min-h-screen flex-1 p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">
            AI Study Planner
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Phase-by-phase intelligent scheduling with realistic time estimates
          </p>
        </div>

        {/* Current Phase Badge */}
        <div className="mb-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-1">Current Phase</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{currentPhase.title}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{phaseProgress.percentage}%</p>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Progress</p>
            </div>
          </div>
          <div className="mt-3 bg-white dark:bg-slate-800 rounded-lg h-2 w-full">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-lg transition-all"
              style={{ width: `${phaseProgress.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Phase Tasks Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{phaseProgress.completed}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Phase Done</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{remainingTasksInPhase.length}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Remaining</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{phaseProgress.total}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Phase Total</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <p className="text-2xl font-black text-slate-600 dark:text-slate-400">{currentPhaseIndex + 1}/{ROADMAP_DATA.length}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Phase</p>
          </div>
        </div>

        {/* Planner Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 mb-8 shadow-lg">
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Weekly Hours */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-white mb-4">
                📅 Hours per week available
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 15, 20, 30].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setHoursPerWeek(hours)}
                    className={`py-3 px-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${
                      hoursPerWeek === hours
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {hours}h
                  </button>
                ))}
              </div>
            </div>

            {/* Completion Timeline */}
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-white mb-4">
                🎯 Complete this phase in (months)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 6, 12].map((months) => (
                  <button
                    key={months}
                    onClick={() => setMonthsToComplete(months)}
                    className={`py-3 px-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${
                      monthsToComplete === months
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {months}mo
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateSchedule}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg text-lg"
          >
            <i className="fas fa-brain mr-2" />
            Generate Phase Schedule
          </button>
        </div>

        {/* Generated Schedule */}
        {schedule && (
          <div className="space-y-6">
            {/* Phase Complete Message */}
            {schedule.phaseComplete ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 text-center">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                  {currentPhase.title} Complete!
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  You've mastered this phase. Ready for the next challenge?
                </p>
                {schedule.hasNextPhase && (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase mb-2">Next Phase</p>
                    <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                      {ROADMAP_DATA[schedule.nextPhaseIndex].title}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Status Card */}
                <div className={`rounded-3xl border-2 p-6 ${
                  schedule.isOnTrack 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                    : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg font-black text-slate-800 dark:text-white mb-2">
                        {schedule.isOnTrack ? '✅ You\'re on track!' : '⚠️ Warning: Tight Timeline'}
                      </p>
                      <p className={`text-sm font-medium ${schedule.isOnTrack ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
                        {schedule.isOnTrack 
                          ? `You have enough time to complete this phase. Estimated: ${schedule.weeksNeeded} weeks`
                          : `You need ${schedule.estimatedDaysNeeded} days but only have ${schedule.daysUntilDeadline} days. Consider more study hours or extend timeline.`
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{schedule.percentageOfTimeline}%</p>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">of timeline</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Total Time Needed</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white">{(schedule.totalMinutesNeeded / 60).toFixed(1)}h</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Per Day</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white">{schedule.minutesPerDay} min</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Weeks Needed</p>
                      <p className="text-xl font-black text-slate-800 dark:text-white">{schedule.weeksNeeded}w</p>
                    </div>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">
                    {currentPhase.title} - Weekly Schedule
                  </h2>

                  <div className="space-y-3">
                    {schedule.schedule.map((daySchedule: any, idx: number) => (
                      <div
                        key={idx}
                        className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-all bg-slate-50 dark:bg-slate-800/50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-slate-800 dark:text-white flex items-center text-lg">
                            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black mr-3">
                              {idx + 1}
                            </span>
                            {daySchedule.day}
                          </h3>
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                            {daySchedule.totalHours}h ({daySchedule.totalMinutes} min)
                          </span>
                        </div>

                        <div className="space-y-2">
                          {daySchedule.tasks.map((task: any, taskIdx: number) => {
                            const diffColors = {
                              'easy': 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
                              'medium': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
                              'hard': 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
                              'default': 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                            };
                            const colors = diffColors[task.difficulty] || diffColors['default'];
                            
                            return (
                              <div
                                key={taskIdx}
                                className="text-sm flex items-start justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex-1">
                                  <p className="text-slate-700 dark:text-slate-300 font-medium">{task.label}</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    {task.moduleName}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                  <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${colors}`}>
                                    {task.difficulty || 'default'} • {task.estimatedMinutes}m
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Difficulty Legend */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-3">Difficulty Levels</p>
                    <div className="flex gap-4 flex-wrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">easy • 15m</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">medium • 45m</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">hard • 120m</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6">
                  <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-3">
                    <i className="fas fa-lightbulb mr-2" />
                    Pro Tips:
                  </p>
                  <ul className="text-sm text-indigo-600 dark:text-indigo-400 space-y-2 ml-6">
                    <li>• This schedule covers only {currentPhase.title}</li>
                    <li>• Hard tasks are prioritized (scheduled first)</li>
                    <li>• Once phase complete, you'll unlock {schedule.nextPhaseIndex + 1 < ROADMAP_DATA.length ? ROADMAP_DATA[schedule.nextPhaseIndex].title : 'completion'}</li>
                    <li>• Completed tasks are auto-excluded from schedule</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

