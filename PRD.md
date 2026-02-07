# ProdigyAI - Product Requirements Document

## Overview
ProdigyAI is a comprehensive AI mastery platform designed to guide learners from beginner to expert-level AI practitioner through a structured 8-phase roadmap, interactive learning tracking, hands-on projects, and AI-powered assistance.

## Product Vision
Enable students, founders, engineers, and automation specialists to systematically build world-class AI expertise through curated learning paths, hands-on projects, 60+ free courses from top institutions, and verifiable certifications.

---

## Key Features

### 1. Comprehensive Learning Roadmap
- **8-Phase Expert Progression**: 
  - Phase 0: AI Fundamentals (6 modules)
  - Phase 1: Prompt Engineering Mastery (4 modules)
  - Phase 2: Building AI Apps (4 modules)
  - Phase 3: Advanced Agents (4 modules)
  - Phase 4: Specialization Paths (4 modules)
  - Phase 5: Deployment & Scale (3 modules)
  - Phase 6: Leadership & Strategy (3 modules)
  - Phase 7: Cutting Edge (4 modules including n8n automation)
  - Phase 8: Mastery (Master class modules)
- **40+ Modules** with clear learning objectives
- **Real-time Progress Tracking**: Visual indicators, completion percentages, streak system
- **Personalization Flow**: 3-step onboarding to customize learning hours and learning goals

### 2. Extensive Learning Resources Hub
- **60+ Free Courses**: From elite institutions
  - Harvard, Stanford, MIT, UC San Diego
  - DeepLearning.AI, Coursera, edX  
  - Google Cloud, AWS, Azure, IBM SkillsBuild
  - Official vendor documentation and tutorials
- **30+ AI Tools Stack**: Categorized by function
  - LLMs & Model Comparison (ChatGPT, Claude, Gemini, LLaMA, etc.)
  - Automation & Workflows (n8n, Make, Zapier)
  - Code & Development (GitHub Copilot, Replit, CodePen)
  - Data & Analytics (Power BI, Tableau, Retool)
  - Custom AI (Hugging Face, Replicate, Modalai)
- **n8n No-Code Automation Module** (Phase 7):
  - Building visual workflows without code
  - Integrating 500+ applications
  - Creating automated AI pipelines
  - LLM trigger chains and intelligent routing
- **Learning Paths**: Curated sequences by role (Developer, Startup Founder, Data Analyst, Automation Engineer)

### 3. Intelligent Project & Portfolio Management
- **Module-based Todo Tracking**: Per-module task lists with completion tracking
- **Portfolio Deliverables**: Checklist of 10 key projects to showcase expertise
  - 5 AI workflows
  - 3 AI applications
  - 1 capstone project
  - 2 data dashboards
  - 1 fine-tuned model (+optional)
- **Progress Visualization**: Daily task history, completion charts, streak metrics

### 4. AI Assistant Integration
- **Google Gemini API**: Context-aware assistance for any module
- **Smart Learning Support**: 
  - Answer questions about current topics
  - Suggest relevant resources
  - Provide project guidance
  - Code review and feedback
- **Conversation History**: Track all interactions within the app

### 5. Gamification & Motivation
- **Badge System**: 50+ achievement badges
  - Phase completion badges
  - Project milestone badges
  - Streak achievements
  - Specialty recognition badges
- **Streak Tracking**: Continuous daily engagement rewards
- **Progress Metrics**: Module completion %, weekly activity, time invested

### 6. Productivity & Study Tools
- **Pomodoro Timer**: 25/5 minute focus sessions with statistics
- **Weekly Scheduler**: Auto-generate optimal study schedules
- **Notes & Learning Journal**: Organize and capture key insights
- **Activity Calendar**: Visual timeline of learning milestones and completed tasks
- **Focus Tracker**: Monitor deep work sessions and productivity patterns

### 7. Data Persistence & Sync
- **Offline First Architecture**: 
  - localStorage for instant offline access
  - Automatic background sync with Firebase
- **Reliable Timezone Handling**: 
  - IST (Asia/Kolkata) timezone support using Intl.DateTimeFormat
  - Cross-environment reliable date tracking (local, Vercel, any deployment)
  - No UTC conversion issues
- **Cloud Sync**: Firestore integration for multi-device access

---

## User Flows

### New User Onboarding
1. Sign up with email (Firebase Auth)
2. Complete 3-step Personalization Flow (choose role, set learning hours, select goals)
3. View Phase 0 introduction & recommended modules
4. Review learning resources and start first topic
5. Configure Pomodoro timer and notifications

### Daily Learning Session
1. Open dashboard, view today's tasks and recommended modules
2. Select module, review all available learning resources
3. Complete todos, track progress, record time
4. Use Pomodoro timer for focused sessions
5. Leverage AI assistant for questions
6. Capture key learning notes
7. Earn badges and maintain streak

### Project Completion
1. Build portfolio projects across phases
2. Complete module deliverables
3. Record project documentation
4. Track in portfolio checklist
5. Share progress with community (future v1.2)

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Phase Completion | 80%+ | All phases started & progressed |
| Modules Completed | 30+ | Core + specialist modules |
| Badge Collection | 40+ | Achievement unlocks |
| Portfolio Items | 10+ | Key deliverables created |
| Daily Engagement | 60%+ | Active users per day |
| Time Investment | 1000+ hrs | Per user (9-12 months) |
| Data Retention | 100% | No progress loss on refresh |

---

## Technical Stack

**Frontend:** React 19 + TypeScript + TailwindCSS  
**Backend:** Firebase (Auth, Firestore)  
**AI:** Google Gemini API  
**Persistence:** localStorage (offline) + Firestore (cloud backup)  
**Date Handling:** Intl.DateTimeFormat with timeZone: 'Asia/Kolkata'  
**Deployment:** Vercel  

---

## Roadmap

### MVP (v1.0) - Current ✅
- ✅ 8-phase comprehensive roadmap with 40+ modules
- ✅ 60+ curated free courses from elite institutions
- ✅ 30+ AI tools stack with integration links
- ✅ n8n automation module (Phase 7)
- ✅ Learning resources hub with free certifications
- ✅ Todo tracking & 50+ badge system
- ✅ Personalization 3-step onboarding flow
- ✅ Pomodoro timer & weekly scheduler
- ✅ Notes modal & activity calendar
- ✅ Gemini AI assistant integration
- ✅ localStorage persistence + Firestore sync
- ✅ Robust timezone handling (getISTDateString)
- ✅ Cross-environment reliability (local, Vercel, deployment-agnostic)

### v1.1 - Next (Q1-Q2 2026)
- Progress visualization charts
- Email reminders & notifications
- Learning streak badges
- Community forum & peer learning
- Mobile app (React Native)

### v1.2 - Future (Q3-Q4 2026)
- AI-powered learning recommendations
- Video course hosting
- Live mentorship marketplace
- Tool marketplace integration
- Custom learning path builder
- Job board integration
- Social sharing & profile

---

## Non-Functional Requirements

- **Performance**: Page load < 2s, build < 20s
- **Availability**: 99.5% uptime  
- **Security**: SSL encryption, Firebase auth, data encryption
- **Scalability**: Support 10k+ concurrent users
- **Accessibility**: WCAG 2.1 AA compliance
- **Offline Support**: Full functionality with offline localStorage
- **Data Reliability**: No data loss on page refresh, automatic sync

---

## Constraints & Assumptions

- All learning resources and certifications are free
- Relies on third-party APIs (Gemini, Firebase, course platforms)
- Focus: India-based tech professionals (secondary: global audience)
- MVP scope: Individual learning paths (no real-time collaboration v1)
- Timezone: Primary support for IST (Asia/Kolkata)
- Timeline: v1.0 complete; v1.1 features by Q2 2026
- Target users: Students, founders, engineers, automation specialists (15k-50k users annually)
