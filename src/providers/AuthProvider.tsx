"use client";

import { useMemo, useState } from "react";
import { AuthContext, User } from "@/contexts/AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data && data.error !== 0) {
        setUser(null);
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("access-token");
        } catch {}

        throw new Error(data?.message || "Login failed");
      }

      const userFromApi = data.data?.user ?? null;
      const token = data.data?.token;

      setUser(userFromApi);
      try {
        if (userFromApi) localStorage.setItem("user", JSON.stringify(userFromApi));
        if (token) localStorage.setItem("access-token", token);
      } catch {}

      return true;
    } catch (err) {
      throw err;
    }
  };

  const ssoLogin = async () => {
    return Promise.resolve();
  };

  const logout = async () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("access-token");
    } catch {}
    return Promise.resolve();
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      ssoLogin,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
