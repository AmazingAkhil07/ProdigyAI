import React from 'react';

export const LearningOutcomes: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const outcomes = [
    {
      icon: '🤖',
      title: 'AI Tech Generalist',
      description: 'Master latest AI tools before most people'
    },
    {
      icon: '🏗️',
      title: 'AI Builder',
      description: 'Build custom GPTs, run & fine-tune LLMs'
    },
    {
      icon: '🔗',
      title: 'Agent Designer',
      description: 'Build AI agents & workflows for automation'
    },
    {
      icon: '📊',
      title: 'AI Strategist',
      description: 'Apply AI in business & leadership decisions'
    }
  ];

  const capabilities = [
    'Use latest AI tools before most people',
    'Build custom GPTs & applications',
    'Run & fine-tune Large Language Models',
    'Build AI agents & multi-step workflows',
    'Ship AI MVPs from ideation to deployment',
    'Automate research, job hunting & reporting',
    'Apply AI in business & leadership strategy'
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-block mb-4 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-full border border-indigo-200 dark:border-indigo-800">
          <span className="text-xs font-black uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
            🎯 Learning Outcomes
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
          Become an AI Tech Generalist + Builder + Agent Designer + AI Strategist
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm font-medium">
          Master AI technologies and become hard to replace in the job market
        </p>
      </div>

      {/* Four Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {outcomes.map((outcome, idx) => (
          <div 
            key={idx}
            className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">{outcome.icon}</div>
            <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-2">
              {outcome.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {outcome.description}
            </p>
          </div>
        ))}
      </div>

      {/* Key Capabilities */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
          <i className="fas fa-sparkles mr-2 text-indigo-500" />
          You will be able to:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {capabilities.map((capability, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="fas fa-check text-white text-xs" />
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                {capability}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
