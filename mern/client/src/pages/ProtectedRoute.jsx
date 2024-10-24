import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await api.get("/auth/validate");
      if (res.data.user) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return loading === undefined ? (
    <div>Loading...</div>
  ) : loading ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
