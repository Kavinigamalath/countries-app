import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// ProtectedRoute component checks if the user is authenticated and authorized
export default function ProtectedRoute({ roles }) {
  const { user, loadingUser } = useContext(AuthContext);
  
  // If loading user data, show a loading message
  if (loadingUser) return <div className="text-center p-8">Checking session...</div>; 

  // If no user is authenticated, redirect to login page
  if (!user) return <Navigate to="/login" />;

  // If user is authenticated but not authorized, redirect to home page
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return <Outlet />;
}
