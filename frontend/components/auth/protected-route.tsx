'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';

/**
 * Protected Route Component
 * Wraps pages that require authentication
 * Optionally restricts access by user role
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Check role-based access
      if (allowedRoles && !hasRole(allowedRoles)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [loading, isAuthenticated, user, allowedRoles, router, hasRole]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Not authorized for this role
  if (allowedRoles && !hasRole(allowedRoles)) {
    return null;
  }

  // Authorized - render children
  return <>{children}</>;
}
