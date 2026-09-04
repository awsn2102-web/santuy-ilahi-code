import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { userStats, challenges, weeklyXP, badges } from "@/data/mockData";
import { useAuth, XP_PER_LEVEL } from "@/context/AuthContext";
import { Flame, Trophy, Target, Clock, Award, ArrowRight, Zap, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const xp = user?.xp ?? 0;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInLevel = xp % XP_PER_LEVEL;
  const xpToNext = level * XP_PER_LEVEL;
  const tier = level >= 15 ? "Gold" : level >= 7 ? "Silver" : "Basic";
  const completed = user?.challengesCompleted ?? 0;
  const xpPct = (xpInLevel / XP_PER_LEVEL) * 100;
  const maxXp = Math.max(...weeklyXP.map((d) => d.xp));
  const recommended = challenges.slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-7 md:p-10 shadow-elev animate-fade-in-up">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="text-primary-foreground">
              <p className="text-sm opacity-80 mb-1">Selamat datang kembali,</p>
              <h1 className="font-display text-3xl md:text-5xl font-black mb-3">{user?.name ?? userStats.name} 🎙️</h1>
              <p className="opacity-90 mb-5 max-w-md">Tier <span className="font-bold">{tier}</span> · Level {level} · {xp.toLocaleString()} XP</p>
              <div className="max-w-md">
                <div className="flex justify-between text-xs mb-1.5 opacity-90">
                  <span>{xp.toLocaleString()} XP</span>
                  <span>{xpToNext.toLocaleString()} XP → Lv {level + 1}</span>
                </div>
                <div className="h-2.5 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${xpPct}%` }} />
                </div>
              </div>
            </div>
            <div className="flex md:flex-col gap-3">
              <div className="bg-primary-foreground/15 backdrop-blur-md rounded-2xl px-5 py-3 text-primary-foreground text-center">
                <Flame className="w-5 h-5 mx-auto mb-1 text-accent" />
                <div className="font-display font-black text-2xl">{userStats.streak}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-80">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Target, label: "Challenges", value: `${completed}/${userStats.totalChallenges}`, grad: "gradient-purple" },
            { icon: Trophy, label: "Rank Global", value: `#${userStats.rank}`, grad: "gradient-gold" },
            { icon: Award, label: "Badges Earned", value: userStats.badges, grad: "gradient-success" },
            { icon: Clock, label: "Hours Learned", value: `${userStats.hoursLearned}h`, grad: "gradient-bronze" },
          ].map((s, i) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5 hover:shadow-card transition-all animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`w-10 h-10 rounded-xl ${s.grad} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="font-display font-black text-2xl">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weekly XP chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> XP Minggu Ini
                </h2>
                <p className="text-sm text-muted-foreground">Total: {weeklyXP.reduce((a, b) => a + b.xp, 0)} XP</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold">+18% vs minggu lalu</span>
            </div>
            <div className="flex items-end gap-2 md:gap-4 h-48">
              {weeklyXP.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex-1 flex items-end">
                    <div className="w-full gradient-purple rounded-t-lg transition-all hover:opacity-80 relative group" style={{ height: `${(d.xp / maxXp) * 100}%` }}>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{d.xp}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" /> Badges
            </h2>
            <p className="text-sm text-muted-foreground mb-4">{badges.filter((b) => b.earned).length} dari {badges.length} earned</p>
            <div className="grid grid-cols-4 gap-3">
              {badges.map((b) => (
                <div key={b.id} title={b.desc} className={`aspect-square rounded-xl flex items-center justify-center text-2xl border-2 transition-all ${b.earned ? "gradient-gold border-accent shadow-card" : "bg-muted border-border opacity-40 grayscale"}`}>
                  {b.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Challenges */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-black text-2xl flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" /> Challenge Rekomendasi
            </h2>
            <Link to="/challenges" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {recommended.map((c) => (
              <Link to="/practice" key={c.id} className="bg-card border-2 border-border rounded-2xl p-5 hover:border-primary hover:shadow-card transition-all hover:-translate-y-1 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{c.icon}</div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">+{c.xp} XP</span>
                </div>
                <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{c.level}</span> · <span>{c.time}</span> · <span>{c.difficulty}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
