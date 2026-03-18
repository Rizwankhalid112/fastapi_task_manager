"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const links = [
  { href: ROUTES.DASHBOARD, label: "Dashboard" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.PROFILE, label: "Profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  return (
    <aside className="w-56 shrink-0 border-r border-white/10 bg-[#1A1A24] min-h-screen">
      <div className="sticky top-0 flex flex-col gap-1 p-4">
        {user && (
          <p className="px-3 py-2 text-sm font-medium text-gray-200 truncate">
            {user.full_name}
          </p>
        )}
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-[#7C6FFF]/20 text-[#7C6FFF]"
                : "text-gray-300 hover:bg-white/10"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
