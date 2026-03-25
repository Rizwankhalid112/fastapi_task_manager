import axiosInstance from "@/lib/axiosInstance";
import type { Project, ProjectCreate } from "@/types/project";

export async function getAll(): Promise<Project[]> {
  const { data } = await axiosInstance.get<Project[]>("/api/projects");
  return data;
}

export async function getById(id: number): Promise<Project> {
  const { data } = await axiosInstance.get<Project>(`/api/projects/${id}`);
  return data;
}

export async function create(payload: ProjectCreate): Promise<Project> {
  const { data } = await axiosInstance.post<Project>("/api/projects", payload);
  return data;
}

export async function remove(id: number): Promise<void> {
  await axiosInstance.delete(`/api/projects/${id}`);
}
