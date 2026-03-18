import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-xl font-semibold">Project not found</h1>
      <p className="mt-2 text-gray-400 text-center">
        This project does not exist or you don&apos;t have access to it.
      </p>
      <Link href={ROUTES.PROJECTS} className="mt-6">
        <Button>Back to projects</Button>
      </Link>
    </div>
  );
}
