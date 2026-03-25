import axiosInstance from "@/lib/axiosInstance";
import type { User, UserUpdate } from "@/types/user";

export async function getProfile(): Promise<User> {
  const { data } = await axiosInstance.get<User>("/users/me");
  return data;
}

export async function updateProfile(payload: UserUpdate): Promise<User> {
  const { data } = await axiosInstance.patch<User>("/users/me", payload);
  return data;
}
