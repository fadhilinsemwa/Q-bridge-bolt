import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../fixtures/auth-users';
import { AuthHelper } from '../../helpers/auth-helper';

/**
 * E2E Tests: Authentication Flow (Frontend)
 * Tests login, logout, and authentication protection
 */

test.describe('Authentication Flow', () => {
  let authHelper: AuthHelper;

  test.beforeEach(async ({ page }) => {
    authHelper = new AuthHelper(page);
    await page.goto('/');
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    // Try to access a protected route
    await page.goto('/student/dashboard');
    
    // Should be redirected to login
    await expect(page).toHaveURL('/login');
  });

  test('should show login page with correct elements', async ({ page }) => {
    await page.goto('/login');
    
    // Check for login form elements
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in invalid credentials
    await page.getByLabel(/email/i).fill('invalid@tpi.ac.tz');
    await page.getByLabel(/password/i).fill('WrongPassword123');
    await page.getByRole('button', { name: /login/i }).click();
    
    // Should show error message
    await expect(page.getByText(/invalid credentials|login failed|user not found/i)).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const student = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(student);
    
    // Should be on student dashboard
    await expect(page).toHaveURL(student.dashboard);
    
    // Should show user info
    await expect(page.getByText(new RegExp(student.firstName, 'i'))).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    const student = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(student);
    
    // Logout
    await authHelper.logoutViaUI();
    
    // Should be on login page
    await expect(page).toHaveURL('/login');
    
    // Should not be able to access dashboard anymore
    await page.goto(student.dashboard);
    await expect(page).toHaveURL('/login');
  });

  test('should persist authentication across page reloads', async ({ page }) => {
    // Login
    const student = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(student);
    
    await expect(page).toHaveURL(student.dashboard);
    
    // Reload page
    await page.reload();
    
    // Should still be on dashboard
    await expect(page).toHaveURL(student.dashboard);
    await expect(page.getByText(new RegExp(student.firstName, 'i'))).toBeVisible();
  });

  test('should handle session expiry gracefully', async ({ page }) => {
    const student = TEST_USERS.STUDENT;
    await authHelper.loginViaUI(student);
    
    // Clear local storage to simulate session expiry
    await page.evaluate(() => localStorage.clear());
    
    // Try to access dashboard
    await page.goto(student.dashboard);
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});
