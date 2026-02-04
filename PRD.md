# ProdigyAI - Product Requirements Document

## Overview
ProdigyAI is a comprehensive AI mastery platform designed to guide learners from beginner to expert level through a structured 3-phase roadmap, interactive learning tracking, and AI-powered assistance.

## Product Vision
Enable students, founders, and engineers to systematically build AI expertise through curated learning paths, hands-on projects, and verifiable certifications.

---

## Key Features

### 1. Interactive Roadmap
- **3-Phase Learning Path**: AI Generalist → Capstone → Professional Application
- **Module-based Structure**: 30+ modules with clear objectives and dependencies
- **Progress Tracking**: Real-time completion tracking with visual indicators
- **Duration Estimates**: 10 weeks, 4-6 weeks, 6-8 weeks per phase

### 2. Learning Resources Hub
- **Curated Courses**: Links to free courses (DeepLearning.AI, freeCodeCamp, HuggingFace)
- **Tool Stack Integration**: 25+ AI tools categorized by function
- **Free Certifications**: Direct links to verifiable, industry-recognized certificates
- **Learning Sources**: Textbooks, documentation, official courses per module

### 3. Project Management
- **Todo Checklist**: Per-module task lists with completion tracking
- **Portfolio Tracker**: Checklist of 8 deliverables to showcase learning
- **Progress Metrics**: Module completion %, weekly scheduler, focus timer

### 4. AI Assistant Integration
- **Gemini API**: Contextual AI assistance based on current module
- **Prompt Templates**: Pre-built prompts for research, summarization, code review
- **Learning Support**: Answer questions, suggest resources, guide projects

### 5. Gamification
- **Badge System**: 50+ badges earned on completion
- **Portfolio Display**: Public profile showcasing certificates and projects
- **Streak Tracking**: Daily engagement metrics
- **Leaderboards**: Compare progress with peers (optional)

### 6. Study Tools
- **Pomodoro Timer**: 25/5 minute focus sessions with stats
- **Weekly Scheduler**: AI-powered schedule generation
- **Notes Modal**: Capture and organize learning notes
- **Calendar View**: Visual timeline of milestones

---

## User Flows

### New User Onboarding
1. Sign up with email (Firebase Auth)
2. Select target role (CS Student / Founder / Engineer)
3. View Phase 1 overview & recommended daily schedule
4. Start first module with AI assistant guidance

### Daily Engagement
1. Open dashboard, view today's tasks
2. Select module, review learning sources
3. Complete todos, earn badges
4. Log 60-90 minutes using Pomodoro timer
5. Update notes, track progress

### Project Completion
1. Build capstone project during Phase 2
2. Record demo walkthrough
3. Document case study
4. Upload to portfolio
5. Share public profile

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Course Completion | 80% | Modules completed |
| Badge Earned | 40+ | Certifications obtained |
| Portfolio Items | 8+ | Deliverables created |
| DAU | 60% | Daily active users |
| Time Invested | 1000+ hrs | Total logged |

---

## Technical Stack

**Frontend:** React 19 + TypeScript + TailwindCSS
**Backend:** Firebase (Auth, Firestore)
**AI:** Google Gemini API
**Deployment:** Vercel

---

## Roadmap

### MVP (v1.0) - Current
- ✅ 3-phase roadmap with modules
- ✅ Learning resources & free certifications
- ✅ Todo tracking & badge system
- ✅ Pomodoro timer & notes
- ✅ Gemini AI assistant integration

### v1.1 - Next
- Community forum & peer learning
- Progress visualization charts
- Email reminders for daily goals
- Mobile app (React Native)

### v1.2 - Future
- Custom learning path builder
- Video course hosting
- Live mentorship marketplace
- Job board integration

---

## Non-Functional Requirements

- **Performance**: Page load < 2s
- **Availability**: 99.5% uptime
- **Security**: SSL encryption, secure auth
- **Scalability**: Support 10k+ concurrent users
- **Accessibility**: WCAG 2.1 AA compliance

---

## Constraints & Assumptions

- All certifications are free (no paid tiers)
- Relies on third-party APIs (Gemini, Firebase)
- Target: India-based tech students (secondary: global)
- MVP scope: Single-user learning (no collaboration v1)
- Timeline: Q1-Q2 2026 for v1.1 features
