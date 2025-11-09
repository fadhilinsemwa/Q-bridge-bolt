/**
 * Test User Credentials for Authentication & RBAC Testing
 * All 7 Q-Bridge user roles
 */

export const TEST_USERS = {
  STUDENT: {
    email: 'student@tpi.ac.tz',
    password: 'Student@123',
    role: 'STUDENT',
    firstName: 'Test',
    lastName: 'Student',
    dashboard: '/student/dashboard',
  },
  ACADEMIC_STAFF: {
    email: 'staff@tpi.ac.tz',
    password: 'Staff@123',
    role: 'ACADEMIC_STAFF',
    firstName: 'Test',
    lastName: 'Staff',
    dashboard: '/staff/dashboard',
  },
  HOD: {
    email: 'hod@tpi.ac.tz',
    password: 'Hod@123',
    role: 'HOD',
    firstName: 'Test',
    lastName: 'HOD',
    dashboard: '/hod/dashboard',
  },
  QAC_MEMBER: {
    email: 'qac@tpi.ac.tz',
    password: 'Qac@123',
    role: 'QAC_MEMBER',
    firstName: 'Test',
    lastName: 'QAC',
    dashboard: '/qac/dashboard',
  },
  REGISTRAR: {
    email: 'registrar@tpi.ac.tz',
    password: 'Registrar@123',
    role: 'REGISTRAR',
    firstName: 'Test',
    lastName: 'Registrar',
    dashboard: '/registrar/dashboard',
  },
  DIRECTOR: {
    email: 'director@tpi.ac.tz',
    password: 'Director@123',
    role: 'DIRECTOR',
    firstName: 'Test',
    lastName: 'Director',
    dashboard: '/director/dashboard',
  },
  SYSTEM_ADMIN: {
    email: 'admin@tpi.ac.tz',
    password: 'Admin@123',
    role: 'SYSTEM_ADMIN',
    firstName: 'Test',
    lastName: 'Admin',
    dashboard: '/admin/dashboard',
  },
} as const;

export type UserRole = keyof typeof TEST_USERS;
export type TestUser = typeof TEST_USERS[UserRole];

/**
 * Helper function to get all test users as an array
 */
export function getAllTestUsers(): TestUser[] {
  return Object.values(TEST_USERS);
}

/**
 * Helper function to get test user by role
 */
export function getTestUser(role: UserRole): TestUser {
  return TEST_USERS[role];
}
