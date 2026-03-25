import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-400">
        Welcome. Manage your projects and tasks from here.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href={ROUTES.PROJECTS}
          className="rounded-lg border border-white/10 bg-[#252530] px-4 py-3 text-sm font-medium hover:bg-white/10"
        >
          View projects
        </Link>
        <Link
          href={ROUTES.PROFILE}
          className="rounded-lg border border-white/10 bg-[#252530] px-4 py-3 text-sm font-medium hover:bg-white/10"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
