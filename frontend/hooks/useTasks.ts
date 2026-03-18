"use client";

import { useCallback, useEffect, useState } from "react";
import * as taskService from "@/services/taskService";
import { useTaskStore } from "@/store";
import type { Task, TaskCreate, TaskStatusUpdate } from "@/types/task";
import { getApiErrorMessage } from "@/lib/utils";

export function useTasks(projectId: number | null) {
  const { tasks, setTasks, addTask, removeTask, updateTask } = useTaskStore();
  const taskList = projectId != null ? tasks[projectId] ?? [] : [];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (projectId == null) return;
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll(projectId);
      setTasks(projectId, data);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(err, "Failed to load tasks.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [projectId, setTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (payload: TaskCreate): Promise<Task> => {
      if (projectId == null) throw new Error("No project selected");
      const task = await taskService.create(projectId, payload);
      addTask(projectId, task);
      return task;
    },
    [projectId, addTask]
  );

  const updateTaskStatus = useCallback(
    async (taskId: number, payload: TaskStatusUpdate): Promise<Task> => {
      if (projectId == null) throw new Error("No project selected");
      const task = await taskService.updateStatus(projectId, taskId, payload);
      updateTask(projectId, taskId, task);
      return task;
    },
    [projectId, updateTask]
  );

  const deleteTask = useCallback(
    async (taskId: number) => {
      if (projectId == null) return;
      await taskService.remove(projectId, taskId);
      removeTask(projectId, taskId);
    },
    [projectId, removeTask]
  );

  return {
    tasks: taskList,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
  };
}
