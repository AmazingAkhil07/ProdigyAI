import React, { useState, useMemo } from 'react';
import { Phase } from '../types';

interface RoadmapViewProps {
  phases: Phase[];
  completedTodos?: string[];
  onModuleSelect?: (moduleId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ phases, completedTodos = [], onModuleSelect }) => {
  const [expandedPhase, setExpandedPhase] = useState<string>('p0');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const phaseColors = {
    phase0: 'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700',
    phase1: 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700',
    phase2: 'bg-cyan-100 dark:bg-cyan-900 border-cyan-300 dark:border-cyan-700',
    phase3: 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700',
    phase4: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700',
    phase5: 'bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-700',
    phase6: 'bg-pink-100 dark:bg-pink-900 border-pink-300 dark:border-pink-700',
    phase7: 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700',
    phase8: 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700',
  };

  const phaseBadgeColors = {
    phase0: 'bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200',
    phase1: 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200',
    phase2: 'bg-cyan-200 dark:bg-cyan-700 text-cyan-800 dark:text-cyan-200',
    phase3: 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200',
    phase4: 'bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200',
    phase5: 'bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200',
    phase6: 'bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-200',
    phase7: 'bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200',
    phase8: 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200',
  };

  const filteredPhases = useMemo(() => {
    if (!searchQuery) return phases;
    const query = searchQuery.toLowerCase();
    return phases.filter(phase =>
      phase.title.toLowerCase().includes(query) ||
      phase.goal.toLowerCase().includes(query) ||
      phase.modules.some(m =>
        m.name.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      )
    );
  }, [phases, searchQuery]);

  const calculateModuleProgress = (moduleId: string) => {
    // Find all todos for this module
    const todos = phases
      .flatMap(p => p.modules)
      .find(m => m.id === moduleId)?.todos || [];
    if (todos.length === 0) return 0;
    const completed = todos.filter(t => completedTodos.includes(t.id)).length;
    return Math.round((completed / todos.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="🔍 Search phases, modules, or courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phase Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhases.map((phase) => (
          <div
            key={phase.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
              expandedPhase === phase.id
                ? phaseColors[phase.color as keyof typeof phaseColors]
                : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'
            }`}
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? '' : phase.id)}
          >
            <h3 className="font-bold text-lg mb-2">{phase.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{phase.goal}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-600">
                ⏱ {phase.duration}
              </span>
              <span className="text-xs font-semibold">{phase.modules.length} modules</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Phase View */}
      {expandedPhase && filteredPhases.find(p => p.id === expandedPhase) && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 space-y-6">
          {filteredPhases.map(
            (phase) =>
              phase.id === expandedPhase && (
                <div key={phase.id} className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-3xl font-bold mb-2">{phase.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{phase.goal}</p>
                    <div className="flex gap-4 flex-wrap">
                      <span className={`px-4 py-2 rounded-full font-semibold ${phaseBadgeColors[phase.color as keyof typeof phaseBadgeColors]}`}>
                        Duration: {phase.duration}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 font-semibold">
                        {phase.modules.length} Modules
                      </span>
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="space-y-4">
                    {phase.modules.map((module) => {
                      const progress = calculateModuleProgress(module.id);
                      return (
                        <div
                          key={module.id}
                          className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-lg">{module.name}</h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{module.description}</p>
                            </div>
                            <button
                              onClick={() => onModuleSelect?.(module.id)}
                              className="ml-4 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-semibold transition"
                            >
                              Select
                            </button>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="font-semibold">Progress</span>
                              <span className="text-gray-600 dark:text-gray-400">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Learning Sources */}
                          {module.learningSources.length > 0 && (
                            <div className="mb-3">
                              <h5 className="font-semibold text-sm mb-2">📚 Learning Resources:</h5>
                              <div className="space-y-1">
                                {module.learningSources.map((source, idx) => (
                                  <a
                                    key={idx}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 text-sm block hover:underline"
                                  >
                                    🔗 {source.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Todos */}
                          {module.todos.length > 0 && (
                            <div className="mb-3">
                              <h5 className="font-semibold text-sm mb-2">✅ Todos ({module.todos.filter(t => completedTodos.includes(t.id)).length}/{module.todos.length}):</h5>
                              <ul className="space-y-1">
                                {module.todos.map((todo) => (
                                  <li key={todo.id} className="text-sm flex items-center" aria-label={`${completedTodos.includes(todo.id) ? 'Completed' : 'Pending'}: ${todo.label}`}>
                                    <span className="min-w-[1rem] text-center" role="status">
                                      {completedTodos.includes(todo.id) ? '✓' : '○'}
                                    </span>
                                    <span className="ml-2">{todo.label}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Certifications */}
                          {module.suggestedCertifications.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-sm mb-2">🏆 Certifications:</h5>
                              <div className="space-y-1">
                                {module.suggestedCertifications.map((cert, idx) => (
                                  <a
                                    key={idx}
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm block hover:underline"
                                  >
                                    🎓 {cert.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
