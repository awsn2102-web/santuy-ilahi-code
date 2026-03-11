import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snake-high-score");
    return saved ? parseInt(saved) : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const dirRef = useRef<Direction>("RIGHT");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    const initial = [{ x: 10, y: 10 }];
    setSnake(initial);
    setFood(generateFood(initial));
    setDirection("RIGHT");
    dirRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const dir = dirRef.current;

        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        const newSnake = [head, ...prev];

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const newScore = s + 10;
            setHighScore((h) => {
              const best = Math.max(h, newScore);
              localStorage.setItem("snake-high-score", best.toString());
              return best;
            });
            return newScore;
          });
          setFood(generateFood(newSnake));
          setSpeed((s) => Math.max(60, s - 3));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, speed, generateFood]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = GRID_SIZE * CELL_SIZE;
    ctx.clearRect(0, 0, size, size);

    // Background grid
    ctx.fillStyle = "hsl(200 25% 10%)";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "hsl(200 15% 15%)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(size, i * CELL_SIZE);
      ctx.stroke();
    }

    // Snake
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? "hsl(168 80% 45%)" : "hsl(168 70% 35%)";
      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        isHead ? 5 : 3
      );
      ctx.fill();
    });

    // Food
    ctx.fillStyle = "hsl(38 90% 55%)";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "ArrowUp" && dirRef.current !== "DOWN") { dirRef.current = "UP"; setDirection("UP"); }
      if (key === "ArrowDown" && dirRef.current !== "UP") { dirRef.current = "DOWN"; setDirection("DOWN"); }
      if (key === "ArrowLeft" && dirRef.current !== "RIGHT") { dirRef.current = "LEFT"; setDirection("LEFT"); }
      if (key === "ArrowRight" && dirRef.current !== "LEFT") { dirRef.current = "RIGHT"; setDirection("RIGHT"); }
      if (key === " " && !isPlaying) resetGame();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying]);

  // Touch controls
  const touchStart = useRef<Position | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && dirRef.current !== "LEFT") { dirRef.current = "RIGHT"; setDirection("RIGHT"); }
      if (dx < -20 && dirRef.current !== "RIGHT") { dirRef.current = "LEFT"; setDirection("LEFT"); }
    } else {
      if (dy > 20 && dirRef.current !== "UP") { dirRef.current = "DOWN"; setDirection("DOWN"); }
      if (dy < -20 && dirRef.current !== "DOWN") { dirRef.current = "UP"; setDirection("UP"); }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="blog-gradient-bg">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-primary-foreground">🐍 Snake Game</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        {/* Score */}
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Skor</p>
            <p className="text-3xl font-extrabold text-foreground">{score}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Tertinggi</p>
            <p className="text-3xl font-extrabold blog-gradient-text">{highScore}</p>
          </div>
        </div>

        {/* Game area */}
        <div
          className="relative rounded-2xl overflow-hidden blog-shadow-lg border border-border"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="block"
          />

          {/* Overlay */}
          {(!isPlaying || gameOver) && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
              {gameOver ? (
                <>
                  <p className="text-2xl font-bold text-foreground">Game Over! 💀</p>
                  <p className="text-muted-foreground">Skor: {score}</p>
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl blog-gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    <RotateCcw className="w-4 h-4" /> Main Lagi
                  </button>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-foreground">🐍 Snake Game</p>
                  <p className="text-sm text-muted-foreground">Gunakan arrow keys atau swipe</p>
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl blog-gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Play className="w-4 h-4" /> Mulai
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile D-pad */}
        {isPlaying && !gameOver && (
          <div className="grid grid-cols-3 gap-2 w-40 md:hidden">
            <div />
            <button onClick={() => { if (dirRef.current !== "DOWN") { dirRef.current = "UP"; setDirection("UP"); } }} className="h-12 rounded-xl bg-card border border-border flex items-center justify-center text-foreground font-bold active:bg-muted">↑</button>
            <div />
            <button onClick={() => { if (dirRef.current !== "RIGHT") { dirRef.current = "LEFT"; setDirection("LEFT"); } }} className="h-12 rounded-xl bg-card border border-border flex items-center justify-center text-foreground font-bold active:bg-muted">←</button>
            <button onClick={() => { if (dirRef.current !== "UP") { dirRef.current = "DOWN"; setDirection("DOWN"); } }} className="h-12 rounded-xl bg-card border border-border flex items-center justify-center text-foreground font-bold active:bg-muted">↓</button>
            <button onClick={() => { if (dirRef.current !== "LEFT") { dirRef.current = "RIGHT"; setDirection("RIGHT"); } }} className="h-12 rounded-xl bg-card border border-border flex items-center justify-center text-foreground font-bold active:bg-muted">→</button>
          </div>
        )}

        <p className="text-xs text-muted-foreground">Desktop: Arrow Keys | Mobile: Swipe atau tombol arah</p>
      </main>
    </div>
  );
};

export default SnakeGame;
