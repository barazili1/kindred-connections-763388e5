import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Gamepad2, Play, Sparkles } from "lucide-react";
import gameCrash from "@/assets/game-crash.jpg";
import gameApple from "@/assets/game-apple.jpg";
import gameMines from "@/assets/game-mines.jpg";
import gameWild from "@/assets/game-wildwest.jpg";
import gameThimbles from "@/assets/game-thimbles.jpg";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { saveGame, type GameId } from "@/lib/session";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "اختر اللعبة — MEGA VIP" },
      {
        name: "description",
        content: "اختر لعبتك: Crash أو Apple of Fortune أو Gems Mines أو Wild West وابدأ الكشف VIP.",
      },
      { property: "og:title", content: "اختر اللعبة — MEGA VIP" },
      { property: "og:description", content: "أربع ألعاب مدعومة بأداة الكشف VIP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamesPage,
});

type Game = {
  id: GameId;
  name: string;
  ar: string;
  img: string;
  to: "/conditions";
  tag: string;
  accent: "red" | "blue";
};

const GAMES: Game[] = [
  { id: "crash", name: "Crash", ar: "توقع لحظة الانفجار", img: gameCrash, to: "/conditions", tag: "HOT", accent: "red" },
  { id: "apple", name: "Apple of Fortune", ar: "كشف التفاح السليم", img: gameApple, to: "/conditions", tag: "VIP", accent: "blue" },
  { id: "mines", name: "GEMS MINES", ar: "كشف مواقع القنابل", img: gameMines, to: "/conditions", tag: "NEW", accent: "blue" },
  { id: "thimbles", name: "Thimbles", ar: "كشف الكوب الصحيح", img: gameThimbles, to: "/conditions", tag: "LIVE", accent: "red" },
  { id: "wildwest", name: "WILD WEST", ar: "كشف دورات الحظ", img: gameWild, to: "/conditions", tag: "BETA", accent: "red" },
];

const ACCENT = {
  red: { glow: "var(--red)", chip: "text-red border-red/50 bg-red/10", ring: "group-hover:shadow-[0_0_0_1px_var(--red),0_0_28px_oklch(0.6_0.22_27/45%)]" },
  blue: { glow: "var(--primary)", chip: "text-primary border-primary/50 bg-primary/10", ring: "group-hover:shadow-[0_0_0_1px_var(--primary),0_0_28px_oklch(0.65_0.26_253.5/45%)]" },
} as const;

function GamesPage() {

  return (
    <main className="page-bg screen-frame relative flex min-h-screen flex-col overflow-hidden">
      <Particles />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar title="الألعاب" />

        {/* hero / logo */}
        <section className="flex flex-col items-center px-4 pt-2 text-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-glow-pulse absolute h-16 w-16 rounded-full bg-primary/25 blur-3xl" />
            <DragonMark size={44} className="relative" />
          </div>
          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[8px] font-bold tracking-[0.3em] text-primary">
            <Sparkles className="h-2.5 w-2.5" /> VIP TOOLS
          </span>
          <h2 className="neon-text mt-1.5 flex items-center gap-2 text-[15px] font-extrabold text-foreground">
            <Gamepad2 className="h-4 w-4 text-primary" /> اختار اللعبة المطلوبة
          </h2>
        </section>

        {/* cards */}
        <section className="mx-auto mt-2 flex w-full max-w-[380px] flex-1 flex-col justify-center gap-2 px-3 pb-3">
          {GAMES.map((g, i) => (
            <GameCard key={g.name} g={g} i={i} />
          ))}
        </section>
      </div>
    </main>
  );
}

function GameCard({ g, i }: { g: Game; i: number }) {
  const navigate = useNavigate();
  const a = ACCENT[g.accent];
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} w-full`}
      style={{ transitionDelay: `${(i % 3) * 70}ms` }}
    >
      <button
        onClick={() => {
          saveGame(g.id);
          navigate({ to: g.to });
        }}
        className={`group glass relative grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 overflow-hidden rounded-[14px] p-1.5 text-right transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] ${a.ring}`}
        style={{
          backgroundImage:
            g.accent === "red"
              ? "linear-gradient(115deg, oklch(0.5 0.22 27 / 24%), transparent 65%)"
              : "linear-gradient(115deg, oklch(0.45 0.2 253 / 26%), transparent 65%)",
        }}
      >
        <img
          src={g.img}
          alt={g.name}
          loading="lazy"
          width={256}
          height={144}
          className="h-12 w-[86px] shrink-0 rounded-[10px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-extrabold text-foreground">{g.name}</span>
          <span className="truncate text-[9px] text-muted-foreground">{g.ar}</span>
        </span>

        <span className="flex shrink-0 items-center gap-1.5">
          <span
            className={`rounded-full border px-1.5 py-0.5 text-[7px] font-extrabold tracking-[0.15em] ${a.chip}`}
          >
            {g.tag}
          </span>
          <span className="flex items-center gap-1 rounded-[10px] bg-primary px-2.5 py-2 text-[11px] font-extrabold text-primary-foreground shadow-[var(--glow-sm)]">
            <Play className="h-3 w-3" /> العب
            <ChevronLeft className="h-3 w-3 opacity-70" />
          </span>
        </span>
      </button>
    </div>
  );
}


