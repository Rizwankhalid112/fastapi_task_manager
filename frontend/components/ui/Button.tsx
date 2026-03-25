"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto",
        variant === "primary" &&
          "bg-[#7C6FFF] text-white hover:bg-[#6B5FEE] focus:ring-[#7C6FFF]",
        variant === "secondary" &&
          "bg-transparent border border-gray-400 text-white hover:bg-white/10 focus:ring-gray-400",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        variant === "ghost" &&
          "bg-transparent hover:bg-white/10 text-white focus:ring-gray-400",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
