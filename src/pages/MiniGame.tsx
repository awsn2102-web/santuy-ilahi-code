import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { quizBank } from "@/data/mockData";
import { Timer, CheckCircle2, XCircle, Zap, Trophy, RotateCcw, ArrowLeft, Play } from "lucide-react";

const DURATION = 5 * 60; // 5 menit
const XP_PER_CORRECT = 10;

type Phase = "start" | "playing" | "result";

const shuffle = <T,>(arr: T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);

const MiniGame = () => {
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState(() => shuffle(quizBank));
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [picked, setPicked] = useState<number | null>(null);
  const [best, setBest] = useState<number>(() =>
    Number(localStorage.getItem("quizRushBest") || 0)
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = questions[index % questions.length];
  const xp = correct * XP_PER_CORRECT;
  const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase((p) => (p === "playing" ? "result" : p));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Simpan best saat waktu habis via phase change
  useEffect(() => {
    if (phase === "result") {
      const earned = correct * XP_PER_CORRECT;
      if (earned > best) {
        setBest(earned);
        localStorage.setItem("quizRushBest", String(earned));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startGame = () => {
    setQuestions(shuffle(quizBank));
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    setTimeLeft(DURATION);
    setPicked(null);
    setPhase("playing");
  };

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const isCorrect = i === current.answer;
    if (isCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
    setTimeout(() => {
      setPicked(null);
      setIndex((x) => x + 1);
    }, 450);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(1, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const timeDanger = timeLeft <= 30;

  const optionStyle = (i: number) => {
    if (picked === null)
      return "border-border hover:border-primary hover:-translate-y-0.5 hover:shadow-card bg-card";
    if (i === current.answer) return "border-success bg-success/15";
    if (i === picked) return "border-destructive bg-destructive/15";
    return "border-border bg-card opacity-50";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        {/* START */}
        {phase === "start" && (
          <div className="text-center animate-fade-in-up">
            <div className="text-7xl mb-6">🎲</div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Mini Game
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
              Random <span className="text-gradient">Quiz Rush</span>
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Jawab soal acak sebanyak-banyaknya dalam <strong>5 menit</strong>!
              Setiap jawaban benar = <strong>+{XP_PER_CORRECT} XP</strong>. Seberapa cepat kamu bisa?
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-2xl p-4">
                <Timer className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-display font-black text-xl">5:00</p>
                <p className="text-xs text-muted-foreground">Durasi</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <Zap className="w-6 h-6 mx-auto mb-2 text-accent-foreground" />
                <p className="font-display font-black text-xl">+{XP_PER_CORRECT}</p>
                <p className="text-xs text-muted-foreground">XP / benar</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-accent-foreground" />
                <p className="font-display font-black text-xl">{best}</p>
                <p className="text-xs text-muted-foreground">Best XP</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-purple text-primary-foreground font-display font-black text-lg shadow-elev hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5" /> Mulai Main
            </button>
            <div className="mt-6">
              <Link to="/challenges" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Challenges
              </Link>
            </div>
          </div>
        )}

        {/* PLAYING */}
        {phase === "playing" && current && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6 gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success/15 text-success font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> {correct}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-destructive/15 text-destructive font-bold text-sm">
                  <XCircle className="w-4 h-4" /> {wrong}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl font-display font-black text-lg tabular-nums ${
                  timeDanger
                    ? "bg-destructive/15 text-destructive animate-pulse"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Timer className="w-4 h-4" /> {mm}:{ss}
              </span>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Soal #{correct + wrong + 1}
              </p>
              <h2 className="font-display font-black text-xl md:text-2xl leading-snug">
                {current.q}
              </h2>
            </div>

            <div className="grid gap-3">
              {current.options.map((opt, i) => (
                <button
                  key={`${index}-${i}`}
                  onClick={() => answer(i)}
                  disabled={picked !== null}
                  className={`text-left px-5 py-4 rounded-xl border-2 font-semibold transition-all ${optionStyle(i)}`}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-secondary font-display font-black text-xs mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div className="text-center animate-fade-in-up">
            <div className="text-7xl mb-4">⏰</div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-2">
              Waktu <span className="text-gradient">Habis!</span>
            </h1>
            <p className="text-muted-foreground mb-8">Ini hasil latihanmu:</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-2xl p-4">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-success" />
                <p className="font-display font-black text-2xl">{correct}</p>
                <p className="text-xs text-muted-foreground">Benar</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <XCircle className="w-6 h-6 mx-auto mb-2 text-destructive" />
                <p className="font-display font-black text-2xl">{wrong}</p>
                <p className="text-xs text-muted-foreground">Salah</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-display font-black text-2xl">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Akurasi</p>
              </div>
              <div className="bg-card border-2 border-primary rounded-2xl p-4 shadow-card">
                <Zap className="w-6 h-6 mx-auto mb-2 text-accent-foreground" />
                <p className="font-display font-black text-2xl text-gradient">+{xp}</p>
                <p className="text-xs text-muted-foreground">XP didapat</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              🏆 Best score kamu: <strong>{best} XP</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-purple text-primary-foreground font-display font-black shadow-elev hover:scale-105 transition-transform"
              >
                <RotateCcw className="w-5 h-5" /> Main Lagi
              </button>
              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-border font-display font-black hover:border-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Kembali ke Challenges
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MiniGame;
