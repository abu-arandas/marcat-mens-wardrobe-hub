
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminRequired?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminRequired = false 
}) => {
  const { user, loading, isAdmin } = useAuth();

  // Redirect unauthenticated users to login
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  // For admin routes, check admin status
  if (!loading && adminRequired && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" message="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
