"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getApiErrorMessage } from "@/lib/utils";
import type { ProjectCreate } from "@/types/project";

interface CreateProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateProjectForm({ onSuccess, onCancel }: CreateProjectFormProps) {
  const { createProject } = useProjects();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createProject({ name, description: description || undefined });
      onSuccess();
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to create project."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={120}
      />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description (optional)
        </label>
        <textarea
          className="w-full px-3 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#7C6FFF] bg-[#252530] text-white placeholder-gray-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={2000}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Create
        </Button>
      </div>
    </form>
  );
}
