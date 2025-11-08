import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env.development' });

/**
 * Q-Bridge E2E Test Configuration
 * Tests both frontend UI and backend API
 */
export default defineConfig({
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'],
  ],
  
  // Shared settings for all tests
  use: {
    // Base URL for frontend tests
    baseURL: 'http://localhost:3100',
    
    // Collect trace on failure
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
  },

  // Configure projects for different test types
  projects: [
    // API Tests (no browser needed)
    {
      name: 'api-tests',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: 'http://localhost:4100',
      },
    },

    // Frontend Tests - Chromium
    {
      name: 'chromium',
      testMatch: /.*\.frontend\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Frontend Tests - Firefox
    {
      name: 'firefox',
      testMatch: /.*\.frontend\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },

    // Frontend Tests - Mobile Chrome
    {
      name: 'mobile-chrome',
      testMatch: /.*\.frontend\.spec\.ts/,
      use: { ...devices['Pixel 5'] },
    },

    // Frontend Tests - Mobile Safari
    {
      name: 'mobile-safari',
      testMatch: /.*\.frontend\.spec\.ts/,
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Web server configuration (optional - if you want Playwright to start services)
  // webServer: {
  //   command: 'cd .. && make dev-up',
  //   url: 'http://localhost:3100',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
