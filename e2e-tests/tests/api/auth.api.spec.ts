import { test, expect } from '@playwright/test';
import { TEST_USERS, getAllTestUsers } from '../../fixtures/auth-users';

/**
 * E2E Tests: Authentication API
 * Tests all authentication endpoints
 */

const BACKEND_URL = 'http://localhost:4100/api';

test.describe('Authentication API', () => {
  test('should have healthy backend', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/health`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should register a new user', async ({ request }) => {
    const testUser = {
      email: `test-${Date.now()}@tpi.ac.tz`,
      password: 'Test@123',
      firstName: 'Test',
      lastName: 'User',
      role: 'STUDENT',
    };

    const response = await request.post(`${BACKEND_URL}/auth/register`, {
      data: testUser,
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('accessToken');
    expect(data).toHaveProperty('refreshToken');
    expect(data.user.email).toBe(testUser.email);
  });

  test('should reject registration with invalid email', async ({ request }) => {
    const response = await request.post(`${BACKEND_URL}/auth/register`, {
      data: {
        email: 'invalid-email',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User',
        role: 'STUDENT',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
  });

  test('should reject registration with weak password', async ({ request }) => {
    const response = await request.post(`${BACKEND_URL}/auth/register`, {
      data: {
        email: 'test@tpi.ac.tz',
        password: '123',
        firstName: 'Test',
        lastName: 'User',
        role: 'STUDENT',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
  });

  test('should login with valid credentials', async ({ request }) => {
    const user = TEST_USERS.STUDENT;

    const response = await request.post(`${BACKEND_URL}/auth/login`, {
      data: {
        email: user.email,
        password: user.password,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('accessToken');
    expect(data).toHaveProperty('refreshToken');
    expect(data.user.email).toBe(user.email);
    expect(data.user.role).toBe(user.role);
  });

  test('should reject login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${BACKEND_URL}/auth/login`, {
      data: {
        email: 'invalid@tpi.ac.tz',
        password: 'WrongPassword123',
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
  });

  test('should get current user with valid token', async ({ request }) => {
    const user = TEST_USERS.STUDENT;

    // Login first
    const loginResponse = await request.post(`${BACKEND_URL}/auth/login`, {
      data: {
        email: user.email,
        password: user.password,
      },
    });

    const { accessToken } = await loginResponse.json();

    // Get current user
    const response = await request.get(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.email).toBe(user.email);
    expect(data.role).toBe(user.role);
  });

  test('should reject /me without token', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/auth/me`);
    expect(response.status()).toBe(401);
  });

  test('should refresh token', async ({ request }) => {
    const user = TEST_USERS.STUDENT;

    // Login first
    const loginResponse = await request.post(`${BACKEND_URL}/auth/login`, {
      data: {
        email: user.email,
        password: user.password,
      },
    });

    const { refreshToken } = await loginResponse.json();

    // Refresh token
    const response = await request.post(`${BACKEND_URL}/auth/refresh`, {
      data: {
        refreshToken,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('accessToken');
    expect(data).toHaveProperty('refreshToken');
  });

  test('should logout successfully', async ({ request }) => {
    const user = TEST_USERS.STUDENT;

    // Login first
    const loginResponse = await request.post(`${BACKEND_URL}/auth/login`, {
      data: {
        email: user.email,
        password: user.password,
      },
    });

    const { accessToken } = await loginResponse.json();

    // Logout
    const response = await request.post(`${BACKEND_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.ok()).toBeTruthy();
  });
});

test.describe('Authentication API - All Roles', () => {
  const allUsers = getAllTestUsers();

  for (const user of allUsers) {
    test(`should login as ${user.role}`, async ({ request }) => {
      const response = await request.post(`${BACKEND_URL}/auth/login`, {
        data: {
          email: user.email,
          password: user.password,
        },
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      expect(data.user.role).toBe(user.role);
      expect(data).toHaveProperty('accessToken');
    });
  }
});
