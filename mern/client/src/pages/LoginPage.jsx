// src/pages/LoginPage.js
import React, { useState } from "react";
import api from "../api";

// Login page component
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/login", { email, password });
      alert("Login successful!");
      // alert("Login successful! Token: " + response.data.token);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
