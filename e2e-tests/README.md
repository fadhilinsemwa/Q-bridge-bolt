# Q-Bridge E2E Tests

Comprehensive end-to-end testing suite for Q-Bridge using Playwright.

## 🎯 Overview

This isolated testing environment allows you to test **everything** automatically:
- ✅ **Frontend UI** - All pages, components, and user interactions
- ✅ **Backend API** - All endpoints, authentication, and business logic
- ✅ **Database** - Data integrity and relationships
- ✅ **Integration** - Full user workflows across frontend and backend

## 📁 Directory Structure

```
e2e-tests/
├── tests/
│   ├── api/              # Backend API tests
│   │   └── health.api.spec.ts
│   └── frontend/         # Frontend UI tests
│       └── homepage.frontend.spec.ts
├── fixtures/             # Test data and fixtures
│   └── test-data.ts
├── helpers/              # Reusable test utilities
│   └── api-client.ts
├── config/               # Test configuration
├── playwright.config.ts  # Playwright configuration
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd e2e-tests
npm install
npx playwright install
```

### 2. Ensure Services are Running

Make sure Q-Bridge Docker containers are running:

```bash
cd ..
make dev-up
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run only API tests
npm run test:api

# Run only frontend tests
npm run test:frontend

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

## 📝 Writing Tests

### API Tests

API tests use the naming convention `*.api.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';

test.describe('My API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should test endpoint', async () => {
    const response = await apiClient.get('/api/endpoint');
    expect(response.status).toBe(200);
  });
});
```

### Frontend Tests

Frontend tests use the naming convention `*.frontend.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('My Frontend Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/my-page');
  });

  test('should display content', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## 🎭 Test Projects

Tests run across multiple browsers and devices:

- **api-tests** - API tests (no browser)
- **chromium** - Desktop Chrome
- **firefox** - Desktop Firefox
- **mobile-chrome** - Mobile Chrome (Pixel 5)
- **mobile-safari** - Mobile Safari (iPhone 12)

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Reports include:
- Test results with pass/fail status
- Screenshots on failure
- Videos on failure
- Execution traces for debugging

## 🔧 Configuration

Edit `playwright.config.ts` to customize:
- Base URLs
- Timeouts
- Retries
- Browser settings
- Reporter options

## 📚 Test Data

Reusable test data is defined in `fixtures/test-data.ts`:

```typescript
import { testUsers, testEvaluations } from '../fixtures/test-data';

// Use in tests
const student = testUsers.student;
```

## 🛠️ Helpers

### ApiClient

Provides methods for API testing:

```typescript
const apiClient = new ApiClient(request);

// GET request
await apiClient.get('/api/endpoint');

// POST request
await apiClient.post('/api/endpoint', { data });

// PUT request
await apiClient.put('/api/endpoint', { data });

// DELETE request
await apiClient.delete('/api/endpoint');

// Health check
await apiClient.healthCheck();
```

## 🎯 Best Practices

1. **Isolation** - Each test should be independent
2. **Cleanup** - Clean up test data after tests
3. **Descriptive Names** - Use clear test descriptions
4. **Assertions** - Use specific assertions
5. **Wait Strategies** - Use Playwright's auto-waiting
6. **Page Objects** - Create page objects for complex pages
7. **Test Data** - Use fixtures for reusable data

## 🐛 Debugging

### Debug Mode

```bash
npm run test:debug
```

### Playwright Inspector

```bash
npx playwright test --debug
```

### Trace Viewer

```bash
npx playwright show-trace trace.zip
```

### Generate Tests

Use Playwright codegen to generate tests:

```bash
npm run test:codegen
```

## 📈 CI/CD Integration

Tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: cd e2e-tests && npm ci

- name: Install Playwright browsers
  run: cd e2e-tests && npx playwright install --with-deps

- name: Run tests
  run: cd e2e-tests && npm test
```

## 🔄 Continuous Testing

As you develop, run tests continuously:

```bash
# Watch mode (re-run on file changes)
npx playwright test --watch
```

## 📞 Support

For issues or questions:
1. Check Playwright documentation: https://playwright.dev
2. Review test examples in `tests/` directory
3. Check test reports for detailed error information

---

**Remember:** All tests should pass before pushing code! 🚀
