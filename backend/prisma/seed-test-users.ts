import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seed Test Users for Phase 2 Testing
 * Creates one user account for each of the 7 roles
 * 
 * Based on: docs/02-user-stories/USER_STORIES_BY_ROLE.md
 */

async function main() {
  console.log('🌱 Seeding test users for Phase 2 testing...\n');

  const testUsers = [
    {
      email: 'student@tpi.ac.tz',
      password: 'Student@123',
      firstName: 'Test',
      lastName: 'Student',
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
    {
      email: 'staff@tpi.ac.tz',
      password: 'Staff@123',
      firstName: 'Test',
      lastName: 'Staff',
      role: UserRole.ACADEMIC_STAFF,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
    {
      email: 'hod@tpi.ac.tz',
      password: 'Hod@123',
      firstName: 'Test',
      lastName: 'HOD',
      role: UserRole.HOD,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
    {
      email: 'qac@tpi.ac.tz',
      password: 'Qac@123',
      firstName: 'Test',
      lastName: 'QAC',
      role: UserRole.QAC_MEMBER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
    {
      email: 'registrar@tpi.ac.tz',
      password: 'Registrar@123',
      firstName: 'Test',
      lastName: 'Registrar',
      role: UserRole.REGISTRAR,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
    {
      email: 'director@tpi.ac.tz',
      password: 'Director@123',
      firstName: 'Test',
      lastName: 'Director',
      role: UserRole.DIRECTOR,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
    {
      email: 'admin@tpi.ac.tz',
      password: 'Admin@123',
      firstName: 'Test',
      lastName: 'Admin',
      role: UserRole.SYSTEM_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
  ];

  for (const userData of testUsers) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`⏭️  User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      console.log(`✅ Created ${user.role} user: ${user.email}`);
    } catch (error) {
      console.error(`❌ Error creating user ${userData.email}:`, error.message);
    }
  }

  console.log('\n✨ Test user seeding complete!\n');
  console.log('📋 Test User Credentials:');
  console.log('═'.repeat(60));
  testUsers.forEach((user) => {
    console.log(`${user.role.padEnd(20)} | ${user.email.padEnd(25)} | ${user.password}`);
  });
  console.log('═'.repeat(60));
  console.log('\n🚀 You can now use these credentials to test the application!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
