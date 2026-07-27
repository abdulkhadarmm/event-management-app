import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

/**
 * Route guard component protecting private administrator routes.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  // Ensure user possesses ROLE_ADMIN authority
  const isAdmin = user?.roles?.includes('ROLE_ADMIN');
  if (!isAdmin) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};
