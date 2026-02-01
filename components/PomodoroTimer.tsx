import React, { useState, useEffect, useRef } from 'react';

interface PomodoroTimerProps {
  theme: 'light' | 'dark';
  onSessionComplete?: (duration: number, moduleId?: string) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ theme, onSessionComplete }) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
    setIsRunning(false);
    
    if (mode === 'work') {
      setSessions((prev) => prev + 1);
      if (onSessionComplete) {
        onSessionComplete(workDuration);
      }
      // Play notification sound (optional)
      playNotificationSound();
      setMode('break');
      setTimeLeft(breakDuration);
    } else {
      setMode('work');
      setTimeLeft(workDuration);
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(workDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work' 
    ? ((workDuration - timeLeft) / workDuration) * 100
    : ((breakDuration - timeLeft) / breakDuration) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center">
          <i className="fas fa-clock mr-2" />
          Study Timer
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
            <i className="fas fa-check-circle text-indigo-500 text-xs" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {sessions}
            </span>
          </div>
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="text-center mb-6">
        <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
          mode === 'work' 
            ? 'bg-indigo-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
        }`}>
          {mode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
        </span>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <div className="w-48 h-48 mx-auto relative">
          {/* Progress Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={theme === 'dark' ? '#1e293b' : '#e2e8f0'}
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={mode === 'work' ? '#6366f1' : '#10b981'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-black text-slate-800 dark:text-white">
                {formatTime(timeLeft)}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                {mode === 'work' ? 'Work' : 'Break'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
              : mode === 'work'
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-indigo-500/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
          }`}
        >
          {isRunning ? (
            <>
              <i className="fas fa-pause mr-2" />
              Pause
            </>
          ) : (
            <>
              <i className="fas fa-play mr-2" />
              Start
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          title="Reset"
        >
          <i className="fas fa-redo text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Sessions Today
          </p>
          <p className="text-xl font-black text-slate-800 dark:text-white">
            {sessions}
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Time Studied
          </p>
          <p className="text-xl font-black text-amber-600 dark:text-amber-400">
            {Math.floor((sessions * 25) / 60)}h {(sessions * 25) % 60}m
          </p>
        </div>
      </div>
    </div>
  );
};
