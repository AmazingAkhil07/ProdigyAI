
export interface TodoItem {
  id: string;
  label: string;
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
}

export interface PortfolioItem {
  id: string;
  label: string;
  category: string;
}
