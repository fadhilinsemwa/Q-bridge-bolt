# Q-Bridge Modular Architecture

## 🎯 Modularization Strategy

**Goal:** Fully modular, scalable architecture where each component is independent, reusable, and maintainable.

**Benefits:**
- ✅ Parallel development (multiple developers)
- ✅ Easy maintenance (fix one module without affecting others)
- ✅ Scalability (add new tools easily)
- ✅ Testability (test modules independently)
- ✅ Reusability (share components across tools)
- ✅ Clear ownership (assign modules to team members)

---

## 📁 Project Structure

### **Monorepo Structure (Recommended)**

```
Q-bridge/
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                # Next.js 14 App Router
│   │   │   ├── (auth)/         # Auth routes
│   │   │   ├── (dashboard)/    # Dashboard routes
│   │   │   └── (tools)/        # Tool routes
│   │   │
│   │   ├── modules/            # Feature Modules ⭐
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── tools/          # 13 Tool Modules
│   │   │   ├── ai/             # 5 AI Modules
│   │   │   ├── notifications/
│   │   │   └── reports/
│   │   │
│   │   ├── shared/             # Shared Components ⭐
│   │   │   ├── components/     # UI Components
│   │   │   ├── hooks/          # Custom Hooks
│   │   │   ├── utils/          # Utilities
│   │   │   └── types/          # TypeScript Types
│   │   │
│   │   └── config/             # Configuration
│   │
│   ├── public/
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── package.json
│
├── backend/                     # NestJS Backend
│   ├── src/
│   │   ├── modules/            # Feature Modules ⭐
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── tools/          # 13 Tool Modules
│   │   │   ├── ai/             # 5 AI Modules
│   │   │   ├── notifications/
│   │   │   ├── reports/
│   │   │   └── files/
│   │   │
│   │   ├── shared/             # Shared Services ⭐
│   │   │   ├── database/
│   │   │   ├── guards/
│   │   │   ├── decorators/
│   │   │   ├── pipes/
│   │   │   └── interceptors/
│   │   │
│   │   ├── common/             # Common Utilities
│   │   │   ├── constants/
│   │   │   ├── enums/
│   │   │   ├── interfaces/
│   │   │   └── dto/
│   │   │
│   │   └── main.ts
│   │
│   ├── prisma/
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── package.json
│
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── README.md
```

---

## 🎨 Frontend Module Structure

### **Tool Module Template**

```
frontend/src/modules/tools/tool-{number}/
├── components/              # Tool-specific components
│   ├── ToolForm.tsx        # Main form component
│   ├── QuestionCard.tsx    # Question display
│   ├── RatingScale.tsx     # Rating input
│   ├── ProgressBar.tsx     # Progress indicator
│   └── Summary.tsx         # Completion summary
│
├── hooks/                   # Tool-specific hooks
│   ├── useToolForm.ts      # Form state management
│   ├── useAutoSave.ts      # Auto-save logic
│   └── useValidation.ts    # Validation logic
│
├── types/                   # TypeScript types
│   ├── tool.types.ts       # Tool data types
│   └── form.types.ts       # Form types
│
├── utils/                   # Tool utilities
│   ├── validation.ts       # Validation rules
│   ├── calculations.ts     # Score calculations
│   └── formatting.ts       # Data formatting
│
├── api/                     # API calls
│   └── tool.api.ts         # Tool-specific API
│
└── index.ts                 # Public exports
```

### **Example: Tool 2 (Teaching & Learning)**

```typescript
// frontend/src/modules/tools/tool-02/index.ts

export { TeachingLearningForm } from './components/ToolForm'
export { useTeachingLearningForm } from './hooks/useToolForm'
export type { TeachingLearningData } from './types/tool.types'
```

---

## 🔧 Backend Module Structure

### **Tool Module Template (NestJS)**

```
backend/src/modules/tools/tool-{number}/
├── dto/                     # Data Transfer Objects
│   ├── create-tool.dto.ts
│   ├── update-tool.dto.ts
│   └── query-tool.dto.ts
│
├── entities/                # Database entities
│   └── tool.entity.ts
│
├── tool.controller.ts       # REST endpoints
├── tool.service.ts          # Business logic
├── tool.module.ts           # Module definition
└── tool.repository.ts       # Data access (optional)
```

### **Example: Tool 2 Module**

```typescript
// backend/src/modules/tools/tool-02/tool-02.module.ts

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    AiModule,
  ],
  controllers: [Tool02Controller],
  providers: [Tool02Service],
  exports: [Tool02Service],
})
export class Tool02Module {}
```

---

## 🧩 Shared Modules

### **Frontend Shared Components**

```
frontend/src/shared/components/
├── forms/
│   ├── RatingScale/         # Reusable rating component
│   ├── TextArea/            # Reusable textarea
│   ├── FileUpload/          # Evidence upload
│   └── FormProgress/        # Progress indicator
│
├── layout/
│   ├── DashboardLayout/
│   ├── ToolLayout/
│   └── AuthLayout/
│
├── ui/                      # shadcn/ui components
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   └── ...
│
└── feedback/
    ├── Toast/
    ├── Modal/
    └── Loading/
```

### **Backend Shared Modules**

```
backend/src/shared/
├── database/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   └── permissions.guard.ts
│
├── decorators/
│   ├── roles.decorator.ts
│   ├── user.decorator.ts
│   └── public.decorator.ts
│
└── interceptors/
    ├── transform.interceptor.ts
    └── logging.interceptor.ts
```

---

## 🔌 Module Communication

### **Frontend: Module Communication**

```typescript
// Using React Context for cross-module state
// frontend/src/shared/contexts/ToolContext.tsx

export const ToolProvider = ({ children }) => {
  const [currentTool, setCurrentTool] = useState(null)
  const [progress, setProgress] = useState(0)
  
  return (
    <ToolContext.Provider value={{ currentTool, progress }}>
      {children}
    </ToolContext.Provider>
  )
}

// Usage in any tool module
import { useToolContext } from '@/shared/contexts/ToolContext'

const { currentTool, progress } = useToolContext()
```

### **Backend: Module Communication**

```typescript
// Using NestJS dependency injection

// In Tool 2 Module
@Injectable()
export class Tool02Service {
  constructor(
    private readonly aiService: AiService,           // AI Module
    private readonly notificationService: NotificationService, // Notification Module
    private readonly prisma: PrismaService,          // Database Module
  ) {}
  
  async submitEvaluation(data: CreateTool02Dto) {
    // Save to database
    const evaluation = await this.prisma.tool02.create({ data })
    
    // Check for auto-flagging (AI Module)
    const flagged = await this.aiService.autoFlag(evaluation)
    
    // Send notifications (Notification Module)
    if (flagged) {
      await this.notificationService.sendFlagAlert(evaluation)
    }
    
    return evaluation
  }
}
```

---

## 📦 Module Registry

### **Tool Modules Registry**

```typescript
// frontend/src/modules/tools/registry.ts

import { Tool01 } from './tool-01'
import { Tool02 } from './tool-02'
// ... import all 13 tools

export const TOOL_REGISTRY = {
  'tool-01': {
    id: 'tool-01',
    name: 'LMS & E-Library Evaluation',
    component: Tool01,
    roles: ['hod', 'qa-officer'],
    icon: 'BookOpen',
  },
  'tool-02': {
    id: 'tool-02',
    name: 'Teaching & Learning Evaluation',
    component: Tool02,
    roles: ['student', 'hod', 'qa-officer'],
    icon: 'GraduationCap',
  },
  // ... all 13 tools
}

// Dynamic tool loading
export const getToolComponent = (toolId: string) => {
  return TOOL_REGISTRY[toolId]?.component
}
```

---

## 🎯 Module Assignment Strategy

### **Week 3-4: Tools 1-5 (Parallel Development)**

```
Developer 1: Tool 1 (LMS & E-Library)
Developer 2: Tool 2 (Teaching & Learning) ⭐ Start here
Developer 3: Tool 3 (Staff Performance)
Developer 4: Tool 4 (Student Experience)
Developer 5: Tool 5 (Dept Work Planning)
```

### **Week 5-6: Tools 6-10**

```
Developer 1: Tool 6 (Infrastructure Audit)
Developer 2: Tool 7 (Governance Audit)
Developer 3: Tool 8 (ISEF)
Developer 4: Tool 9 (Programme Review)
Developer 5: Tool 10 (Graduate Tracer)
```

### **Week 7: Tools 11-13 + AI**

```
Developer 1: Tool 11 (Risk Assessment)
Developer 2: Tool 12A/B (Online Learning)
Developer 3: Tool 13 (Field Supervision)
Developer 4-5: AI Modules (5 modules)
```

---

## 🔄 Module Lifecycle

### **1. Module Creation**

```bash
# Create new tool module
npm run generate:tool -- --number=02 --name="Teaching & Learning"

# Generates:
# - frontend/src/modules/tools/tool-02/
# - backend/src/modules/tools/tool-02/
# - Tests
# - Documentation
```

### **2. Module Development**

```typescript
// Each module is self-contained
// Can be developed, tested, and deployed independently
```

### **3. Module Integration**

```typescript
// Register in tool registry
// Add routes
// Update permissions
// Deploy
```

---

## ✅ Benefits Summary

| Benefit | Description |
|---------|-------------|
| **Parallel Development** | 5 developers can work on 5 tools simultaneously |
| **Clear Ownership** | Each developer owns specific modules |
| **Easy Testing** | Test each tool independently |
| **Maintainability** | Fix bugs in one tool without affecting others |
| **Scalability** | Add Tool 14, 15, 16... easily |
| **Reusability** | Share components across tools |
| **Code Organization** | Clear structure, easy to navigate |
| **Team Onboarding** | New developers can start on one module |

---

## 🚀 Ready for Modular Development!

**This architecture allows:**
- Multiple developers working in parallel
- Easy module assignment
- Independent testing and deployment
- Future scalability
- Clean code organization

**Next Step:** Setup project structure with modular architecture
