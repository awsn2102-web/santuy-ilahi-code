import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Mic, LayoutDashboard, Trophy, Target, TrendingUp, Crown, Sparkles, Menu, X, Camera, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/levels", label: "Levels", icon: Trophy },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/practice", label: "Practice", icon: Mic },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/leaderboard", label: "Leaderboard", icon: Crown },
];

const ProfileModal = ({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setName(user?.name || "");
      setAvatarPreview(user?.avatar || "");
    }
  }, [isOpen, user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Kompres gambar sebelum simpan
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 256;
        const scale = Math.min(MAX / img.width, MAX / img.height, 1);
        canvas.width  = img.width  * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        setAvatarPreview(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(name, avatarPreview);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
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
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>
            <span className="text-xs text-muted-foreground">Klik ikon kamera untuk ganti foto</span>
          </div>

          <div className="border-t border-border mb-5" />

          {/* Name input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="Masukkan nama"
            />
          </div>

          {/* XP info — realtime dari useAuth */}
          <div className="mb-6 px-4 py-3 rounded-xl bg-secondary/60 border border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total XP</span>
            <span className="font-display font-black text-sm text-primary">{user?.xp?.toLocaleString() || 0} XP</span>
          </div>

          {/* Email (read-only) */}
          <div className="mb-6 px-4 py-3 rounded-xl bg-secondary/60 border border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{user?.email}</span>
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
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-lg tracking-tight">SpeakUp<span className="text-gradient">Quest</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Public Speaking · Gamified</div>
            </div>
          </Link>

          {/* Nav desktop */}
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

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isLanding ? (
              <Link to="/dashboard" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-hero text-primary-foreground font-semibold text-sm shadow-glow hover:scale-105 transition-transform">
                Start Quest →
              </Link>
            ) : (
              <>
                {/* Profile button */}
                <button
                  onClick={() => setProfileOpen(true)}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-border transition-colors"
                >
                  <img src={user?.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
                  <div className="text-xs text-left">
                    <div className="font-bold leading-none">{user?.name}</div>
                    <div className="text-muted-foreground">{user?.xp?.toLocaleString() || 0} XP</div>
                  </div>
                </button>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors text-sm"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs font-medium">Keluar</span>
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            {!isLanding && (
              <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-secondary" aria-label="Menu">
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav */}
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
              {/* Logout mobile */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
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
