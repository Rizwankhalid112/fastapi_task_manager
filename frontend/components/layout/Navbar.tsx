"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: ROUTES.FEATURES, label: "Features" },
  { href: ROUTES.PROJECTS_ANCHOR, label: "Projects" },
  { href: ROUTES.PRICING, label: "Pricing" },
  { href: ROUTES.ABOUT, label: "Docs" },
];

export function Navbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/10 bg-[#1A1A24]/95 backdrop-blur transition-shadow",
        scrolled && "shadow-sm shadow-black/20"
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2.5 min-w-0">
        <Link
          href={ROUTES.HOME}
          className="text-lg font-semibold text-[#7C6FFF] font-heading"
        >
          TaskFlow
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          {isLoading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : isAuthenticated && user ? (
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 transition-colors">
                  <Avatar name={user.full_name} size="sm" />
                  <span className="text-sm font-medium text-gray-200">
                    {user.full_name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              }
            >
              <DropdownMenuItem href={ROUTES.DASHBOARD}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem href={ROUTES.PROFILE}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenu>
          ) : (
            <>
              <Link href={ROUTES.LOGIN}>
                <Button variant="secondary" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button variant="primary" size="sm">
                  Get started free
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 lg:hidden">
          {!isLoading && isAuthenticated && user ? (
            <DropdownMenu
              trigger={
                <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-white/10 transition-colors">
                  <Avatar name={user.full_name} size="sm" />
                </div>
              }
            >
              <DropdownMenuItem href={ROUTES.DASHBOARD}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem href={ROUTES.PROFILE}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenu>
          ) : !isLoading && (
            <>
              <Link href={ROUTES.LOGIN}>
                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                  Sign in
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button variant="primary" size="sm" className="w-full sm:w-auto">
                  Get started
                </Button>
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="rounded-lg p-2 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#1A1A24] px-4 py-4">
          <div className="flex flex-col gap-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-white transition-colors py-2"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
