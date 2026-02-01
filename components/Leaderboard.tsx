import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { auth } from '../services/firebaseConfig';
import { firestoreService, UserLeaderboardEntry } from '../services/firestoreService';

interface LeaderboardProps {
  progress: UserProgress;
  theme: 'light' | 'dark';
  onProgressUpdate?: (progress: UserProgress) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ progress, theme, onProgressUpdate }) => {
  // Initialize from localStorage if available, otherwise from progress
  const [isJoined, setIsJoined] = useState(() => {
    if (progress.leaderboardOptIn !== undefined) {
      return progress.leaderboardOptIn;
    }
    const saved = localStorage.getItem(`leaderboardOptIn_${auth.currentUser?.uid}`);
    return saved === 'true';
  });
  const [leaderboardData, setLeaderboardData] = useState<UserLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get current user email
  const currentUserEmail = auth.currentUser?.email || '';
  
  // Sync isJoined state with progress when user changes accounts
  useEffect(() => {
    const savedValue = progress.leaderboardOptIn;
    if (savedValue !== undefined) {
      setIsJoined(savedValue);
    } else {
      // Fallback to localStorage
      const saved = localStorage.getItem(`leaderboardOptIn_${auth.currentUser?.uid}`);
      setIsJoined(saved === 'true');
    }
  }, [currentUserEmail, progress.leaderboardOptIn]);
  // Fetch leaderboard data - refetch when isJoined changes or user switches accounts
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const data = await firestoreService.getAllUsersProgress();
      
      // If current user is joined but not in the fetched data yet, add them optimistically
      if (isJoined && currentUserEmail && !data.find(u => u.email === currentUserEmail)) {
        const currentUserScore = (progress.completedTodos?.length || 0) * 10 +
                                (progress.streak || 0) * 5 +
                                ((progress.badges?.length || 0) * 20);
        
        data.unshift({
          uid: auth.currentUser?.uid || '',
          email: currentUserEmail,
          progress: progress,
          updatedAt: new Date().toISOString(),
          score: currentUserScore,
        });
        
        // Re-sort by score
        data.sort((a, b) => b.score - a.score);
      }
      
      setLeaderboardData(data);
      setLoading(false);
    };
    
    fetchLeaderboard();
  }, [isJoined, currentUserEmail]);

  // Find current user's rank
  const currentUserRank = leaderboardData.findIndex(user => user.email === currentUserEmail) + 1;
  const totalUsers = leaderboardData.length;

  // Save to localStorage whenever isJoined changes
  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      localStorage.setItem(`leaderboardOptIn_${userId}`, isJoined.toString());
    }
    // Update progress object and notify parent
    const updatedProgress = { ...progress, leaderboardOptIn: isJoined };
    if (onProgressUpdate) {
      onProgressUpdate(updatedProgress);
    }
    
    // Small delay to ensure data is saved before refetching
    const timer = setTimeout(() => {
      // Refetch will happen automatically via the isJoined dependency in the fetch useEffect
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isJoined, progress, onProgressUpdate]);

  return (
    <div className="min-h-screen flex-1 p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight mb-2">
            Leaderboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Track your progress and compete with the community
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
              <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">#{currentUserRank > 0 ? currentUserRank : 'N/A'}</p>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Your Rank</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Status */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Community Leaderboard</h2>

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
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mt-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">🏆 Top Learners</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400">Loading leaderboard...</p>
              </div>
            ) : leaderboardData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400">No learners yet. 🚀</p>
              </div>
            ) : (
              <>
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
                      {leaderboardData.map((user, index) => {
                        const isCurrentUser = user.email === currentUserEmail;
                        return (
                          <tr 
                            key={user.uid} 
                            className={`border-b border-slate-200 dark:border-slate-700 ${
                              isCurrentUser 
                                ? 'bg-amber-50/50 dark:bg-amber-900/20' 
                                : 'hover:bg-slate-100/50 dark:hover:bg-slate-700/30 transition-colors'
                            }`}
                          >
                            <td className={`py-3 px-4 font-bold ${isCurrentUser ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-400'}`}>
                              #{index + 1}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-bold text-slate-800 dark:text-white">
                                  {isCurrentUser ? 'You' : user.email.split('@')[0]}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-slate-800 dark:text-white">
                              {user.progress.completedTodos?.length || 0}
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-orange-600 dark:text-orange-400">
                              {user.progress.streak || 0}
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-yellow-600 dark:text-yellow-400">
                              {user.progress.badges?.length || 0}
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-amber-600 dark:text-amber-400">
                              {user.score}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">Score = (Tasks × 10) + (Streak × 5) + (Badges × 20)</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
                  {totalUsers === 1 ? '🚀 You\'re the first learner on the leaderboard!' : `${totalUsers} learners competing on the leaderboard!`}
                </p>
              </>
            )}
          </div>
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
