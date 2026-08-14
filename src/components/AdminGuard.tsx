import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminGuardProps {
  children: React.ReactNode;
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && typeof payload.exp === 'number') {
      return payload.exp * 1000 < Date.now();
    }
  } catch (e) {
    return true;
  }
  return false;
};

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  const token = sessionStorage.getItem('adminToken');

  if (!isAuthenticated || isTokenExpired(token)) {
    // Clear session storage if invalid or expired token detected
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('isAdminAuthenticated');
    return <Navigate to="/admin/login?expired=true" replace />;
  }

  return <>{children}</>;
};
