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

interface SidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export function Sidebar({ onClose, isOpen = false }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const navContent = (
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
          onClick={onClose}
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
  );

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-full max-w-[14rem] sm:max-w-56 border-r border-white/10 bg-[#1A1A24] min-h-screen transition-transform duration-200",
          "lg:static lg:translate-x-0 lg:z-0 lg:w-56 lg:shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent}
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
    </>
  );
}
