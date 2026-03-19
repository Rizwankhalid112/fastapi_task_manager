"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TaskList } from "@/components/tasks/TaskList";
import { EditProjectForm } from "@/components/projects/EditProjectForm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ROUTES } from "@/lib/constants";
import * as projectService from "@/services/projectService";
import type { Project } from "@/types/project";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function ProjectTasksPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = typeof params.projectId === "string" ? params.projectId : "";
  const id = parseInt(projectId, 10);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (Number.isNaN(id)) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    projectService
      .getById(id)
      .then(setProject)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (notFound || !project) {
    router.replace(ROUTES.PROJECTS);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
        <Link
          href={ROUTES.PROJECTS}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Projects
        </Link>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
          Edit project
        </Button>
      </div>
      {project.description && (
        <p className="text-gray-400">{project.description}</p>
      )}
      <TaskList key={project.id} projectId={project.id} />
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit project"
      >
        <EditProjectForm
          project={project}
          onSuccess={(updates) => {
            if (updates) setProject((p) => (p ? { ...p, ...updates } : p));
            setEditOpen(false);
          }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>
    </div>
  );
}
