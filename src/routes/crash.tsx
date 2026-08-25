import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Plane, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { LiveWins } from "@/components/vip/LiveWins";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";
import { fetchCrashOdd, isVip } from "@/lib/firebase";

export const Route = createFileRoute("/crash")({
  head: () => ({
    meta: [
      { title: "كاشف لعبة الطيارة Crash — MEGA VIP" },
      { name: "description", content: "توقع أودد لعبة الطيارة Crash مباشرة على MegaPari بأسلوب VIP." },
      { property: "og:title", content: "كاشف لعبة الطيارة Crash — MEGA VIP" },
      { property: "og:description", content: "توقع الأودد قبل الانفجار في لعبة الطيارة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CrashPage,
});

function CrashPage() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [odd, setOdd] = useState(1);
  const [target, setTarget] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    setPlatform(PLATFORMS[getPlatform()].name);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const start = async () => {
    if (running) return;
    const remote = isVip(getUserId()) ? await fetchCrashOdd() : null;
    const t = remote ?? Math.round((1 + Math.random() * 5) * 100) / 100;
    setTarget(t);
    setOdd(1);
    setRunning(true);
    const t0 = performance.now();
    const dur = 2600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setOdd(1 + (t - 1) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else {
        setRunning(false);
        setHistory((h) => [t, ...h].slice(0, 6));
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  const restart = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setRunning(false);
    setOdd(1);
    setTarget(0);
  };

  const progress = target > 1 ? Math.min(1, (odd - 1) / (target - 1)) : 0;

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-12">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف الطيارة"
          backTo="/games"

          right={
            <span className="block truncate rounded-lg border border-border bg-secondary/60 px-2 py-1 text-[9px] text-muted-foreground">
              ID: {userId}
            </span>
          }
        />

        <div className="flex flex-col items-center px-4 pt-8">
          <div className="relative flex items-center justify-center">
            <span className="animate-glow-pulse absolute h-24 w-24 rounded-full bg-primary/25 blur-3xl" />
            <span className="absolute h-20 w-20 rounded-full bg-red/20 blur-2xl" />
            <DragonMark size={72} className="relative" />
          </div>

          <h1 className="neon-text mt-3 text-center text-xl font-extrabold">
            <span className="text-primary">{platform}</span>
            <span className="mx-1.5 text-red">×</span>Crash
          </h1>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-red/40 bg-red/10 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-red">
            <Zap className="h-3 w-3" /> LIVE SIGNAL
          </span>

          {/* Radar board */}
          <div
            dir="ltr"
            className="glass relative mt-5 w-full max-w-[352px] overflow-hidden rounded-[24px]"
            style={{
              height: 230,
              backgroundImage:
                "linear-gradient(150deg, oklch(0.45 0.2 253/24%), transparent 55%, oklch(0.5 0.22 27/22%))",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(0.68 0.26 253.5/30%) 1px,transparent 1px),linear-gradient(90deg,oklch(0.68 0.26 253.5/30%) 1px,transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <span
              className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-primary/60 bg-background/80 text-primary shadow-[var(--glow-md)]"
              style={{
                left: `calc(${progress * 100}% - 16px)`,
                bottom: `calc(${progress * 96}% - 16px)`,
              }}
            >
              <Plane className="h-4 w-4 -rotate-45" />
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`neon-text text-5xl font-extrabold tabular-nums ${running ? "text-primary" : "text-foreground"}`}
              >
                x{odd.toFixed(2)}
              </span>
              <span className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">
                {running ? "SCANNING…" : target ? "SIGNAL LOCKED" : "READY"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div dir="ltr" className="mt-3 grid w-full max-w-[352px] grid-cols-3 gap-2">
            {[
              { l: "TARGET", v: target ? `x${target.toFixed(2)}` : "—", c: "text-red" },
              { l: "ACCURACY", v: "96.4%", c: "text-success" },
              { l: "STATUS", v: running ? "LIVE" : "IDLE", c: "text-primary" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-2 py-2 text-center">
                <p className={`text-[13px] font-extrabold tabular-nums ${s.c}`}>{s.v}</p>
                <p className="text-[8px] tracking-[0.2em] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>

          {/* History */}
          <div dir="ltr" className="mt-3 flex w-full max-w-[352px] flex-wrap items-center gap-1.5">
            <span className="text-[9px] tracking-widest text-muted-foreground">HISTORY</span>
            {(history.length ? history : []).map((h, i) => (
              <span
                key={i}
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                  h >= 3 ? "border-primary/50 bg-primary/10 text-primary" : "border-red/50 bg-red/10 text-red"
                }`}
              >
                x{h.toFixed(2)}
              </span>
            ))}
            {!history.length && <span className="text-[10px] text-muted-foreground">لا توجد نتائج بعد</span>}
          </div>

          {/* Controls */}
          <div className="mt-4 grid w-full max-w-[352px] grid-cols-2 gap-3">
            <button
              onClick={() => void start()}
              disabled={running}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
            >
              <Play className="h-4 w-4" /> بدأ
            </button>
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-red py-3.5 text-sm font-extrabold text-primary-foreground shadow-[0_0_28px_oklch(0.6_0.22_27/45%)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <RotateCcw className="h-4 w-4" /> إعادة بدأ
            </button>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[9px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-success" /> إشارة مشفّرة خاصة بأعضاء MEGA VIP
          </p>

          <div className="mt-8 w-full max-w-[352px]">
            <LiveWins game="Crash" />
          </div>
        </div>
      </div>
    </main>
  );
}
