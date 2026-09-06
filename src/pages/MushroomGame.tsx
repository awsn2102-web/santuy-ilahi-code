import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Play, RotateCcw, Trophy, Zap } from "lucide-react";

const ARENA = 320; // ukuran arena (px), diskala dengan CSS
const PLAYER_SIZE = 36;
const FOOD_SIZE = 26;
const SPEED = 3.2;
const DURATION = 60; // detik
const XP_PER_FOOD = 5;

const FOODS = ["🍎", "🍓", "🍇", "🥕", "🍒", "🌽"];

type Pos = { x: number; y: number };

const randomFood = (): { pos: Pos; emoji: string } => ({
  pos: {
    x: Math.random() * (ARENA - FOOD_SIZE - 8) + 4,
    y: Math.random() * (ARENA - FOOD_SIZE - 8) + 4,
  },
  emoji: FOODS[Math.floor(Math.random() * FOODS.length)],
});

type Phase = "start" | "playing" | "result";

// Karakter jamur dengan mata & mulut (SVG)
const MushroomChar = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} style={{ display: "block" }}>
    {/* Tudung jamur */}
    <path d="M6 34 C6 14, 58 14, 58 34 C58 38, 54 40, 50 40 L14 40 C10 40, 6 38, 6 34 Z" fill="#e05252" />
    {/* Bintik putih */}
    <circle cx="20" cy="28" r="4" fill="#fff" opacity="0.9" />
    <circle cx="40" cy="24" r="5" fill="#fff" opacity="0.9" />
    <circle cx="50" cy="33" r="3" fill="#fff" opacity="0.9" />
    {/* Batang */}
    <rect x="22" y="38" width="20" height="20" rx="9" fill="#fdf3e3" />
    {/* Mata */}
    <circle cx="28" cy="47" r="2.6" fill="#2b2b2b" />
    <circle cx="37" cy="47" r="2.6" fill="#2b2b2b" />
    <circle cx="28.9" cy="46.1" r="0.9" fill="#fff" />
    <circle cx="37.9" cy="46.1" r="0.9" fill="#fff" />
    {/* Mulut senyum */}
    <path d="M29 52 Q32.5 55, 36 52" stroke="#2b2b2b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    {/* Pipi */}
    <circle cx="25" cy="51" r="1.6" fill="#f4a4a4" opacity="0.8" />
    <circle cx="40" cy="51" r="1.6" fill="#f4a4a4" opacity="0.8" />
  </svg>
);

const MushroomGame = () => {
  const { addXP } = useAuth();
  const [phase, setPhase] = useState<Phase>("start");
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [best, setBest] = useState<number>(() =>
    Number(localStorage.getItem("mushroomBest") || 0)
  );

  const [player, setPlayer] = useState<Pos>({ x: ARENA / 2, y: ARENA / 2 });
  const [food, setFood] = useState(randomFood);

  const keysRef = useRef<Record<string, boolean>>({});
  const touchRef = useRef<Pos | null>(null);
  const playerRef = useRef(player);
  playerRef.current = player;
  const rafRef = useRef<number>(0);

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(k)) {
        e.preventDefault();
        keysRef.current[k] = true;
      }
    };
    const up = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (phase !== "playing") return;

    const tick = () => {
      const k = keysRef.current;
      let dx = 0;
      let dy = 0;
      if (k["arrowup"] || k["w"]) dy -= 1;
      if (k["arrowdown"] || k["s"]) dy += 1;
      if (k["arrowleft"] || k["a"]) dx -= 1;
      if (k["arrowright"] || k["d"]) dx += 1;

      // Touch: gerak ke arah titik sentuh
      const t = touchRef.current;
      if (t && dx === 0 && dy === 0) {
        const px = playerRef.current.x;
        const py = playerRef.current.y;
        const distX = t.x - px;
        const distY = t.y - py;
        const dist = Math.hypot(distX, distY);
        if (dist > 6) {
          dx = distX / dist;
          dy = distY / dist;
        }
      }

      if (dx !== 0 || dy !== 0) {
        const len = Math.hypot(dx, dy) || 1;
        setPlayer((p) => ({
          x: Math.min(Math.max(p.x + (dx / len) * SPEED, 0), ARENA - PLAYER_SIZE),
          y: Math.min(Math.max(p.y + (dy / len) * SPEED, 0), ARENA - PLAYER_SIZE),
        }));
      }

      // Cek tabrakan dengan makanan
      setFood((f) => {
        const p = playerRef.current;
        const cx = p.x + PLAYER_SIZE / 2;
        const cy = p.y + PLAYER_SIZE / 2;
        const fx = f.pos.x + FOOD_SIZE / 2;
        const fy = f.pos.y + FOOD_SIZE / 2;
        if (Math.hypot(cx - fx, cy - fy) < (PLAYER_SIZE + FOOD_SIZE) / 2) {
          setCount((c) => c + 1);
          return randomFood();
        }
        return f;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Timer
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setPhase("result");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Hasil
  useEffect(() => {
    if (phase === "result") {
      const earned = count * XP_PER_FOOD;
      if (earned > 0) addXP(earned);
      if (count > best) {
        setBest(count);
        localStorage.setItem("mushroomBest", String(count));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startGame = () => {
    setCount(0);
    setTimeLeft(DURATION);
    setPlayer({ x: ARENA / 2, y: ARENA / 2 });
    setFood(randomFood());
    touchRef.current = null;
    setPhase("playing");
  };

  // Konversi koordinat pointer → koordinat arena
  const arenaRef = useRef<HTMLDivElement>(null);
  const pointerToArena = (clientX: number, clientY: number): Pos | null => {
    const el = arenaRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * ARENA,
      y: ((clientY - rect.top) / rect.height) * ARENA,
    };
  };

  const xp = count * XP_PER_FOOD;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <Link to="/challenges" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Challenges
        </Link>

        <div className="text-center mb-6 animate-fade-in-up">
          <div className="text-6xl mb-3">🍄</div>
          <h1 className="font-display text-3xl md:text-4xl font-black mb-2">
            Mushroom <span className="text-gradient">Challenge</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Gerakkan jamur dengan WASD / arrow keys atau sentuh layar. Makan sebanyak mungkin dalam {DURATION} detik!
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <span className="text-xl">🍎</span>
            <span className="font-display font-black text-2xl">{count}</span>
            <span className="text-xs text-muted-foreground">dimakan</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <span className="text-xl">⏱️</span>
            <span className={`font-display font-black text-2xl ${timeLeft <= 10 && phase === "playing" ? "text-destructive" : ""}`}>{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <Trophy className="w-5 h-5 text-accent-foreground" />
            <span className="font-display font-black text-2xl">{best}</span>
          </div>
        </div>

        {/* Arena */}
        <div className="flex justify-center">
          <div
            ref={arenaRef}
            className="relative bg-secondary/60 border-2 border-border rounded-2xl overflow-hidden touch-none select-none w-full max-w-[420px] aspect-square shadow-card"
            onPointerDown={(e) => {
              if (phase !== "playing") return;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              touchRef.current = pointerToArena(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (phase !== "playing" || !touchRef.current) return;
              touchRef.current = pointerToArena(e.clientX, e.clientY);
            }}
            onPointerUp={() => (touchRef.current = null)}
            onPointerCancel={() => (touchRef.current = null)}
          >
            {phase === "playing" && (
              <>
                {/* Makanan */}
                <div
                  className="absolute animate-bounce"
                  style={{
                    left: `${(food.pos.x / ARENA) * 100}%`,
                    top: `${(food.pos.y / ARENA) * 100}%`,
                    width: `${(FOOD_SIZE / ARENA) * 100}%`,
                    fontSize: 22,
                    lineHeight: 1,
                  }}
                >
                  {food.emoji}
                </div>
                {/* Jamur */}
                <div
                  className="absolute transition-none"
                  style={{
                    left: `${(player.x / ARENA) * 100}%`,
                    top: `${(player.y / ARENA) * 100}%`,
                    width: `${(PLAYER_SIZE / ARENA) * 100}%`,
                    fontSize: 32,
                    lineHeight: 1,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                >
                  🍄
                </div>
              </>
            )}

            {phase === "start" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/60 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground px-6 text-center">
                  Kumpulkan makanan sebanyak-banyaknya sebelum waktu habis!
                </p>
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-purple text-primary-foreground font-bold shadow-elev hover:opacity-90 transition-opacity"
                >
                  <Play className="w-4 h-4" /> Mulai Main
                </button>
              </div>
            )}

            {phase === "result" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm animate-scale-in">
                <div className="text-5xl">🏆</div>
                <h2 className="font-display text-2xl font-black">Waktu Habis!</h2>
                <p className="text-sm text-muted-foreground">
                  Kamu makan <strong className="text-foreground">{count}</strong> makanan
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-gold text-accent-foreground font-bold text-sm">
                  <Zap className="w-4 h-4" /> +{xp} XP
                </span>
                {count >= best && count > 0 && (
                  <span className="text-xs font-bold text-primary">Rekor baru! 🎉</span>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={startGame}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-purple text-primary-foreground font-bold text-sm shadow-card hover:opacity-90 transition-opacity"
                  >
                    <RotateCcw className="w-4 h-4" /> Main Lagi
                  </button>
                  <Link
                    to="/challenges"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary font-bold text-sm hover:bg-secondary/70 transition-colors"
                  >
                    Challenges
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          🖥️ WASD / Arrow keys &nbsp;•&nbsp; 📱 Sentuh & tahan arena untuk bergerak
        </p>
      </div>
    </Layout>
  );
};

export default MushroomGame;
