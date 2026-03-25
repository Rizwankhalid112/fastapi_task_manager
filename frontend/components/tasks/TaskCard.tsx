"use client";

import { useState } from "react";
import type { Task, TaskStatus } from "@/types/task";
import { TASK_STATUS_LABELS } from "@/types/task";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EditTaskForm } from "./EditTaskForm";
import { truncateText } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (taskId: number, status: TaskStatus) => void;
  onDelete?: (taskId: number) => void;
  updating?: boolean;
  deleting?: boolean;
}

export function TaskCard({
  task,
  onStatusChange,
  onDelete,
  updating,
  deleting,
}: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent className="pt-4">
          <h3 className="font-medium text-white">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-400">
              {truncateText(task.description, 120)}
            </p>
          )}
          <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded bg-white/10 text-gray-300">
            {TASK_STATUS_LABELS[task.status as TaskStatus] ?? task.status ?? "—"}
          </span>
        </CardContent>
        <CardFooter>
          {onStatusChange && (
            <select
              className="text-sm border border-white/20 rounded px-2 py-1 bg-[#252530]"
              value={task.status ?? "todo"}
              onChange={(e) =>
                onStatusChange(task.id, e.target.value as TaskStatus)
              }
              disabled={updating}
            >
              {(Object.keys(TASK_STATUS_LABELS) as TaskStatus[]).map((s) => (
                <option key={s} value={s}>
                  {TASK_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          )}
          <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)}>
            Edit
          </Button>
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              loading={deleting}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit task"
      >
        <EditTaskForm
          task={task}
          onSuccess={() => setEditOpen(false)}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>
    </>
  );
}
