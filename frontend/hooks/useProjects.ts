"use client";

import { useCallback, useEffect, useState } from "react";
import * as projectService from "@/services/projectService";
import { useProjectStore } from "@/store";
import type { Project, ProjectCreate } from "@/types/project";
import { getApiErrorMessage } from "@/lib/utils";

export function useProjects() {
  const { projects, setProjects, addProject, removeProject } = useProjectStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to load projects."));
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(
    async (payload: ProjectCreate): Promise<Project> => {
      const project = await projectService.create(payload);
      addProject(project);
      return project;
    },
    [addProject]
  );

  const deleteProject = useCallback(
    async (id: number) => {
      await projectService.remove(id);
      removeProject(id);
    },
    [removeProject]
  );

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    deleteProject,
  };
}
