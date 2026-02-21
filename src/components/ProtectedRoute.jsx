import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
    // If the user is not authorized, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authorized, render the requested component (e.g., AdminPage)
  return children;
};

export default ProtectedRoute;
