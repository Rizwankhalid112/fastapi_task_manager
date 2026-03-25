import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1A1A24]">
      <h1 className="text-2xl font-bold text-white">404</h1>
      <p className="mt-2 text-gray-400">
        This page could not be found.
      </p>
      <Link href={ROUTES.HOME} className="mt-6">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
