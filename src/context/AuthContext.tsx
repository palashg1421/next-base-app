"use client";

import { createContext, useContext } from "react";

export const AuthContext = createContext<any | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
