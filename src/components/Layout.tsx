import { Link, NavLink, useLocation } from "react-router-dom";
import { Mic, LayoutDashboard, Trophy, Target, TrendingUp, Crown, Sparkles, Menu, X, Camera } from "lucide-react";
import { useState, useRef } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/levels", label: "Levels", icon: Trophy },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/practice", label: "Practice", icon: Mic },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/leaderboard", label: "Leaderboard", icon: Crown },
];

const ProfileModal = ({ isOpen, onClose, userName, userAvatar, onUpdate }: {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar: string;
  onUpdate: (name: string, avatar: string) => void;
}) => {
  const [name, setName] = useState(userName);
  const [avatarPreview, setAvatarPreview] = useState(userAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(name, avatarPreview);
    onClose();
  };

  if (!isOpen) return null;

  return (
    /* Overlay — z-[9999] biar selalu di atas navbar */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal card */}
      <div
        className="bg-card border border-border rounded-3xl w-full max-w-sm shadow-2xl animate-fade-in-up"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl font-bold">Profil Saya</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 mb-3">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-primary shadow-lg"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-hero flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Camera className="w-4 h-4 text-primary-foreground" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <span className="text-xs text-muted-foreground">Klik ikon kamera untuk ganti foto</span>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-5" />

          {/* Name input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-foreground">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="Masukkan nama"
            />
          </div>

          {/* XP info (read-only) */}
          <div className="mb-6 px-4 py-3 rounded-xl bg-secondary/60 border border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total XP</span>
            <span className="font-display font-black text-sm text-primary">2,450 XP</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-secondary hover:bg-border transition-colors text-sm font-medium"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-xl gradient-hero text-primary-foreground font-semibold text-sm shadow-glow hover:scale-105 transition-transform"
            >
              Simpan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "Alex");
  const [userAvatar, setUserAvatar] = useState(() => localStorage.getItem("userAvatar") || "https://ui-avatars.com/api/?name=Alex&background=random");
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const handleProfileUpdate = (name: string, avatar: string) => {
    setUserName(name);
    setUserAvatar(avatar);
    localStorage.setItem("userName", name);
    localStorage.setItem("userAvatar", avatar);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ProfileModal di luar header — z-[9999] tidak terganggu sticky navbar */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        userName={userName}
        userAvatar={userAvatar}
        onUpdate={handleProfileUpdate}
      />

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
              <button
                onClick={() => setProfileOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-border transition-colors"
              >
                <img src={userAvatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
                <div className="text-xs text-left">
                  <div className="font-bold leading-none">{userName}</div>
                  <div className="text-muted-foreground">2,450 XP</div>
                </div>
              </button>
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
