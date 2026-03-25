"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const { register, error, setError, loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await register({ full_name: fullName, email, password });
    } catch {
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <Input
        label="Full name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="John Doe"
        required
        minLength={2}
        maxLength={50}
        autoComplete="name"
      />
      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password (min 8 characters)"
        required
        minLength={8}
        autoComplete="new-password"
      />
      <Input
        label="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
        minLength={8}
        autoComplete="new-password"
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Create account
      </Button>
    </form>
  );
}
