import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("as_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("as_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .getMe()
      .then((res) => {
        setUser(res.data.data);
        localStorage.setItem("as_user", JSON.stringify(res.data.data));
      })
      .catch(() => {
        localStorage.removeItem("as_token");
        localStorage.removeItem("as_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    const data = res.data.data;
    localStorage.setItem("as_token", data.token);
    localStorage.setItem("as_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const res = await authApi.register(payload);
    const data = res.data.data;
    localStorage.setItem("as_token", data.token);
    localStorage.setItem("as_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("as_token");
    localStorage.removeItem("as_user");
    setUser(null);
  };

  const updateUser = (data) => {
    setUser((prev) => {
      const merged = { ...prev, ...data };
      localStorage.setItem("as_user", JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
