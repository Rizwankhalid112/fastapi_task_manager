import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskFlow — Manage tasks. Ship faster. Stay focused.",
  description:
    "A modern task manager built for teams who move fast. Organize projects, track progress, and collaborate — all in one clean interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-[#1A1A24] text-white overflow-x-hidden`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
