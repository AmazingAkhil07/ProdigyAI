# ProdigyAI - AI Tech Mastery Platform

> Your comprehensive guide to becoming an **AI Tech Generalist → Builder → Agent Architect → Tech Guru & AI Strategist**

A full-featured learning platform built with React 19 + TypeScript + TailwindCSS that guides users through an 8-phase AI mastery curriculum with 40+ modules, 60+ curated free courses, real-time progress tracking, and AI-powered learning assistance.

---

## 🎯 What is ProdigyAI?

ProdigyAI is an **all-in-one AI learning platform** designed for:
- **CS Students** building AI foundations
- **Startup Founders** shipping AI MVPs
- **Engineers** specializing in AI/ML
- **Automation Specialists** using n8n & no-code workflows

**Master:** AI tools, LLM prompt engineering, AI agents, MVP development, automation workflows, and strategic AI leadership.

---

## 📈 The 8-Phase Roadmap

| Phase | Focus | Duration | Modules |
|-------|-------|----------|---------|
| **Phase 0** | AI Fundamentals | 2 weeks | 6 modules |
| **Phase 1** | Prompt Engineering Mastery | 2-3 weeks | 4 modules |
| **Phase 2** | Building AI Applications | 3 weeks | 4 modules |
| **Phase 3** | Advanced AI Agents | 3-4 weeks | 4 modules |
| **Phase 4** | Specialization Paths | 4 weeks | 4 modules |
| **Phase 5** | Deployment & Scale | 3-4 weeks | 3 modules |
| **Phase 6** | Leadership & Strategy | 2-3 weeks | 3 modules |
| **Phase 7** | Cutting Edge (incl. n8n) | Variable | 4 modules |
| **Phase 8** | Mastery & Specialization | Ongoing | Master classes |

**Total:** 40+ modules, 60+ free courses, 30+ AI tools, 500+ integrations (via n8n)

---

## ⏱️ Time Commitment

| Level | Timeline | Daily Commitment |
|-------|----------|------------------|
| **AI Power User** | 8-10 weeks | 60-90 min weekdays |
| **AI Builder** | 4-6 months | 90 min-2 hrs daily |
| **AI Specialist** | 9-12 months | 90 min+ daily |
| **Tech Guru** | 12-18 months | 2-3 hrs daily + projects |

---

## ✨ Core Features

### 1. **Interactive Learning Dashboard**
- Real-time module progress tracking
- Phase completion indicators
- Daily task history
- Streak counter & achievements
- Beautiful responsive UI

### 2. **Comprehensive Learning Resources**
- **60+ Free Courses** from:
  - Harvard, Stanford, MIT, UC San Diego
  - DeepLearning.AI, Coursera, edX
  - Google Cloud, AWS, Azure, IBM
  - Official documentation & tutorials
- **Direct course links** organized by module
- **Free certifications** from industry leaders

### 3. **n8n Automation Module** (Phase 7)
- Visual workflow builder (no code required)
- 500+ application integrations
- LLM trigger chains
- Intelligent workflow routing
- 6 curated learning resources

### 4. **AI-Powered Learning Assistant**
- Google Gemini integration
- Context-aware help for current module
- Code review & project guidance
- Resource suggestions
- Chat history preservation

### 5. **Project & Portfolio Management**
- **Per-module todo lists** with tracking
- **10-item portfolio checklist**:
  - 5 AI workflows
  - 3 AI applications
  - 1 capstone project
  - 2 data dashboards
  - 1 fine-tuned model
- Visual job board
- Progress visualizations

### 6. **Productivity Tools**
- **Pomodoro Timer**: 25/5 focus sessions with stats
- **Weekly Scheduler**: Auto-generate optimal schedules
- **Learning Journal**: Capture key insights
- **Activity Calendar**: Track milestones & completed tasks
- **Focus Tracker**: Monitor deep work sessions

### 7. **Data Persistence & Sync**
- **localStorage**: Instant offline access, data retained on refresh
- **Firestore**: Cloud backup & multi-device sync
- **Reliable timezone handling** using Intl.DateTimeFormat
- **No data loss** on page refresh

### 8. **Personalization**
- 3-step onboarding flow
- Select learning role (Developer, Founder, Analyst, Automation)
- Set weekly learning hours
- Customize learning goals
- Auto-generate recommended path

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + TailwindCSS |
| **State Management** | React Hooks (useState, useEffect, useMemo) |
| **Authentication** | Firebase Auth |
| **Database** | Firestore (Cloud Backup) |
| **Persistence** | localStorage (Offline) |
| **AI** | Google Gemini API |
| **Date Handling** | Intl.DateTimeFormat (IST/Asia-Kolkata) |
| **Deployment** | Vercel |
| **Build Tool** | Vite 6.4.1 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key
- Firebase project (Auth + Firestore)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmazingAkhil07/ProdigyAI.git
   cd ProdigyAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173)

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📚 Project Structure

```
ProdigyAI/
├── components/          # React components
│   ├── AIAssistant.tsx
│   ├── Auth.tsx
│   ├── CalendarView.tsx
│   ├── FocusTracker.tsx
│   ├── ModuleCard.tsx
│   ├── ProgressBar.tsx
│   ├── PomodoroTimer.tsx
│   ├── WeeklyScheduler.tsx
│   └── ...more
├── constants/           # Content & configuration
│   ├── badges.ts
│   └── index.tsx        # 8-phase roadmap, tools stack, portfolio checklist
├── services/            # API integrations
│   ├── firebaseConfig.ts
│   ├── firestoreService.ts
│   └── geminiService.ts
├── utils/               # Utility functions
│   └── dateUtils.ts     # getISTDateString for reliable timezone handling
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main app component
├── index.tsx            # Entry point
└── tailwind.config.js   # TailwindCSS configuration
```

---

## 🎓 Learning Path Example

**Week 1: Phase 0 - AI Fundamentals**
- Module: "AI Landscape & Growth Mindset"
  - Watch: DeepLearning.AI course (2 hrs)
  - Read: Stanford AI Index Report (1 hr)
  - Complete: 5 todos (prompt engineering basics)
  - Earn: "AI Explorer" badge

**Week 2-3: Phase 1 - Prompt Engineering**
- Module: "Advanced Prompting Techniques"
  - Complete: 4-module learning path
  - Build: Custom GPT for your domain
  - Earn: "Prompt Engineer" badge

*...continues through Phase 8*

---

## 🏆 Badge System

Earn 50+ badges including:
- **Phase Badges**: Complete each phase progression
- **Streak Badges**: 7-day, 30-day, 100-day streaks
- **Project Badges**: Portfolio milestones
- **Specialization Badges**: Domain expertise
- **Mastery Badges**: Complete advanced paths

---

## 🌍 Timezone Support

ProdigyAI uses **IST (Asia/Kolkata)** as the primary timezone via:
- `getISTDateString()` utility function
- `Intl.DateTimeFormat` API for reliable cross-environment compatibility
- Consistent date tracking across local, Vercel, and all deployments
- No UTC conversion issues

---

## 🔐 Data & Privacy

- **Authentication**: Firebase Auth (email/password, Google OAuth)
- **Data Storage**:
  - **Offline**: localStorage (instant, private)
  - **Cloud**: Firestore (encrypted, backed up)
- **Auto Sync**: Changes sync automatically when online
- **No Data Loss**: Progress persists on page refresh
- **Privacy**: No data shared with third parties

---

## 📊 Progress Tracking

Track your learning with:
- **Module Completion %**: Visual progress bars by phase
- **Task History**: Calendar view of completed tasks
- **Time Invested**: Pomodoro session tracking
- **Badge Collection**: Achievements earned
- **Portfolio Items**: Deliverables created
- **Streak Counter**: Consecutive days engaged

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Deploy to Other Platforms
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Configure vite.config.ts with `base`
- **Docker**: Create Dockerfile with Node.js + Vite

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 🐛 Issues & Bugs

Found a bug? Please report it:
- Check [existing issues](https://github.com/AmazingAkhil07/ProdigyAI/issues)
- Create a [new issue](https://github.com/AmazingAkhil07/ProdigyAI/issues/new) with:
  - Description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshot/error log (if applicable)

---

## 📝 Roadmap

### ✅ Completed (v1.0)
- 8-phase curriculum with 40+ modules
- 60+ free courses from elite institutions
- 30+ AI tools stack
- n8n automation module
- Firebase integration
- localStorage persistence
- Timezone-safe date handling
- Gemini AI assistant
- Badge system
- Pomodoro timer
- Activity calendar

### 🔄 In Progress (v1.1)
- Progress visualization charts
- Email reminders & notifications
- Mobile app (React Native)
- Community features

### 📅 Coming Soon (v1.2)
- AI-powered learning recommendations
- Video course hosting
- Live mentorship marketplace
- Job board integration
- Social sharing
- Custom learning paths

---

## 📖 Documentation

- [Full Roadmap](./PRD.md) - Complete product requirements
- [API Integration Guide](./docs/api-integration.md) - Firebase & Gemini setup
- [TypeScript Types](./types.ts) - Data structure reference
- [Constants & Config](./constants/index.tsx) - Curriculum & tools

---

## 💡 Tips for Success

1. **Start with Phase 0** - Build solid AI fundamentals
2. **Complete daily tasks** - Maintain your streak
3. **Use Pomodoro Timer** - Focus on deep work
4. **Track projects** - Build a strong portfolio
5. **Review resources** - Take advantage of 60+ free courses
6. **Ask AI assistant** - Don't hesitate to use Gemini for help
7. **Join community** - Share progress with peers (coming v1.2)

---

## 📞 Support

- **Email**: support@prodigyai.dev
- **GitHub Issues**: [Report bugs](https://github.com/AmazingAkhil07/ProdigyAI/issues)
- **Discord** (coming soon): Join our learning community

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Instructors & Institutions**: Harvard, Stanford, DeepLearning.AI, Google, AWS, Azure, IBM
- **Open Source**: React, TypeScript, TailwindCSS, Firebase, Vite, n8n
- **Community**: All learners and contributors

---

## 🌟 Star This Repo

If ProdigyAI helped you on your AI learning journey, please give it a ⭐ on [GitHub](https://github.com/AmazingAkhil07/ProdigyAI)!

---

**Built with ❤️ by the ProdigyAI Team**

*Make AI expertise accessible to everyone. Master AI. Build the future.*
