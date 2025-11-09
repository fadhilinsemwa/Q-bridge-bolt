# Quick Start: Testing Q-Bridge Dashboards

**Status:** ✅ Ready for Testing  
**Date:** November 8, 2025

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Verify Services are Running

```bash
# Check backend (should return {"status":"ok"})
curl http://localhost:4100/api/health

# Check frontend (should return HTML)
curl http://localhost:3100
```

### Step 2: Create a Test User

```bash
# Create a student user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@tpi.ac.tz",
    "password": "Student@123",
    "firstName": "Test",
    "lastName": "Student",
    "role": "STUDENT"
  }'
```

### Step 3: Test Login in Browser

1. Open: `http://localhost:3100/login`
2. Login with:
   - Email: `student@tpi.ac.tz`
   - Password: `Student@123`
3. You should be redirected to: `/student/dashboard`

---

## 📋 All 7 Test Users

Create these users to test all dashboards:

```bash
# 1. STUDENT
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"student@tpi.ac.tz","password":"Student@123","firstName":"Test","lastName":"Student","role":"STUDENT"}'

# 2. ACADEMIC_STAFF
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"staff@tpi.ac.tz","password":"Staff@123","firstName":"Test","lastName":"Staff","role":"ACADEMIC_STAFF"}'

# 3. HOD
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"hod@tpi.ac.tz","password":"Hod@123","firstName":"Test","lastName":"HOD","role":"HOD"}'

# 4. QAC_MEMBER
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"qac@tpi.ac.tz","password":"Qac@123","firstName":"Test","lastName":"QAC","role":"QAC_MEMBER"}'

# 5. REGISTRAR
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"registrar@tpi.ac.tz","password":"Registrar@123","firstName":"Test","lastName":"Registrar","role":"REGISTRAR"}'

# 6. DIRECTOR
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"director@tpi.ac.tz","password":"Director@123","firstName":"Test","lastName":"Director","role":"DIRECTOR"}'

# 7. SYSTEM_ADMIN
curl -X POST http://localhost:4100/api/auth/register -H "Content-Type: application/json" -d '{"email":"admin@tpi.ac.tz","password":"Admin@123","firstName":"Test","lastName":"Admin","role":"SYSTEM_ADMIN"}'
```

---

## 🧪 Quick Test Checklist

For each role, verify:

- [ ] Can login successfully
- [ ] Redirected to correct dashboard
- [ ] Dashboard displays user name and role
- [ ] Logout button works
- [ ] Cannot access other role dashboards
- [ ] Teal color (#14b8a6) used
- [ ] Mobile responsive

---

## 📱 Dashboard URLs

| Role | URL |
|------|-----|
| Student | http://localhost:3100/student/dashboard |
| Academic Staff | http://localhost:3100/staff/dashboard |
| HOD | http://localhost:3100/hod/dashboard |
| QAC Member | http://localhost:3100/qac/dashboard |
| Registrar | http://localhost:3100/registrar/dashboard |
| Director | http://localhost:3100/director/dashboard |
| System Admin | http://localhost:3100/admin/dashboard |

---

## 🔍 Key Features to Test

### Student Dashboard
- ✅ Available evaluations
- ✅ Quick stats (3 cards)
- ✅ Recent feedback

### Academic Staff Dashboard
- ✅ Course analytics
- ✅ **AI recommendations**
- ✅ **Auto-flagged courses** (≤3)

### HOD Dashboard
- ✅ Departmental summary
- ✅ **Auto-flagged criteria** (≤3)
- ✅ **AI recommendations**
- ✅ Action assignment

### QAC Member Dashboard
- ✅ Institution-wide stats
- ✅ Tool activation
- ✅ Flagged criteria aggregation
- ✅ Department completion

### Registrar Dashboard
- ✅ Programme stats (18 programmes)
- ✅ Student enrollment (2,847)
- ✅ Completion rate (87%)
- ✅ Accreditation (16/18)

### Director Dashboard
- ✅ QA Score (4.3)
- ✅ NACTVET Compliance (89%)
- ✅ Student Satisfaction (86%)
- ✅ Critical Issues (3)

### System Admin Dashboard
- ✅ User management
- ✅ System health
- ✅ Configuration
- ✅ Audit logs

---

## 🐛 Troubleshooting

**Problem:** Backend not responding
```bash
# Check if backend is running
docker ps | grep backend

# View backend logs
docker logs qbridge-backend-dev

# Restart backend
docker restart qbridge-backend-dev
```

**Problem:** Frontend not loading
```bash
# Check if frontend is running
lsof -ti:3100

# View frontend logs (in browser DevTools Console)
```

**Problem:** Cannot create users
```bash
# Check database connection
docker exec qbridge-backend-dev npx prisma db push

# View database
docker exec qbridge-backend-dev npx prisma studio
```

---

## 📚 Full Documentation

- **Detailed Testing Guide:** `MANUAL_TESTING_GUIDE.md`
- **Test Plan:** `TESTING_PLAN.md`
- **Completion Summary:** `PHASE2_COMPLETION_SUMMARY.md`
- **Auth Implementation:** `docs/06-phase2-auth/AUTHENTICATION_IMPLEMENTATION_PLAN.md`

---

## ✅ Success Criteria

Phase 2 is complete when:

- [x] All 7 dashboards created
- [x] Authentication system working
- [x] RBAC enforced
- [ ] Manual testing passed (In Progress)
- [ ] E2E tests written
- [ ] Documentation complete

---

**Current Status:** 🟡 Ready for Manual Testing  
**Next Step:** Create test users and test each dashboard  
**Estimated Time:** 30-60 minutes for complete manual testing
