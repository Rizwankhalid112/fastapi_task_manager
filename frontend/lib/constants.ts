export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  ABOUT: "/#about",
  FEATURES: "/#features",
  PRICING: "/#pricing",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  PROJECTS_ANCHOR: "/#projects",
  PROJECT: (id: number | string) => `/projects/${id}`,
  TASKS: (projectId: number | string) => `/projects/${projectId}`,
  TASK: (projectId: number | string, taskId: number | string) =>
    `/projects/${projectId}/tasks/${taskId}`,
  PROFILE: "/profile",
} as const;

export const TOKEN_KEY = "access_token";
