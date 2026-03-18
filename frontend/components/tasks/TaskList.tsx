"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { TaskCard } from "./TaskCard";
import { CreateTaskForm } from "./CreateTaskForm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getApiErrorMessage } from "@/lib/utils";
import type { TaskStatus } from "@/types/task";

interface TaskListProps {
  projectId: number;
}

export function TaskList({ projectId }: TaskListProps) {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks(projectId);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleStatusChange(taskId: number, status: TaskStatus) {
    setActionError(null);
    setUpdatingId(taskId);
    try {
      await updateTaskStatus(taskId, { status });
    } catch (err: unknown) {
      setActionError(getApiErrorMessage(err, "Failed to update task status."));
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(taskId: number) {
    if (!confirm("Delete this task?")) return;
    setActionError(null);
    setDeletingId(taskId);
    try {
      await deleteTask(taskId);
    } catch (err: unknown) {
      setActionError(getApiErrorMessage(err, "Failed to delete task."));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 py-4">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button onClick={() => setModalOpen(true)}>New task</Button>
      </div>
      {actionError && (
        <p className="text-red-400 text-sm">{actionError}</p>
      )}
      {tasks.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">
          No tasks yet. Create one to get started.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                updating={updatingId === task.id}
                deleting={deletingId === task.id}
              />
            </li>
          ))}
        </ul>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New task">
        <CreateTaskForm
          projectId={projectId}
          onSuccess={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
