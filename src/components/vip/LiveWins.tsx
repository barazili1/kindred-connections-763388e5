import { useEffect, useState } from "react";
import { Activity, TrendingUp } from "lucide-react";

const NAMES = ["User***k", "Player***9", "Ahmed***3", "Mo***7z", "Sara***1", "Khaled***5", "Vip***x", "Omar***2"];
const AMOUNTS = ["$150", "500 EGP", "$1,240", "2,300 EGP", "$85", "9,700 EGP", "$420", "1,150 EGP"];
const MULTS = ["x2.14", "x5.60", "x1.92", "x11.4", "x3.08", "x7.75", "x24.1", "x1.55"];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export function LiveWins({ title = "LIVE DASHBOARD WIN", game = "MegaPari" }: { title?: string; game?: string }) {
  const [stats, setStats] = useState({ players: 1284, top: 9700, rate: 96.4 });
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStats(() => ({
        players: Math.round(rand(900, 2400)),
        top: Math.round(rand(3500, 18000) / 50) * 50,
        rate: Math.round(rand(92, 98.9) * 10) / 10,
      }));
      setSeed((s) => s + 1);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const rows = Array.from({ length: 8 }, (_, i) => ({
    name: NAMES[(i + seed) % NAMES.length]!,
    amount: AMOUNTS[(i + seed * 3) % AMOUNTS.length]!,
    mult: MULTS[(i + seed * 5) % MULTS.length]!,
    time: `${((i + seed) % 9) + 3}s`,
    hot: (i + seed) % 3 === 0,
  }));
  const doubled = [...rows, ...rows];

  return (
    <section
      className="glass overflow-hidden rounded-[22px] p-3"
      style={{ backgroundImage: "linear-gradient(140deg, oklch(0.45 0.2 253/22%), transparent 55%, oklch(0.5 0.22 27/20%))" }}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-glow-pulse absolute inset-0 rounded-full bg-red shadow-[0_0_12px_var(--red)]" />
          </span>
          <h2 className="text-[11px] font-extrabold tracking-[0.22em] text-foreground">{title}</h2>
        </div>
        <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-primary">
          {game}
        </span>
      </header>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          { l: "لاعب الآن", v: stats.players.toLocaleString(), i: Activity, c: "text-primary" },
          { l: "أعلى ربح", v: `$${stats.top.toLocaleString()}`, i: TrendingUp, c: "text-red" },
          { l: "نسبة الفوز", v: `${stats.rate.toFixed(1)}%`, i: TrendingUp, c: "text-success" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-background/50 px-2 py-2 text-center">
            <s.i className={`mx-auto h-3.5 w-3.5 ${s.c}`} />
            <p className="mt-1 text-[11px] font-extrabold tabular-nums">{s.v}</p>
            <p className="text-[8px] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="relative h-48 overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_14%,#000_86%,transparent)]">
        <ul className="animate-feed space-y-2">
          {doubled.map((r, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-2xl border border-border bg-background/45 px-2.5 py-2 backdrop-blur"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-primary-foreground"
                style={{
                  backgroundImage: r.hot
                    ? "linear-gradient(135deg, oklch(0.6 0.22 27), oklch(0.72 0.18 40))"
                    : "var(--gradient-primary)",
                }}
              >
                {r.name.slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold">{r.name}</p>
                <p className="text-[9px] text-muted-foreground">منذ {r.time}</p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${
                  r.hot ? "border-red/50 bg-red/10 text-red" : "border-primary/40 bg-primary/10 text-primary"
                }`}
              >
                {r.mult}
              </span>
              <span className="shrink-0 text-[11px] font-extrabold text-success">+{r.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
