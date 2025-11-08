import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/client';

/**
 * Roles Guard
 * Enforces role-based access control (RBAC)
 * Checks if user has required role(s) to access route
 * 
 * Q-Bridge has 7 user roles:
 * - STUDENT
 * - ACADEMIC_STAFF
 * - HOD
 * - QAC_MEMBER
 * - REGISTRAR
 * - DIRECTOR
 * - SYSTEM_ADMIN
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      // No roles required, allow access
      return true;
    }

    // Get user from request (attached by JWT strategy)
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    // Check if user has any of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
