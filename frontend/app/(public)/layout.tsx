import { Navbar } from "@/components/layout/Navbar";
import { MovingFooter } from "@/components/layout/MovingFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <MovingFooter />
    </div>
  );
}
