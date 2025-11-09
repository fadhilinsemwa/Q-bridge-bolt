# Q-Bridge Testing - Quick Start Guide

**Phase 2: Authentication & RBAC Testing**  
**Status:** ✅ Ready to Test

---

## 🚀 Quick Start (30 seconds)

### 1. Run Bash Script Test
```bash
./test-dashboards.sh
```

This will:
- ✅ Check backend & frontend health
- ✅ Auto-create all 7 test users
- ✅ Test login for all roles
- ✅ Validate authentication tokens

**Expected:** 100% pass rate after running twice (first run creates users)

### 2. Run E2E Tests (Optional but Recommended)
```bash
cd e2e-tests
npm install          # First time only
npx playwright install  # First time only
npm test
```

This will:
- ✅ Run 30+ automated tests
- ✅ Test all authentication flows
- ✅ Test all 7 dashboards
- ✅ Verify RBAC enforcement
- ✅ Generate detailed reports

---

## 📊 What Gets Tested

### Bash Script (15 tests)
1. Backend health
2. Frontend health
3. Unauthorized access protection
4-10. Login for all 7 roles
11-15. Token validation for all roles

### Playwright E2E (30+ tests)
- **Authentication:** Login, logout, session persistence, errors
- **API:** Register, login, refresh, /me, logout
- **Dashboards:** All 7 role-specific dashboards
- **RBAC:** Cross-role access prevention

---

## 🎯 Test Users (Auto-Created)

| Role | Email | Password |
|------|-------|----------|
| STUDENT | student@tpi.ac.tz | Student@123 |
| ACADEMIC_STAFF | staff@tpi.ac.tz | Staff@123 |
| HOD | hod@tpi.ac.tz | Hod@123 |
| QAC_MEMBER | qac@tpi.ac.tz | Qac@123 |
| REGISTRAR | registrar@tpi.ac.tz | Registrar@123 |
| DIRECTOR | director@tpi.ac.tz | Director@123 |
| SYSTEM_ADMIN | admin@tpi.ac.tz | Admin@123 |

---

## 📁 Testing Files

```
Q-Bridge/
├── test-dashboards.sh           # ⭐ Quick bash tests
├── e2e-tests/                   # ⭐ Comprehensive E2E tests
│   ├── tests/
│   │   ├── api/                 # API tests
│   │   ├── frontend/            # Frontend tests
│   │   └── setup/               # Auto-setup
│   ├── fixtures/                # Test data
│   └── helpers/                 # Utilities
├── TESTING_SUMMARY.md           # Detailed overview
├── TESTING_PLAN.md              # Test strategy
└── PHASE2_TESTING_COMPLETE.md   # Completion summary
```

---

## 🔧 Troubleshooting

### "Backend not running"
```bash
docker ps  # Check containers
```

### "Frontend not running"
```bash
# Should be on port 3100
curl http://localhost:3100
```

### "Tests still failing"
```bash
# Re-run bash script (it auto-fixes)
./test-dashboards.sh
```

---

## ✅ Success Criteria

Tests pass when:
- ✅ Bash script: 100% pass rate
- ✅ Playwright: 100% pass rate
- ✅ All 7 roles can login
- ✅ All 7 dashboards load
- ✅ RBAC blocks unauthorized access

---

## 📚 Full Documentation

- **TESTING_SUMMARY.md** - Complete testing overview
- **e2e-tests/README.md** - E2E testing guide
- **e2e-tests/E2E_TESTING_GUIDE.md** - Playwright details
- **TESTING_PLAN.md** - Test cases & objectives

---

**Ready to test!** Run `./test-dashboards.sh` now. 🚀
