import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Eye, EyeOff, Loader2, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// ── Shared background decoration ────────────────────────────────
const AuthBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
    {/* Grid */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }} />
    {/* Glow orbs */}
    <div style={{
      position: "absolute", top: "-20%", left: "-10%",
      width: "600px", height: "600px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
      filter: "blur(40px)",
    }} />
    <div style={{
      position: "absolute", bottom: "-20%", right: "-10%",
      width: "500px", height: "500px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
      filter: "blur(40px)",
    }} />
  </div>
);

// ── Input field component ────────────────────────────────────────
const InputField = ({
  label, type, value, onChange, placeholder, error, rightElement,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  rightElement?: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-foreground">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-secondary border text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
          error ? "border-red-500 focus:ring-red-500" : "border-border"
        } ${rightElement ? "pr-12" : ""}`}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
      )}
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// ══════════════════════════════════════════════════════
// LOGIN PAGE
// ══════════════════════════════════════════════════════
export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async () => {
    if (!email || !password) { setError("Email dan password wajib diisi."); return; }
    setLoading(true);
    setError("");
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.error || "Login gagal.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
      <AuthBackground />

      <div className="w-full max-w-md animate-fade-in-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow mb-4">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight">
            SpeakUp<span className="text-gradient">Quest</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Level up your public speaking</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab header */}
          <div className="grid grid-cols-2 border-b border-border">
            <div className="flex items-center justify-center gap-2 py-4 border-b-2 border-primary text-primary font-semibold text-sm">
              <LogIn className="w-4 h-4" /> Masuk
            </div>
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 py-4 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Daftar
            </Link>
          </div>

          <div className="p-6 space-y-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="kamu@email.com"
            />

            <InputField
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder="Masukkan password"
              rightElement={
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-hero text-primary-foreground font-semibold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
              ) : (
                <>Masuk <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 SpeakUpQuest — Gamified Public Speaking
        </p>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// REGISTER PAGE
// ══════════════════════════════════════════════════════
export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())          e.name     = "Nama wajib diisi.";
    if (!email.includes("@"))  e.email    = "Format email tidak valid.";
    if (password.length < 6)   e.password = "Password minimal 6 karakter.";
    if (password !== confirm)  e.confirm  = "Password tidak cocok.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    setGlobalError("");
    const res = await register(name, email, password);
    setLoading(false);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setGlobalError(res.error || "Registrasi gagal.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
      <AuthBackground />

      <div className="w-full max-w-md animate-fade-in-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow mb-4">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight">
            SpeakUp<span className="text-gradient">Quest</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Mulai perjalanan public speaking-mu</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab header */}
          <div className="grid grid-cols-2 border-b border-border">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 py-4 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <LogIn className="w-4 h-4" /> Masuk
            </Link>
            <div className="flex items-center justify-center gap-2 py-4 border-b-2 border-primary text-primary font-semibold text-sm">
              <UserPlus className="w-4 h-4" /> Daftar
            </div>
          </div>

          <div className="p-6 space-y-4">
            <InputField
              label="Nama Lengkap"
              type="text"
              value={name}
              onChange={setName}
              placeholder="Nama kamu"
              error={errors.name}
            />

            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="kamu@email.com"
              error={errors.email}
            />

            <InputField
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder="Minimal 6 karakter"
              error={errors.password}
              rightElement={
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <InputField
              label="Konfirmasi Password"
              type={showPass ? "text" : "password"}
              value={confirm}
              onChange={setConfirm}
              placeholder="Ulangi password"
              error={errors.confirm}
            />

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div>
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all"
                      style={{
                        background: password.length >= i * 3
                          ? i <= 1 ? "#ef4444"
                          : i <= 2 ? "#f97316"
                          : i <= 3 ? "#eab308"
                          : "#22c55e"
                          : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {password.length < 6 ? "Terlalu pendek" : password.length < 9 ? "Cukup" : password.length < 12 ? "Kuat" : "Sangat kuat"}
                </p>
              </div>
            )}

            {globalError && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {globalError}
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-hero text-primary-foreground font-semibold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Mendaftarkan...</>
              ) : (
                <>Buat Akun <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 SpeakUpQuest — Gamified Public Speaking
        </p>
      </div>
    </div>
  );
};
