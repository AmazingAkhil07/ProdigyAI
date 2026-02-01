import React, { useState, useEffect, useRef } from 'react';
import { UserProgress } from '../types';

interface FocusTrackerProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
}

export const FocusTracker: React.FC<FocusTrackerProps> = ({ progress, theme }) => {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('focusSessions');
    return saved ? parseInt(saved) : 0;
  });
  const [totalSpentMinutes, setTotalSpentMinutes] = useState(() => {
    const saved = localStorage.getItem('totalSpentMinutes');
    return saved ? parseInt(saved) : 0;
  });
  const sessionStartTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Timer completed
            setIsRunning(false);
            setSessions(s => {
              const newSessions = s + 1;
              localStorage.setItem('focusSessions', newSessions.toString());
              return newSessions;
            });
            setTotalSpentMinutes(t => {
              const newTotal = t + 25;
              localStorage.setItem('totalSpentMinutes', newTotal.toString());
              return newTotal;
            });
            sessionStartTimeRef.current = null;
            return 25 * 60; // Reset to 25 minutes
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    sessionStartTimeRef.current = Date.now();
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    // Calculate time spent in this session and add to total
    if (sessionStartTimeRef.current) {
      const timeSpentMs = Date.now() - sessionStartTimeRef.current;
      const timeSpentMin = Math.floor(timeSpentMs / 60000);
      if (timeSpentMin > 0) {
        setTotalSpentMinutes(prev => {
          const newTotal = prev + timeSpentMin;
          localStorage.setItem('totalSpentMinutes', newTotal.toString());
          return newTotal;
        });
      }
      sessionStartTimeRef.current = null;
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    // Add time spent to total before resetting
    if (sessionStartTimeRef.current) {
      const timeSpentMs = Date.now() - sessionStartTimeRef.current;
      const timeSpentMin = Math.floor(timeSpentMs / 60000);
      if (timeSpentMin > 0) {
        setTotalSpentMinutes(prev => {
          const newTotal = prev + timeSpentMin;
          localStorage.setItem('totalSpentMinutes', newTotal.toString());
          return newTotal;
        });
      }
      sessionStartTimeRef.current = null;
    }
    setTimerSeconds(25 * 60); // Reset to 25 minutes
  };

  // Calculate hours and remaining minutes
  const timerMinutes = Math.floor(timerSeconds / 60);
  const displaySeconds = timerSeconds % 60;
  const totalHours = Math.floor(totalSpentMinutes / 60);
  const remainingMinutes = totalSpentMinutes % 60;

  return (
    <div className="min-h-screen flex-1 p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">
            Focus Timer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Track focused work sessions with the Pomodoro technique
          </p>
        </div>

        {/* Main Timer Display */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 shadow-xl mb-8">
          <div className="text-center mb-8">
            <div className="text-7xl font-black text-amber-600 dark:text-amber-400 tabular-nums mb-4">
              {String(timerMinutes).padStart(2, '0')}:{String(displaySeconds).padStart(2, '0')}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Time Remaining
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center mb-8">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all"
              >
                <i className="fas fa-play mr-2" />
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all"
              >
                <i className="fas fa-pause mr-2" />
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all"
            >
              <i className="fas fa-redo mr-2" />
              Reset
            </button>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{sessions}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-orange-600 dark:text-orange-400">{totalSpentMinutes}m</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Total Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {totalHours}h {remainingMinutes}m
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Spent</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-6">
          <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center">
            <i className="fas fa-lightbulb text-indigo-500 mr-2" />
            Pomodoro Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✓ Work for 25 minutes, then take a 5-minute break</li>
            <li>✓ After 4 sessions, take a longer 15-30 minute break</li>
            <li>✓ Keep your workspace distraction-free</li>
            <li>✓ One session = one complete, focused task</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
