"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectForm } from "./CreateProjectForm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { getApiErrorMessage } from "@/lib/utils";

export function ProjectList() {
  const { projects, loading, error, createProject, deleteProject } =
    useProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Delete this project and all its tasks?")) return;
    setDeleteError(null);
    setDeletingId(id);
    try {
      await deleteProject(id);
    } catch (err: unknown) {
      setDeleteError(getApiErrorMessage(err, "Failed to delete project."));
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
    return (
      <p className="text-red-600 dark:text-red-400 py-4">{error}</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button onClick={() => setModalOpen(true)}>New project</Button>
      </div>
      {deleteError && (
        <p className="text-red-600 dark:text-red-400 text-sm">{deleteError}</p>
      )}
      {projects.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">
          No projects yet. Create one to get started.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard
                project={project}
                onDelete={handleDelete}
                deleting={deletingId === project.id}
              />
            </li>
          ))}
        </ul>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New project">
        <CreateProjectForm
          onSuccess={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
