
import React, { useState } from 'react';
import { Module, UserProgress } from '../types';

interface ModuleCardProps {
  module: Module;
  progress: UserProgress;
  onToggleTodo: (todoId: string) => void;
  colorClass: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  progress, 
  onToggleTodo,
  colorClass 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = module.todos.filter(t => progress.completedTodos.includes(t.id)).length;
  const totalCount = module.todos.length;
  const isFullyDone = completedCount === totalCount;

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md ${isFullyDone ? 'opacity-80' : ''}`}>
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full ${colorClass}`} />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{module.name}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
            {completedCount}/{totalCount}
          </span>
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-slate-400 text-sm`} />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {module.description}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">TODO Checklist</h4>
            {module.todos.map((todo) => (
              <label 
                key={todo.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group"
              >
                <input 
                  type="checkbox"
                  checked={progress.completedTodos.includes(todo.id)}
                  onChange={() => onToggleTodo(todo.id)}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className={`text-sm transition-colors ${progress.completedTodos.includes(todo.id) ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {todo.label}
                </span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sources</h4>
              <div className="flex flex-col space-y-1">
                {module.learningSources.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <a 
                      href={s.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                    >
                      <i className="fas fa-external-link-alt mr-1.5 opacity-70" />
                      {s.name}
                    </a>
                    <button 
                      onClick={() => copyToClipboard(s.url)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-opacity"
                      title="Copy URL"
                    >
                      <i className="far fa-copy" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {module.suggestedCertifications.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certifications</h4>
                <div className="flex flex-col space-y-1">
                  {module.suggestedCertifications.map((c, idx) => (
                    <a 
                      key={idx}
                      href={c.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
                    >
                      <i className="fas fa-certificate mr-1.5 opacity-70" />
                      {c.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
