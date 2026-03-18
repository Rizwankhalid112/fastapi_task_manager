import axiosInstance from "@/lib/axiosInstance";
import type { Task, TaskCreate, TaskStatusUpdate } from "@/types/task";

export async function getAll(projectId: number): Promise<Task[]> {
  const { data } = await axiosInstance.get<Task[]>(
    `/api/projects/${projectId}/tasks`
  );
  return data;
}

export async function create(
  projectId: number,
  payload: TaskCreate
): Promise<Task> {
  const { data } = await axiosInstance.post<Task>(
    `/api/projects/${projectId}/tasks`,
    payload
  );
  return data;
}

export async function updateStatus(
  projectId: number,
  taskId: number,
  payload: TaskStatusUpdate
): Promise<Task> {
  const { data } = await axiosInstance.patch<Task>(
    `/api/projects/${projectId}/tasks/${taskId}`,
    payload
  );
  return data;
}

export async function remove(
  projectId: number,
  taskId: number
): Promise<void> {
  await axiosInstance.delete(
    `/api/projects/${projectId}/tasks/${taskId}`
  );
}
