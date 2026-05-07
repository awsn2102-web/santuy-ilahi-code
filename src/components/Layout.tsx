import { Link, NavLink, useLocation } from "react-router-dom";
import { Mic, LayoutDashboard, Trophy, Target, TrendingUp, Crown, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/levels", label: "Levels", icon: Trophy },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/practice", label: "Practice", icon: Mic },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/leaderboard", label: "Leaderboard", icon: Crown },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-lg tracking-tight">SpeakUp<span className="text-gradient">Quest</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Public Speaking · Gamified</div>
            </div>
          </Link>

          {!isLanding && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "gradient-purple text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {isLanding ? (
              <Link to="/dashboard" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-hero text-primary-foreground font-semibold text-sm shadow-glow hover:scale-105 transition-transform">
                Start Quest →
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                <div className="w-7 h-7 rounded-full gradient-gold flex items-center justify-center text-xs font-bold text-accent-foreground">A</div>
                <div className="text-xs">
                  <div className="font-bold leading-none">Alex</div>
                  <div className="text-muted-foreground">2,450 XP</div>
                </div>
              </div>
            )}
            {!isLanding && (
              <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-secondary" aria-label="Menu">
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {!isLanding && open && (
          <nav className="lg:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-3 grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? "gradient-purple text-primary-foreground" : "hover:bg-secondary"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-border mt-20 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-display font-bold">SpeakUpQuest</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SpeakUpQuest — Level up your public speaking, one quest at a time.</p>
        </div>
      </footer>
    </div>
  );
};
