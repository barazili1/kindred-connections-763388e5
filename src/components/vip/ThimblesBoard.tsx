import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import cup from "@/assets/thimble-cup.png";
import ball from "@/assets/thimble-ball.png";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { LiveWins } from "@/components/vip/LiveWins";
import { getPlatform, getUserId, PLATFORMS } from "@/lib/session";

export function ThimblesBoard() {
  const [userId, setUserId] = useState("");
  const [platform, setPlatform] = useState("");
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    setUserId(getUserId() || "GUEST");
    setPlatform(PLATFORMS[getPlatform()].name);
  }, []);

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-12">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="كاشف Thimbles"
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
            <span className="mx-1.5 text-red">×</span>Thimbles
          </h1>

          {/* Cups */}
          <div
            dir="ltr"
            className="glass mt-6 w-full max-w-[560px] rounded-[24px] p-4"
            style={{
              backgroundImage:
                "linear-gradient(140deg, oklch(0.45 0.2 253/18%), transparent 60%, oklch(0.5 0.22 27/16%))",
            }}
          >
            <div className="mx-auto grid w-full max-w-[420px] grid-cols-3 items-end justify-items-center gap-3 sm:gap-4">
              {[0, 1, 2].map((i) => {
                const up = winner === i;
                return (
                  <div key={i} className="flex w-full min-w-0 flex-col items-center sm:max-w-[130px]">
                    <div className="relative aspect-square w-full">
                      {up && (
                        <img
                          src={ball}
                          alt="Ball"
                          loading="lazy"
                          width={512}
                          height={512}
                          className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_18px_var(--red)]"
                        />
                      )}

                      <img
                        src={cup}
                        alt="Thimble"
                        loading="lazy"
                        width={512}
                        height={512}
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-500"
                        style={{ transform: `translateY(${up ? -45 : 0}%)` }}
                      />
                    </div>
                    <span
                      className={`mt-2 w-full rounded-xl border py-1 text-center text-[10px] font-extrabold transition-colors ${
                        up
                          ? "border-primary bg-primary/15 text-primary shadow-[var(--glow-sm)]"
                          : "border-border bg-background/60 text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Controls */}
          <div className="mt-5 grid w-full max-w-[352px] grid-cols-2 gap-3">
            <button
              onClick={() => setWinner(Math.floor(Math.random() * 3))}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Play className="h-4 w-4" /> بدأ
            </button>
            <button
              onClick={() => setWinner(null)}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-red py-3.5 text-sm font-extrabold text-primary-foreground shadow-[0_0_28px_oklch(0.6_0.22_27/45%)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <RotateCcw className="h-4 w-4" /> إعادة بدأ
            </button>
          </div>

          <div className="mt-8 w-full max-w-[352px]">
            <LiveWins game="Thimbles" />
          </div>
        </div>
      </div>
    </main>
  );
}
