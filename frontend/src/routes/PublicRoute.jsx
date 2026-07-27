import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

/**
 * Public route guard redirecting authenticated users away from login pages.
 */
export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <Outlet />;
};
