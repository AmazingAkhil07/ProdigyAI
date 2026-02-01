import React, { useState } from 'react';
import { Phase } from '../types';

interface ResourcesPanelProps {
  roadmapData: Phase[];
  theme: 'light' | 'dark';
}

export const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ roadmapData, theme }) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    setExpandedModule(null); // Reset expanded module when toggling phase
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center">
          <i className="fas fa-book-open mr-2" />
          Learning Resources
        </h3>
      </div>

      <div className="space-y-3">
        {roadmapData.map((phase) => (
          <div key={phase.id} className="border-l-4 border-indigo-500 pl-4">
            <button
              onClick={() => togglePhase(phase.id)}
              className="w-full text-left flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {phase.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {phase.modules.length} modules
                </p>
              </div>
              <i className={`fas fa-chevron-${expandedPhase === phase.id ? 'down' : 'right'} text-slate-400 text-sm transition-transform`} />
            </button>

            {expandedPhase === phase.id && (
              <div className="mt-3 space-y-2">
                {phase.modules.map((module) => (
                  <div key={module.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full text-left flex items-center justify-between group"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {module.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {module.learningSources.length} resources
                        </p>
                      </div>
                      <i className={`fas fa-chevron-${expandedModule === module.id ? 'down' : 'right'} text-slate-400 text-xs transition-transform`} />
                    </button>

                    {expandedModule === module.id && (
                      <div className="mt-3 space-y-2">
                        {module.learningSources.length > 0 ? (
                          <>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                              📚 Courses & Docs
                            </p>
                            {module.learningSources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group border border-slate-200 dark:border-slate-700"
                              >
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                  {source.name}
                                </span>
                                <i className="fas fa-external-link-alt text-xs text-slate-400 group-hover:text-indigo-500" />
                              </a>
                            ))}
                          </>
                        ) : null}

                        {module.suggestedCertifications?.length > 0 ? (
                          <>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">
                              🏅 Certifications
                            </p>
                            {module.suggestedCertifications.map((cert, idx) => (
                              <a
                                key={idx}
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all group border border-amber-200 dark:border-amber-800"
                              >
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                                  {cert.name}
                                </span>
                                <i className="fas fa-certificate text-xs text-amber-500" />
                              </a>
                            ))}
                          </>
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
