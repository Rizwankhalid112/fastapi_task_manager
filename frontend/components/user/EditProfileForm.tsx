"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface EditProfileFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditProfileForm({ onSuccess, onCancel }: EditProfileFormProps) {
  const { user, updateProfile, loading, error, setError } = useUser();
  const [fullName, setFullName] = useState(user?.full_name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");

  if (!user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await updateProfile({
        full_name: fullName,
        email,
        ...(password ? { password } : {}),
      });
      onSuccess();
    } catch {
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        minLength={2}
        maxLength={50}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="New password (leave blank to keep current)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={password ? 8 : undefined}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </div>
    </form>
  );
}
