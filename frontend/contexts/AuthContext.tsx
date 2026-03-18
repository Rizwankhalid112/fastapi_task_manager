"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuthStore } from "@/store";
import { getProfile } from "@/services/userService";
import { logout as authLogout } from "@/services/authService";
import type { User } from "@/types/user";
import { TOKEN_KEY } from "@/lib/constants";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, setUser: setStoreUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useCallback(
    (u: User | null) => {
      setStoreUser(u);
    },
    [setStoreUser]
  );

  const refreshUser = useCallback(async () => {
    try {
      const u = await getProfile();
      setUser(u);
    } catch {
      setUser(null);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    getProfile()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [setUser]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
