"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getApiErrorMessage } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";
import { TASK_STATUS_LABELS } from "@/types/task";

interface EditTaskFormProps {
  task: Task;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditTaskForm({ task, onSuccess, onCancel }: EditTaskFormProps) {
  const { updateTaskStatus } = useTasks(task.project_id);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await updateTaskStatus(task.id, { status });
      onSuccess();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to update task."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={200}
        disabled
      />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Status
        </label>
        <select
          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-[#252530] text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          {(Object.keys(TASK_STATUS_LABELS) as TaskStatus[]).map((s) => (
            <option key={s} value={s}>
              {TASK_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </div>
    </form>
  );
}
