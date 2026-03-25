import axios from "axios";
import type { TokenResponse, LoginCredentials, RegisterData } from "@/types/auth";
import type { User } from "@/types/user";
import { API_BASE_URL, TOKEN_KEY } from "@/lib/constants";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function login(credentials: LoginCredentials): Promise<TokenResponse> {
  const formData = new URLSearchParams();
  formData.append("username", credentials.email);
  formData.append("password", credentials.password);
  const { data } = await authApi.post<TokenResponse>("/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, data.access_token);
  }
  return data;
}

export async function register(payload: RegisterData): Promise<User> {
  const { data } = await authApi.post<User>("/auth/register", payload);
  return data;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}
