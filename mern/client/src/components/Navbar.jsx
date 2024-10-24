import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";

export default function Navbar() {
  // const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await api.get("/auth/validate");
      setUser(res.data.user);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.post("auth/logout");
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
        {user === undefined ? (
          <></>
        ) : user ? (
          <>
            <li>Welcome, {user.username}</li>
            {user.isAdmin && (
              <li>
                <NavLink to="/admin">Admin Dashboard</NavLink>
              </li>
            )}
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
