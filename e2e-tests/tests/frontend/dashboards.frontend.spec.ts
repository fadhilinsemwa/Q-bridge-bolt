import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../fixtures/auth-users';
import { AuthHelper } from '../../helpers/auth-helper';

/**
 * E2E Tests: All 7 Role-Based Dashboards
 * Tests dashboard access, content, and RBAC enforcement
 */

test.describe('Student Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display student dashboard with correct content', async ({ page }) => {
    const user = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /student dashboard/i })).toBeVisible();
    
    // Check user info
    await expect(page.getByText(new RegExp(user.firstName, 'i'))).toBeVisible();
    await expect(page.getByText(/STUDENT/i)).toBeVisible();
    
    // Check for key sections
    await expect(page.getByText(/available evaluations/i)).toBeVisible();
    await expect(page.getByText(/quick stats/i)).toBeVisible();
    
    // Check for logout button
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should have teal branding', async ({ page }) => {
    const user = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(user);
    
    // Check for teal color (#14b8a6) in the page
    const tealElements = page.locator('[class*="teal"], [style*="#14b8a6"], [class*="bg-teal"]');
    await expect(tealElements.first()).toBeVisible();
  });
});

test.describe('Academic Staff Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display staff dashboard with AI features', async ({ page }) => {
    const user = TEST_USERS.ACADEMIC_STAFF;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /academic staff|staff dashboard/i })).toBeVisible();
    
    // Check for AI recommendations section
    await expect(page.getByText(/AI recommendations/i)).toBeVisible();
    
    // Check for auto-flagged courses section
    await expect(page.getByText(/auto-flagged|flagged courses/i)).toBeVisible();
    
    // Check for course analytics
    await expect(page.getByText(/course analytics|analytics/i)).toBeVisible();
  });
});

test.describe('HOD Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display HOD dashboard with management features', async ({ page }) => {
    const user = TEST_USERS.HOD;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /HOD|head of department/i })).toBeVisible();
    
    // Check for departmental summary
    await expect(page.getByText(/departmental|department/i)).toBeVisible();
    
    // Check for auto-flagged criteria
    await expect(page.getByText(/flagged criteria|auto-flagged/i)).toBeVisible();
    
    // Check for AI recommendations
    await expect(page.getByText(/AI recommendations/i)).toBeVisible();
  });
});

test.describe('QAC Member Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display QAC dashboard with institution-wide oversight', async ({ page }) => {
    const user = TEST_USERS.QAC_MEMBER;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /QAC|quality assurance/i })).toBeVisible();
    
    // Check for institution-wide stats
    await expect(page.getByText(/institution|institution-wide/i)).toBeVisible();
    
    // Check for tool activation
    await expect(page.getByText(/tool activation|activate/i)).toBeVisible();
    
    // Check for department tracking
    await expect(page.getByText(/department|completion/i)).toBeVisible();
  });
});

test.describe('Registrar Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display registrar dashboard with programme data', async ({ page }) => {
    const user = TEST_USERS.REGISTRAR;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /registrar|academic office/i })).toBeVisible();
    
    // Check for programme statistics
    await expect(page.getByText(/programmes/i)).toBeVisible();
    
    // Check for student enrollment
    await expect(page.getByText(/enrollment|students/i)).toBeVisible();
  });
});

test.describe('Director Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display director dashboard with executive overview', async ({ page }) => {
    const user = TEST_USERS.DIRECTOR;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /director|executive/i })).toBeVisible();
    
    // Check for institutional KPIs
    await expect(page.getByText(/institutional|KPI/i)).toBeVisible();
    
    // Check for compliance metrics
    await expect(page.getByText(/compliance/i)).toBeVisible();
  });
});

test.describe('System Admin Dashboard', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('should display admin dashboard with system management', async ({ page }) => {
    const user = TEST_USERS.SYSTEM_ADMIN;
    await authHelper.loginViaUI(user);
    
    // Check dashboard title
    await expect(page.getByRole('heading', { name: /system admin|admin dashboard/i })).toBeVisible();
    
    // Check for user management
    await expect(page.getByText(/user management|users/i)).toBeVisible();
    
    // Check for system health
    await expect(page.getByText(/system health|health/i)).toBeVisible();
  });
});

test.describe('RBAC Enforcement', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
  });

  test('student cannot access staff dashboard', async ({ page }) => {
    const user = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(user);
    
    // Try to access staff dashboard
    await page.goto('/staff/dashboard');
    
    // Should be redirected away (either to own dashboard or access denied)
    await expect(page).not.toHaveURL('/staff/dashboard');
  });

  test('staff cannot access admin dashboard', async ({ page }) => {
    const user = TEST_USERS.ACADEMIC_STAFF;
    await authHelper.loginViaUI(user);
    
    // Try to access admin dashboard
    await page.goto('/admin/dashboard');
    
    // Should be redirected away
    await expect(page).not.toHaveURL('/admin/dashboard');
  });

  test('HOD cannot access registrar dashboard', async ({ page }) => {
    const user = TEST_USERS.HOD;
    await authHelper.loginViaUI(user);
    
    // Try to access registrar dashboard
    await page.goto('/registrar/dashboard');
    
    // Should be redirected away
    await expect(page).not.toHaveURL('/registrar/dashboard');
  });
});
