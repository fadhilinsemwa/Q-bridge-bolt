# Q-Bridge Manual Testing Guide
## Phase 2: Authentication & RBAC Testing

**Date:** November 8, 2025  
**Status:** Ready for Testing  
**Reference:** TESTING_PLAN.md

---

## 🎯 Testing Overview

This guide provides step-by-step instructions for manually testing all 7 role-based dashboards and the authentication system.

**What We're Testing:**
- ✅ User authentication (login/logout)
- ✅ Role-based access control (RBAC)
- ✅ Dashboard functionality for all 7 roles
- ✅ Protected route enforcement
- ✅ Mobile responsiveness
- ✅ UI/UX alignment with documentation

---

## 📋 Prerequisites

### 1. Ensure Services Are Running

Check that both backend and frontend are running:

```bash
# Check if backend is running (should return 200)
curl http://localhost:4100/api/health

# Check if frontend is running (should return 200)
curl http://localhost:3100
```

**Expected Output:**
- Backend: `{"status":"ok","timestamp":"..."}`
- Frontend: HTML page

### 2. Create Test Users

You need to create test user accounts for each of the 7 roles. You can do this via:

**Option A: Using the Backend API (Recommended)**

Use the registration endpoint to create users:

```bash
# 1. Create STUDENT user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@tpi.ac.tz",
    "password": "Student@123",
    "firstName": "Test",
    "lastName": "Student",
    "role": "STUDENT"
  }'

# 2. Create ACADEMIC_STAFF user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "staff@tpi.ac.tz",
    "password": "Staff@123",
    "firstName": "Test",
    "lastName": "Staff",
    "role": "ACADEMIC_STAFF"
  }'

# 3. Create HOD user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hod@tpi.ac.tz",
    "password": "Hod@123",
    "firstName": "Test",
    "lastName": "HOD",
    "role": "HOD"
  }'

# 4. Create QAC_MEMBER user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "qac@tpi.ac.tz",
    "password": "Qac@123",
    "firstName": "Test",
    "lastName": "QAC",
    "role": "QAC_MEMBER"
  }'

# 5. Create REGISTRAR user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "registrar@tpi.ac.tz",
    "password": "Registrar@123",
    "firstName": "Test",
    "lastName": "Registrar",
    "role": "REGISTRAR"
  }'

# 6. Create DIRECTOR user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "director@tpi.ac.tz",
    "password": "Director@123",
    "firstName": "Test",
    "lastName": "Director",
    "role": "DIRECTOR"
  }'

# 7. Create SYSTEM_ADMIN user
curl -X POST http://localhost:4100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tpi.ac.tz",
    "password": "Admin@123",
    "firstName": "Test",
    "lastName": "Admin",
    "role": "SYSTEM_ADMIN"
  }'
```

**Option B: Using Prisma Studio**

```bash
cd backend
npx prisma studio
```

Then manually create users in the database.

---

## 🧪 Test Execution

### Test 1: Student Dashboard

**Test User:**
- Email: `student@tpi.ac.tz`
- Password: `Student@123`

**Steps:**

1. **Open the application:**
   - Navigate to: `http://localhost:3100`

2. **Login:**
   - Click "Login" or navigate to `http://localhost:3100/login`
   - Enter student credentials
   - Click "Login" button

3. **Verify Redirect:**
   - ✅ Should redirect to `/student/dashboard`
   - ✅ URL should be: `http://localhost:3100/student/dashboard`

4. **Verify Dashboard Content:**
   - ✅ Header shows "Q-Bridge"
   - ✅ Subtitle shows "Student Dashboard"
   - ✅ User name displayed: "Test Student"
   - ✅ Role displayed: "STUDENT"
   - ✅ Logout button visible
   - ✅ Welcome message: "Welcome, Test! 📚"
   - ✅ Quick stats cards visible (3 cards)
   - ✅ Available evaluations section visible
   - ✅ Recent feedback section visible
   - ✅ Teal color (#14b8a6) used for primary elements

5. **Test Logout:**
   - Click "Logout" button
   - ✅ Should redirect to `/login`
   - ✅ Cannot access `/student/dashboard` after logout

6. **Test RBAC (Role-Based Access Control):**
   - Login again as student
   - Try to manually navigate to:
     - `http://localhost:3100/staff/dashboard` ❌ Should redirect/block
     - `http://localhost:3100/hod/dashboard` ❌ Should redirect/block
     - `http://localhost:3100/admin/dashboard` ❌ Should redirect/block

**Expected Result:** ✅ Student can only access Student Dashboard

---

### Test 2: Academic Staff Dashboard

**Test User:**
- Email: `staff@tpi.ac.tz`
- Password: `Staff@123`

**Steps:**

1. **Login:**
   - Navigate to `http://localhost:3100/login`
   - Enter staff credentials
   - Click "Login"

2. **Verify Redirect:**
   - ✅ Should redirect to `/staff/dashboard`

3. **Verify Dashboard Content:**
   - ✅ Header shows "Academic Staff Dashboard"
   - ✅ User name: "Test Staff"
   - ✅ Role: "ACADEMIC_STAFF"
   - ✅ Welcome message: "Welcome, Test! 👨‍🏫"
   - ✅ Course analytics section visible
   - ✅ **AI Recommendations section visible** (Key Feature)
   - ✅ **Auto-flagged courses section visible** (≤3 rating)
   - ✅ Action items section visible
   - ✅ Performance metrics visible
   - ✅ Teal branding applied

4. **Test Features:**
   - ✅ Can see AI-generated recommendations
   - ✅ Can see courses flagged with low ratings
   - ✅ Can view action items assigned

**Expected Result:** ✅ Staff dashboard shows AI features and analytics

---

### Test 3: HOD Dashboard

**Test User:**
- Email: `hod@tpi.ac.tz`
- Password: `Hod@123`

**Steps:**

1. **Login & Verify:**
   - Login with HOD credentials
   - ✅ Redirects to `/hod/dashboard`

2. **Verify Dashboard Content:**
   - ✅ Header: "HOD Dashboard - Department Management"
   - ✅ User: "Test HOD"
   - ✅ Role: "HOD"
   - ✅ Welcome: "Welcome, Test! 🎓"
   - ✅ Departmental summary visible
   - ✅ **Auto-flagged criteria section** (≤3 rating)
   - ✅ **AI recommendations visible**
   - ✅ Action assignment interface
   - ✅ Staff list visible

**Expected Result:** ✅ HOD can manage department and assign actions

---

### Test 4: QAC Member Dashboard

**Test User:**
- Email: `qac@tpi.ac.tz`
- Password: `Qac@123`

**Steps:**

1. **Login & Verify:**
   - Login with QAC credentials
   - ✅ Redirects to `/qac/dashboard`

2. **Verify Dashboard Content:**
   - ✅ Header: "QAC Member Dashboard - Quality Assurance"
   - ✅ User: "Test QAC"
   - ✅ Role: "QAC_MEMBER"
   - ✅ Welcome: "Welcome, Test! 🔍"
   - ✅ Institution-wide stats (4 cards)
   - ✅ **Tool activation interface**
   - ✅ **Flagged criteria aggregation**
   - ✅ Department completion tracking
   - ✅ Quick actions section
   - ✅ Follow-up tracker

**Expected Result:** ✅ QAC has institution-wide oversight

---

### Test 5: Registrar Dashboard

**Test User:**
- Email: `registrar@tpi.ac.tz`
- Password: `Registrar@123`

**Steps:**

1. **Login & Verify:**
   - Login with Registrar credentials
   - ✅ Redirects to `/registrar/dashboard`

2. **Verify Dashboard Content:**
   - ✅ Header: "Registrar Dashboard - Academic Office"
   - ✅ User: "Test Registrar"
   - ✅ Role: "REGISTRAR"
   - ✅ Welcome: "Welcome, Test! 📋"
   - ✅ Programme stats (4 cards):
     - Total Programmes: 18
     - Student Enrollment: 2,847
     - Completion Rate: 87%
     - Accreditation Status: 16/18
   - ✅ Programme reports section
   - ✅ Download buttons for reports

**Expected Result:** ✅ Registrar can access academic reports

---

### Test 6: Director Dashboard

**Test User:**
- Email: `director@tpi.ac.tz`
- Password: `Director@123`

**Steps:**

1. **Login & Verify:**
   - Login with Director credentials
   - ✅ Redirects to `/director/dashboard`

2. **Verify Dashboard Content:**
   - ✅ Header: "Director Dashboard - Executive Overview"
   - ✅ User: "Test Director"
   - ✅ Role: "DIRECTOR"
   - ✅ Welcome: "Welcome, Test! 📊"
   - ✅ Executive KPIs (4 cards):
     - Overall QA Score: 4.3
     - NACTVET Compliance: 89%
     - Student Satisfaction: 86%
     - Critical Issues: 3
   - ✅ Executive summary section
   - ✅ Strategic reports section

**Expected Result:** ✅ Director sees high-level institutional metrics

---

### Test 7: System Admin Dashboard

**Test User:**
- Email: `admin@tpi.ac.tz`
- Password: `Admin@123`

**Steps:**

1. **Login & Verify:**
   - Login with Admin credentials
   - ✅ Redirects to `/admin/dashboard`

2. **Verify Dashboard Content:**
   - ✅ Header: "System Admin Dashboard"
   - ✅ User: "Test Admin"
   - ✅ Role: "SYSTEM_ADMIN"
   - ✅ Welcome: "Welcome, Test! ⚙️"
   - ✅ System health stats (4 cards)
   - ✅ User management interface
   - ✅ System configuration section
   - ✅ Integrations status
   - ✅ Backup management
   - ✅ Audit logs section

**Expected Result:** ✅ Admin can manage system and users

---

## 📱 Mobile Responsiveness Testing

### Test on Different Screen Sizes

**Using Browser DevTools:**

1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test each dashboard on:
   - **iPhone 13** (390x844)
   - **iPad** (768x1024)
   - **Desktop** (1920x1080)

**What to Check:**

- ✅ Layout adapts to screen size
- ✅ Cards stack vertically on mobile
- ✅ Text is readable (no overflow)
- ✅ Buttons are touch-friendly (≥44px)
- ✅ No horizontal scrolling
- ✅ Navigation is accessible
- ✅ Forms are usable on mobile

---

## 🔒 Security Testing

### Test 1: Unauthenticated Access

1. **Clear browser storage:**
   - Open DevTools → Application → Storage → Clear site data

2. **Try to access protected routes:**
   - Navigate to `http://localhost:3100/student/dashboard`
   - ✅ Should redirect to `/login`
   - ✅ Should show "Please login to continue" message

### Test 2: Cross-Role Access

1. **Login as Student**
2. **Try to access other dashboards:**
   - `/staff/dashboard` ❌ Should block/redirect
   - `/admin/dashboard` ❌ Should block/redirect
   - `/director/dashboard` ❌ Should block/redirect

3. **Verify:**
   - ✅ User can only access their own dashboard
   - ✅ Unauthorized access is blocked
   - ✅ Appropriate error message shown

---

## ✅ Test Results Checklist

### Authentication Flow
- [ ] Users can register successfully
- [ ] Users can login with valid credentials
- [ ] Invalid credentials show error message
- [ ] Users are redirected to role-specific dashboard
- [ ] Logout clears session and redirects to login
- [ ] Protected routes require authentication

### Role-Based Access Control (RBAC)
- [ ] STUDENT can only access Student Dashboard
- [ ] ACADEMIC_STAFF can only access Staff Dashboard
- [ ] HOD can only access HOD Dashboard
- [ ] QAC_MEMBER can only access QAC Dashboard
- [ ] REGISTRAR can only access Registrar Dashboard
- [ ] DIRECTOR can only access Director Dashboard
- [ ] SYSTEM_ADMIN can only access Admin Dashboard

### Dashboard Functionality
- [ ] Student Dashboard displays correctly
- [ ] Academic Staff Dashboard shows AI features
- [ ] HOD Dashboard shows auto-flagging
- [ ] QAC Dashboard shows institution-wide data
- [ ] Registrar Dashboard shows programme data
- [ ] Director Dashboard shows executive metrics
- [ ] System Admin Dashboard shows system controls

### UI/UX & Branding
- [ ] Teal color (#14b8a6) used consistently
- [ ] All dashboards have professional design
- [ ] User info displayed correctly
- [ ] Logout button works on all dashboards
- [ ] Welcome messages personalized
- [ ] Icons and emojis used appropriately

### Mobile Responsiveness
- [ ] All dashboards work on iPhone 13
- [ ] All dashboards work on iPad
- [ ] All dashboards work on desktop
- [ ] No horizontal scrolling on mobile
- [ ] Touch targets are adequate
- [ ] Text is readable on all devices

---

## 🐛 Bug Reporting

If you find any issues during testing, document them here:

### Bug Template

```markdown
**Bug ID:** BUG-001
**Severity:** Critical | Major | Minor
**Dashboard:** Student | Staff | HOD | QAC | Registrar | Director | Admin
**Description:** [What went wrong]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]
**Expected Result:** [What should happen]
**Actual Result:** [What actually happened]
**Screenshot:** [If applicable]
```

---

## 📊 Test Summary

After completing all tests, fill in this summary:

**Test Date:** _______________  
**Tester:** _______________  
**Environment:** Local Development

**Results:**
- Total Test Cases: 25
- Passed: ___
- Failed: ___
- Blocked: ___

**Pass Rate:** ____%

**Sign-Off:**
- [ ] All critical tests passed
- [ ] All dashboards functional
- [ ] RBAC properly enforced
- [ ] Mobile responsiveness verified
- [ ] Ready for E2E test automation

---

## 🚀 Next Steps

After manual testing is complete:

1. **Fix any bugs found**
2. **Write E2E tests with Playwright** (automate these manual tests)
3. **Document authentication system**
4. **Prepare for Phase 3: QA Tools Implementation**

---

## 📞 Support

If you encounter issues:

1. Check backend logs: `docker logs qbridge-backend-dev`
2. Check frontend console: Browser DevTools → Console
3. Verify environment variables in `.env.development`
4. Ensure database is properly migrated

---

**Testing Plan Reference:** `TESTING_PLAN.md`  
**Documentation:** `docs/06-phase2-auth/AUTHENTICATION_IMPLEMENTATION_PLAN.md`  
**Last Updated:** November 8, 2025
