import { Layout } from "@/components/Layout";
import { leaderboard } from "@/data/mockData";
import { Crown, Trophy, Medal } from "lucide-react";
import { useState, useRef } from "react";

const tierGrad: Record<string, string> = { Gold: "gradient-gold", Silver: "gradient-silver", Basic: "gradient-bronze" };
const FILE_ID = "1RmqSzwNKgH9KgWQQoesBsz-y5KebhGn0";
const ABOUT_SOUND_URL = "https://immersive-g.com/sounds/general/IG_Eventsounds_v3_Home_To_About_Thunder_1.mp3";


const AboutSection = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="font-display text-2xl font-bold">Tentang Penulis</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center text-2xl font-bold">RS</div>
            <div>
              <h3 className="font-display text-xl font-bold">Rapiudin Saputra</h3>
              <p className="text-sm text-muted-foreground">rapiudinsaputra4@gmail.com | 085321034886</p>
              <a href="https://www.linkedin.com/in/rapiputra/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">linkedin</a>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">RINGKASAN</h4>
            <p className="text-sm text-muted-foreground">QA Engineer dengan 3+ tahun pengalaman dalam pengujian aplikasi web, mobile, dan API, dengan keahlian di bidang PPOB transaction testing, FMCG distribution systems, dan Sales Force Automation (SFA). Berpengalaman dalam merancang test scenario berbasis SDLC & Agile.</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Hobi</h4>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-secondary rounded text-xs">Olahraga</span>
              <span className="px-2 py-1 bg-secondary rounded text-xs">Traveling</span>
              <span className="px-2 py-1 bg-secondary rounded text-xs">Editing Video</span>
            </div>
          </div>

          {/* VIDEO SECTION — Cinematic Dark Luxury */}
          <div style={{
            marginTop: "2rem",
            background: "linear-gradient(135deg, #0a0a0f 0%, #111118 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Ambient glow */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }} />

            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              marginBottom: "1.5rem", position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#6366f1", boxShadow: "0 0 8px #6366f1",
              }} />
              <span style={{
                fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", fontWeight: 600,
              }}></span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Phone mockup 3D */}
            <div style={{
              display: "flex", justifyContent: "center",
              perspective: "1200px", position: "relative", zIndex: 1,
            }}>
              <div
                style={{
                  width: "220px",
                  transform: "rotateY(-8deg) rotateX(3deg)",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "rotateY(0deg) rotateX(0deg) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "rotateY(-8deg) rotateX(3deg)";
                }}
              >
                {/* Phone frame */}
                <div style={{
                  background: "linear-gradient(145deg, #1c1c2e 0%, #0f0f1a 100%)",
                  borderRadius: "36px",
                  padding: "10px",
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.08),
                    0 40px 80px rgba(0,0,0,0.8),
                    0 20px 40px rgba(0,0,0,0.5),
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    -20px 0 60px rgba(99,102,241,0.08),
                    20px 0 60px rgba(168,85,247,0.05)
                  `,
                }}>
                  {/* Notch */}
                  <div style={{
                    width: "60px", height: "6px", borderRadius: "3px",
                    background: "rgba(255,255,255,0.08)", margin: "0 auto 8px",
                  }} />

                  {/* Screen */}
                  <div style={{
                    borderRadius: "26px", overflow: "hidden",
                    position: "relative", background: "#000",
                  }}>
                    {/* Color grade */}
                    <div style={{
                      position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                      background: "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)",
                      mixBlendMode: "overlay",
                    }} />
                    {/* Vignette */}
                    <div style={{
                      position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                      background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    }} />
                    <iframe
                      style={{ width: "100%", aspectRatio: "9/16", display: "block", border: "none" }}
                      src={`https://drive.google.com/file/d/${FILE_ID}/preview`}
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                  </div>

                  {/* Home bar */}
                  <div style={{
                    width: "80px", height: "4px", borderRadius: "2px",
                    background: "rgba(255,255,255,0.12)", margin: "8px auto 0",
                  }} />
                </div>

                {/* Ground glow */}
                <div style={{
                  position: "absolute", bottom: "-20px", left: "10%", right: "10%",
                  height: "30px", background: "rgba(99,102,241,0.2)",
                  filter: "blur(20px)", borderRadius: "50%",
                }} />
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: "1.5rem", position: "relative", zIndex: 1 }}>
              <span style={{
                fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>Rapiudin Saputra · QA Engineer</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [showAbout, setShowAbout] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const playAboutSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ABOUT_SOUND_URL);
    }
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.7;
    audioRef.current.play().catch(() => {});
  };

  return (
    <Layout>
      <AboutSection isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10 animate-fade-in-up relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" /> Hall of Fame
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-2">Global <span className="text-gradient-gold">Leaderboard</span></h1>
          <p className="text-muted-foreground">Top performer minggu ini berdasarkan XP yang dikumpulkan.</p>
          <button
            onClick={() => { playAboutSound(); setShowAbout(true); }}
            className="absolute top-0 right-0 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            About
          </button>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto mb-10 items-end">
          {[top3[1], top3[0], top3[2]].map((u, i) => {
            const place = i === 1 ? 1 : i === 0 ? 2 : 3;
            const heights = ["h-32", "h-44", "h-24"];
            const grads = ["gradient-silver", "gradient-gold", "gradient-bronze"];
            const icons = [<Medal key="m" className="w-6 h-6" />, <Crown key="c" className="w-7 h-7" />, <Medal key="m2" className="w-6 h-6" />];
            return (
              <div key={u.rank} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${tierGrad[u.tier]} flex items-center justify-center text-2xl md:text-3xl font-display font-black text-primary-foreground shadow-elev mb-2 border-4 border-card`}>
                  {u.avatar}
                </div>
                <div className="font-display font-bold text-sm md:text-base text-center">{u.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{u.xp.toLocaleString()} XP</div>
                <div className={`w-full ${heights[i]} ${grads[i]} rounded-t-2xl flex flex-col items-center justify-start pt-3 text-primary-foreground shadow-card`}>
                  {icons[i]}
                  <div className="font-display font-black text-3xl mt-1">#{place}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/40 text-xs font-bold uppercase tracking-wider text-muted-foreground grid grid-cols-[40px_1fr_auto_auto] gap-4">
            <span>#</span><span>Player</span><span>Tier</span><span>XP</span>
          </div>
          {rest.map((u, i) => (
            <div key={u.rank} className={`px-5 py-3.5 grid grid-cols-[40px_1fr_auto_auto] items-center gap-4 hover:bg-secondary/40 transition-colors ${u.isYou ? "bg-primary/10 border-l-4 border-primary" : ""} ${i !== rest.length - 1 ? "border-b border-border" : ""}`}>
              <div className="font-display font-black text-lg text-muted-foreground">{u.rank}</div>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${tierGrad[u.tier]} flex items-center justify-center font-bold text-primary-foreground text-sm`}>{u.avatar}</div>
                <div className="font-semibold text-sm">{u.name}</div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${u.tier === "Gold" ? "bg-gold/20" : u.tier === "Silver" ? "bg-silver/20" : "bg-bronze/20"}`}>{u.tier}</span>
              <div className="font-display font-black text-sm tabular-nums">{u.xp.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <Trophy className="w-4 h-4 inline mr-1" /> Latihan terus untuk naik ranking minggu depan!
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
