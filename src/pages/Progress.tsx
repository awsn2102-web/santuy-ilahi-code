import { Layout } from "@/components/Layout";
import { skillRadar, weeklyXP, userStats, badges } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { TrendingUp, Award, Calendar, Flame } from "lucide-react";

const Progress = () => {
  const { user } = useAuth();
  const xp = user?.xp ?? 0;
  // Build SVG hexagon radar
  const size = 280, cx = size / 2, cy = size / 2, r = 110;
  const n = skillRadar.length;
  const points = skillRadar.map((s, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const v = (s.value / 100) * r;
    return { x: cx + Math.cos(angle) * v, y: cy + Math.sin(angle) * v, lx: cx + Math.cos(angle) * (r + 22), ly: cy + Math.sin(angle) * (r + 22), label: s.skill, value: s.value };
  });
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");
  const grids = [0.25, 0.5, 0.75, 1].map((scale) =>
    Array.from({ length: n }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + Math.cos(angle) * r * scale},${cy + Math.sin(angle) * r * scale}`;
    }).join(" ")
  );

  const totalXP = weeklyXP.reduce((a, b) => a + b.xp, 0);

  // Activity heatmap mock
  const days = Array.from({ length: 84 }, (_, i) => Math.floor(Math.random() * 5));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/15 text-success text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" /> Your Journey
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-2">Progress <span className="text-gradient">Tracker</span></h1>
          <p className="text-muted-foreground">Lihat perkembangan skill, kebiasaan latihan, dan badge yang sudah kamu raih.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, label: "Total XP", value: xp.toLocaleString(), grad: "gradient-purple" },
            { icon: Flame, label: "Day Streak", value: userStats.streak, grad: "gradient-gold" },
            { icon: Award, label: "Badges", value: userStats.badges, grad: "gradient-success" },
            { icon: Calendar, label: "Hours", value: `${userStats.hoursLearned}h`, grad: "gradient-bronze" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${s.grad} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="font-display font-black text-2xl">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skill Radar */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-1">Skill Radar</h2>
            <p className="text-sm text-muted-foreground mb-4">6 dimensi public speaking</p>
            <div className="flex justify-center">
              <svg width={size} height={size + 30}>
                {grids.map((g, i) => (
                  <polygon key={i} points={g} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
                ))}
                {points.map((p, i) => (
                  <line key={i} x1={cx} y1={cy} x2={cx + Math.cos((Math.PI * 2 * i) / n - Math.PI / 2) * r} y2={cy + Math.sin((Math.PI * 2 * i) / n - Math.PI / 2) * r} stroke="hsl(var(--border))" strokeWidth="1" />
                ))}
                <polygon points={polygon} fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2" />
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="hsl(var(--primary))" />
                ))}
                {points.map((p, i) => (
                  <text key={i} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[11px] font-bold">{p.label}</text>
                ))}
              </svg>
            </div>
          </div>

          {/* Weekly chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-1">XP Mingguan</h2>
            <p className="text-sm text-muted-foreground mb-4">Total minggu ini: {totalXP} XP</p>
            <div className="flex items-end gap-3 h-56">
              {weeklyXP.map((d) => {
                const max = Math.max(...weeklyXP.map((w) => w.xp));
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs font-bold">{d.xp}</div>
                    <div className="w-full flex-1 flex items-end">
                      <div className="w-full gradient-hero rounded-t-lg" style={{ height: `${(d.xp / max) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activity heatmap */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl mb-1">Aktivitas 12 Minggu Terakhir</h2>
          <p className="text-sm text-muted-foreground mb-4">Setiap kotak = 1 hari latihan</p>
          <div className="grid grid-cols-12 grid-flow-col gap-1.5" style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
            {days.map((d, i) => {
              const colors = ["bg-muted", "bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"];
              return <div key={i} className={`aspect-square rounded ${colors[d]}`} title={`${d} sesi`} />;
            })}
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            {["bg-muted", "bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl mb-1">Badge Collection</h2>
          <p className="text-sm text-muted-foreground mb-5">{badges.filter((b) => b.earned).length} dari {badges.length} berhasil diraih</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map((b) => (
              <div key={b.id} className={`p-4 rounded-2xl text-center border-2 transition-all ${b.earned ? "gradient-gold border-accent text-accent-foreground shadow-card" : "bg-muted border-border opacity-50 grayscale"}`}>
                <div className="text-4xl mb-2">{b.icon}</div>
                <div className="font-display font-bold text-sm mb-1">{b.name}</div>
                <div className="text-[10px] opacity-80">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
