import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

/**
 * Roles Decorator
 * Specifies which roles are allowed to access a route
 * 
 * Q-Bridge User Roles:
 * - STUDENT
 * - ACADEMIC_STAFF
 * - HOD
 * - QAC_MEMBER
 * - REGISTRAR
 * - DIRECTOR
 * - SYSTEM_ADMIN
 * 
 * Usage:
 * @Roles(UserRole.SYSTEM_ADMIN, UserRole.QAC_MEMBER)
 * @Get('admin-only')
 * adminRoute() { ... }
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
