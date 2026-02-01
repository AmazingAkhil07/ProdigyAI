export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: any) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Complete your first task',
    icon: '🎯',
    rarity: 'common',
    condition: (progress) => progress.completedTodos.length >= 1
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Complete 10 tasks',
    icon: '⭐',
    rarity: 'common',
    condition: (progress) => progress.completedTodos.length >= 10
  },
  {
    id: 'committed',
    name: 'Committed Learner',
    description: 'Complete 25 tasks',
    icon: '🌟',
    rarity: 'rare',
    condition: (progress) => progress.completedTodos.length >= 25
  },
  {
    id: 'dedicated',
    name: 'Dedicated Developer',
    description: 'Complete 50 tasks',
    icon: '💎',
    rarity: 'epic',
    condition: (progress) => progress.completedTodos.length >= 50
  },
  {
    id: 'phase1_master',
    name: 'Phase 1 Master',
    description: 'Complete all Phase 1 tasks',
    icon: '🏆',
    rarity: 'rare',
    condition: (progress) => {
      const phase1Todos = ['fundamentals-todo-1', 'fundamentals-todo-2', 'fundamentals-todo-3', 
                          'web-dev-todo-1', 'web-dev-todo-2', 'web-dev-todo-3'];
      return phase1Todos.every(id => progress.completedTodos.includes(id));
    }
  },
  {
    id: 'phase2_master',
    name: 'Phase 2 Master',
    description: 'Complete all Phase 2 tasks',
    icon: '🥇',
    rarity: 'epic',
    condition: (progress) => {
      const phase2Todos = ['ml-basics-todo-1', 'ml-basics-todo-2', 'ml-basics-todo-3',
                          'dl-fundamentals-todo-1', 'dl-fundamentals-todo-2', 'dl-fundamentals-todo-3',
                          'nlp-todo-1', 'nlp-todo-2', 'nlp-todo-3',
                          'computer-vision-todo-1', 'computer-vision-todo-2', 'computer-vision-todo-3'];
      return phase2Todos.every(id => progress.completedTodos.includes(id));
    }
  },
  {
    id: 'phase3_master',
    name: 'Phase 3 Master',
    description: 'Complete all Phase 3 tasks',
    icon: '👑',
    rarity: 'legendary',
    condition: (progress) => {
      const phase3Todos = ['gen-ai-todo-1', 'gen-ai-todo-2', 'gen-ai-todo-3',
                          'llm-todo-1', 'llm-todo-2', 'llm-todo-3',
                          'ai-agents-todo-1', 'ai-agents-todo-2', 'ai-agents-todo-3',
                          'advanced-topics-todo-1', 'advanced-topics-todo-2', 'advanced-topics-todo-3'];
      return phase3Todos.every(id => progress.completedTodos.includes(id));
    }
  },
  {
    id: 'portfolio_builder',
    name: 'Portfolio Builder',
    description: 'Complete 5 portfolio items',
    icon: '📂',
    rarity: 'rare',
    condition: (progress) => progress.portfolioItems.length >= 5
  },
  {
    id: 'portfolio_master',
    name: 'Portfolio Master',
    description: 'Complete all portfolio items',
    icon: '💼',
    rarity: 'epic',
    condition: (progress) => progress.portfolioItems.length >= 10
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    condition: (progress) => progress.streak >= 7
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '🚀',
    rarity: 'epic',
    condition: (progress) => progress.streak >= 30
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Maintain a 100-day streak',
    icon: '⚡',
    rarity: 'legendary',
    condition: (progress) => progress.streak >= 100
  }
];
