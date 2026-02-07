import React, { useState } from 'react';

interface PersonalizationFlowProps {
  onComplete: (userProfile: UserProfile) => void;
}

export interface UserProfile {
  goal: 'tech-guru' | 'mle' | 'entrepreneur' | 'developer';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  hoursPerWeek: number;
  targetRole: string;
}

export const PersonalizationFlow: React.FC<PersonalizationFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    goal: 'tech-guru',
    experienceLevel: 'beginner',
    hoursPerWeek: 15,
    targetRole: 'AI Engineer / Tech Guru'
  });

  const goals = [
    { id: 'tech-guru', label: '🤖 Tech Guru - Master AI/ML/Agents', desc: 'Master everything: CS Foundations → Deep Learning → Agentic AI → Deployment' },
    { id: 'mle', label: '🧠 ML Engineer', desc: 'Focus on Machine Learning algorithms and production ML' },
    { id: 'entrepreneur', label: '🚀 Startup Founder', desc: 'Build AI-powered products quickly with GenAI' },
    { id: 'developer', label: '💻 Full-Stack Developer', desc: 'Integrate AI into web apps and products' }
  ];

  const experienceLevels = [
    { id: 'beginner', label: '🌱 Beginner', desc: 'No prior AI/ML experience' },
    { id: 'intermediate', label: '📈 Intermediate', desc: 'Some Python/coding experience' },
    { id: 'advanced', label: '🔥 Advanced', desc: 'Computer Science background' }
  ];

  const hoursOptions = [
    { label: '5-10 hrs/week', value: 7 },
    { label: '10-15 hrs/week', value: 12 },
    { label: '15-20 hrs/week', value: 17 },
    { label: '20+ hrs/week', value: 25 }
  ];

  const handleGoalSelect = (goalId: string) => {
    const goalLabels = {
      'tech-guru': 'AI Engineer / Tech Guru',
      'mle': 'ML Engineer',
      'entrepreneur': 'Startup Founder',
      'developer': 'Full-Stack Developer'
    };
    setProfile({ ...profile, goal: goalId as any, targetRole: goalLabels[goalId as keyof typeof goalLabels] });
    setStep(1);
  };

  const handleExperienceSelect = (level: string) => {
    setProfile({ ...profile, experienceLevel: level as any });
    setStep(2);
  };

  const handleHoursSelect = (hours: number) => {
    setProfile({ ...profile, hoursPerWeek: hours });
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        {/* Step 1: Goal Selection */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to ProdigyAI! 🚀
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Let's personalize your path to mastering AI
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">What's your goal?</h2>
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className="w-full text-left p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all transform hover:scale-105"
                >
                  <div className="font-semibold text-lg">{goal.label}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">{goal.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Experience Level */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">What's your experience level?</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Selected: <span className="font-semibold text-blue-600">{profile.targetRole}</span>
              </p>
            </div>

            <div className="space-y-4">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleExperienceSelect(level.id)}
                  className="w-full text-left p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-slate-700 transition-all transform hover:scale-105"
                >
                  <div className="font-semibold text-lg">{level.label}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">{level.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(0)}
              className="w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: Time Commitment */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">How much time can you dedicate?</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Goal: <span className="font-semibold text-blue-600">{profile.targetRole}</span> | 
                Experience: <span className="font-semibold text-green-600 ml-1">{profile.experienceLevel}</span>
              </p>
            </div>

            <div className="space-y-4">
              {hoursOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleHoursSelect(option.value)}
                  className="w-full text-left p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-slate-700 transition-all transform hover:scale-105"
                >
                  <div className="font-semibold text-lg">{option.label}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
