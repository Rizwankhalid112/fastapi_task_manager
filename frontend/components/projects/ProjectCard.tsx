"use client";

import Link from "next/link";
import type { Project } from "@/types/project";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { truncateText } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: number) => void;
  deleting?: boolean;
}

export function ProjectCard({ project, onDelete, deleting }: ProjectCardProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <Link
          href={ROUTES.PROJECT(project.id)}
          className="block group"
        >
          <h3 className="font-semibold text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {project.name}
          </h3>
          {project.description && (
            <p className="mt-1 text-sm text-gray-400">
              {truncateText(project.description, 100)}
            </p>
          )}
        </Link>
      </CardContent>
      <CardFooter>
        <Link href={ROUTES.PROJECT(project.id)}>
          <Button variant="secondary" size="sm">
            View tasks
          </Button>
        </Link>
        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            loading={deleting}
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
