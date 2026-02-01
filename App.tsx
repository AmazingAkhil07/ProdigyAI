
import React, { useState, useEffect, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebaseConfig';
import { firestoreService } from './services/firestoreService';
import { Phase, UserProgress, Message, Note } from './types';
import { ROADMAP_DATA, TOOLS_STACK, PORTFOLIO_CHECKLIST } from './constants';
import { BADGES } from './constants/badges';
import { ModuleCard } from './components/ModuleCard';
import { ProgressBar } from './components/ProgressBar';
import { PortfolioChecklist } from './components/PortfolioChecklist';
import { AIAssistant } from './components/AIAssistant';
import { Auth } from './components/Auth';
import { BadgesGrid } from './components/BadgeDisplay';
import { ProgressCharts } from './components/ProgressCharts';
import { ResourcesPanel } from './components/ResourcesPanel';
import { NotesModal } from './components/NotesModal';
import { CalendarView } from './components/CalendarView';
import { PomodoroTimer } from './components/PomodoroTimer';
import { LearningOutcomes } from './components/LearningOutcomes';
import { FocusTracker } from './components/FocusTracker';
import { WeeklyScheduler } from './components/WeeklyScheduler';
import { Leaderboard } from './components/Leaderboard';

const Dashboard: React.FC<{ progress: UserProgress; setProgress: (p: UserProgress) => void }> = ({ progress, setProgress }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'resources' | 'profile' | 'leaderboard' | 'scheduler' | 'timer' | 'notifications'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [selectedModuleName, setSelectedModuleName] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    taskReminders: true,
    streakAlerts: true,
    badgeNotifications: true,
    browserNotifications: false
  });

  const toggleTheme = () => {
    setProgress({
      ...progress,
      theme: progress.theme === 'light' ? 'dark' : 'light'
    });
  };

  // Calculate and update streak
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = progress.lastLoginDate || '';
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const newStreak = lastLogin === yesterdayStr ? progress.streak + 1 : 1;
      
      setProgress({
        ...progress,
        lastLoginDate: today,
        streak: newStreak
      });
    }
  }, []);

  // Check and award badges
  useEffect(() => {
    const earnedBadges = BADGES.filter(badge => badge.condition(progress)).map(b => b.id);
    const newBadges = earnedBadges.filter(id => !progress.badges.includes(id));
    
    if (newBadges.length > 0) {
      setProgress({
        ...progress,
        badges: earnedBadges
      });

      // Send notifications for new badges
      if (notificationsEnabled.badgeNotifications && 'Notification' in window && Notification.permission === 'granted') {
        newBadges.forEach(badgeId => {
          const badge = BADGES.find(b => b.id === badgeId);
          if (badge) {
            new Notification('🏆 Badge Unlocked!', {
              body: `You've earned the ${badge.name} badge!`,
              icon: '/favicon.ico',
              tag: 'badge-' + badgeId,
              requireInteraction: false
            });
          }
        });
      }
    }
  }, [progress.completedTodos, progress.portfolioItems, progress.streak, notificationsEnabled.badgeNotifications]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Don't auto-request, let user decide in settings
    }
  }, []);

  const handleToggleTodo = (id: string) => {
    const isCompleting = !progress.completedTodos.includes(id);
    const newCompletedTodos = isCompleting
      ? [...progress.completedTodos, id]
      : progress.completedTodos.filter(tid => tid !== id);

    // Update task history for today
    let newTaskHistory = [...progress.taskHistory];
    const today = new Date().toISOString().split('T')[0];
    let todayEntry = newTaskHistory.find(h => h.date === today);
    
    if (!todayEntry) {
      todayEntry = { date: today, tasks: [] };
      newTaskHistory.push(todayEntry);
    }

    // Find the task label from ROADMAP_DATA
    let taskLabel = '';
    let moduleId = '';
    for (const phase of ROADMAP_DATA) {
      for (const mod of phase.modules) {
        const todo = mod.todos.find(t => t.id === id);
        if (todo) {
          taskLabel = todo.label;
          moduleId = mod.id;
          break;
        }
      }
    }

    if (isCompleting) {
      // Add task to today's history
      if (!todayEntry.tasks.find(t => t.id === id)) {
        todayEntry.tasks.push({ id, label: taskLabel, moduleId });
      }
    } else {
      // Remove task from today's history and all dates
      newTaskHistory = newTaskHistory.map(entry => ({
        ...entry,
        tasks: entry.tasks.filter(t => t.id !== id)
      })).filter(entry => entry.tasks.length > 0);
    }

    setProgress({
      ...progress,
      completedTodos: newCompletedTodos,
      taskHistory: newTaskHistory
    });
  };

  const handleTogglePortfolio = (id: string) => {
    setProgress({
      ...progress,
      portfolioItems: progress.portfolioItems.includes(id)
        ? progress.portfolioItems.filter(pid => pid !== id)
        : [...progress.portfolioItems, id]
    });
  };

  const handleUpdateChatHistory = (history: Message[]) => {
    setProgress({ ...progress, chatHistory: history });
  };

  const handleOpenNotes = (moduleId: string, moduleName: string) => {
    setSelectedModuleId(moduleId);
    setSelectedModuleName(moduleName);
    setNotesModalOpen(true);
  };

  const handleSaveNote = (moduleId: string, content: string, noteId?: string) => {
    const now = new Date().toISOString();
    let updatedNotes = [...progress.notes];

    if (noteId) {
      // Update existing note
      updatedNotes = updatedNotes.map(note =>
        note.id === noteId
          ? { ...note, content, updatedAt: now }
          : note
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: `note-${Date.now()}`,
        moduleId,
        content,
        createdAt: now,
        updatedAt: now
      };
      updatedNotes.push(newNote);
    }

    setProgress({ ...progress, notes: updatedNotes });
  };

  const handleDeleteNote = (noteId: string) => {
    setProgress({
      ...progress,
      notes: progress.notes.filter(n => n.id !== noteId)
    });
  };

  const overallProgress = useMemo(() => {
    const allTodos = ROADMAP_DATA.flatMap(p => p.modules.flatMap(m => m.todos));
    if (allTodos.length === 0) return 0;
    return (progress.completedTodos.length / allTodos.length) * 100;
  }, [progress.completedTodos]);

  const phaseProgress = (phaseId: string) => {
    const phase = ROADMAP_DATA.find(p => p.id === phaseId);
    if (!phase) return 0;
    const phaseTodos = phase.modules.flatMap(m => m.todos);
    if (phaseTodos.length === 0) return 0;
    const completed = phaseTodos.filter(t => progress.completedTodos.includes(t.id)).length;
    return (completed / phaseTodos.length) * 100;
  };

  const nextUp = useMemo(() => {
    for (const phase of ROADMAP_DATA) {
      for (const mod of phase.modules) {
        const pendingTodo = mod.todos.find(t => !progress.completedTodos.includes(t.id));
        if (pendingTodo) {
          return { phase, mod, todo: pendingTodo };
        }
      }
    }
    return null;
  }, [progress.completedTodos]);

  const filteredRoadmap = ROADMAP_DATA.map(phase => ({
    ...phase,
    modules: phase.modules.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(phase => phase.modules.length > 0);

  const exportCSV = () => {
    const header = "Phase,Module,Task,Status\n";
    const rows = ROADMAP_DATA.flatMap(phase => 
      phase.modules.flatMap(mod => 
        mod.todos.map(todo => {
          const status = progress.completedTodos.includes(todo.id) ? "Completed" : "Pending";
          return `"${phase.title}","${mod.name}","${todo.label}","${status}"`;
        })
      )
    ).join("\n");
    
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prodigy-ai-progress.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col fixed md:relative z-20 h-auto md:h-screen">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fas fa-brain text-lg" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 dark:text-white tracking-tight leading-none">ProdigyAI</h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Master & Build</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="mb-8 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {(auth.currentUser?.email?.charAt(0) || '?').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                {auth.currentUser?.email}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">ProdigyAI User</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-indigo-200 dark:border-indigo-800">
            <div className="text-center">
              <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{progress.completedTodos.length}</p>
              <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-black text-orange-500 dark:text-orange-400">{progress.streak || 0}🔥</p>
              <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Streak</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-black text-yellow-500 dark:text-yellow-400">{progress.badges?.length || 0}🏆</p>
              <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Badges</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg uppercase tracking-widest transition-all flex items-center justify-center"
          >
            <i className="fas fa-user-circle mr-2" />
            Public Profile
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <i className="fas fa-columns w-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('roadmap')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'roadmap' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <i className="fas fa-map-marked-alt w-5" />
            <span>Roadmap</span>
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'resources' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <i className="fas fa-book-open w-5" />
            <span>Resources</span>
          </button>

          {/* Advanced Features */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-4 mb-2">Tools</p>
            <button 
              onClick={() => setActiveTab('timer')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'timer' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <i className="fas fa-clock w-5" />
              <span>Focus Timer</span>
            </button>
            <button 
              onClick={() => setActiveTab('scheduler')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'scheduler' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <i className="fas fa-calendar-check w-5" />
              <span>Weekly Schedule</span>
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <i className="fas fa-trophy w-5" />
              <span>Leaderboard</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <span className="flex items-center">
              <i className={`fas fa-${progress.theme === 'light' ? 'moon' : 'sun'} mr-3 w-5`} />
              {progress.theme === 'light' ? 'Dark' : 'Light'} Mode
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-all ${activeTab === 'notifications' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <i className="fas fa-bell mr-3 w-5" />
            Notifications
          </button>
          <button 
            onClick={exportCSV}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <i className="fas fa-download mr-3 w-5" />
            Export CSV
          </button>
          <button 
            onClick={() => auth.signOut()}
            className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <i className="fas fa-sign-out-alt mr-3 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 h-screen overflow-y-auto custom-scrollbar">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
              {activeTab === 'dashboard' ? 'Learning Dashboard' : activeTab === 'roadmap' ? 'Mastery Roadmap' : activeTab === 'resources' ? 'Learning Resources' : activeTab === 'profile' ? 'Public Profile' : activeTab === 'leaderboard' ? 'Leaderboard' : activeTab === 'scheduler' ? 'Weekly Schedule' : activeTab === 'timer' ? 'Focus Timer' : 'Notifications'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {activeTab === 'dashboard' ? 'Elevate your technical prowess.' : activeTab === 'roadmap' ? 'Elevate your technical prowess.' : activeTab === 'resources' ? 'Curated courses & certifications for every module' : activeTab === 'profile' ? 'Share your learning journey with the world' : activeTab === 'leaderboard' ? 'See where you stand in the community' : activeTab === 'scheduler' ? 'AI-powered personalized study schedule' : activeTab === 'timer' ? 'Track focused work sessions' : 'Manage your learning reminders'}
            </p>
          </div>

          {activeTab === 'roadmap' && (
            <div className="relative w-full md:w-64">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input 
                type="text" 
                placeholder="Find a module..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all shadow-sm"
              />
            </div>
          )}


        </header>

        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {/* Highlight Area: Next Up / Resume */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full">Next Milestone</span>
                  {nextUp ? (
                    <>
                      <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-4 tracking-tight">
                        {nextUp.todo.label}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
                        Module: <span className="text-slate-700 dark:text-slate-200">{nextUp.mod.name}</span>
                      </p>
                      <button 
                        onClick={() => setActiveTab('roadmap')}
                        className="mt-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center space-x-3"
                      >
                        <span>Resume Journey</span>
                        <i className="fas fa-arrow-right text-xs" />
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-4 tracking-tight">
                        All Caught Up!
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                        You've completed all tasks. Time to refine your portfolio!
                      </p>
                    </>
                  )}
                </div>
                <div className="relative z-10 hidden md:block w-48 h-48 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 flex flex-col justify-center items-center text-center">
                   <div className="text-4xl font-black text-indigo-600 mb-2">{Math.round(overallProgress)}%</div>
                   <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Progress</div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <LearningOutcomes theme={progress.theme} />

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
                    <i className="fas fa-tasks text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completed</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">{progress.completedTodos.length} Tasks</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                    <i className="fas fa-certificate text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portfolios</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">{progress.portfolioItems.length} Milestone{progress.portfolioItems.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              {/* Phase Breakdown */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center">
                    <i className="fas fa-layer-group mr-2" />
                    Phase Progress
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ROADMAP_DATA.map((phase) => (
                    <div key={phase.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group transition-all hover:shadow-md">
                      <div className="relative z-10">
                        <h4 className="font-bold text-slate-800 dark:text-white text-xs mb-1 truncate">{phase.title}</h4>
                        <ProgressBar 
                          progress={phaseProgress(phase.id)} 
                          colorClass={`bg-${phase.color}`} 
                          size="sm"
                          label="Mastery"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Achievements & Badges */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center">
                    <i className="fas fa-trophy mr-2" />
                    Achievements ({progress.badges?.length || 0}/{BADGES.length})
                  </h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <BadgesGrid badges={BADGES} earnedBadges={progress.badges || []} />
                </div>
              </section>

              {/* Progress Charts */}
              <section>
                <ProgressCharts taskHistory={progress.taskHistory} theme={progress.theme} />
              </section>

              {/* Latest AI Tools */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
                  <i className="fas fa-tools mr-2" />
                  AI Stack
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {TOOLS_STACK.map((tool) => (
                    <a 
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-400 transition-all hover:translate-y-[-2px] group"
                    >
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">{tool.name}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-tighter mt-1">{tool.category}</p>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <PomodoroTimer theme={progress.theme} />
              <AIAssistant 
                currentPhase={nextUp?.phase || ROADMAP_DATA[0]} 
                progress={progress}
                onUpdateHistory={handleUpdateChatHistory}
              />
              <CalendarView progress={progress} theme={progress.theme} />
              <PortfolioChecklist progress={progress} onToggle={handleTogglePortfolio} />
            </div>
          </div>
        ) : activeTab === 'roadmap' ? (
          <div className="space-y-12 pb-20">
            {filteredRoadmap.map((phase) => (
              <section key={phase.id} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-6 gap-4">
                  <div className="max-w-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`text-[10px] font-black bg-${phase.color}/10 text-${phase.color} px-3 py-1 rounded-full uppercase tracking-widest`}>
                        {phase.duration}
                      </span>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                        {phase.title}
                      </h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                      {phase.goal}
                    </p>
                  </div>
                  <div className="w-full md:w-72 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <ProgressBar 
                      progress={phaseProgress(phase.id)} 
                      colorClass={`bg-${phase.color}`} 
                      label="Phase Mastery" 
                      size="md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {phase.modules.map((mod) => (
                    <ModuleCard 
                      key={mod.id} 
                      module={mod} 
                      progress={progress} 
                      onToggleTodo={handleToggleTodo}
                      colorClass={`bg-${phase.color}`}
                      onOpenNotes={handleOpenNotes}
                    />
                  ))}
                </div>
              </section>
            ))}

            {filteredRoadmap.length === 0 && (
              <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 mb-6">
                  <i className="fas fa-search text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">No modules found matching "{searchQuery}"</h3>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-widest hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>
        ) : activeTab === 'resources' ? (
          <div className="h-[calc(100vh-8rem)]">
            <ResourcesPanel roadmapData={ROADMAP_DATA} theme={progress.theme} />
          </div>
        ) : activeTab === 'timer' ? (
          <FocusTracker progress={progress} theme={progress.theme} />
        ) : activeTab === 'profile' ? (
          <div className="max-w-4xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Your Public Profile</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Share your learning journey with employers and the community</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Profile URL</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-mono bg-white dark:bg-slate-800 p-3 rounded-lg break-all">prodigyai.dev/user/{auth.currentUser?.uid?.slice(0, 8)}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Share</p>
                  <button 
                    onClick={() => {
                      const url = `prodigyai.dev/user/${auth.currentUser?.uid?.slice(0, 8)}`;
                      navigator.clipboard.writeText(url).then(() => {
                        alert('✅ Link copied to clipboard!');
                      }).catch(() => {
                        alert('❌ Failed to copy link');
                      });
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition-all">
                    <i className="fas fa-share-alt mr-2" />
                    Copy Link
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Your Achievements</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{progress.completedTodos.length}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-2">Tasks</p>
                  </div>
                  <div className="text-center bg-white dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-2xl font-black text-orange-500 dark:text-orange-400">{progress.streak}🔥</p>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-2">Streak</p>
                  </div>
                  <div className="text-center bg-white dark:bg-slate-900 p-4 rounded-xl">
                    <p className="text-2xl font-black text-yellow-500 dark:text-yellow-400">{progress.badges?.length || 0}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-2">Badges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'leaderboard' ? (
          <Leaderboard progress={progress} theme={progress.theme} />
        ) : activeTab === 'scheduler' ? (
          <WeeklyScheduler progress={progress} theme={progress.theme} />
        ) : activeTab === 'notifications' ? (
          <div className="max-w-4xl">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Notification Settings</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Stay motivated with timely reminders</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Task Reminders</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get reminded to complete daily tasks</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationsEnabled.taskReminders}
                      onChange={(e) => setNotificationsEnabled({...notificationsEnabled, taskReminders: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Streak Alerts</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Notified before losing your streak</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationsEnabled.streakAlerts}
                      onChange={(e) => setNotificationsEnabled({...notificationsEnabled, streakAlerts: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">New Badges</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Celebrate when you unlock achievements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationsEnabled.badgeNotifications}
                      onChange={(e) => setNotificationsEnabled({...notificationsEnabled, badgeNotifications: e.target.checked})}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Browser Notifications</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Enable desktop notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationsEnabled.browserNotifications}
                      onChange={(e) => {
                        if (e.target.checked && 'Notification' in window) {
                          if (Notification.permission === 'granted') {
                            setNotificationsEnabled({...notificationsEnabled, browserNotifications: true});
                          } else if (Notification.permission !== 'denied') {
                            Notification.requestPermission().then((permission) => {
                              if (permission === 'granted') {
                                setNotificationsEnabled({...notificationsEnabled, browserNotifications: true});
                                new Notification('ProdigyAI', { body: 'Browser notifications enabled! 🎉' });
                              }
                            });
                          }
                        } else {
                          setNotificationsEnabled({...notificationsEnabled, browserNotifications: false});
                        }
                      }}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Notes Modal */}
      {notesModalOpen && (
        <NotesModal
          moduleId={selectedModuleId}
          moduleName={selectedModuleName}
          notes={progress.notes}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
          onClose={() => setNotesModalOpen(false)}
          theme={progress.theme}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [progress, setProgress] = useState<UserProgress>({
    completedTodos: [],
    portfolioItems: [],
    theme: 'dark',
    chatHistory: [],
    badges: [],
    streak: 0,
    lastLoginDate: '',
    taskHistory: [],
    notes: []
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load user data from Firestore when user logs in
  useEffect(() => {
    if (user && !dataLoaded) {
      firestoreService.loadProgress()
        .then((savedProgress) => {
          if (savedProgress) {
            setProgress(savedProgress);
          }
          setDataLoaded(true);
        })
        .catch((error) => {
          console.error('Failed to load progress:', error);
          setDataLoaded(true);
        });
    }
  }, [user, dataLoaded]);

  // Save progress to Firestore whenever it changes
  useEffect(() => {
    if (user && dataLoaded) {
      firestoreService.saveProgress(progress).catch((error) => {
        console.error('Failed to save progress:', error);
      });
    }
  }, [progress, user, dataLoaded]);

  // Update theme in DOM
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth theme={progress.theme} />;
  }

  return <Dashboard progress={progress} setProgress={setProgress} />;
};

export default App;
