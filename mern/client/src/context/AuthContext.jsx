import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/auth/validate");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser();
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
