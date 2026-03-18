"use client";

import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string | null | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name, size = "sm", className }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium bg-white/20 text-gray-200 shrink-0",
        size === "sm" && "w-7 h-7 text-xs",
        size === "md" && "w-9 h-9 text-sm",
        size === "lg" && "w-11 h-11 text-base",
        className
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}
