import { Page, APIRequestContext } from '@playwright/test';
import { TestUser } from '../fixtures/auth-users';

const BACKEND_URL = 'http://localhost:4100/api';

/**
 * Helper class for authentication operations in tests
 */
export class AuthHelper {
  constructor(
    private page?: Page,
    private request?: APIRequestContext
  ) {}

  /**
   * Create a test user via API
   */
  async createUser(user: TestUser): Promise<boolean> {
    if (!this.request) {
      throw new Error('APIRequestContext is required for createUser');
    }

    try {
      const response = await this.request.post(`${BACKEND_URL}/auth/register`, {
        data: {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });

      // 201 = created, 409 = already exists (both are OK)
      return response.ok() || response.status() === 409;
    } catch (error) {
      console.error(`Failed to create user ${user.role}:`, error);
      return false;
    }
  }

  /**
   * Login via UI (for frontend tests)
   */
  async loginViaUI(user: TestUser): Promise<void> {
    if (!this.page) {
      throw new Error('Page is required for loginViaUI');
    }

    await this.page.goto('/login');
    await this.page.getByLabel(/email/i).fill(user.email);
    await this.page.getByLabel(/password/i).fill(user.password);
    await this.page.getByRole('button', { name: /login/i }).click();
    
    // Wait for redirect to dashboard
    await this.page.waitForURL(user.dashboard);
  }

  /**
   * Login via API and get access token
   */
  async loginViaAPI(user: TestUser): Promise<string | null> {
    if (!this.request) {
      throw new Error('APIRequestContext is required for loginViaAPI');
    }

    try {
      const response = await this.request.post(`${BACKEND_URL}/auth/login`, {
        data: {
          email: user.email,
          password: user.password,
        },
      });

      if (!response.ok()) {
        return null;
      }

      const data = await response.json();
      return data.accessToken || null;
    } catch (error) {
      console.error(`Failed to login ${user.role}:`, error);
      return null;
    }
  }

  /**
   * Logout via UI
   */
  async logoutViaUI(): Promise<void> {
    if (!this.page) {
      throw new Error('Page is required for logoutViaUI');
    }

    await this.page.getByRole('button', { name: /logout/i }).click();
    await this.page.waitForURL('/login');
  }

  /**
   * Check if user is authenticated (via UI)
   */
  async isAuthenticated(): Promise<boolean> {
    if (!this.page) {
      throw new Error('Page is required for isAuthenticated');
    }

    // Try to access a protected route
    await this.page.goto('/student/dashboard');
    
    // If redirected to login, not authenticated
    return !this.page.url().includes('/login');
  }

  /**
   * Validate token via API
   */
  async validateToken(token: string): Promise<boolean> {
    if (!this.request) {
      throw new Error('APIRequestContext is required for validateToken');
    }

    try {
      const response = await this.request.get(`${BACKEND_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok();
    } catch (error) {
      return false;
    }
  }
}
