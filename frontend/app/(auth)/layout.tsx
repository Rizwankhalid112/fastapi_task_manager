export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A24] p-4 lg:p-6">
      {children}
    </div>
  );
}
