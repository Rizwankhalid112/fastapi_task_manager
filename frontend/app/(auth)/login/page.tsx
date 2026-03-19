import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden flex flex-col lg:flex-row min-w-0"
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="hidden lg:flex flex-col justify-between flex-shrink-0 lg:w-2/5 lg:max-w-xs p-6 lg:p-10"
        style={{
          background: "linear-gradient(135deg, rgba(124,111,255,0.12), rgba(78,205,196,0.06))",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "#13131A",
        }}
      >
        <div>
          <p className="font-heading font-extrabold text-xl text-white tracking-tight">
            Task<span style={{ color: "#7C6FFF" }}>Flow</span>
          </p>
        </div>

        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#7C6FFF] mb-8"
            style={{ border: "1px solid rgba(124,111,255,0.35)", background: "rgba(124,111,255,0.10)" }}
          >
            ✦ Trusted by 12k+ teams
          </span>

          <h2 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-[-2px] mb-6">
            <span className="text-white">Your work.</span>
            <br />
            <span style={{ color: "#7C6FFF" }}>Organized.</span>
            <br />
            <span className="text-white">Delivered.</span>
          </h2>

          <p className="text-sm leading-relaxed mb-8" style={{ color: "#8888AA" }}>
            The modern way to manage tasks, track projects, and ship faster with your team.
          </p>

          <ul className="space-y-3">
            {[
              "Manage unlimited projects",
              "Real-time task tracking",
              "Secure JWT authentication",
              "Team collaboration tools",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#8888AA" }}>
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{ background: "rgba(78,205,196,0.18)", color: "#4ECDC4" }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs" style={{ color: "#555570" }}>
          © 2026 TaskFlow · Privacy · Terms
        </p>
      </div>
      <div className="flex-1 p-4 sm:p-6 lg:p-10 min-w-0" style={{ background: "#13131A" }}>
        <div className="mb-6 sm:mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-[-1.5px]">
            Welcome back
          </h1>
          <p className="text-sm mt-2" style={{ color: "#8888AA" }}>
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.REGISTER}
              className="font-medium hover:underline"
              style={{ color: "#7C6FFF" }}
            >
              Sign up free
            </Link>
          </p>
        </div>

        <LoginForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-3 text-xs"
              style={{ background: "#13131A", color: "#8888AA" }}
            >
              or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all duration-200 border hover:border-[#7C6FFF]/40"
          style={{
            background: "#1C1C27",
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm" style={{ color: "#8888AA" }}>
          New to TaskFlow?{" "}
          <Link
            href={ROUTES.REGISTER}
            className="font-medium hover:underline"
            style={{ color: "#7C6FFF" }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
