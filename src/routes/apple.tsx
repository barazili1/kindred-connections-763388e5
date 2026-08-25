import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Apple, Bomb, Play, RotateCcw, Sparkles } from "lucide-react";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { LiveWins } from "@/components/vip/LiveWins";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";
import { buildMatrix, fetchAppleMatrix, isVip, resetAppleMatrix, type Matrix } from "@/lib/firebase";

export const Route = createFileRoute("/apple")({
  head: () => ({
    meta: [
      { title: "كاشف لعبة التفاحة — MEGA VIP" },
      { name: "description", content: "شبكة كشف الخانات الآمنة في لعبة التفاحة بأسلوب VIP." },
      { property: "og:title", content: "كاشف لعبة التفاحة — MEGA VIP" },
      { property: "og:description", content: "اكشف الخانات الآمنة في لعبة التفاحة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplePage,
});

const ROWS = 10;
const COLS = 5;
// index 0 = أول صف من تحت (1.23x) ... index 9 = أعلى صف (349.68x)
const COEF = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68];

function ApplePage() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [grid, setGrid] = useState<Matrix | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    setPlatform(PLATFORMS[getPlatform()].name);
    return clear;
  }, [clear]);

  const start = async () => {
    if (running) return;
    clear();
    const vip = isVip(getUserId());
    const remote = vip ? await fetchAppleMatrix() : null;
    setGrid(remote ?? buildMatrix());
    setRevealed(0);
    setRunning(true);
    for (let i = 1; i <= ROWS; i++) {
      timers.current.push(
        setTimeout(() => {
          setRevealed(i);
          if (i === ROWS) setRunning(false);
        }, i * 320),
      );
    }
  };

  const restart = () => {
    clear();
    setRunning(false);
    setRevealed(0);
    setGrid(null);
    if (isVip(getUserId())) void resetAppleMatrix();
  };

  // نعرض من أعلى (349.68x) إلى أسفل (1.23x) والكشف يبدأ من تحت
  const order = Array.from({ length: ROWS }, (_, i) => ROWS - 1 - i);

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-12">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف التفاحة"
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
            <span className="mx-1.5 text-red">×</span>Apple of Fortune
          </h1>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-red/40 bg-red/10 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-red">
            <Sparkles className="h-3 w-3" /> LIVE PREDICTION
          </span>

          {/* Stats */}
          <div dir="ltr" className="mt-4 grid w-full max-w-[352px] grid-cols-3 gap-2">
            {[
              { l: "ROWS", v: `${revealed}/${ROWS}`, c: "text-primary" },
              { l: "ACCURACY", v: "97%", c: "text-success" },
              { l: "STATUS", v: running ? "LIVE" : revealed ? "DONE" : "IDLE", c: "text-red" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl px-2 py-2 text-center">
                <p className={`text-[13px] font-extrabold tabular-nums ${s.c}`}>{s.v}</p>
                <p className="text-[8px] tracking-[0.2em] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div
            className="glass mt-4 w-full max-w-[352px] space-y-1.5 rounded-[24px] p-3"
            style={{
              backgroundImage:
                "linear-gradient(140deg, oklch(0.45 0.2 253/18%), transparent 60%, oklch(0.5 0.22 27/16%))",
            }}
          >
            {order.map((r) => {
              const open = revealed > r;
              const active = running && revealed === r;
              return (
                <div
                  key={r}
                  className={`flex items-center gap-2 rounded-2xl px-1.5 py-1 transition-all duration-300 ${
                    active ? "bg-primary/10 shadow-[var(--glow-sm)]" : ""
                  }`}
                >
                  <span
                    className={`w-[56px] shrink-0 rounded-xl border py-1 text-center text-[10px] font-extrabold tabular-nums transition-colors ${
                      open
                        ? "border-primary bg-primary/15 text-primary shadow-[var(--glow-sm)]"
                        : "border-border bg-background/50 text-muted-foreground"
                    }`}
                  >
                    {COEF[r]?.toFixed(2)}x
                  </span>
                  <div dir="ltr" className="grid min-w-0 flex-1 grid-cols-5 gap-1.5">
                    {Array.from({ length: COLS }).map((_, c) => {
                      const rotten = grid?.[r]?.[c] === true;
                      const isSafe = open && !rotten;
                      return (
                        <div
                          key={c}
                          style={{ height: 42, borderRadius: 14 }}
                          className={`flex w-full min-w-0 items-center justify-center border transition-all duration-500 ${
                            isSafe
                              ? "animate-fade-up border-primary bg-primary/15 shadow-[var(--glow-sm)]"
                              : open
                                ? "border-red/40 bg-red/10 opacity-70"
                                : active
                                  ? "animate-glow-pulse border-primary/70 bg-primary/15"
                                  : "border-border bg-background/60"
                          }`}
                        >
                          {open ? (
                            isSafe ? (
                              <Apple
                                className="h-5 w-5 text-red drop-shadow-[0_0_10px_var(--red)]"
                                fill="currentColor"
                              />
                            ) : (
                              <Bomb className="h-4 w-4 text-muted-foreground/70" />
                            )
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

          <div className="mt-8 w-full max-w-[352px]">
            <LiveWins game="Apple of Fortune" />
          </div>
        </div>
      </div>
    </main>
  );
}
