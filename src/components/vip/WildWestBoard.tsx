import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import chest from "@/assets/treasure-chest.png";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { LiveWins } from "@/components/vip/LiveWins";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";

export function WildWestBoard() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [mode, setMode] = useState<2 | 3>(2);
  const [open, setOpen] = useState<number[]>([]);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    setPlatform(PLATFORMS[getPlatform()].name);
  }, []);

  const pick = (m: 2 | 3) => {
    setMode(m);
    setOpen([]);
  };

  const start = () => {
    const pool = Array.from({ length: mode }, (_, i) => i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j]!, pool[i]!];
    }
    setOpen(pool.slice(0, 1));
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-12">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف Wild West"
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
            <span className="mx-1.5 text-red">×</span>WILD WEST
          </h1>

          {/* Boxes */}
          <div dir="ltr" className="mt-6 flex w-full max-w-[352px] flex-nowrap items-center justify-center gap-2">
            {Array.from({ length: mode }, (_, i) => {
              const on = open.includes(i);
              return (
                <div
                  key={i}
                  style={{ maxWidth: 200, height: 80, borderRadius: 18 }}
                  className={`flex min-w-0 flex-1 items-center justify-center border transition-all duration-500 ${
                    on
                      ? "animate-fade-up border-primary bg-primary/15 shadow-[var(--glow-md)]"
                      : "border-border bg-background/60"
                  }`}
                >
                  {on ? (
                    <img
                      src={chest}
                      alt="Treasure"
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-[64px] w-[64px] object-contain drop-shadow-[0_0_14px_var(--primary-glow)]"
                    />
                  ) : (
                    <span className="text-[10px] tracking-[0.3em] text-muted-foreground">HIDDEN</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Multiplier switch */}
          <div dir="ltr" className="mt-5 grid w-full max-w-[352px] grid-cols-2 gap-3">
            {([2, 3] as const).map((m) => (
              <button
                key={m}
                onClick={() => pick(m)}
                style={{ borderRadius: 14 }}
                className={`py-3 text-sm font-extrabold transition-all ${
                  mode === m
                    ? "border border-primary bg-primary/20 text-primary shadow-[var(--glow-sm)]"
                    : "border border-border bg-background/60 text-muted-foreground"
                }`}
              >
                X{m}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-4 grid w-full max-w-[352px] grid-cols-2 gap-3">
            <button
              onClick={start}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Play className="h-4 w-4" /> بدأ
            </button>
            <button
              onClick={() => setOpen([])}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-red py-3.5 text-sm font-extrabold text-primary-foreground shadow-[0_0_28px_oklch(0.6_0.22_27/45%)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <RotateCcw className="h-4 w-4" /> إعادة بدأ
            </button>
          </div>

          <div className="mt-8 w-full max-w-[352px]">
            <LiveWins game="WILD WEST" />
          </div>
        </div>
      </div>
    </main>
  );
}
