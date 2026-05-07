import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { challenges } from "@/data/mockData";
import { Target, Clock, Zap, Filter } from "lucide-react";

const filters = ["All", "Basic", "Silver", "Gold"];
const diffColors: Record<string, string> = {
  Easy: "bg-success/15 text-success",
  Medium: "bg-accent/20 text-accent-foreground",
  Hard: "bg-destructive/15 text-destructive",
};

const Challenges = () => {
  const [active, setActive] = useState("All");
  const list = active === "All" ? challenges : challenges.filter((c) => c.level === active);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Target className="w-3.5 h-3.5" /> Daily Quests
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-2">Pilih <span className="text-gradient">Challenge</span></h1>
            <p className="text-muted-foreground">Latihan singkat berskala XP. Mulai dari yang kamu suka.</p>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1.5">
            <Filter className="w-4 h-4 ml-2 text-muted-foreground" />
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)} className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${active === f ? "gradient-purple text-primary-foreground shadow-card" : "hover:bg-secondary"}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c, i) => (
            <Link to="/practice" key={c.id} className="group relative bg-card border-2 border-border rounded-2xl p-6 hover:border-primary hover:shadow-elev hover:-translate-y-1 transition-all animate-scale-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl group-hover:scale-110 transition-transform">{c.icon}</div>
                <span className="px-2.5 py-1 rounded-full gradient-gold text-accent-foreground font-bold text-xs flex items-center gap-1">
                  <Zap className="w-3 h-3" /> +{c.xp}
                </span>
              </div>
              <h3 className="font-display font-black text-lg mb-3 group-hover:text-primary transition-colors">{c.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-secondary font-semibold">{c.level}</span>
                <span className={`text-xs px-2 py-1 rounded-md font-semibold ${diffColors[c.difficulty]}`}>{c.difficulty}</span>
                <span className="text-xs px-2 py-1 rounded-md bg-secondary font-semibold flex items-center gap-1"><Clock className="w-3 h-3" />{c.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;
