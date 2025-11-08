# Phase 2: Authentication & RBAC Implementation Plan

## 🎯 Objective
Implement secure authentication and role-based access control (RBAC) for Q-Bridge following the documented requirements.

## 📋 Requirements (from docs)

### User Roles (7 Total)
Based on `docs/02-user-stories/USER_STORIES_BY_ROLE.md`:

1. **STUDENT** - Submit evaluations, view feedback
2. **ACADEMIC_STAFF** - Self/peer evaluations, course analytics, evidence attachment
3. **HOD** - Unit dashboards, approvals, action tracking, flagged criteria
4. **QAC_MEMBER** - Full analytics, AI insights, tool activation, compliance
5. **REGISTRAR** - Programme evaluation, accreditation readiness
6. **DIRECTOR** - Institutional performance, compliance summaries
7. **SYSTEM_ADMIN** - Tenant, SSO, secrets, backups, integrations

### Authentication Features
- ✅ JWT-based authentication
- ✅ Refresh token mechanism
- ✅ Email verification
- ✅ Password reset
- ✅ Secure password hashing (bcrypt)
- ⏳ SSO/OAuth2 support (Phase 2 enhancement)
- ⏳ MFA capability (Phase 2 enhancement)

### RBAC Features
- ✅ Role-based access control
- ✅ Route guards
- ✅ Permission decorators
- ✅ Tool-specific access control
- ✅ Audit logging

## 🏗️ Implementation Steps

### Step 1: Database Schema ✅
- [x] Create Prisma schema with User model
- [x] Define 7 user roles enum
- [x] Add RefreshToken model
- [x] Add AuditLog model
- [x] Include user status (ACTIVE, INACTIVE, SUSPENDED, PENDING_VERIFICATION)

### Step 2: Backend - Core Auth Module
- [ ] Create auth module structure
- [ ] Implement JWT strategy
- [ ] Create auth service (register, login, refresh, logout)
- [ ] Add password hashing utilities
- [ ] Create email verification service
- [ ] Create password reset service

### Step 3: Backend - Guards & Decorators
- [ ] Create JWT auth guard
- [ ] Create roles guard
- [ ] Create @Roles() decorator
- [ ] Create @Public() decorator
- [ ] Create @CurrentUser() decorator

### Step 4: Backend - Auth Endpoints
- [ ] POST /api/auth/register
- [ ] POST /api/auth/login
- [ ] POST /api/auth/refresh
- [ ] POST /api/auth/logout
- [ ] POST /api/auth/verify-email
- [ ] POST /api/auth/forgot-password
- [ ] POST /api/auth/reset-password
- [ ] GET /api/auth/me

### Step 5: Backend - User Management
- [ ] Create users module
- [ ] Implement user CRUD operations
- [ ] Add user profile endpoints
- [ ] Implement role management (admin only)

### Step 6: Frontend - Auth Context
- [ ] Create AuthContext
- [ ] Create useAuth hook
- [ ] Implement token storage (httpOnly cookies preferred)
- [ ] Add axios interceptors for token refresh
- [ ] Create protected route wrapper

### Step 7: Frontend - Auth UI Components
- [ ] Login page
- [ ] Register page
- [ ] Forgot password page
- [ ] Reset password page
- [ ] Email verification page
- [ ] Profile page

### Step 8: Frontend - Role-Based UI
- [ ] Create role-based navigation
- [ ] Implement conditional rendering by role
- [ ] Create role-specific dashboards
- [ ] Add permission-based component visibility

### Step 9: E2E Tests
- [ ] Auth API tests (register, login, refresh, logout)
- [ ] Frontend auth flow tests
- [ ] Role-based access tests
- [ ] Token expiration tests
- [ ] Password reset flow tests

### Step 10: Documentation & Deployment
- [ ] API documentation (Swagger)
- [ ] Frontend auth documentation
- [ ] Environment variables documentation
- [ ] Migration guide
- [ ] Security best practices

## 🔐 Security Considerations

### Password Security
- Minimum 8 characters
- Must include: uppercase, lowercase, number, special character
- Hashed with bcrypt (salt rounds: 10)
- Password history (prevent reuse of last 5 passwords)

### Token Security
- Access token: 15 minutes expiry
- Refresh token: 7 days expiry
- Refresh tokens stored in database (revocable)
- Tokens include: userId, role, email
- httpOnly cookies for web (XSS protection)

### Session Security
- Track last login time
- Log all authentication events
- Implement rate limiting
- Add CAPTCHA for repeated failed attempts
- IP-based anomaly detection

### Data Protection
- Email verification required before full access
- Soft delete for users (retain audit trail)
- Encrypt sensitive data at rest
- HTTPS only in production
- CORS properly configured

## 📊 Database Migrations

### Migration 1: Initial Auth Schema
```sql
-- Users table with 7 roles
-- RefreshTokens table
-- AuditLogs table
-- Indexes for performance
```

## 🧪 Testing Strategy

### Unit Tests
- Auth service methods
- Password hashing/verification
- Token generation/validation
- Email verification logic

### Integration Tests
- Auth endpoints
- Role-based access
- Token refresh flow
- Password reset flow

### E2E Tests
- Complete registration flow
- Complete login flow
- Role-based navigation
- Protected routes
- Token expiration handling

## 📈 Success Criteria

- [ ] All 7 roles can register and login
- [ ] JWT tokens work correctly
- [ ] Refresh token mechanism functional
- [ ] Email verification working
- [ ] Password reset working
- [ ] Role-based access control enforced
- [ ] All E2E tests passing
- [ ] No security vulnerabilities
- [ ] Performance: < 200ms for auth endpoints
- [ ] Documentation complete

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] JWT secrets generated (production)
- [ ] Email service configured
- [ ] CORS settings verified
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Monitoring enabled
- [ ] Backup strategy in place

## 📚 References

- Q-Bridge User Stories: `docs/02-user-stories/USER_STORIES_BY_ROLE.md`
- Implementation Strategy: `docs/04-implementation-strategy/UPDATED_STRATEGY_SUMMARY.md`
- Backend Tech Decision: `docs/03-technical-decisions/BACKEND_TECH_DECISION_NESTJS_VS_GO.md`

---

**Status**: 🟡 In Progress
**Started**: Nov 8, 2025
**Target Completion**: Nov 10, 2025
