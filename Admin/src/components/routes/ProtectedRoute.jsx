import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authToken }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthencation);
  // console.log(isAuthenticated, authToken, children);

  return authToken ? (
    <>{children}</>
  ) : (
    <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
  );
};

export default ProtectedRoute;
