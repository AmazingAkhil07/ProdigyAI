import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartsProps {
  taskHistory: { date: string; tasks: { id: string; label: string; moduleId?: string }[] }[];
  theme: 'light' | 'dark';
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ taskHistory, theme }) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const chartData = useMemo(() => {
    const today = new Date();
    const daysToShow = viewMode === 'week' ? 7 : 30;
    
    // Generate data for the last N days
    const data: { date: string; count: number; label: string }[] = [];
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find count for this date
      const historyEntry = taskHistory.find(h => h.date === dateStr);
      const count = historyEntry?.tasks.length || 0;
      
      // Format label (e.g., "Mon 01" or "Jan 15")
      const label = viewMode === 'week' 
        ? date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' })
        : date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      
      data.push({ date: dateStr, count, label });
    }
    
    return data;
  }, [taskHistory, viewMode]);

  const totalTasksInPeriod = useMemo(() => {
    return chartData.reduce((sum, day) => sum + day.count, 0);
  }, [chartData]);

  const averagePerDay = useMemo(() => {
    return (totalTasksInPeriod / chartData.length).toFixed(1);
  }, [totalTasksInPeriod, chartData]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center">
            <i className="fas fa-chart-line mr-2" />
            Progress Over Time
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'week'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'month'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{totalTasksInPeriod}</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Total Tasks
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{averagePerDay}</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Avg/Day
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? '#334155' : '#e2e8f0'}
          />
          <XAxis 
            dataKey="label" 
            tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12 }}
            stroke={theme === 'dark' ? '#475569' : '#cbd5e1'}
          />
          <YAxis 
            tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12 }}
            stroke={theme === 'dark' ? '#475569' : '#cbd5e1'}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            labelStyle={{ color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}
            itemStyle={{ color: '#6366f1' }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
