"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { EditProfileForm } from "./EditProfileForm";

export function ProfileCard() {
  const { user } = useAuthContext();
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <Card>
        <CardContent className="pt-4">
          <h2 className="text-lg font-semibold text-white">
            Profile
          </h2>
          <dl className="mt-4 space-y-2">
            <div>
              <dt className="text-sm text-gray-400">
                Full name
              </dt>
              <dd className="text-white">{user.full_name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">
                Email
              </dt>
              <dd className="text-white">{user.email}</dd>
            </div>
          </dl>
          <Button
            className="mt-4"
            variant="secondary"
            size="sm"
            onClick={() => setEditOpen(true)}
          >
            Edit profile
          </Button>
        </CardContent>
      </Card>
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit profile"
      >
        <EditProfileForm
          onSuccess={() => setEditOpen(false)}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>
    </>
  );
}
