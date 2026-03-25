"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const MARQUEE_ITEMS = [
  "TaskFlow",
  "•",
  "FastAPI + Next.js",
  "•",
  "Projects & Tasks",
  "•",
  "Secure & Simple",
  "•",
];

export function MovingFooter() {
  return (
    <footer className="border-t border-white/10 overflow-hidden bg-[#1A1A24]">
      <div className="py-4">
        <div className="relative flex overflow-hidden">
          <div
            className="flex animate-marquee whitespace-nowrap"
            aria-hidden
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="mx-6 text-sm font-medium text-gray-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 px-4">
        <div className="mx-auto w-full max-w-6xl flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 min-w-0 px-4">
          <Link
            href={ROUTES.HOME}
            className="font-heading font-semibold text-[#7C6FFF]"
          >
            TaskFlow
          </Link>
          <p className="text-sm text-gray-400" suppressHydrationWarning>
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              GitHub
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
