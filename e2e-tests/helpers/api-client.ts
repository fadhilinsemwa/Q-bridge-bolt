import { APIRequestContext } from '@playwright/test';

/**
 * API Client Helper for Backend Testing
 * Provides reusable methods for API interactions
 */
export class ApiClient {
  constructor(private request: APIRequestContext) {}

  /**
   * Health check endpoint
   */
  async healthCheck() {
    const response = await this.request.get('/api/health');
    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  /**
   * Get welcome message
   */
  async getWelcome() {
    const response = await this.request.get('/api');
    return {
      status: response.status(),
      body: await response.text(),
    };
  }

  /**
   * Generic GET request
   */
  async get(endpoint: string, options?: any) {
    const response = await this.request.get(endpoint, options);
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response),
    };
  }

  /**
   * Generic POST request
   */
  async post(endpoint: string, data?: any, options?: any) {
    const response = await this.request.post(endpoint, {
      data,
      ...options,
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response),
    };
  }

  /**
   * Generic PUT request
   */
  async put(endpoint: string, data?: any, options?: any) {
    const response = await this.request.put(endpoint, {
      data,
      ...options,
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response),
    };
  }

  /**
   * Generic DELETE request
   */
  async delete(endpoint: string, options?: any) {
    const response = await this.request.delete(endpoint, options);
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response),
    };
  }

  /**
   * Parse response based on content type
   */
  private async parseResponse(response: any) {
    const contentType = response.headers()['content-type'] || '';
    
    if (contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    }
    
    return await response.text();
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string) {
    // This will be used when we implement authentication
    return this;
  }
}
