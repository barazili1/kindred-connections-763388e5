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
    <main className="page-bg screen-frame relative min-h-screen pb-16">
      <Particles />
      <div className="relative z-10">
        <TopBar title="الألعاب" />

        {/* hero / logo */}
        <section className="flex flex-col items-center px-4 pt-7 text-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-glow-pulse absolute h-28 w-28 rounded-full bg-primary/25 blur-3xl" />
            <span className="absolute h-28 w-28 rounded-full bg-red/15 blur-2xl" />
            <DragonMark size={80} className="relative" />
          </div>
          <h2 className="neon-text mt-2.5 flex items-center gap-2 text-xl font-extrabold text-foreground">
            <Gamepad2 className="h-5 w-5 text-primary" /> اختار اللعبة المطلوبة
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            اضغط «العب الآن» لبدء تشغيل أداة الكشف
          </p>
        </section>

        {/* cards */}
        <section className="mt-6 flex flex-col items-center gap-5 px-3">
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
      className={`reveal ${shown ? "reveal-in" : ""} flex w-[300px] max-w-full flex-col gap-2.5`}
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
    >

                {/* premium card */}
                <article
                  className={`group glass relative h-[150px] w-full overflow-hidden rounded-[20px] transition-all duration-300 hover:-translate-y-1 ${a.ring}`}
                  style={{
                    backgroundImage:
                      g.accent === "red"
                        ? "linear-gradient(125deg, oklch(0.5 0.22 27 / 26%), transparent 62%)"
                        : "linear-gradient(125deg, oklch(0.45 0.2 253 / 28%), transparent 62%)",
                  }}
                >
                  {/* corner index */}
                  <span className="absolute left-2.5 top-2.5 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/60 text-[10px] font-extrabold text-muted-foreground backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* tag */}
                  <span
                    className={`absolute right-2.5 top-2.5 z-20 rounded-full border px-2 py-0.5 text-[8px] font-extrabold tracking-[0.2em] backdrop-blur ${a.chip}`}
                  >
                    {g.tag}
                  </span>

                  {/* logo fills card */}
                  <img
                    src={g.img}
                    alt={g.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* bottom shade */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.03 0.012 253 / 94%), oklch(0.03 0.012 253 / 30%) 45%, transparent)",
                    }}
                  />

                  {/* name centered bottom */}
                  <h3 className="neon-text absolute inset-x-0 bottom-3 text-center text-[17px] font-extrabold text-foreground">
                    {g.name}
                  </h3>
                  <p className="absolute inset-x-0 bottom-0.5 text-center text-[9px] tracking-wide text-muted-foreground">
                    {g.ar}
                  </p>
                </article>

                {/* play button */}
                <button
                  onClick={() => {
                    saveGame(g.id);
                    navigate({ to: g.to });
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-primary py-3 text-[13px] font-extrabold text-primary-foreground shadow-[var(--glow-md)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="h-4 w-4" /> العب الآن
                  <ChevronLeft className="h-4 w-4 opacity-70" />
                </button>
    </div>
  );
}

