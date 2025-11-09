# Q-Bridge Phase 2 Testing Plan
## Authentication & RBAC Validation

**Date:** November 8, 2025  
**Phase:** Phase 2 - Authentication & RBAC  
**Status:** Testing in Progress

---

## 🎯 Testing Objectives

1. ✅ Verify all 7 role-based dashboards function correctly
2. ✅ Validate RBAC enforcement (role-based access control)
3. ✅ Test authentication flow (login, logout, token refresh)
4. ✅ Ensure protected routes redirect unauthorized users
5. ✅ Validate mobile responsiveness
6. ✅ Confirm alignment with @docs requirements

---

## 👥 Test User Accounts (7 Roles)

Based on `docs/02-user-stories/USER_STORIES_BY_ROLE.md`:

### 1. STUDENT
- **Email:** student@tpi.ac.tz
- **Password:** Student@123
- **Expected Dashboard:** `/student/dashboard`
- **Features to Test:**
  - View available evaluations
  - Submit feedback
  - View submission history
  - See feedback summaries

### 2. ACADEMIC_STAFF
- **Email:** staff@tpi.ac.tz
- **Password:** Staff@123
- **Expected Dashboard:** `/staff/dashboard`
- **Features to Test:**
  - Course analytics
  - AI recommendations
  - Auto-flagging (criteria ≤3)
  - Action items assigned

### 3. HOD (Head of Department)
- **Email:** hod@tpi.ac.tz
- **Password:** Hod@123
- **Expected Dashboard:** `/hod/dashboard`
- **Features to Test:**
  - Departmental summary
  - Auto-flagged criteria (≤3)
  - AI recommendations
  - Action assignment
  - Staff management

### 4. QAC_MEMBER (QA Officer)
- **Email:** qac@tpi.ac.tz
- **Password:** Qac@123
- **Expected Dashboard:** `/qac/dashboard`
- **Features to Test:**
  - Institution-wide oversight
  - Tool activation
  - Flagged criteria aggregation
  - Department completion status
  - Follow-up tracker

### 5. REGISTRAR (Academic Office)
- **Email:** registrar@tpi.ac.tz
- **Password:** Registrar@123
- **Expected Dashboard:** `/registrar/dashboard`
- **Features to Test:**
  - Programme evaluation reports
  - Accreditation readiness
  - Student progression tracking
  - NACTVET reports

### 6. DIRECTOR (Principal/Management)
- **Email:** director@tpi.ac.tz
- **Password:** Director@123
- **Expected Dashboard:** `/director/dashboard`
- **Features to Test:**
  - Executive summary
  - Institutional KPIs
  - Compliance summaries
  - Strategic reports

### 7. SYSTEM_ADMIN
- **Email:** admin@tpi.ac.tz
- **Password:** Admin@123
- **Expected Dashboard:** `/admin/dashboard`
- **Features to Test:**
  - User management
  - System configuration
  - Integrations
  - Backup management
  - Audit logs

---

## 🧪 Test Cases

### Test Suite 1: Authentication Flow

#### TC-AUTH-001: User Registration
- **Steps:**
  1. Navigate to `/register`
  2. Fill in registration form with valid data
  3. Submit form
- **Expected Result:**
  - User created successfully
  - Verification email sent
  - Redirect to login page
- **Status:** ⏳ Pending

#### TC-AUTH-002: User Login (Valid Credentials)
- **Steps:**
  1. Navigate to `/login`
  2. Enter valid email and password
  3. Click "Login"
- **Expected Result:**
  - JWT tokens generated
  - User redirected to role-specific dashboard
  - Auth state updated
- **Status:** ⏳ Pending

#### TC-AUTH-003: User Login (Invalid Credentials)
- **Steps:**
  1. Navigate to `/login`
  2. Enter invalid email/password
  3. Click "Login"
- **Expected Result:**
  - Error message displayed
  - User remains on login page
  - No tokens generated
- **Status:** ⏳ Pending

#### TC-AUTH-004: Token Refresh
- **Steps:**
  1. Login successfully
  2. Wait for access token to expire (15 min)
  3. Make authenticated request
- **Expected Result:**
  - Refresh token used automatically
  - New access token generated
  - Request succeeds
- **Status:** ⏳ Pending

#### TC-AUTH-005: Logout
- **Steps:**
  1. Login successfully
  2. Click "Logout" button
- **Expected Result:**
  - Tokens cleared from storage
  - User redirected to login page
  - Auth state cleared
- **Status:** ⏳ Pending

---

### Test Suite 2: Role-Based Access Control (RBAC)

#### TC-RBAC-001: Student Access
- **Steps:**
  1. Login as STUDENT
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ✅ Can access `/student/dashboard`
  - ❌ Redirected from `/staff/dashboard`
  - ❌ Redirected from `/hod/dashboard`
  - ❌ Redirected from `/qac/dashboard`
  - ❌ Redirected from `/registrar/dashboard`
  - ❌ Redirected from `/director/dashboard`
  - ❌ Redirected from `/admin/dashboard`
- **Status:** ⏳ Pending

#### TC-RBAC-002: Academic Staff Access
- **Steps:**
  1. Login as ACADEMIC_STAFF
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ❌ Redirected from `/student/dashboard`
  - ✅ Can access `/staff/dashboard`
  - ❌ Redirected from other dashboards
- **Status:** ⏳ Pending

#### TC-RBAC-003: HOD Access
- **Steps:**
  1. Login as HOD
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ❌ Redirected from `/student/dashboard`
  - ❌ Redirected from `/staff/dashboard`
  - ✅ Can access `/hod/dashboard`
  - ❌ Redirected from other dashboards
- **Status:** ⏳ Pending

#### TC-RBAC-004: QAC Member Access
- **Steps:**
  1. Login as QAC_MEMBER
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ❌ Redirected from other role dashboards
  - ✅ Can access `/qac/dashboard`
- **Status:** ⏳ Pending

#### TC-RBAC-005: Registrar Access
- **Steps:**
  1. Login as REGISTRAR
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ❌ Redirected from other role dashboards
  - ✅ Can access `/registrar/dashboard`
- **Status:** ⏳ Pending

#### TC-RBAC-006: Director Access
- **Steps:**
  1. Login as DIRECTOR
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ❌ Redirected from other role dashboards
  - ✅ Can access `/director/dashboard`
- **Status:** ⏳ Pending

#### TC-RBAC-007: System Admin Access
- **Steps:**
  1. Login as SYSTEM_ADMIN
  2. Attempt to access each dashboard URL
- **Expected Result:**
  - ❌ Redirected from other role dashboards
  - ✅ Can access `/admin/dashboard`
- **Status:** ⏳ Pending

---

### Test Suite 3: Dashboard Functionality

#### TC-DASH-001: Student Dashboard
- **Features to Verify:**
  - [ ] Available evaluations displayed
  - [ ] Quick stats shown (submissions, pending, feedback)
  - [ ] Recent feedback visible
  - [ ] Navigation works
  - [ ] Logout button functions
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

#### TC-DASH-002: Academic Staff Dashboard
- **Features to Verify:**
  - [ ] Course analytics displayed
  - [ ] AI recommendations shown
  - [ ] Auto-flagged courses visible (≤3)
  - [ ] Action items listed
  - [ ] Performance metrics shown
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

#### TC-DASH-003: HOD Dashboard
- **Features to Verify:**
  - [ ] Departmental summary displayed
  - [ ] Auto-flagged criteria shown (≤3)
  - [ ] AI recommendations visible
  - [ ] Action assignment interface works
  - [ ] Staff list displayed
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

#### TC-DASH-004: QAC Member Dashboard
- **Features to Verify:**
  - [ ] Institution-wide stats displayed
  - [ ] Tool activation interface works
  - [ ] Flagged criteria aggregated
  - [ ] Department completion status shown
  - [ ] Quick actions available
  - [ ] Follow-up tracker visible
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

#### TC-DASH-005: Registrar Dashboard
- **Features to Verify:**
  - [ ] Programme stats displayed (18 programmes)
  - [ ] Student enrollment shown (2,847)
  - [ ] Completion rate visible (87%)
  - [ ] Accreditation status shown (16/18)
  - [ ] Report download buttons work
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

#### TC-DASH-006: Director Dashboard
- **Features to Verify:**
  - [ ] Overall QA score displayed (4.3)
  - [ ] NACTVET compliance shown (89%)
  - [ ] Student satisfaction visible (86%)
  - [ ] Critical issues flagged (3)
  - [ ] Executive summary shown
  - [ ] Strategic reports available
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

#### TC-DASH-007: System Admin Dashboard
- **Features to Verify:**
  - [ ] User management interface works
  - [ ] System health stats displayed
  - [ ] System configuration accessible
  - [ ] Integrations status shown
  - [ ] Backup management available
  - [ ] Audit logs visible
  - [ ] Mobile responsive
  - [ ] Teal branding applied
- **Status:** ⏳ Pending

---

### Test Suite 4: Mobile Responsiveness

#### TC-MOBILE-001: Mobile Login
- **Device:** iPhone 13 (390x844)
- **Steps:**
  1. Open `/login` on mobile
  2. Test form inputs
  3. Submit login
- **Expected Result:**
  - Form fields are touch-friendly
  - Buttons are easily tappable
  - No horizontal scrolling
  - Text is readable
- **Status:** ⏳ Pending

#### TC-MOBILE-002: Mobile Dashboards
- **Device:** iPhone 13, iPad, Android
- **Steps:**
  1. Login on mobile device
  2. Navigate through dashboard
  3. Test all interactive elements
- **Expected Result:**
  - Layout adapts to screen size
  - Cards stack vertically
  - Tables are scrollable
  - Touch targets ≥ 44px
  - No content overflow
- **Status:** ⏳ Pending

---

### Test Suite 5: Security & Error Handling

#### TC-SEC-001: Unauthenticated Access
- **Steps:**
  1. Clear all tokens
  2. Attempt to access protected dashboard
- **Expected Result:**
  - Redirected to `/login`
  - Error message shown
  - No data exposed
- **Status:** ⏳ Pending

#### TC-SEC-002: Expired Token
- **Steps:**
  1. Login successfully
  2. Manually expire access token
  3. Make authenticated request
- **Expected Result:**
  - Refresh token used
  - New access token obtained
  - Request succeeds
- **Status:** ⏳ Pending

#### TC-SEC-003: Invalid Token
- **Steps:**
  1. Set invalid JWT token
  2. Attempt to access protected route
- **Expected Result:**
  - Token rejected
  - User logged out
  - Redirected to login
- **Status:** ⏳ Pending

---

## 📊 Test Execution Tracking

### Progress Summary
- **Total Test Cases:** 25
- **Passed:** 0
- **Failed:** 0
- **Pending:** 25
- **Blocked:** 0

### Test Execution Log

#### Session 1: Initial Setup
**Date:** November 8, 2025  
**Tester:** Development Team  
**Environment:** Local Development

**Prerequisites:**
- [ ] Backend running on http://localhost:4100
- [ ] Frontend running on http://localhost:3100
- [ ] Database seeded with test users
- [ ] All 7 role accounts created

---

## 🐛 Bug Tracking

### Critical Bugs
*None reported yet*

### Major Bugs
*None reported yet*

### Minor Bugs
*None reported yet*

---

## ✅ Sign-Off Criteria

Before marking Phase 2 as complete:

- [ ] All authentication flows work correctly
- [ ] All 7 dashboards accessible by correct roles
- [ ] RBAC properly enforced (unauthorized access blocked)
- [ ] Mobile responsiveness verified on 3+ devices
- [ ] No critical or major bugs
- [ ] Performance acceptable (< 2s page load)
- [ ] Teal branding consistent across all pages
- [ ] Documentation updated

---

## 📝 Notes

### Testing Environment
- **Backend:** http://localhost:4100/api
- **Frontend:** http://localhost:3100
- **Database:** PostgreSQL (Docker)
- **Browser:** Chrome, Firefox, Safari

### Known Limitations
- Email verification requires SMTP configuration
- Password reset requires email service
- Some features are UI mockups (will connect to backend in Phase 3)

---

## 🚀 Next Steps After Testing

1. **Fix any bugs found during testing**
2. **Write E2E tests with Playwright**
3. **Document authentication system**
4. **Prepare for Phase 3: QA Tools Implementation**

---

**Testing Plan Status:** 🟡 In Progress  
**Last Updated:** November 8, 2025  
**Next Review:** After test execution
