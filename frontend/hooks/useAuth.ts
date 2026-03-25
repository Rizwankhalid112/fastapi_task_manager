"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import * as authService from "@/services/authService";
import type { LoginCredentials, RegisterData } from "@/types/auth";
import { ROUTES } from "@/lib/constants";
import { getApiErrorMessage } from "@/lib/utils";

export function useAuth() {
  const { setUser, refreshUser } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);
      try {
        await authService.login(credentials);
        await refreshUser();
        router.push(ROUTES.DASHBOARD);
      } catch (err: unknown) {
        const msg = getApiErrorMessage(err, "Login failed");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refreshUser, router]
  );

  const register = useCallback(
    async (payload: RegisterData) => {
      setLoading(true);
      setError(null);
      try {
        const user = await authService.register(payload);
        await authService.login({
          email: payload.email,
          password: payload.password,
        });
        setUser(user);
        await refreshUser();
        router.push(ROUTES.DASHBOARD);
      } catch (err: unknown) {
        const msg = getApiErrorMessage(err, "Registration failed");
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setUser, refreshUser, router]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    router.push(ROUTES.HOME);
  }, [setUser, router]);

  return { login, register, logout, error, setError, loading };
}
