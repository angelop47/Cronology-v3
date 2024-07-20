// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("PrivateRoute user:", user, "loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // Puedes personalizar esto con un spinner u otra cosa
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
