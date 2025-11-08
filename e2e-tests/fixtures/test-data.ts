/**
 * Test Data Fixtures
 * Reusable test data for E2E tests
 */

export const testUsers = {
  student: {
    email: 'student@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'Test',
    lastName: 'Student',
    role: 'STUDENT',
  },
  academicStaff: {
    email: 'staff@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'Test',
    lastName: 'Tutor',
    role: 'ACADEMIC_STAFF',
  },
  hod: {
    email: 'hod@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'Test',
    lastName: 'HOD',
    role: 'HOD',
  },
  qacMember: {
    email: 'qac@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'Test',
    lastName: 'QAC',
    role: 'QAC_MEMBER',
  },
  registrar: {
    email: 'registrar@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'Test',
    lastName: 'Registrar',
    role: 'REGISTRAR',
  },
  director: {
    email: 'director@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'Test',
    lastName: 'Director',
    role: 'DIRECTOR',
  },
  admin: {
    email: 'admin@test.tpi.ac.tz',
    password: 'Test@123',
    firstName: 'System',
    lastName: 'Admin',
    role: 'SYSTEM_ADMIN',
  },
};

export const testEvaluations = {
  lmsEvaluation: {
    toolId: 1,
    toolName: 'LMS & E-Library Evaluation',
    ratings: {
      accessibility: 5,
      usability: 4,
      contentQuality: 5,
      technicalPerformance: 4,
    },
    comments: 'The LMS is very user-friendly and accessible.',
  },
  infrastructureEvaluation: {
    toolId: 2,
    toolName: 'Infrastructure & Facilities Evaluation',
    ratings: {
      classroomCondition: 4,
      labEquipment: 3,
      libraryFacilities: 4,
      internetConnectivity: 3,
    },
    comments: 'Good facilities but internet needs improvement.',
  },
};

export const testCourses = {
  course1: {
    code: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'Computer Science',
    semester: 'Fall 2025',
  },
  course2: {
    code: 'ENG201',
    name: 'Advanced English',
    department: 'Languages',
    semester: 'Fall 2025',
  },
};

export const testDepartments = {
  cs: {
    name: 'Computer Science',
    code: 'CS',
  },
  eng: {
    name: 'Languages',
    code: 'ENG',
  },
};
