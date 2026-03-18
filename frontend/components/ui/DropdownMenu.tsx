"use client";

import { createContext, useRef, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DropdownContext = createContext<{ close: () => void } | null>(null);

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <DropdownContext.Provider value={{ close }}>
      <div ref={ref} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded-lg"
          aria-expanded={open}
          aria-haspopup="true"
        >
          {trigger}
        </button>
        {open && (
          <div
            className={cn(
              "absolute top-full mt-1 min-w-[10rem] rounded-lg border border-white/10 bg-[#252530] shadow-xl py-1 z-50",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
}

const itemBase =
  "block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-white/10 transition-colors";

export function DropdownMenuItem({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const ctx = useContext(DropdownContext);

  const handleClick = () => {
    ctx?.close();
    onClick?.();
  };

  if (href) {
    return (
      <Link
        href={href}
        className={cn(itemBase, className)}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={cn(itemBase, className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
