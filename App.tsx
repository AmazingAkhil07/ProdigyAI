
import React, { useState, useEffect, useMemo } from 'react';
import { Phase, UserProgress, Message } from './types';
import { ROADMAP_DATA, TOOLS_STACK, PORTFOLIO_CHECKLIST } from './constants';
import { ModuleCard } from './components/ModuleCard';
import { ProgressBar } from './components/ProgressBar';
import { PortfolioChecklist } from './components/PortfolioChecklist';
import { AIAssistant } from './components/AIAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('ai_roadmap_progress');
    if (saved) return JSON.parse(saved);
    return {
      completedTodos: [],
      portfolioItems: [],
      theme: 'dark',
      chatHistory: []
    };
  });

  useEffect(() => {
    localStorage.setItem('ai_roadmap_progress', JSON.stringify(progress));
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress]);

  const toggleTheme = () => {
    setProgress(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const handleToggleTodo = (id: string) => {
    setProgress(prev => ({
      ...prev,
      completedTodos: prev.completedTodos.includes(id) 
        ? prev.completedTodos.filter(tid => tid !== id)
        : [...prev.completedTodos, id]
    }));
  };

  const handleTogglePortfolio = (id: string) => {
    setProgress(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.includes(id)
        ? prev.portfolioItems.filter(pid => pid !== id)
        : [...prev.portfolioItems, id]
    }));
  };

  const handleUpdateChatHistory = (history: Message[]) => {
    setProgress(prev => ({ ...prev, chatHistory: history }));
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

  // Logic to find the current active task/module to resume
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
    a.download = 'ai-roadmap-progress.csv';
    a.click();
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
            <h1 className="font-bold text-slate-800 dark:text-white tracking-tight leading-none">AI Mastery</h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Roadmap Hub</p>
          </div>
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
            onClick={exportCSV}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <i className="fas fa-download mr-3 w-5" />
            Export CSV
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 h-screen overflow-y-auto custom-scrollbar">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
              {activeTab === 'dashboard' ? 'Learning Dashboard' : 'Mastery Roadmap'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Elevate your technical prowess.</p>
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
              <AIAssistant 
                currentPhase={nextUp?.phase || ROADMAP_DATA[0]} 
                progress={progress}
                onUpdateHistory={handleUpdateChatHistory}
              />
              <PortfolioChecklist progress={progress} onToggle={handleTogglePortfolio} />
            </div>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default App;
