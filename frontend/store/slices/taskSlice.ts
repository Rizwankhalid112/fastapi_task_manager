import { create } from "zustand";
import type { Task } from "@/types/task";

interface TaskState {
  tasks: Record<number, Task[]>;
  setTasks: (projectId: number, tasks: Task[]) => void;
  addTask: (projectId: number, task: Task) => void;
  removeTask: (projectId: number, taskId: number) => void;
  updateTask: (projectId: number, taskId: number, updates: Partial<Task>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: {},
  setTasks: (projectId, tasks) =>
    set((state) => ({ tasks: { ...state.tasks, [projectId]: tasks } })),
  addTask: (projectId, task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [projectId]: [task, ...(state.tasks[projectId] ?? [])],
      },
    })),
  removeTask: (projectId, taskId) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [projectId]: (state.tasks[projectId] ?? []).filter(
          (t) => t.id !== taskId
        ),
      },
    })),
  updateTask: (projectId, taskId, updates) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [projectId]: (state.tasks[projectId] ?? []).map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        ),
      },
    })),
}));
