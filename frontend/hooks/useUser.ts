"use client";

import { useCallback, useState } from "react";
import * as userService from "@/services/userService";
import { useAuthContext } from "@/contexts/AuthContext";
import type { UserUpdate } from "@/types/user";
import { getApiErrorMessage } from "@/lib/utils";

export function useUser() {
  const { user, setUser, refreshUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(
    async (payload: UserUpdate) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await userService.updateProfile(payload);
        setUser(updated);
        return updated;
      } catch (err: unknown) {
        setError(getApiErrorMessage(err, "Failed to update profile."));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

  return { user, updateProfile, refreshUser, loading, error, setError };
}
