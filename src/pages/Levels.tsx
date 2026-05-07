import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { levels } from "@/data/mockData";
import { Lock, CheckCircle2, Trophy, ArrowRight } from "lucide-react";

const tierStyles: Record<string, { grad: string; chip: string; icon: string }> = {
  Basic: { grad: "gradient-bronze", chip: "bg-bronze/15 text-bronze", icon: "🥉" },
  Silver: { grad: "gradient-silver", chip: "bg-silver/20 text-foreground", icon: "🥈" },
  Gold: { grad: "gradient-gold", chip: "bg-gold/20 text-foreground", icon: "🥇" },
};

const Levels = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mb-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" /> Learning Path
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-3">Pilih <span className="text-gradient">Level</span> Selanjutnya</h1>
          <p className="text-muted-foreground">Selesaikan level secara berurutan untuk membuka tier yang lebih tinggi. Setiap level berisi 10–14 challenge.</p>
        </div>

        {/* Path */}
        <div className="space-y-5">
          {levels.map((lv, i) => {
            const tier = tierStyles[lv.tier];
            const pct = (lv.completed / lv.challenges) * 100;
            const done = lv.completed === lv.challenges;
            return (
              <div key={lv.id} className={`relative bg-card border-2 ${done ? "border-success/40" : lv.locked ? "border-border opacity-60" : "border-border hover:border-primary/40"} rounded-3xl p-6 md:p-7 hover:shadow-card transition-all animate-fade-in-up`} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="grid md:grid-cols-[auto_1fr_auto] gap-5 items-center">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${tier.grad} flex items-center justify-center text-4xl md:text-5xl shadow-card relative`}>
                    {lv.locked ? <Lock className="w-8 h-8 text-primary-foreground" /> : tier.icon}
                    {done && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center border-4 border-card">
                        <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${tier.chip}`}>{lv.tier}</span>
                      <span className="text-xs text-muted-foreground">Level {lv.id}</span>
                    </div>
                    <h3 className="font-display font-black text-xl md:text-2xl mb-1.5">{lv.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{lv.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {lv.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-secondary font-medium">{s}</span>
                      ))}
                    </div>
                    {!lv.locked && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{lv.completed}/{lv.challenges} challenges</span>
                          <span className="font-bold text-primary">{Math.round(pct)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${tier.grad} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:self-stretch flex items-center">
                    {lv.locked ? (
                      <span className="text-xs text-muted-foreground px-4 py-2 rounded-xl bg-muted">🔒 Selesaikan level sebelumnya</span>
                    ) : (
                      <Link to="/challenges" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${done ? "bg-success/15 text-success" : "gradient-purple text-primary-foreground shadow-card hover:scale-105"} font-semibold text-sm transition-transform whitespace-nowrap`}>
                        {done ? "Completed" : "Continue"} <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Levels;
