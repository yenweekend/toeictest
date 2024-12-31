import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentUser = useSelector((state) =>  state.account.currentUser);
  const userRole = currentUser?.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/vi/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;