import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole ? parseInt(storedRole, 10) : null;
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    if (role !== null && role !== undefined)
      localStorage.setItem("role", role.toString());
    else localStorage.removeItem("role");
  }, [token, role]);

  // Fetch user information when token is available
  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      setUser(null);
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const response = await apiFetch("/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const login = (token, role) => {
    console.log("Login called with role:", role, "type:", typeof role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{ token, role, user, login, logout, fetchUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
