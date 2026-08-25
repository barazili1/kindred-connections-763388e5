import { useEffect, useState } from "react";
import { Minus, Play, Plus, RotateCcw } from "lucide-react";
import gem from "@/assets/gem-diamond.png";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { LiveWins } from "@/components/vip/LiveWins";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";

const TOTAL = 25;
const MAX = 24;


export function GemBoard({ gameName, topTitle }: { gameName: string; topTitle: string }) {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [count, setCount] = useState(3);
  const [picked, setPicked] = useState<number[]>([]);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    setPlatform(PLATFORMS[getPlatform()].name);
  }, []);

  const start = () => {
    const pool = Array.from({ length: TOTAL }, (_, i) => i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j]!, pool[i]!];
    }
    setPicked(pool.slice(0, count));
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-12">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title={topTitle}
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
            <span className="mx-1.5 text-red">×</span>
            {gameName}
          </h1>

          {/* Grid 5x5 */}
          <div
            dir="ltr"
            className="glass mt-5 rounded-[24px] p-3"
            style={{ backgroundImage: "linear-gradient(140deg, oklch(0.45 0.2 253/18%), transparent 60%, oklch(0.5 0.22 27/16%))" }}
          >
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: TOTAL }, (_, i) => {
                const on = picked.includes(i);
                return (
                  <div
                    key={i}
                    style={{ width: 55, height: 55, borderRadius: 18 }}
                    className={`flex items-center justify-center border transition-all duration-500 ${
                      on
                        ? "animate-fade-up border-primary bg-primary/15 shadow-[var(--glow-sm)]"
                        : "border-border bg-background/60"
                    }`}
                  >
                    {on ? (
                      <img
                        src={gem}
                        alt="Diamond"
                        loading="lazy"
                        width={768}
                        height={768}
                        className="h-11 w-11 object-contain drop-shadow-[0_0_12px_var(--primary-glow)]"
                      />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Counter row: 50 / 250 / 50 */}
          <div dir="ltr" className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              style={{ width: 50, height: 50 }}
              className="flex shrink-0 items-center justify-center rounded-full border border-red/60 bg-red/10 text-red transition-colors hover:bg-red/20 active:scale-95"
              aria-label="ناقص"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div
              style={{ width: 250, height: 50 }}
              className="glass neon-border flex items-center justify-center rounded-2xl text-xl font-extrabold tabular-nums text-primary"
            >
              {count}
            </div>
            <button
              onClick={() => setCount((c) => Math.min(MAX, c + 1))}
              style={{ width: 50, height: 50 }}
              className="flex shrink-0 items-center justify-center rounded-full border border-primary/60 bg-primary/10 text-primary transition-colors hover:bg-primary/20 active:scale-95"
              aria-label="زائد"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Start / Reset */}
          <div className="mt-4 grid w-full max-w-[352px] grid-cols-2 gap-3">
            <button
              onClick={start}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Play className="h-4 w-4" /> بدأ
            </button>
            <button
              onClick={() => setPicked([])}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-red py-3.5 text-sm font-extrabold text-primary-foreground shadow-[0_0_28px_oklch(0.6_0.22_27/45%)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <RotateCcw className="h-4 w-4" /> إعادة بدأ
            </button>
          </div>

          <div className="mt-8 w-full max-w-[352px]">
            <LiveWins game={gameName} />
          </div>
        </div>
      </div>
    </main>
  );
}
