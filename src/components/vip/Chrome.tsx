import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import logo from "@/assets/megavip-logo.png";
import { cn } from "@/lib/utils";


export function DragonMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo}
      alt="MEGA VIP"
      width={size}
      height={size}
      className={cn("drop-shadow-[0_0_16px_oklch(0.7_0.2_250/90%)]", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function TopBar({
  title,
  right,
  backTo,
}: {
  title: string;
  right?: React.ReactNode;
  backTo?: "/games" | "/conditions" | "/";
}) {
  return (
    <header className="sticky top-0 z-40">
      <div
        className="glass flex items-center justify-between gap-2 px-3 py-2.5"
        style={{
          backgroundImage:
            "linear-gradient(100deg, oklch(0.45 0.2 253/28%), oklch(0.05 0.02 253/60%) 55%, oklch(0.5 0.22 27/26%))",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex items-center justify-center">
            <span className="animate-glow-pulse absolute h-9 w-9 rounded-full bg-primary/30 blur-lg" />
            <DragonMark size={28} className="relative" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="neon-text text-[13px] font-extrabold tracking-[0.2em] text-foreground">
              MEGA <span className="text-red">VIP</span>
            </span>
            <span className="mt-0.5 text-[7px] tracking-[0.3em] text-muted-foreground">PREDICTION TOOLS</span>
          </span>
        </div>
        <h1 className="hidden text-sm font-bold text-foreground sm:block">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="min-w-[74px] text-left">{right}</div>
          {backTo && (
            <Link
              to={backTo}
              aria-label="رجوع"
              className="flex h-8 shrink-0 items-center gap-1 rounded-full border border-primary/50 bg-primary/10 px-2.5 text-[10px] font-extrabold text-primary transition-colors hover:bg-primary/20 active:scale-95"
            >
              رجوع <ChevronLeft className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
      <span
        aria-hidden
        className="block h-[2px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, oklch(0.65 0.26 253.5), oklch(0.6 0.22 27), transparent)",
        }}
      />
      <p className="glass px-3 py-1 text-center text-[10px] font-bold tracking-wide text-primary sm:hidden">{title}</p>
    </header>
  );

}

export function OnlineUsers() {
  const [count, setCount] = useState(1000 + Math.floor(Math.random() * 1001));

  useEffect(() => {
    const tick = () => setCount(1000 + Math.floor(Math.random() * 1001));
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-1">
      <span className="animate-glow-pulse inline-block h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
      <span className="text-[10px] text-muted-foreground">{count.toLocaleString()}</span>
    </div>
  );
}

const COUNT = 70;

export function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: 0.8 + Math.random() * 1.6,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      const blue = (y: number) => {
        const t = Math.max(0, 1 - y * 2);
        return { r: 70 + 20 * t, g: 140 + 50 * t, b: 255 };
      };
      const red = (y: number) => {
        const t = Math.max(0, y * 2 - 1);
        return { r: 255, g: 60 + 40 * t, b: 70 + 30 * t };
      };
      const color = (y: number) => (y < 0.5 ? blue(y) : red(y));

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]!;
        const ca = color(a.y);
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]!;
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            const sameHalf = (a.y < 0.5) === (b.y < 0.5);
            const c = sameHalf ? ca : { r: (ca.r + color(b.y).r) / 2, g: (ca.g + color(b.y).g) / 2, b: (ca.b + color(b.y).b) / 2 };
            ctx.strokeStyle = `rgba(${c.r | 0},${c.g | 0},${c.b | 0},${(1 - d / 120) * 0.28})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      ctx.shadowBlur = 8;
      for (const p of pts) {
        const c = color(p.y);
        ctx.shadowColor = `rgba(${c.r | 0},${c.g | 0},${c.b | 0},0.9)`;
        ctx.fillStyle = `rgba(${c.r | 0},${c.g | 0},${c.b | 0},0.85)`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
