
export interface Note {
  id: string;
  moduleId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoItem {
  id: string;
  label: string;
  difficulty?: 'easy' | 'medium' | 'hard'; // in minutes: easy=15, medium=45, hard=120
}

export interface Resource {
  name: string;
  url: string;
}

export interface Module {
  id: string;
  name: string;
  learningSources: Resource[];
  description: string;
  todos: TodoItem[];
  suggestedCertifications: Resource[];
}

export interface Phase {
  id: string;
  title: string;
  duration: string;
  color: string;
  goal: string;
  modules: Module[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface UserProgress {
  completedTodos: string[]; // List of todo IDs
  portfolioItems: string[]; // List of checklist IDs
  theme: 'light' | 'dark';
  chatHistory: Message[];
  badges: string[]; // List of earned badge IDs
  streak: number; // Current daily streak
  lastLoginDate: string; // ISO date string
  taskHistory: { date: string; tasks: { id: string; label: string; moduleId?: string }[] }[]; // Daily task completion history with task details
  notes: Note[]; // User notes for modules
  leaderboardOptIn?: boolean; // Whether user opted in to leaderboard
}

export interface PortfolioItem {
  id: string;
  label: string;
  category: string;
}
