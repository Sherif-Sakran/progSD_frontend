import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { user } = useContext(AuthContext);
  console.log('user in Protected Route:', user);

  if (!user) {
    console.log("User not logged in");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    console.log("User not authorized");
    return <Navigate to="/not_authorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
