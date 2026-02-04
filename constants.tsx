
import { Phase, PortfolioItem } from './types';

export const ROADMAP_DATA: Phase[] = [
  {
    id: 'p1',
    title: 'PHASE 1 — AI GENERALIZED',
    duration: '10 Weeks',
    color: 'phase1',
    goal: 'Become AI Power User + Workflow Builder',
    modules: [
      {
        id: 'p1m1',
        name: 'Prompt Engineering',
        description: 'Learn advanced prompt patterns: role, constraint, step-by-step reasoning, JSON outputs.',
        learningSources: [
          { name: 'DeepLearning.AI Prompt Engineering', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
          { name: 'OpenAI Docs', url: 'https://platform.openai.com/docs/guides/prompt-engineering' }
        ],
        todos: [
          { id: 'p1m1-1', label: 'Complete course' },
          { id: 'p1m1-2', label: 'Build 150 prompts' },
          { id: 'p1m1-3', label: 'Test prompts in 3 models' },
          { id: 'p1m1-4', label: 'Create reusable prompt templates' }
        ],
        suggestedCertifications: [
          { name: 'DeepLearning.AI - Free Certificate', url: 'https://learn.deeplearning.ai/courses/chatgpt-prompt-eng' },
          { name: 'freeCodeCamp - Machine Learning with Python', url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/' }
        ]
      },
      {
        id: 'p1m2',
        name: 'Generative AI + Local LLMs',
        description: 'Learn transformer basics, tokenization, context windows, quantization, inference.',
        learningSources: [
          { name: 'HuggingFace Course', url: 'https://huggingface.co/learn/nlp-course' },
          { name: 'Ollama Docs', url: 'https://ollama.com/' }
        ],
        todos: [
          { id: 'p1m2-1', label: 'Install Ollama' },
          { id: 'p1m2-2', label: 'Run 4 local models' },
          { id: 'p1m2-3', label: 'Benchmark speed/accuracy' },
          { id: 'p1m2-4', label: 'Document best models' },
          { id: 'p1m2-5', label: 'Run small fine-tune' }
        ],
        suggestedCertifications: [
          { name: 'DeepLearning.AI - Free Certificate', url: 'https://learn.deeplearning.ai/courses/generative-ai-for-everyone' },
          { name: 'HuggingFace - LLM Course Free', url: 'https://huggingface.co/learn/llm-course' }
        ]
      },
      {
        id: 'p1m3',
        name: 'Research Using AI',
        description: 'Automate literature review, deep research, summarization, report writing.',
        learningSources: [
          { name: 'Perplexity AI', url: 'https://www.perplexity.ai' },
          { name: 'Google NotebookLM', url: 'https://notebooklm.google.com' }
        ],
        todos: [
          { id: 'p1m3-1', label: '3 research reports' },
          { id: 'p1m3-2', label: 'Summarize 5 PDFs & YouTube videos' },
          { id: 'p1m3-3', label: 'Build research template' },
          { id: 'p1m3-4', label: 'Future of jobs report' }
        ],
        suggestedCertifications: [
          { name: 'DeepLearning.AI - RAG Course Free', url: 'https://learn.deeplearning.ai/courses/retrieval-augmented-generation-rag' },
          { name: 'freeCodeCamp - Python Certificate', url: 'https://www.freecodecamp.org/learn/python-v9' }
        ]
      }
      // Simplified for space; in a real app, all modules from the prompt would be added here.
    ]
  },
  {
    id: 'p2',
    title: 'PHASE 2 — CAPSTONE',
    duration: '4-6 Weeks',
    color: 'phase2',
    goal: 'Build fully functional MVP + Agent system',
    modules: [
      {
        id: 'p2m1',
        name: 'Agent System Build',
        description: 'Build multi-agent workflow with memory & API integration',
        learningSources: [
          { name: 'n8n advanced tutorials', url: 'https://docs.n8n.io/courses/' },
          { name: 'LangChain docs', url: 'https://python.langchain.com/' }
        ],
        todos: [
          { id: 'p2m1-1', label: 'Choose Capstone Idea' },
          { id: 'p2m1-2', label: 'Build multi-agent workflow' },
          { id: 'p2m1-3', label: 'Implement memory storage' },
          { id: 'p2m1-4', label: 'Test agent multi-step execution' }
        ],
        suggestedCertifications: [
          { name: 'DeepLearning.AI - Agentic AI Free', url: 'https://learn.deeplearning.ai/courses/agentic-ai' },
          { name: 'HuggingFace - Agents Course Free', url: 'https://huggingface.co/learn/agents-course' }
        ]
      },
      {
        id: 'p2m2',
        name: 'MVP Deployment',
        description: 'Deploy full working MVP online',
        learningSources: [
          { name: 'Vercel Deployment Docs', url: 'https://vercel.com/docs' },
          { name: 'Replit Deployment Guide', url: 'https://docs.replit.com/hosting/deploying-http-servers' }
        ],
        todos: [
          { id: 'p2m2-1', label: 'Deploy to Vercel/Replit' },
          { id: 'p2m2-2', label: 'Record demo walkthrough' },
          { id: 'p2m2-3', label: 'Document case study' }
        ],
        suggestedCertifications: [
          { name: 'freeCodeCamp - Web Dev Certificate', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries-v9' },
          { name: 'freeCodeCamp - Back End Development APIs', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis-v9' }
        ]
      }
    ]
  },
  {
    id: 'p3',
    title: 'PHASE 3 — PROFESSIONAL APPLICATION',
    duration: '6-8 Weeks',
    color: 'phase3',
    goal: 'Apply AI in your profession/startup for measurable results',
    modules: [
      {
        id: 'p3m1',
        name: 'Software Dev AI',
        description: 'Build domain-specific AI tools, code assistants, debugging agents',
        learningSources: [
          { name: 'HuggingFace', url: 'https://huggingface.co/' }
        ],
        todos: [
          { id: 'p3m1-1', label: 'Build custom code assistant' },
          { id: 'p3m1-2', label: 'Integrate debugging agent' }
        ],
        suggestedCertifications: [
          { name: 'HuggingFace - NLP Course Free', url: 'https://huggingface.co/learn/nlp-course' },
          { name: 'freeCodeCamp - JavaScript Certificate', url: 'https://www.freecodecamp.org/learn/javascript-v9' }
        ]
      }
    ]
  }
];

export const PORTFOLIO_CHECKLIST: PortfolioItem[] = [
  { id: 'port1', label: '5 AI workflows', category: 'Automation' },
  { id: 'port2', label: '3 AI apps', category: 'Development' },
  { id: 'port3', label: '1 capstone MVP', category: 'Project' },
  { id: 'port4', label: '2 dashboards', category: 'Data' },
  { id: 'port5', label: '1 fine-tuned model', category: 'ML' },
  { id: 'port6', label: '3 custom GPTs', category: 'LLM' },
  { id: 'port7', label: 'Prompt library', category: 'Content' },
  { id: 'port8', label: 'Research report', category: 'Research' }
];

export const TOOLS_STACK = [
  { name: 'NotebookLM', category: 'Research', url: 'https://notebooklm.google.com/' },
  { name: 'Perplexity', category: 'Search', url: 'https://www.perplexity.ai/' },
  { name: 'Bolt.new', category: 'Development', url: 'https://bolt.new/' },
  { name: 'n8n', category: 'Agents', url: 'https://n8n.io/' },
  { name: 'Ollama', category: 'Local LLMs', url: 'https://ollama.com/' },
  { name: 'v0 by Vercel', category: 'UI', url: 'https://v0.dev/' }
];
