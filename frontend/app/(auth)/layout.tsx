export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A24] p-4 sm:p-6 lg:p-8 w-full min-w-0">
      {children}
    </div>
  );
}
