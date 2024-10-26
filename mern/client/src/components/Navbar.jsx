import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";

export default function Navbar() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/validate");
        if (res.data.user) {
          setUser(res.data.user);
        }
        setLoading(true);
      } catch {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      setUser();

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <nav>
      <ul className="flex justify-between items-center mb-6">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {loading === undefined ? (
          <></>
        ) : loading ? (
          <>
            <li>Welcome, {user.username}</li>
            {user.isAdmin && (
              <li>
                <NavLink to="/admin">Admin Dashboard</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
