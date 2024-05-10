import React from 'react'
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../hooks/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to={"/sign-in"} state={{ from: location }} replace />
  return <>{children}</>
}
