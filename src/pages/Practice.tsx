import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Mic, Type, Sparkles, Play, Square, Send, Loader2, CheckCircle2, AlertCircle, MessageSquare, Tag } from "lucide-react";

type Mode = "text" | "voice";

interface InlineFeedback {
  sentence: string;
  type: "strength" | "improvement";
  comment: string;
  startIndex: number;
  endIndex: number;
}

const sampleFeedback = {
  scoreOverall: 82,
  scores: [
    { label: "Clarity", value: 88 },
    { label: "Structure", value: 84 },
    { label: "Engagement", value: 76 },
    { label: "Confidence", value: 80 },
  ],
  strengths: [
    "Pembukaan menarik dengan hook yang relevan dan personal.",
    "Argumen utama tersusun rapi (problem → solusi → call to action).",
    "Pemilihan kata sederhana namun kuat.",
  ],
  improvements: [
    "Perbanyak jeda strategis untuk efek dramatis di kalimat penutup.",
    "Tambahkan satu data atau angka spesifik untuk memperkuat klaim.",
    "Hindari pengulangan kata 'sangat' — variasikan dengan sinonim.",
  ],
  xpEarned: 120,
};

const Practice = () => {
  const { addXP } = useAuth();
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<typeof sampleFeedback | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [inlineFeedbacks, setInlineFeedbacks] = useState<InlineFeedback[]>([]);
  const timerRef = useRef<number | null>(null);
  const playbackTimerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulate AI feedback on text change
  useEffect(() => {
    if (mode === "text" && text.length > 20) {
      const timer = setTimeout(() => {
        const feedbacks: InlineFeedback[] = [];
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        
        sentences.forEach(sentence => {
          const lower = sentence.toLowerCase();
          if (lower.includes("sangat") || lower.includes("banget") || lower.includes("sekali")) {
            feedbacks.push({
              sentence,
              type: "improvement",
              comment: "Kata berulang - gunakan sinonim untuk variasi",
              startIndex: text.indexOf(sentence),
              endIndex: text.indexOf(sentence) + sentence.length
            });
          } else if (lower.includes("namun") || lower.includes("tetapi") || lower.includes("oleh karena itu")) {
            feedbacks.push({
              sentence,
              type: "strength",
              comment: "Transisi logis yang baik",
              startIndex: text.indexOf(sentence),
              endIndex: text.indexOf(sentence) + sentence.length
            });
          } else if (lower.includes("contoh") || lower.includes("misalnya")) {
            feedbacks.push({
              sentence,
              type: "strength",
              comment: "Penggunaan contoh mendukung argumen",
              startIndex: text.indexOf(sentence),
              endIndex: text.indexOf(sentence) + sentence.length
            });
          }
        });
        setInlineFeedbacks(feedbacks);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setInlineFeedbacks([]);
  }, [text, mode]);

  const startRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setRecording(true);
      setRecordTime(0);
      timerRef.current = window.setInterval(() => setRecordTime((t) => t + 1), 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };
  
  const stopRecord = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (playbackTimerRef.current) window.clearInterval(playbackTimerRef.current);
      } else {
        setPlaybackTime(0);
        playbackTimerRef.current = window.setInterval(() => {
          setPlaybackTime((t) => {
            if (audioRef.current && t >= audioRef.current.duration) {
              window.clearInterval(playbackTimerRef.current!);
              setIsPlaying(false);
              return t;
            }
            return t + 0.1;
          });
        }, 100);
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const submit = () => {
    setSubmitting(true);
    setFeedback(null);
    setTimeout(() => {
      setFeedback(sampleFeedback);
      setSubmitting(false);
      addXP(sampleFeedback.xpEarned);
    }, 1800);
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const canSubmit = mode === "text" ? text.trim().length > 20 : recordTime > 3 && !recording;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="mb-8 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> AI Practice Room
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-2">Latihan dengan <span className="text-gradient">AI Feedback</span></h1>
          <p className="text-muted-foreground">Ketik naskah atau rekam suaramu — AI akan menganalisis dan memberikan feedback dalam hitungan detik.</p>
        </div>

        {/* Mode tabs */}
        <div className="bg-card border border-border rounded-2xl p-2 inline-flex gap-2 mb-6">
          <button onClick={() => { setMode("text"); setFeedback(null); setAudioUrl(null); setIsPlaying(false); }} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${mode === "text" ? "gradient-purple text-primary-foreground shadow-card" : "hover:bg-secondary"}`}>
            <Type className="w-4 h-4" /> Teks
          </button>
          <button onClick={() => { setMode("voice"); setFeedback(null); }} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${mode === "voice" ? "gradient-purple text-primary-foreground shadow-card" : "hover:bg-secondary"}`}>
            <Mic className="w-4 h-4" /> Suara
          </button>
        </div>

        {/* Input area */}
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 mb-6">
          <div className="mb-4">
            <h2 className="font-display font-bold text-lg mb-1">Topik: "Kenapa belajar publik speaking penting di era AI?"</h2>
            <p className="text-sm text-muted-foreground">Durasi target: 60–90 detik · Target XP: +120</p>
          </div>

          {mode === "text" ? (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tulis naskah pidatomu di sini... Mulai dengan hook yang menarik, lalu masuk ke argumen utama, dan akhiri dengan call-to-action."
                  className="w-full min-h-[240px] p-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none text-base leading-relaxed resize-none transition-colors"
                />
                {inlineFeedbacks.length > 0 && (
                  <div className="absolute top-2 right-2 max-w-xs space-y-2">
                    {inlineFeedbacks.map((fb, i) => (
                      <div key={i} className={`p-2 rounded-lg text-xs ${fb.type === "strength" ? "bg-success/10 border border-success/30" : "bg-accent/10 border border-accent/30"}`}>
                        <div className="flex items-start gap-1">
                          {fb.type === "strength" ? <CheckCircle2 className="w-3 h-3 text-success mt-0.5" /> : <AlertCircle className="w-3 h-3 text-accent mt-0.5" />}
                          <div>
                            <strong className="font-semibold">{fb.type === "strength" ? "Kekuatan" : "Perbaikan"}:</strong> {fb.comment}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Tag className="w-3 h-3 text-primary" />
                <span>AI sedang menganalisis naskah Anda...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 bg-secondary/40 rounded-2xl border-2 border-dashed border-border">
              <button
                onClick={recording ? stopRecord : startRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${recording ? "bg-destructive shadow-elev animate-pulse-glow" : "gradient-hero shadow-glow hover:scale-110"}`}
              >
                {recording ? <Square className="w-8 h-8 text-primary-foreground fill-current" /> : <Mic className="w-10 h-10 text-primary-foreground" />}
              </button>
              <div className="mt-5 text-center">
                <div className="font-display font-black text-3xl tabular-nums">{fmt(recordTime)}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {recording ? "Sedang merekam... klik untuk berhenti" : recordTime > 0 ? "Klik mic untuk rekam ulang" : "Klik mic untuk mulai rekaman"}
                </p>
              </div>
              {audioUrl && !recording && (
                <div className="mt-6 flex flex-col items-center gap-3">
                  <audio 
                    ref={audioRef} 
                    src={audioUrl} 
                    onEnded={() => { 
                      setIsPlaying(false); 
                      setPlaybackTime(0);
                      if (playbackTimerRef.current) window.clearInterval(playbackTimerRef.current);
                    }} 
                    onTimeUpdate={() => audioRef.current && setPlaybackTime(audioRef.current.currentTime)}
                  />
                  <button
                    onClick={playAudio}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-purple text-primary-foreground font-semibold shadow-card hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Putar Rekaman"}
                  </button>
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground">Durasi Rekaman: {fmt(recordTime)}</span>
                    {isPlaying && (
                      <div className="text-sm font-mono text-primary">▶ {playbackTime.toFixed(1)}s / {recordTime.toFixed(1)}s</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <div className="text-xs text-muted-foreground">
              {mode === "text" ? `${text.trim().split(/\s+/).filter(Boolean).length} kata` : recording ? "● Live" : ""}
            </div>
            <button
              onClick={submit}
              disabled={!canSubmit || submitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-hero text-primary-foreground font-bold shadow-glow disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105 transition-transform"
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Menganalisis...</> : <><Send className="w-4 h-4" /> Dapatkan Feedback AI</>}
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="space-y-5 animate-fade-in-up">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center bg-card border-2 border-success/30 rounded-3xl p-6 md:p-8">
              <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                  <circle cx="50" cy="50" r="44" stroke="hsl(var(--muted))" strokeWidth="9" fill="none" />
                  <circle cx="50" cy="50" r="44" stroke="hsl(var(--success))" strokeWidth="9" fill="none" strokeDasharray={`${(feedback.scoreOverall / 100) * 276} 276`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-display font-black text-3xl">{feedback.scoreOverall}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm font-bold text-success uppercase tracking-wider">Great Job!</span>
                </div>
                <h2 className="font-display font-black text-2xl mb-2">+{feedback.xpEarned} XP earned 🎉</h2>
                <p className="text-muted-foreground text-sm mb-4">Performamu di atas rata-rata. Berikut breakdown skor per dimensi:</p>
                <div className="grid grid-cols-2 gap-3">
                  {feedback.scores.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold">{s.label}</span>
                        <span className="text-muted-foreground">{s.value}/100</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full gradient-purple rounded-full" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-card border border-success/30 rounded-2xl p-6">
                <h3 className="font-display font-bold flex items-center gap-2 mb-4 text-success"><CheckCircle2 className="w-5 h-5" /> Kekuatan</h3>
                <ul className="space-y-3">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="text-sm flex gap-2"><span className="text-success">✓</span> {s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-accent/40 rounded-2xl p-6">
                <h3 className="font-display font-bold flex items-center gap-2 mb-4 text-accent-foreground"><AlertCircle className="w-5 h-5" /> Saran Perbaikan</h3>
                <ul className="space-y-3">
                  {feedback.improvements.map((s, i) => (
                    <li key={i} className="text-sm flex gap-2"><span className="text-accent">→</span> {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Practice;
