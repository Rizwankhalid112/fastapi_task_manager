"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const { login, error, setError, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
    } catch {
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />
      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <Link
            href="#"
            className="text-xs text-[#7C6FFF] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          className="w-full px-3 py-2.5 border border-white/20 rounded-lg bg-[#252530] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C6FFF] focus:border-transparent"
        />
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-white/30 bg-[#252530] text-[#7C6FFF] focus:ring-[#7C6FFF] focus:ring-offset-0"
        />
        <span className="text-sm text-gray-300">Remember me for 30 days</span>
      </label>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Sign in to TaskFlow
      </Button>
    </form>
  );
}
