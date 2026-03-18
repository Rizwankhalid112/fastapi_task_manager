import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

const FEATURES = [
  {
    title: "Project Management",
    description: "Organize work into projects. Set deadlines, assign members, and track milestones from a single view.",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>),
    color: "#7C6FFF", rgb: "124,111,255",
  },
  {
    title: "Task Tracking",
    description: "Create, assign and prioritize tasks with ease. Never miss a deadline with smart reminders and status updates.",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
    color: "#4ECDC4", rgb: "78,205,196",
  },
  {
    title: "Secure Auth",
    description: "JWT-based authentication keeps your workspace safe. Role-based access control for every team member.",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>),
    color: "#FF6B6B", rgb: "255,107,107",
  },
  {
    title: "Progress Analytics",
    description: "Real-time dashboards show sprint velocity, task completion rates, and team performance at a glance.",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>),
    color: "#4ECDC4", rgb: "78,205,196",
  },
  {
    title: "Team Profiles",
    description: "Manage your team, view workload distribution, and keep everyone aligned on shared goals.",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>),
    color: "#7C6FFF", rgb: "124,111,255",
  },
  {
    title: "API First",
    description: "Built on a powerful FastAPI backend. Integrate with your existing tools and automate your workflow.",
    icon: (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>),
    color: "#FF6B6B", rgb: "255,107,107",
  },
];

const PRICING_PLANS = [
  {
    name: "STARTER", price: "$0", period: "/mo",
    description: "Perfect for solo developers and small personal projects.",
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "20 tasks per project", included: true },
      { text: "Basic analytics", included: true },
      { text: "Team collaboration", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get started free", href: ROUTES.REGISTER, popular: false,
  },
  {
    name: "PRO", price: "$12", period: "/mo",
    description: "For growing teams who need more power and flexibility.",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Unlimited tasks", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Team collaboration", included: true },
      { text: "Priority API access", included: false },
    ],
    cta: "Start Pro trial", href: ROUTES.REGISTER, popular: true,
  },
  {
    name: "ENTERPRISE", price: "$49", period: "/mo",
    description: "For large organizations with advanced security needs.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "SSO & SAML", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated support", included: true },
      { text: "SLA guarantee", included: true },
    ],
    cta: "Contact sales", href: "#", popular: false,
  },
];

const TASKS = [
  { label: "Design system setup", done: true },
  { label: "API integration review",   priority: "High", color: "#FF6B6B", rgb: "255,107,107" },
  { label: "User auth flow testing",   priority: "Med",  color: "#7C6FFF", rgb: "124,111,255" },
  { label: "Deploy to staging server", priority: "High", color: "#FF6B6B", rgb: "255,107,107" },
];

export default function PublicHomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 lg:pt-28 lg:pb-36 overflow-hidden">

        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(124,111,255,0.14)" }} />
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(78,205,196,0.12)" }} />

        <div className="relative grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#4ECDC4] mb-8 tracking-wide"
              style={{ border: "1px solid rgba(78,205,196,0.35)", background: "rgba(78,205,196,0.12)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4] animate-pulse" />
              Now with AI-powered task suggestions
            </span>

            <h1 className="font-['Syne'] text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-[-2.5px] mb-6">
              <span className="text-white">Manage tasks.</span><br />
              <span className="text-[#7C6FFF]">Ship faster.</span><br />
              <span className="text-[#4ECDC4]">Stay focused.</span>
            </h1>

            <p className="text-[#8888AA] text-lg leading-relaxed max-w-md mb-10">
              A modern task manager built for teams who move fast. Organize projects,
              track progress, and collaborate — all in one clean interface.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link href={ROUTES.REGISTER}>
                <Button variant="primary" size="lg">Start for free →</Button>
              </Link>
              <Button variant="secondary" size="lg" className="gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Watch demo
              </Button>
            </div>

            <div className="flex gap-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
              {[{ num: "12k+", label: "Active teams" }, { num: "98%", label: "Satisfaction rate" }, { num: "4.9★", label: "Average rating" }].map((s) => (
                <div key={s.label}>
                  <p className="font-['Syne'] text-2xl font-bold text-white">{s.num}</p>
                  <p className="text-xs text-[#8888AA] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-5"
              style={{ background: "#13131A", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 25px 60px rgba(124,111,255,0.15)" }}>

              <div className="flex items-center justify-between mb-5">
                <p className="font-['Syne'] text-sm font-bold text-white">My Dashboard</p>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF6B6B" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFD93D" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#4ECDC4" }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { val: "24",  label: "Active tasks", change: "↑ 3 today", pos: true },
                  { val: "6",   label: "Projects",     change: "↑ 1 new",   pos: true },
                  { val: "87%", label: "On track",     change: "↓ 2%",      pos: false },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl p-3"
                    style={{ background: "#1C1C27", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="font-['Syne'] text-xl font-bold text-white">{m.val}</p>
                    <p className="text-[10px] text-[#8888AA] mt-0.5">{m.label}</p>
                    <p className="text-[10px] mt-1 font-medium" style={{ color: m.pos ? "#4ECDC4" : "#FF6B6B" }}>{m.change}</p>
                  </div>
                ))}
              </div>

              <div>
                {TASKS.map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: i < TASKS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: t.done ? "#4ECDC4" : "transparent", border: t.done ? "1px solid #4ECDC4" : "1px solid #2A2A3A" }}>
                        {t.done && (
                          <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#0A0A0F" }}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      <span className="text-xs" style={{ color: t.done ? "#8888AA" : "#D0D0E8", textDecoration: t.done ? "line-through" : "none" }}>
                        {t.label}
                      </span>
                    </div>
                    {t.done ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "rgba(78,205,196,0.18)", color: "#4ECDC4" }}>Done</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `rgba(${"rgb" in t ? t.rgb : "124,111,255"},0.18)`, color: "color" in t ? t.color : "#7C6FFF" }}>
                        {t.priority}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex justify-between text-[10px] text-[#8888AA] mb-1.5">
                  <span>Sprint progress</span><span>68%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#2A2A3A" }}>
                  <div className="h-full rounded-full" style={{ width: "68%", background: "linear-gradient(90deg,#7C6FFF,#4ECDC4)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 py-24 lg:py-32"
        style={{ background: "rgba(19,19,26,0.80)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#7C6FFF] mb-3">Why TaskFlow</p>
          <h2 className="font-['Syne'] text-4xl lg:text-5xl font-extrabold text-white tracking-[-2px] mb-4">
            Everything your team needs
          </h2>
          <p className="text-[#8888AA] text-base max-w-xl mb-16 leading-relaxed">
            From solo developers to large teams — TaskFlow adapts to how you work, not the other way around.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1C1C27] cursor-default bg-[#13131A]"
                style={{ border: `1px solid rgba(${f.rgb},0.25)` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `rgba(${f.rgb},0.18)`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="font-['Syne'] text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#8888AA] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#4ECDC4] mb-3">Projects</p>
          <h2 className="font-['Syne'] text-4xl lg:text-5xl font-extrabold text-white tracking-[-2px] mb-4">
            Organize work your way
          </h2>
          <p className="text-[#8888AA] text-base max-w-xl mx-auto mb-12 leading-relaxed">
            Create projects, assign tasks, and track progress. Everything in one place.
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button variant="primary" size="lg">Get started free →</Button>
          </Link>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 py-24 lg:py-32"
        style={{ background: "rgba(19,19,26,0.80)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#7C6FFF] mb-3">Pricing</p>
          <h2 className="font-['Syne'] text-4xl lg:text-5xl font-extrabold text-white tracking-[-2px] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#8888AA] text-base mb-16">No hidden fees. Cancel anytime.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className="relative rounded-2xl p-7 flex flex-col"
                style={{
                  background: plan.popular ? "rgba(124,111,255,0.10)" : "#13131A",
                  border: plan.popular ? "1px solid rgba(124,111,255,0.55)" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: plan.popular ? "0 8px 32px rgba(124,111,255,0.15)" : "none",
                }}>
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-semibold text-white tracking-wide whitespace-nowrap"
                    style={{ background: "#7C6FFF" }}>
                    Most popular
                  </span>
                )}

                <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#8888AA] mb-4">{plan.name}</p>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-['Syne'] text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-[#8888AA] text-sm">{plan.period}</span>
                </div>

                <p className="text-sm text-[#8888AA] leading-relaxed mb-7">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold"
                        style={{
                          background: f.included ? "rgba(78,205,196,0.20)" : "rgba(255,255,255,0.07)",
                          color: f.included ? "#4ECDC4" : "#8888AA",
                        }}>
                        {f.included ? "✓" : "–"}
                      </span>
                      <span style={{ color: f.included ? "#D0D0E8" : "#555570" }}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} className="block">
                  <Button variant={plan.popular ? "primary" : "secondary"} size="lg" className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-['Syne'] text-3xl font-bold text-white tracking-[-1px] mb-4">About TaskFlow</h2>
          <p className="text-[#8888AA] text-base leading-relaxed">
            TaskFlow is a modern task manager built for teams who move fast.
            Organize projects, track progress, and collaborate — all in one clean interface.
            Built with FastAPI and Next.js.
          </p>
        </div>
      </section>
    </>
  );
}