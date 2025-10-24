import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

export default ProtectedRoute;
