import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Fingerprint,
  Lock,
  Send,
  ShieldCheck,
  Ticket,
  Wallet,
} from "lucide-react";
import logoMega from "@/assets/logo-megapari.jpg";
import { DragonMark, Particles, TopBar } from "@/components/vip/Chrome";
import { GAME_ROUTES, PLATFORMS, getGame, saveUserId } from "@/lib/session";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "شروط التفعيل VIP — MEGA VIP" },
      {
        name: "description",
        content: "اختر منصتك، أكمل خطوات التفعيل الخمسة، وحدد لعبتك لتشغيل كاشف VIP.",
      },
      { property: "og:title", content: "شروط التفعيل VIP — MEGA VIP" },
      { property: "og:description", content: "خطوات تفعيل حساب VIP واختيار اللعبة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConditionsPage,
});

const PLATFORM = PLATFORMS.megapari;


function Panel({
  n,
  icon,
  title,
  desc,
  done,
  delay,
  children,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  done?: boolean;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <li
      className="animate-fade-up glass relative overflow-hidden rounded-[18px] border border-border/70 p-3.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 w-[3px]"
        style={{
          background: done
            ? "linear-gradient(180deg,var(--success),transparent)"
            : "linear-gradient(180deg,var(--primary),var(--red))",
        }}
      />
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border text-[11px] font-extrabold ${
            done
              ? "border-success/60 bg-success/15 text-success"
              : "border-primary/50 bg-primary/10 text-primary"
          }`}
        >
          {done ? <Check className="h-4 w-4" /> : icon}
        </span>
        <div className="min-w-0 flex-1 text-right">
          <div className="flex items-center justify-end gap-2">
            <h2 className="text-[13px] font-extrabold text-foreground">{title}</h2>
            <span className="rounded-full border border-border px-1.5 text-[9px] font-bold text-muted-foreground">
              {String(n).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </li>
  );
}

function ConditionsPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return undefined;
    const to = GAME_ROUTES[getGame()];
    const t = setTimeout(() => navigate({ to }), 4000);
    return () => clearTimeout(t);
  }, [loading, navigate]);

  const p = PLATFORM;
  const steps = [true, true, copied, true, !!id.trim()];
  const doneCount = steps.filter(Boolean).length;
  const progress = Math.round((doneCount / steps.length) * 100);
  const ready = !!id.trim();

  const copy = () => {
    navigator.clipboard?.writeText(p.promo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <main className="page-bg screen-frame relative min-h-screen pb-14">
      <Particles />
      <div className="relative z-10">
        <TopBar
          title="شروط التفعيل"
          right={
            <span className="mr-auto flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] text-primary">
              <ShieldCheck className="h-3 w-3" /> VIP
            </span>
          }
        />

        {/* Header ring + progress */}
        <section className="px-4 pt-6">
          <div className="animate-fade-up glass relative flex items-center gap-4 overflow-hidden rounded-[22px] border border-border/70 p-4">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-12 -bottom-14 h-40 w-40 rounded-full bg-red/20 blur-3xl"
            />
            <div className="relative flex h-[74px] w-[74px] shrink-0 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--secondary)" strokeWidth="7" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
                  style={{ transition: "stroke-dashoffset .5s ease" }}
                />
              </svg>
              <span className="text-[15px] font-extrabold text-primary">{progress}%</span>
            </div>
            <div className="min-w-0 flex-1 text-right">
              <h1 className="neon-text text-lg font-extrabold text-foreground">تفعيل حساب VIP</h1>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {doneCount} من {steps.length} خطوات مكتملة على منصة {p.name}
              </p>
            </div>
            <DragonMark size={44} className="relative shrink-0 animate-glow-pulse" />
          </div>
        </section>

        {/* Platform */}
        <section className="mt-4 px-4">
          <div className="glass flex items-center gap-3 rounded-[18px] border border-red/40 p-3">
            <img
              src={logoMega}
              alt={p.name}
              loading="lazy"
              width={200}
              height={200}
              className="h-11 w-11 rounded-[12px] object-contain"
            />
            <span className="flex-1 text-right">
              <span className="block text-[13px] font-extrabold text-red">{p.name}</span>
              <span className="block text-[10px] text-muted-foreground">{p.tagline}</span>
            </span>
            <span className="rounded-full border border-primary/50 bg-primary/10 px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] text-primary">
              OFFICIAL
            </span>
          </div>
        </section>


        {/* Steps */}
        <section className="mt-4 px-4">
          <ul className="flex flex-col gap-2.5">
            <Panel
              n={1}
              delay={0}
              icon={<Download className="h-4 w-4" />}
              title="تحميل المنصة"
              desc={`ثبّت تطبيق ${p.name} الرسمي على هاتفك.`}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="gradient-primary flex items-center justify-center gap-1.5 rounded-[12px] py-2.5 text-[12px] font-extrabold text-primary-foreground shadow-[var(--glow-sm)] transition-transform hover:scale-[1.02]"
              >
                تحميل {p.name} <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </Panel>

            <Panel
              n={2}
              delay={60}
              icon={<Send className="h-4 w-4" />}
              title="قناة التلجرام"
              desc="انضم للقناة الحصرية للإشارات اليومية."
            >
              <a
                href="https://t.me/+ISJ9Y8Ia_CdiMDg8"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-[12px] border border-primary/50 bg-primary/10 py-2.5 text-[12px] font-extrabold text-primary transition-colors hover:bg-primary/20"
              >
                انضمام الآن <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </Panel>

            <Panel
              n={3}
              delay={120}
              icon={<Ticket className="h-4 w-4" />}
              title="البروموكود"
              desc="سجّل بالكود ده للحصول على البونص."
              done={copied}
            >
              <button
                onClick={copy}
                className="flex w-full items-center justify-between rounded-[12px] border border-dashed border-primary/50 bg-secondary/40 px-3 py-2.5 transition-colors hover:bg-primary/10"
              >
                <span className="neon-text text-[17px] font-extrabold tracking-[0.35em] text-primary">
                  {p.promo}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  {copied ? "تم النسخ" : "نسخ"}
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4 text-primary" />
                  )}
                </span>
              </button>
            </Panel>

            <Panel
              n={4}
              delay={180}
              icon={<Wallet className="h-4 w-4" />}
              title="الإيداع"
              desc="إيداع أولي لتفعيل الحساب."
            >
              <div className="grid grid-cols-2 gap-2">
                <span className="rounded-[12px] border border-red/50 bg-red/10 py-2 text-center text-[11px] font-extrabold text-red">
                  200 EGP
                </span>
                <span className="rounded-[12px] border border-primary/50 bg-primary/10 py-2 text-center text-[11px] font-extrabold text-primary">
                  4 USD
                </span>
              </div>
            </Panel>

            <Panel
              n={5}
              delay={240}
              icon={<Fingerprint className="h-4 w-4" />}
              title="الـ ID الخاص بك"
              desc="أدخل رقم الحساب للتأكد من التفعيل."
              done={!!id.trim()}
            >
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                inputMode="numeric"
                placeholder="مثال: 1029384756"
                className="w-full rounded-[12px] border border-input bg-secondary/40 px-3 py-2.5 text-right text-sm tracking-widest outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:shadow-[var(--glow-sm)]"
              />
            </Panel>
          </ul>

          <button
            onClick={() => {
              if (!ready) return;
              saveUserId(id.trim());
              setLoading(true);
            }}
            disabled={!ready}
            className="gradient-primary mt-4 w-full rounded-[16px] py-4 text-[13px] font-extrabold text-primary-foreground shadow-[var(--glow-lg)] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            {ready ? "ابدأ الربح الآن" : "أدخل الـ ID للمتابعة"}
          </button>
          {!ready && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
              <Lock className="h-3 w-3" /> الزر يتفعل بعد إدخال الـ ID
            </p>
          )}
        </section>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/92 px-6 backdrop-blur-xl">
          <div
            className="glass animate-fade-up w-full max-w-[340px] overflow-hidden rounded-[26px] p-6 text-center"
            style={{
              backgroundImage:
                "linear-gradient(150deg, oklch(0.45 0.2 253/26%), transparent 55%, oklch(0.5 0.22 27/24%))",
            }}
          >
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary shadow-[var(--glow-md)]" />
              <span
                className="absolute inset-3 animate-spin rounded-full border-2 border-transparent border-b-red"
                style={{ animationDirection: "reverse", animationDuration: "2.4s" }}
              />
              <span className="animate-glow-pulse absolute h-16 w-16 rounded-full bg-primary/25 blur-2xl" />
              <DragonMark size={62} className="relative" />
            </div>

            <p className="neon-text mt-4 text-base font-extrabold tracking-[0.2em]">
              MEGA <span className="text-red">VIP</span>
            </p>
            <p className="mt-1 text-[11px] tracking-[0.18em] text-muted-foreground">جارٍ تفعيل الحساب...</p>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/70">
              <span
                className="block h-full w-1/3 rounded-full"
                style={{
                  backgroundImage: "linear-gradient(90deg, var(--primary), var(--red))",
                  animation: "feed 1.4s linear infinite",
                }}
              />
            </div>

            <ul dir="rtl" className="mt-4 space-y-1.5 text-right">
              {["التحقق من رقم الحساب", "مطابقة البروموكود", "ربط سيرفر التوقعات"].map((t, i) => (
                <li
                  key={t}
                  className="animate-fade-up flex items-center gap-2 rounded-xl border border-border bg-background/50 px-2.5 py-1.5 text-[10px] text-muted-foreground"
                  style={{ animationDelay: `${i * 400}ms` }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[var(--glow-sm)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </main>
  );
}
