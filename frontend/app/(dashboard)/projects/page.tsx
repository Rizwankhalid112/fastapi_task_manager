import { ProjectList } from "@/components/projects/ProjectList";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ProjectList />
    </div>
  );
}
