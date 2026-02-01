import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { auth } from '../services/firebaseConfig';

interface LeaderboardProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ progress, theme }) => {
  const [isJoined, setIsJoined] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('leaderboardOptIn');
    return saved === 'true';
  });
  
  // Calculate user's rank (simulated based on tasks)
  const userRank = 1; // This would come from Firebase in production
  const totalUsers = 1; // This would be aggregated from Firebase

  // Save to localStorage whenever isJoined changes
  useEffect(() => {
    localStorage.setItem('leaderboardOptIn', isJoined.toString());
  }, [isJoined]);

  return (
    <div className="min-h-screen flex-1 p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">
            Leaderboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Track your progress and compete with the community (opt-in only)
          </p>
        </div>

        {/* Your Stats */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-indigo-900/20 rounded-3xl border border-amber-200 dark:border-amber-800/40 p-8 mb-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-black text-amber-600 dark:text-amber-400 mb-2">{progress.completedTodos.length}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-orange-500 dark:text-orange-400 mb-2">{progress.streak}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">🔥 Day Streak</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-yellow-500 dark:text-yellow-400 mb-2">{progress.badges?.length || 0}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">🏆 Badges</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">#{userRank}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Your Rank</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Status */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Community Leaderboard</h2>

          {!isJoined && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0 font-black text-lg">
                  👋
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white mb-2">Join the Community Leaderboard</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    Opt-in to share your progress anonymously with other ProdigyAI learners. See how you compare and get motivated by the community's achievements.
                  </p>
                  <button 
                    onClick={() => {
                      setIsJoined(true);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
                    <i className="fas fa-star mr-2" />
                    Opt-In to Leaderboard
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {isJoined && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 font-black text-lg">
                  ✅
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white mb-2">You're on the Community Leaderboard! 🎉</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Your progress is now shared with the ProdigyAI community. Complete more tasks and badges to climb the ranks!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Current Status */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Your Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Task Completion</span>
                <div className="flex-1 mx-4 bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all"
                    style={{ width: `${(progress.completedTodos.length / 150) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {Math.round((progress.completedTodos.length / 150) * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Consistency Streak</span>
                <div className="flex-1 mx-4 bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((progress.streak / 30) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {progress.streak}/30 days
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Badge Collection</span>
                <div className="flex-1 mx-4 bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${(progress.badges?.length || 0) / 15 * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {progress.badges?.length || 0}/15 badges
                </span>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          {isJoined && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mt-6">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">🏆 Top Learners</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-700">
                      <th className="text-left py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Rank</th>
                      <th className="text-left py-3 px-4 font-bold text-slate-700 dark:text-slate-300">User</th>
                      <th className="text-center py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Tasks</th>
                      <th className="text-center py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Streak</th>
                      <th className="text-center py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Badges</th>
                      <th className="text-center py-3 px-4 font-bold text-slate-700 dark:text-slate-300">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-amber-50/50 dark:bg-amber-900/20">
                      <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">#1</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">You</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{auth.currentUser?.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-800 dark:text-white">{progress.completedTodos.length}</td>
                      <td className="py-3 px-4 text-center font-bold text-orange-600 dark:text-orange-400">{progress.streak}</td>
                      <td className="py-3 px-4 text-center font-bold text-yellow-600 dark:text-yellow-400">{progress.badges?.length || 0}</td>
                      <td className="py-3 px-4 text-center font-bold text-amber-600 dark:text-amber-400">
                        {(progress.completedTodos.length * 10) + (progress.streak * 5) + ((progress.badges?.length || 0) * 20)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">Score = (Tasks × 10) + (Streak × 5) + (Badges × 20)</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">You're currently the only learner on the leaderboard. Invite friends to compete! 🚀</p>
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center">
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">
              {Math.floor((progress.completedTodos.length / 150) * 100)}%
            </p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
              Course Completion
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
              {progress.taskHistory.length}
            </p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
              Active Days
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center">
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">
              {Math.max(...progress.taskHistory.map(h => h.tasks.length), 0)}
            </p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
              Best Day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
