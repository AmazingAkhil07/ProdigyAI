
import { Phase, PortfolioItem } from './types';

export const ROADMAP_DATA: Phase[] = [
  {
    id: 'p0',
    title: '🌱 PHASE 0 - Mindset & Setup',
    duration: '1-2 Weeks',
    color: 'phase0',
    goal: 'Understand AI fundamentals and set up your learning environment',
    modules: [
      {
        id: 'p0m1',
        name: 'Create Learning Accounts',
        description: 'Set up accounts on all major free learning platforms',
        learningSources: [
          { name: 'Coursera (Free Audit)', url: 'https://www.coursera.org/' },
          { name: 'edX (Free Audit)', url: 'https://www.edx.org/' },
          { name: 'Google Cloud (Free Tier)', url: 'https://cloud.google.com/free' },
          { name: 'IBM SkillsBuild', url: 'https://skillsbuild.org/' },
          { name: 'Microsoft Learn', url: 'https://learn.microsoft.com/' },
          { name: 'AWS (Free Tier)', url: 'https://aws.amazon.com/free/' }
        ],
        todos: [
          { id: 'p0m1-1', label: 'Create Coursera account' },
          { id: 'p0m1-2', label: 'Create edX account' },
          { id: 'p0m1-3', label: 'Create Google account (if needed)' },
          { id: 'p0m1-4', label: 'Create IBM SkillsBuild account' },
          { id: 'p0m1-5', label: 'Create Microsoft Learn account' },
          { id: 'p0m1-6', label: 'Create AWS account' }
        ],
        suggestedCertifications: []
      },
      {
        id: 'p0m2',
        name: 'Set Up Learning System',
        description: 'Create a GitHub folder & Notion workspace to track certificates and mini-projects',
        learningSources: [
          { name: 'GitHub - Getting Started', url: 'https://github.com/github-learning-lab' },
          { name: 'Notion - Personal Dashboard', url: 'https://www.notion.so/' }
        ],
        todos: [
          { id: 'p0m2-1', label: 'Create GitHub account & repo' },
          { id: 'p0m2-2', label: 'Create Notion workspace' },
          { id: 'p0m2-3', label: 'Set up certificate tracker' },
          { id: 'p0m2-4', label: 'Create project portfolio structure' }
        ],
        suggestedCertifications: []
      }
    ]
  },
  {
    id: 'p1',
    title: '🥇 PHASE 1 - Computer Science Foundations',
    duration: '6-8 Weeks',
    color: 'phase1',
    goal: 'Master computational thinking and algorithmic problem-solving',
    modules: [
      {
        id: 'p1m1',
        name: 'CS50: Intro to Computer Science',
        description: 'Computational thinking, algorithms & problem solving from Harvard University',
        learningSources: [
          { name: 'CS50x on edX (Harvard)', url: 'https://cs50.harvard.edu/x/' },
          { name: 'CS50 Lectures Playlist', url: 'https://www.youtube.com/playlist?list=PLhQjrBD2T382lUISw1BuDpV2FIThqmsqV' }
        ],
        todos: [
          { id: 'p1m1-1', label: 'Complete CS50 course (12 weeks)' },
          { id: 'p1m1-2', label: 'Solve all problem sets' },
          { id: 'p1m1-3', label: 'Complete final project' },
          { id: 'p1m1-4', label: 'Understand algorithms & data structures' }
        ],
        suggestedCertifications: [
          { name: 'Harvard CS50 Certificate', url: 'https://cs50.harvard.edu/x/' }
        ]
      }
    ]
  },
  {
    id: 'p2',
    title: '🥈 PHASE 2 - Python & Data Foundations',
    duration: '4-6 Weeks',
    color: 'phase2',
    goal: 'Master Python and foundational data science',
    modules: [
      {
        id: 'p2m1',
        name: 'Python for Everybody',
        description: 'Learn Python fundamentals from University of Michigan',
        learningSources: [
          { name: 'Python for Everybody (Coursera)', url: 'https://www.coursera.org/specializations/python' },
          { name: 'Dr. Chuck Python Course (YouTube)', url: 'https://www.youtube.com/playlist?list=PLlRFEj9H3Oj7Oj7-Oy-1IY2B9hO2NlXh8' }
        ],
        todos: [
          { id: 'p2m1-1', label: 'Complete Python specialization' },
          { id: 'p2m1-2', label: 'Master data structures' },
          { id: 'p2m1-3', label: 'Build 5 Python projects' },
          { id: 'p2m1-4', label: 'Learn file I/O and databases' }
        ],
        suggestedCertifications: [
          { name: 'Python for Everybody Certificate (Coursera)', url: 'https://www.coursera.org/specializations/python' }
        ]
      },
      {
        id: 'p2m2',
        name: 'IBM Python & Data Fundamentals',
        description: 'Python and data fundamentals from IBM',
        learningSources: [
          { name: 'IBM SkillsBuild Python', url: 'https://skillsbuild.org/' },
          { name: 'IBM Data Science Fundamentals', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' }
        ],
        todos: [
          { id: 'p2m2-1', label: 'IBM Python module' },
          { id: 'p2m2-2', label: 'Learn pandas & NumPy basics' },
          { id: 'p2m2-3', label: 'Data exploration projects' },
          { id: 'p2m2-4', label: 'Complete IBM assessment' }
        ],
        suggestedCertifications: [
          { name: 'IBM Python Certificate', url: 'https://skillsbuild.org/' }
        ]
      }
    ]
  },
  {
    id: 'p3',
    title: '🧠 PHASE 3 - AI Concepts (No Math Fear)',
    duration: '3-4 Weeks',
    color: 'phase3',
    goal: 'Understand AI fundamentals without heavy mathematics',
    modules: [
      {
        id: 'p3m1',
        name: 'AI For Everyone',
        description: 'AI fundamentals and business applications by Andrew Ng',
        learningSources: [
          { name: 'AI For Everyone (Coursera)', url: 'https://www.coursera.org/learn/ai-for-everyone' },
          { name: 'DeepLearning.AI Courses', url: 'https://www.deeplearning.ai/' }
        ],
        todos: [
          { id: 'p3m1-1', label: 'Complete AI For Everyone course' },
          { id: 'p3m1-2', label: 'Understand AI applications' },
          { id: 'p3m1-3', label: 'Learn supervised & unsupervised learning' },
          { id: 'p3m1-4', label: 'AI ethics and limitations' }
        ],
        suggestedCertifications: [
          { name: 'AI For Everyone Certificate (Coursera)', url: 'https://www.coursera.org/learn/ai-for-everyone' }
        ]
      },
      {
        id: 'p3m2',
        name: 'Elements of AI',
        description: 'Free comprehensive AI course from University of Helsinki',
        learningSources: [
          { name: 'Elements of AI (Free)', url: 'https://www.elementsofai.com/' }
        ],
        todos: [
          { id: 'p3m2-1', label: 'Complete free AI course' },
          { id: 'p3m2-2', label: 'Learn AI terminology' },
          { id: 'p3m2-3', label: 'Understand neural networks basics' },
          { id: 'p3m2-4', label: 'Get completion certificate' }
        ],
        suggestedCertifications: [
          { name: 'Elements of AI Certificate', url: 'https://www.elementsofai.com/' }
        ]
      }
    ]
  },
  {
    id: 'p4',
    title: '🤖 PHASE 4 - Machine Learning Core',
    duration: '8-10 Weeks',
    color: 'phase4',
    goal: 'Master machine learning algorithms and implementation',
    modules: [
      {
        id: 'p4m1',
        name: 'Machine Learning by Andrew Ng',
        description: 'Stanford machine learning course - the gold standard',
        learningSources: [
          { name: 'Machine Learning (Coursera)', url: 'https://www.coursera.org/learn/machine-learning' },
          { name: 'Andrew Ng ML Tutorials (YouTube)', url: 'https://www.youtube.com/playlist?list=PLkDaJ6liZXCZ9OOFzf-3yS8jU5xC-3-n1' }
        ],
        todos: [
          { id: 'p4m1-1', label: 'Complete 11-week ML course' },
          { id: 'p4m1-2', label: 'Master linear/logistic regression' },
          { id: 'p4m1-3', label: 'Learn SVM, KMeans, PCA' },
          { id: 'p4m1-4', label: 'Complete ML projects' }
        ],
        suggestedCertifications: [
          { name: 'Machine Learning Specialization', url: 'https://www.coursera.org/learn/machine-learning' }
        ]
      },
      {
        id: 'p4m2',
        name: 'Google Machine Learning Crash Course',
        description: 'TensorFlow and ML best practices from Google',
        learningSources: [
          { name: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
        ],
        todos: [
          { id: 'p4m2-1', label: 'Complete MLCC (25 hours)' },
          { id: 'p4m2-2', label: 'Learn TensorFlow basics' },
          { id: 'p4m2-3', label: 'ML best practices' },
          { id: 'p4m2-4', label: 'Complete Colab exercises' }
        ],
        suggestedCertifications: [
          { name: 'Google ML Crash Course Completion', url: 'https://developers.google.com/machine-learning/crash-course' }
        ]
      }
    ]
  },
  {
    id: 'p5',
    title: '🧬 PHASE 5 - Deep Learning',
    duration: '10-12 Weeks',
    color: 'phase5',
    goal: 'Master neural networks and modern deep learning',
    modules: [
      {
        id: 'p5m1',
        name: 'Deep Learning Specialization',
        description: 'Neural networks, CNNs, RNNs, and advanced architectures by Andrew Ng',
        learningSources: [
          { name: 'Deep Learning Specialization (Coursera)', url: 'https://www.coursera.org/specializations/deep-learning' },
          { name: 'DeepLearning.AI Short Courses', url: 'https://www.deeplearning.ai/short-courses/' }
        ],
        todos: [
          { id: 'p5m1-1', label: 'Neural Networks and Deep Learning' },
          { id: 'p5m1-2', label: 'Improving Deep Neural Networks' },
          { id: 'p5m1-3', label: 'Structuring ML Projects' },
          { id: 'p5m1-4', label: 'CNNs and RNNs' },
          { id: 'p5m1-5', label: 'Sequence Models' }
        ],
        suggestedCertifications: [
          { name: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning' }
        ]
      },
      {
        id: 'p5m2',
        name: 'IBM Deep Learning Basics',
        description: 'Practical deep learning implementations from IBM',
        learningSources: [
          { name: 'IBM Deep Learning (SkillsBuild)', url: 'https://skillsbuild.org/' },
          { name: 'IBM Cognitive Fundamentals', url: 'https://www.coursera.org/learn/cognitivecomputing' }
        ],
        todos: [
          { id: 'p5m2-1', label: 'IBM Deep Learning module' },
          { id: 'p5m2-2', label: 'Practical neural network projects' },
          { id: 'p5m2-3', label: 'Build classification models' },
          { id: 'p5m2-4', label: 'Complete IBM assessment' }
        ],
        suggestedCertifications: [
          { name: 'IBM Deep Learning Certificate', url: 'https://skillsbuild.org/' }
        ]
      }
    ]
  },
  {
    id: 'p6',
    title: '🚀 PHASE 6 - Generative AI & LLMs',
    duration: '6-8 Weeks',
    color: 'phase6',
    goal: 'Master LLMs, Prompt Engineering, and GenAI Applications',
    modules: [
      {
        id: 'p6m1',
        name: 'Prompt Engineering for Developers',
        description: 'Advanced prompt engineering by OpenAI & DeepLearning.AI',
        learningSources: [
          { name: 'Prompt Engineering Guide (DeepLearning.AI)', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
          { name: 'OpenAI Prompt Engineering', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
          { name: 'Anthropic Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-a-chatbot-with-claude' }
        ],
        todos: [
          { id: 'p6m1-1', label: 'Complete prompt engineering course' },
          { id: 'p6m1-2', label: 'Master prompt design patterns' },
          { id: 'p6m1-3', label: 'Build 50+ prompt templates' },
          { id: 'p6m1-4', label: 'Test with OpenAI, Claude, Gemini' }
        ],
        suggestedCertifications: [
          { name: 'DeepLearning.AI Prompt Eng Certificate', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' }
        ]
      },
      {
        id: 'p6m2',
        name: 'Generative AI for Everyone',
        description: 'LLMs, transformers, and generative AI fundamentals',
        learningSources: [
          { name: 'Generative AI for Everyone', url: 'https://www.deeplearning.ai/short-courses/generative-ai-for-everyone/' },
          { name: 'HuggingFace LLM Course', url: 'https://huggingface.co/learn/llm-course' }
        ],
        todos: [
          { id: 'p6m2-1', label: 'Understand transformer architecture' },
          { id: 'p6m2-2', label: 'Learn tokenization & embeddings' },
          { id: 'p6m2-3', label: 'Fine-tune LLM on custom data' },
          { id: 'p6m2-4', label: 'Deploy LLM applications' }
        ],
        suggestedCertifications: [
          { name: 'Generative AI Certificate', url: 'https://www.deeplearning.ai/short-courses/generative-ai-for-everyone/' }
        ]
      },
      {
        id: 'p6m3',
        name: 'AWS GenAI Tech Alliance Pathway',
        description: 'Enterprise GenAI with Bedrock, Agents, and AWS services',
        learningSources: [
          { name: 'AWS GenAI Pathway', url: 'https://aws.amazon.com/' },
          { name: 'Amazon Bedrock Guide', url: 'https://docs.aws.amazon.com/bedrock/' },
          { name: 'AWS Agent Framework', url: 'https://docs.aws.amazon.com/agents/' }
        ],
        todos: [
          { id: 'p6m3-1', label: 'Prompt Engineering for Everyone (5hrs)' },
          { id: 'p6m3-2', label: 'Enterprise Machine Learning (12hrs)' },
          { id: 'p6m3-3', label: 'Building GenAI Apps with AWS (13hrs)' },
          { id: 'p6m3-4', label: 'Build mini-project with Bedrock' }
        ],
        suggestedCertifications: [
          { name: 'AWS GenAI Pathway Certificate', url: 'https://aws.amazon.com/' }
        ]
      },
      {
        id: 'p6m4',
        name: 'RAG & Vector Databases',
        description: 'Build Retrieval-Augmented Generation systems',
        learningSources: [
          { name: 'RAG Course (DeepLearning.AI)', url: 'https://www.deeplearning.ai/short-courses/retrieval-augmented-generation-rag/' },
          { name: 'LangChain Documentation', url: 'https://python.langchain.com/' },
          { name: 'Pinecone Vector DB', url: 'https://www.pinecone.io/' }
        ],
        todos: [
          { id: 'p6m4-1', label: 'Learn RAG architecture' },
          { id: 'p6m4-2', label: 'Set up vector database' },
          { id: 'p6m4-3', label: 'Build RAG pipeline' },
          { id: 'p6m4-4', label: 'Deploy chatbot with RAG' }
        ],
        suggestedCertifications: [
          { name: 'RAG Specialization (DeepLearning.AI)', url: 'https://www.deeplearning.ai/short-courses/retrieval-augmented-generation-rag/' }
        ]
      }
    ]
  },
  {
    id: 'p7',
    title: '🧠🔥 PHASE 7 - Agentic AI & Advanced Agents',
    duration: '8-10 Weeks',
    color: 'phase7',
    goal: 'Build autonomous AI agents with reasoning and tool use',
    modules: [
      {
        id: 'p7m1',
        name: 'Building AI Agents',
        description: 'Autonomous AI agents with planning, memory, and learning',
        learningSources: [
          { name: 'Agentic AI Course (DeepLearning.AI)', url: 'https://www.deeplearning.ai/short-courses/agentic-ai/' },
          { name: 'LangChain Agents', url: 'https://python.langchain.com/docs/modules/agents/' },
          { name: 'CrewAI Framework', url: 'https://www.crewai.io/' }
        ],
        todos: [
          { id: 'p7m1-1', label: 'Understand agent architecture' },
          { id: 'p7m1-2', label: 'Implement ReAct framework' },
          { id: 'p7m1-3', label: 'Build multi-agent system' },
          { id: 'p7m1-4', label: 'Add memory & reasoning' }
        ],
        suggestedCertifications: [
          { name: 'Agentic AI Certificate (DeepLearning.AI)', url: 'https://www.deeplearning.ai/short-courses/agentic-ai/' }
        ]
      },
      {
        id: 'p7m2',
        name: 'LangChain & Agent Frameworks',
        description: 'Production-grade agent development frameworks',
        learningSources: [
          { name: 'LangChain Master Class', url: 'https://python.langchain.com/' },
          { name: 'n8n No-Code Agents', url: 'https://n8n.io/' },
          { name: 'Anthropic Claude API', url: 'https://docs.anthropic.com/' }
        ],
        todos: [
          { id: 'p7m2-1', label: 'Master LangChain core' },
          { id: 'p7m2-2', label: 'Build tool-using agents' },
          { id: 'p7m2-3', label: 'Implement agent loops' },
          { id: 'p7m2-4', label: 'Deploy production agents' }
        ],
        suggestedCertifications: []
      },
      {
        id: 'p7m3',
        name: 'Advanced Agent Techniques',
        description: 'Reasoning, planning, and tree-of-thought methods',
        learningSources: [
          { name: 'Chain-of-Thought Prompting', url: 'https://arxiv.org/abs/2201.11903' },
          { name: 'Tree of Thoughts Framework', url: 'https://arxiv.org/abs/2305.10601' },
          { name: 'AutoGPT Patterns', url: 'https://github.com/Significant-Gravitas/Auto-GPT' }
        ],
        todos: [
          { id: 'p7m3-1', label: 'Study advanced reasoning patterns' },
          { id: 'p7m3-2', label: 'Implement chain-of-thought' },
          { id: 'p7m3-3', label: 'Build planning agents' },
          { id: 'p7m3-4', label: 'Create self-improving agents' }
        ],
        suggestedCertifications: []
      },
      {
        id: 'p7m4',
        name: 'n8n & No-Code Automation Workflows',
        description: 'Build powerful AI-powered automation workflows without coding - integrate APIs, AI models, and agents',
        learningSources: [
          { name: 'n8n Official Documentation', url: 'https://docs.n8n.io/' },
          { name: 'n8n Learning Hub & Courses', url: 'https://docs.n8n.io/courses/' },
          { name: 'n8n YouTube Tutorials', url: 'https://www.youtube.com/c/n8nio' },
          { name: 'n8n Community Workflows', url: 'https://n8n.io/workflows' },
          { name: 'AI Integration with n8n', url: 'https://docs.n8n.io/plugins/nodes/n8n-nodes-base.openai/' },
          { name: 'Make.com Alternative Guide', url: 'https://make.com/' }
        ],
        todos: [
          { id: 'p7m4-1', label: 'Set up n8n instance (self-hosted or cloud)' },
          { id: 'p7m4-2', label: 'Learn basic workflow building & triggers' },
          { id: 'p7m4-3', label: 'Integrate OpenAI/Claude APIs into workflows' },
          { id: 'p7m4-4', label: 'Build 5 AI-powered automation workflows' },
          { id: 'p7m4-5', label: 'Create HTTP triggers for webhook integration' },
          { id: 'p7m4-6', label: 'Connect databases (PostgreSQL, MongoDB, etc)' },
          { id: 'p7m4-7', label: 'Build agent-powered n8n workflows' },
          { id: 'p7m4-8', label: 'Deploy workflow to production' }
        ],
        suggestedCertifications: []
      }
    ]
  },
  {
    id: 'p8',
    title: '☁️ PHASE 8 - Cloud & Deployment',
    duration: '6-8 Weeks',
    color: 'phase8',
    goal: 'Deploy production-ready AI/ML applications',
    modules: [
      {
        id: 'p8m1',
        name: 'Azure AI Fundamentals',
        description: 'Microsoft Azure AI services and certifications',
        learningSources: [
          { name: 'Azure AI Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/' },
          { name: 'AZ-900: Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals' }
        ],
        todos: [
          { id: 'p8m1-1', label: 'Azure AI services basics' },
          { id: 'p8m1-2', label: 'Deploy ML models on Azure' },
          { id: 'p8m1-3', label: 'Azure Cognitive Services' },
          { id: 'p8m1-4', label: 'Get Azure fundamentals cert' }
        ],
        suggestedCertifications: [
          { name: 'AZ-900 Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals' },
          { name: 'AI-900: Azure AI Fundamentals', url: 'https://learn.microsoft.com/en-us/certifications/azure-ai-fundamentals' }
        ]
      },
      {
        id: 'p8m2',
        name: 'Google Cloud AI Path',
        description: 'Google Cloud AI/ML services and industry applications',
        learningSources: [
          { name: 'Google Cloud AI Learning Path', url: 'https://www.cloudskillsboost.google/paths/118' },
          { name: 'Vertex AI Tutorials', url: 'https://cloud.google.com/vertex-ai/docs' }
        ],
        todos: [
          { id: 'p8m2-1', label: 'Google Cloud fundamentals' },
          { id: 'p8m2-2', label: 'Vertex AI & AutoML' },
          { id: 'p8m2-3', label: 'Build with BigQuery ML' },
          { id: 'p8m2-4', label: 'Deploy models on GCP' }
        ],
        suggestedCertifications: [
          { name: 'Associate Cloud Engineer', url: 'https://cloud.google.com/learn/certification/cloud-engineer' }
        ]
      },
      {
        id: 'p8m3',
        name: 'MLOps & Production ML',
        description: 'Operationalize ML models for production',
        learningSources: [
          { name: 'MLOps.community', url: 'https://mlops.community/' },
          { name: 'Made With ML - MLOps', url: 'https://madewithml.com/' },
          { name: 'Kubernetes for ML', url: 'https://kubernetes.io/docs/' }
        ],
        todos: [
          { id: 'p8m3-1', label: 'Model versioning & tracking' },
          { id: 'p8m3-2', label: 'CI/CD pipelines for ML' },
          { id: 'p8m3-3', label: 'Monitoring & logging' },
          { id: 'p8m3-4', label: 'Deploy with Docker & Kubernetes' }
        ],
        suggestedCertifications: []
      }
    ]
  }
];

export const PORTFOLIO_CHECKLIST: PortfolioItem[] = [
  { id: 'port1', label: '🏆 CS50 Certificate', category: 'Foundations' },
  { id: 'port2', label: '🐍 Python Specialization', category: 'Programming' },
  { id: 'port3', label: '🤖 AI For Everyone Certificate', category: 'AI Basics' },
  { id: 'port4', label: '📊 Machine Learning Specialization', category: 'ML' },
  { id: 'port5', label: '🧠 Deep Learning Specialization', category: 'Deep Learning' },
  { id: 'port6', label: '📝 Prompt Engineering Mastery', category: 'Generative AI' },
  { id: 'port7', label: '🧠🔥 Agentic AI Project', category: 'Advanced AI' },
  { id: 'port8', label: '☁️ AWS/Azure Certification', category: 'Cloud Deployment' },
  { id: 'port9', label: '🔧 5 Real-World AI Projects', category: 'Portfolio' },
  { id: 'port10', label: '📚 AI Learning Handbook (Personal)', category: 'Documentation' }
];

export const TOOLS_STACK = [
  // Learning Platforms
  { name: 'Coursera', category: 'Learning', url: 'https://www.coursera.org/' },
  { name: 'edX', category: 'Learning', url: 'https://www.edx.org/' },
  { name: 'DeepLearning.AI', category: 'Learning', url: 'https://www.deeplearning.ai/' },
  { name: 'IBM SkillsBuild', category: 'Learning', url: 'https://skillsbuild.org/' },
  { name: 'Microsoft Learn', category: 'Learning', url: 'https://learn.microsoft.com/' },
  
  // Generative AI Tools
  { name: 'ChatGPT', category: 'GenAI', url: 'https://chat.openai.com/' },
  { name: 'Claude (Anthropic)', category: 'GenAI', url: 'https://claude.ai/' },
  { name: 'Google Gemini', category: 'GenAI', url: 'https://gemini.google.com/' },
  { name: 'Perplexity', category: 'GenAI', url: 'https://www.perplexity.ai/' },
  
  // Agent & LLM Frameworks
  { name: 'LangChain', category: 'Agents', url: 'https://python.langchain.com/' },
  { name: 'CrewAI', category: 'Agents', url: 'https://www.crewai.io/' },
  { name: 'AutoGen (Microsoft)', category: 'Agents', url: 'https://microsoft.github.io/autogen/' },
  { name: 'OpenAI API', category: 'Agents', url: 'https://platform.openai.com/docs/api-reference' },
  
  // RAG & Vector Databases
  { name: 'Pinecone', category: 'Vector DB', url: 'https://www.pinecone.io/' },
  { name: 'Weaviate', category: 'Vector DB', url: 'https://weaviate.io/' },
  { name: 'Milvus', category: 'Vector DB', url: 'https://milvus.io/' },
  
  // Research & Documentation
  { name: 'NotebookLM', category: 'Research', url: 'https://notebooklm.google.com/' },
  { name: 'HuggingFace', category: 'ML Models', url: 'https://huggingface.co/' },
  
  // Local LLMs
  { name: 'Ollama', category: 'Local LLMs', url: 'https://ollama.com/' },
  { name: 'LM Studio', category: 'Local LLMs', url: 'https://lmstudio.ai/' },
  
  // Cloud Platforms
  { name: 'AWS', category: 'Cloud', url: 'https://aws.amazon.com/' },
  { name: 'Google Cloud', category: 'Cloud', url: 'https://cloud.google.com/' },
  { name: 'Microsoft Azure', category: 'Cloud', url: 'https://azure.microsoft.com/' },
  
  // Development Tools
  { name: 'Bolt.new', category: 'Development', url: 'https://bolt.new/' },
  { name: 'GitHub', category: 'Development', url: 'https://github.com/' },
  { name: 'Vercel', category: 'Deployment', url: 'https://vercel.com/' },
  
  // No-Code Automation Platforms (n8n & Alternatives)
  { name: 'n8n Cloud Hosted', category: 'Automation', url: 'https://n8n.cloud/' },
  { name: 'n8n Self-Hosted', category: 'Automation', url: 'https://docs.n8n.io/hosting/' },
  { name: 'n8n Community Workflows', category: 'Automation', url: 'https://n8n.io/workflows' },
  { name: 'Make.com (Zapier Alternative)', category: 'Automation', url: 'https://make.com/' },
  { name: 'Zapier', category: 'Automation', url: 'https://zapier.com/' },
  { name: 'IFTTT', category: 'Automation', url: 'https://ifttt.com/' },
  
  // AI-Powered Automation Integrations
  { name: 'n8n + OpenAI Integration', category: 'AI Automation', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/n8n-nodes-langchain.openai/' },
  { name: 'n8n + Claude API', category: 'AI Automation', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/n8n-nodes-langchain.anthropic/' },
  { name: 'n8n + Google Gemini', category: 'AI Automation', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/n8n-nodes-langchain.googlegemini/' },
  { name: 'LangChain for n8n', category: 'AI Automation', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/' },
  
  // Workflow Templates & Community
  { name: 'n8n Templates Library', category: 'Automation', url: 'https://n8n.io/workflows?tab=templates' },
  { name: 'n8n Discord Community', category: 'Community', url: 'https://discord.com/invite/nV6U3fKj7Q' },
  { name: 'n8n Forum', category: 'Community', url: 'https://community.n8n.io/' }
];
