# Q-Bridge - Quality Assurance Management System

![Q-Bridge](https://img.shields.io/badge/Q--Bridge-v1.0.0-teal)
![License](https://img.shields.io/badge/license-MIT-blue)
![Docker](https://img.shields.io/badge/docker-ready-blue)

**AI-Powered Quality Assurance Management System for Tandabui Polytechnic Institute (TPI)**

---

## 🎯 Overview

Q-Bridge is a comprehensive Quality Assurance Management System designed to streamline and automate quality evaluation processes across all departments at TPI. The system features 13 specialized QA tools, AI-powered analytics, and role-based dashboards for 7 user roles.

### **Key Features**

- ✅ **13 QA Tools** - Complete evaluation toolkit
- ✅ **7 User Roles** - Role-based access control (RBAC)
- ✅ **5 AI Modules** - Auto-flagging, recommendations, risk analysis, NLP, report composition
- ✅ **Zero-Scrolling Forms** - Engaging, mobile-responsive evaluation forms
- ✅ **Real-time Notifications** - Email, SMS, and in-app alerts
- ✅ **Comprehensive Dashboards** - Role-specific analytics and insights
- ✅ **Docker-First** - Containerized from development to production
- ✅ **Fully Modular** - Scalable, maintainable architecture

---

## 🏗️ Architecture

### **Tech Stack**

**Frontend:**
- Next.js 14+ (React, TypeScript)
- Tailwind CSS + shadcn/ui
- React Query (data fetching)
- Zustand (state management)

**Backend:**
- NestJS (TypeScript)
- Prisma ORM
- PostgreSQL 15
- Redis (caching)
- MinIO (file storage)

**AI/ML:**
- OpenAI GPT-4 (NLP, recommendations)
- Custom ML models (risk analysis)

**Infrastructure:**
- Docker + Docker Compose
- Nginx (reverse proxy)
- Let's Encrypt (SSL/TLS)

---

## 📁 Project Structure

```
Q-bridge/
├── docs/                    # 📚 Complete documentation
│   ├── 01-requirements/
│   ├── 02-user-stories/
│   ├── 03-technical-decisions/
│   ├── 04-implementation-strategy/
│   └── 05-ui-ux-design/
│
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── modules/        # Feature modules (tools, auth, etc.)
│   │   ├── shared/         # Shared components & utilities
│   │   └── app/            # Next.js App Router
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
│
├── backend/                 # NestJS application
│   ├── src/
│   │   ├── modules/        # Feature modules (tools, auth, etc.)
│   │   ├── shared/         # Shared services & utilities
│   │   └── common/         # Common constants & types
│   ├── prisma/
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
│
├── docker-compose.dev.yml   # Development environment
├── docker-compose.prod.yml  # Production environment
├── .env.example             # Environment variables template
└── Makefile                 # Helper commands
```

---

## 🚀 Quick Start

### **Prerequisites**

- Docker Desktop
- Git
- Node.js 20+ (optional, for local testing)

### **Development Setup**

```bash
# 1. Clone repository
git clone https://github.com/tandabuiinstitute/Q-bridge.git
cd Q-bridge

# 2. Copy environment file
cp .env.example .env.development

# 3. Start Docker development environment
docker-compose -f docker-compose.dev.yml up -d

# 4. Access application
# Frontend: http://localhost:3000
# Backend:  http://localhost:4000
# MinIO:    http://localhost:9001

# 5. View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### **Using Makefile (Recommended)**

```bash
# Start development environment
make dev-up

# View logs
make dev-logs

# Rebuild containers
make dev-build

# Stop environment
make dev-down

# Run tests
make test

# Database migrations
make db-migrate
```

---

## 📚 Documentation

Complete documentation is available in the `/docs` directory:

### **Quick Links**

- **[Start Here: README](docs/README.md)** - Documentation overview
- **[Requirements](docs/01-requirements/Q-Bridge%20user%20story%20.md)** - Core user stories
- **[User Stories](docs/02-user-stories/USER_STORIES_BY_ROLE.md)** - All 7 roles, 13 tools
- **[Docker Workflow](docs/03-technical-decisions/DEVELOPMENT_WORKFLOW_DOCKER_FIRST.md)** - Development setup
- **[Modular Architecture](docs/03-technical-decisions/MODULAR_ARCHITECTURE.md)** - Project structure
- **[UI/UX Design](docs/05-ui-ux-design/FORM_DESIGN_SPECIFICATIONS.md)** - Form design specs
- **[Implementation Plan](docs/04-implementation-strategy/PHASE_1_WEB_FIRST_STRATEGY.md)** - 8-week roadmap

---

## 🎨 Design System

### **Brand Colors**

```css
Primary:   #14b8a6  /* Teal-500 */
Secondary: #0f766e  /* Teal-700 */
Accent:    #06b6d4  /* Cyan-500 */
```

### **Typography**

- **Font Family:** Inter (configurable via .env)
- **Font Source:** https://tandabuionline.ac.tz

### **UI Principles**

- Zero scrolling on all devices
- Mobile: 1 question per screen
- Tablet: 2-3 questions per screen
- Desktop: 3-5 questions per screen
- Touch targets: 60x60px minimum
- WCAG 2.1 AA compliant

---

## 🔧 Development

### **Module Structure**

Each QA tool is a self-contained module:

```
modules/tools/tool-02/
├── components/         # UI components
├── hooks/             # Custom hooks
├── types/             # TypeScript types
├── api/               # API calls
└── index.ts           # Public exports
```

### **Adding a New Tool**

```bash
# Generate tool module (frontend + backend)
npm run generate:tool -- --number=02 --name="Teaching & Learning"
```

### **Running Tests**

```bash
# All tests
make test

# Frontend tests
docker-compose -f docker-compose.dev.yml exec frontend npm run test

# Backend tests
docker-compose -f docker-compose.dev.yml exec backend npm run test
```

---

## 🚢 Deployment

### **Production Build**

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose -f docker-compose.prod.yml exec backend npx prisma migrate deploy
```

### **Ultahost Deployment**

Detailed deployment instructions: [Docker Deployment Strategy](docs/03-technical-decisions/DOCKER_DEPLOYMENT_STRATEGY.md)

---

## 🧪 Testing

### **Test Coverage**

- Unit tests (Jest)
- Integration tests (Supertest)
- E2E tests (Playwright)
- Component tests (React Testing Library)

### **CI/CD Pipeline**

GitHub Actions workflow (coming soon):
- Automated testing
- Docker image building
- Deployment to Ultahost

---

## 📊 Project Status

### **Phase 1: Development (8 Weeks)**

- [x] Week 1-2: Foundation + Docker setup
- [ ] Week 3-4: Tools 1-5
- [ ] Week 5-6: Tools 6-10
- [ ] Week 7: Tools 11-13 + AI modules
- [ ] Week 8: Testing + Production prep

### **Current Status**

✅ Documentation complete (100%)  
✅ Architecture defined  
✅ Docker workflow documented  
✅ UI/UX specifications ready  
⏳ Development starting soon

---

## 👥 Team

**Tandabui Polytechnic Institute (TPI)**

- Project Owner: TPI Quality Assurance Unit
- Development Team: TPI ICT Department
- Stakeholders: All TPI departments

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🤝 Contributing

This is an internal TPI project. For questions or contributions, contact the ICT department.

---

## 📞 Support

- **Documentation:** [/docs](docs/)
- **Issues:** GitHub Issues
- **Email:** ict@tpi.ac.tz

---

## 🙏 Acknowledgments

- Tandabui Polytechnic Institute
- TPI Quality Assurance Unit
- All stakeholders and contributors

---

**Built with ❤️ by TPI ICT Department**

**Q-Bridge** - Bridging Quality and Excellence
