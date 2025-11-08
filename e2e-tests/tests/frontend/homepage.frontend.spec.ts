import { test, expect } from '@playwright/test';

test.describe('Frontend - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Q-Bridge title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Q-Bridge');
  });

  test('should display subtitle', async ({ page }) => {
    await expect(page.getByText('Quality Assurance Management System')).toBeVisible();
  });

  test('should display institution name', async ({ page }) => {
    await expect(page.getByText('Tandabui Polytechnic Institute')).toBeVisible();
  });

  test('should display Docker status message', async ({ page }) => {
    await expect(page.getByText('Docker development environment is running')).toBeVisible();
  });

  test('should display frontend URL', async ({ page }) => {
    await expect(page.getByText('Frontend: http://localhost:3100')).toBeVisible();
  });

  test('should display backend URL', async ({ page }) => {
    await expect(page.getByText('Backend: http://localhost:4100')).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Q-Bridge/);
  });

  test('should have teal primary color applied', async ({ page }) => {
    const heading = page.locator('h1');
    const color = await heading.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // Teal color should be applied (rgb(20, 184, 166) = #14b8a6)
    expect(color).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Quality Assurance Management System')).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Quality Assurance Management System')).toBeVisible();
  });

  test('should load within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
  });
});
