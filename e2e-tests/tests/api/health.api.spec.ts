import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';

test.describe('Backend API - Health Checks', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should return healthy status from /api/health', async () => {
    const response = await apiClient.healthCheck();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('service', 'Q-Bridge Backend API');
    expect(response.body).toHaveProperty('version', '1.0.0');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('should return welcome message from /api', async () => {
    const response = await apiClient.getWelcome();

    expect(response.status).toBe(200);
    expect(response.body).toContain('Q-Bridge');
    expect(response.body).toContain('Quality Assurance Management System');
  });

  test('health endpoint should respond within 500ms', async () => {
    const startTime = Date.now();
    await apiClient.healthCheck();
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(500);
  });

  test('should have correct CORS headers', async ({ request }) => {
    const response = await request.get('/api/health');
    const headers = response.headers();
    
    expect(headers).toHaveProperty('access-control-allow-origin');
  });

  test('should return 404 for non-existent endpoint', async ({ request }) => {
    const response = await request.get('/api/non-existent-endpoint');
    expect(response.status()).toBe(404);
  });
});
