import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { UserProgress } from '../types';

interface CalendarViewProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
}

export const CalendarView: React.FC<CalendarViewProps> = ({ progress, theme }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Get dates when tasks were completed
  const taskCompletionDates = useMemo(() => {
    return progress.taskHistory.map(h => h.date);
  }, [progress.taskHistory]);

  // Get tasks for selected date
  const tasksOnSelectedDate = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const entry = progress.taskHistory.find(h => h.date === dateStr);
    return entry?.tasks || [];
  }, [selectedDate, progress.taskHistory]);

  // Tile content to show dots on dates with activity
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const entry = progress.taskHistory.find(h => h.date === dateStr);
      
      if (entry && entry.tasks.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          </div>
        );
      }
    }
    return null;
  };

  // Style tiles based on activity
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const hasActivity = taskCompletionDates.includes(dateStr);
      
      if (hasActivity) {
        return 'calendar-active-day';
      }
    }
    return '';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center">
          <i className="fas fa-calendar-alt mr-2" />
          Activity Calendar
        </h3>
      </div>

      <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          background: transparent;
          font-family: inherit;
        }
        
        .react-calendar__tile {
          padding: 1rem 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }
        
        .react-calendar__tile:hover {
          background: ${theme === 'dark' ? '#1e293b' : '#f1f5f9'} !important;
        }
        
        .react-calendar__tile--active {
          background: #6366f1 !important;
          color: white !important;
        }
        
        .react-calendar__tile--now {
          background: ${theme === 'dark' ? '#334155' : '#e0e7ff'};
          color: ${theme === 'dark' ? '#e2e8f0' : '#312e81'};
        }
        
        .calendar-active-day {
          font-weight: bold;
          position: relative;
        }
        
        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: bold;
          color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};
        }
        
        .react-calendar__navigation button {
          font-size: 1rem;
          font-weight: bold;
          color: ${theme === 'dark' ? '#e2e8f0' : '#1e293b'};
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
        
        .react-calendar__navigation button:hover {
          background: ${theme === 'dark' ? '#1e293b' : '#f1f5f9'};
        }
        
        .react-calendar__tile {
          color: ${theme === 'dark' ? '#e2e8f0' : '#1e293b'};
        }
        
        .react-calendar__month-view__days__day--neighboringMonth {
          color: ${theme === 'dark' ? '#475569' : '#94a3b8'};
        }
      `}</style>

      <div className="mb-6">
        <Calendar
          value={selectedDate}
          onChange={(value) => setSelectedDate(value as Date)}
          tileContent={tileContent}
          tileClassName={tileClassName}
          locale="en-US"
        />
      </div>

      {/* Stats for selected date */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        {tasksOnSelectedDate.length > 0 ? (
          <div>
            <div className="mb-3 flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <i className="fas fa-check text-white text-sm" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 dark:text-white">
                  {tasksOnSelectedDate.length}
                </p>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Tasks Completed
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 max-h-40 overflow-y-auto">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Completed Tasks:</p>
              <ul className="space-y-1">
                {tasksOnSelectedDate.map((task, idx) => (
                  <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                    <i className="fas fa-circle-check text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{task.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
              <i className="fas fa-circle text-slate-500 dark:text-slate-400 text-sm" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 dark:text-white">
                0
              </p>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                No Tasks
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Monthly summary */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
          <p className="text-lg font-black text-slate-800 dark:text-white">
            {taskCompletionDates.length}
          </p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Active Days
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            {progress.taskHistory.reduce((sum, h) => sum + h.tasks.length, 0)}
          </p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Total Tasks
          </p>
        </div>
      </div>
    </div>
  );
};
