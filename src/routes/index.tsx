import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DragonMark, Particles } from "@/components/vip/Chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MEGA VIP — أداة كشف الألعاب" },
      {
        name: "description",
        content: "منصة MEGA VIP لكشف نتائج الألعاب على MegaPari بتفعيل VIP.",
      },
      { property: "og:title", content: "MEGA VIP" },
      { property: "og:description", content: "تفعيل VIP وكشف نتائج الألعاب بأناقة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});

// status phases removed per request

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + Math.random() * 6 + 2)));
    }, 95);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setLeaving(true);
      const t = setTimeout(() => navigate({ to: "/games" }), 700);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [progress, navigate]);

  const pct = Math.floor(progress);

  return (
    <main
      className={`page-bg screen-frame relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 transition-all duration-700 ${
        leaving ? "scale-110 opacity-0 blur-sm" : "opacity-100"
      }`}
    >
      <Particles />

      {/* grid floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "linear-gradient(to top, #000, transparent)",
          WebkitMaskImage: "linear-gradient(to top, #000, transparent)",
          transform: "perspective(420px) rotateX(62deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* emblem */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-glow-pulse pointer-events-none absolute h-72 w-72 rounded-full bg-primary/25 blur-[110px]" />

        <div className="relative flex h-52 w-52 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border border-dashed border-primary/35 [animation-duration:22s]" />
          <span className="absolute inset-4 animate-spin rounded-[44%] border border-primary/45 [animation-direction:reverse] [animation-duration:11s]" />
          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-primary-glow [animation-duration:3s]" />
          <span className="absolute inset-8 rounded-full bg-primary/10 backdrop-blur-md" />
          <DragonMark size={112} className="relative animate-fade-up" />
        </div>

        <h1 className="neon-text animate-fade-up mt-9 text-[1.6rem] font-extrabold leading-none tracking-[0.26em] text-foreground">
          MEGA VIP
        </h1>
        <span className="mt-4 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-[9px] font-bold tracking-[0.4em] text-primary">
          PREMIUM ACCESS · V4
        </span>
      </div>

      {/* loader */}
      <div className="relative z-10 mt-12 w-full max-w-xs">
        <div className="mb-1.5 flex items-center justify-between text-[9px] tracking-[0.3em] text-muted-foreground">
          <span className="neon-text font-bold text-primary">{pct}%</span>
          <span>LOADING</span>
        </div>
        <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-secondary/70">
          <div
            className="h-full rounded-full transition-[width] duration-200 ease-out"
            style={{
              width: `${progress}%`,
              backgroundImage: "var(--gradient-primary)",
              boxShadow: "var(--glow-md)",
            }}
          />
        </div>
        <p className="mt-6 text-center text-[9px] tracking-[0.4em] text-muted-foreground/70">
          SECURE • ENCRYPTED • VIP
        </p>
      </div>
    </main>
  );
}
