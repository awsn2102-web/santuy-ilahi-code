import { Layout } from "@/components/Layout";
import { leaderboard } from "@/data/mockData";
import { Crown, Trophy, Medal } from "lucide-react";

const tierGrad: Record<string, string> = { Gold: "gradient-gold", Silver: "gradient-silver", Basic: "gradient-bronze" };

const Leaderboard = () => {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" /> Hall of Fame
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-2">Global <span className="text-gradient-gold">Leaderboard</span></h1>
          <p className="text-muted-foreground">Top performer minggu ini berdasarkan XP yang dikumpulkan.</p>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto mb-10 items-end">
          {[top3[1], top3[0], top3[2]].map((u, i) => {
            const place = i === 1 ? 1 : i === 0 ? 2 : 3;
            const heights = ["h-32", "h-44", "h-24"];
            const grads = ["gradient-silver", "gradient-gold", "gradient-bronze"];
            const icons = [<Medal key="m" className="w-6 h-6" />, <Crown key="c" className="w-7 h-7" />, <Medal key="m2" className="w-6 h-6" />];
            const heightIdx = i;
            return (
              <div key={u.rank} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${tierGrad[u.tier]} flex items-center justify-center text-2xl md:text-3xl font-display font-black text-primary-foreground shadow-elev mb-2 border-4 border-card`}>
                  {u.avatar}
                </div>
                <div className="font-display font-bold text-sm md:text-base text-center">{u.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{u.xp.toLocaleString()} XP</div>
                <div className={`w-full ${heights[heightIdx]} ${grads[heightIdx]} rounded-t-2xl flex flex-col items-center justify-start pt-3 text-primary-foreground shadow-card`}>
                  {icons[heightIdx]}
                  <div className="font-display font-black text-3xl mt-1">#{place}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/40 text-xs font-bold uppercase tracking-wider text-muted-foreground grid grid-cols-[40px_1fr_auto_auto] gap-4">
            <span>#</span>
            <span>Player</span>
            <span>Tier</span>
            <span>XP</span>
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
