import { test as setup } from '@playwright/test';
import { getAllTestUsers } from '../../fixtures/auth-users';

/**
 * Global Setup: Create all test users before running tests
 * This runs once before all tests
 */

const BACKEND_URL = 'http://localhost:4100/api';

setup('create test users for all roles', async ({ request }) => {
  console.log('\n🔧 Setting up test users for all 7 roles...\n');

  const users = getAllTestUsers();
  const results = [];

  for (const user of users) {
    try {
      const response = await request.post(`${BACKEND_URL}/auth/register`, {
        data: {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });

      if (response.ok() || response.status() === 409) {
        // 409 = user already exists, which is fine
        console.log(`  ✅ ${user.role} user ready`);
        results.push(true);
      } else {
        console.error(`  ❌ Failed to create ${user.role}: HTTP ${response.status()}`);
        results.push(false);
      }
    } catch (error) {
      console.error(`  ❌ Error creating ${user.role}:`, error);
      results.push(false);
    }
  }

  const allCreated = results.every(result => result === true);
  
  if (allCreated) {
    console.log('\n✅ All test users are ready!\n');
  } else {
    console.log('\n⚠️  Some test users failed to create. Tests may fail.\n');
  }
});
