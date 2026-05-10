import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Mic, Trophy, Target, Brain, Zap, Users, Sparkles, ArrowRight, Play, Star, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendWhatsapp = () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Error", description: "Semua kolom harus diisi!", variant: "destructive" });
      return;
    }
    const phoneNumber = "6285321034886";
    const text = `Halo, nama saya ${formData.name}%0AEmail: ${formData.email}%0APesan: ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    toast({ title: "WhatsApp Terbuka!", description: "Pesan siap dikirim via WhatsApp." });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Nama</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Masukkan nama Anda"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="nama@email.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Isi Pesan</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tulis pesan Anda di sini..."
          required
        />
      </div>
      <button
        onClick={sendWhatsapp}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
      >
        <Send className="w-4 h-4" /> Kirim via WhatsApp
      </button>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full gradient-purple opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full gradient-gold opacity-20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Powered by AI Feedback</span>
            </div>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
              Belajar Public Speaking<br />
              <span className="text-gradient">Seperti Main Game</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Naik level dari <span className="font-bold text-foreground">Basic</span> →{" "}
              <span className="font-bold text-gradient-gold">Silver</span> →{" "}
              <span className="font-bold text-gradient-gold">Gold</span> lewat challenge interaktif,
              feedback AI real-time, dan progress yang terukur.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-hero text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform">
                <Play className="w-4 h-4" /> Mulai Quest Gratis
              </Link>
              <Link to="/levels" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-card border-2 border-border font-semibold hover:border-primary transition-all">
                Lihat Level <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 max-w-2xl mx-auto gap-4 md:gap-8">
              {[
                { num: "60+", label: "Challenges" },
                { num: "3", label: "Tier Levels" },
                { num: "AI", label: "Feedback Realtime" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-black text-gradient">{s.num}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIER LEVELS SHOWCASE */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-black mb-4">Tiga Tier, Satu Perjalanan</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Setiap tier dirancang untuk mengembangkan skill spesifik dengan tingkat tantangan yang naik bertahap.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { tier: "Basic", grad: "gradient-bronze", icon: "🥉", desc: "Fondasi: pernapasan, artikulasi, percaya diri.", skills: ["Voice Warm-Up", "Self Intro", "Eye Contact"] },
            { tier: "Silver", grad: "gradient-silver", icon: "🥈", desc: "Bangun struktur, persuasi, dan storytelling.", skills: ["Persuasive Pitch", "Storytelling", "Q&A Handling"] },
            { tier: "Gold", grad: "gradient-gold", icon: "🥇", desc: "Master keynote, debat, dan stage presence.", skills: ["Debate", "Keynote", "Crisis Comm"] },
          ].map((t, i) => (
            <div key={t.tier} className="relative group animate-fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="relative bg-card border-2 border-border rounded-3xl p-7 hover:border-primary/40 hover:shadow-elev transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl ${t.grad} flex items-center justify-center text-3xl mb-5 shadow-card`}>
                  {t.icon}
                </div>
                <h3 className="font-display font-black text-2xl mb-2">{t.tier} Tier</h3>
                <p className="text-sm text-muted-foreground mb-5">{t.desc}</p>
                <ul className="space-y-2">
                  {t.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-5xl font-black mb-4">Kenapa <span className="text-gradient">SpeakUpQuest</span>?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Belajar public speaking yang dulu membosankan, kini terasa seperti petualangan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "60+ Challenge Interaktif", desc: "Mulai dari tongue twister hingga TED-style keynote." },
              { icon: Brain, title: "AI Feedback Cerdas", desc: "Analisis struktur, klaritas, dan emosi dari naskah atau rekaman suaramu." },
              { icon: Trophy, title: "XP, Badge & Leaderboard", desc: "Naik level seperti game RPG. Kumpulkan badge dan saingi teman." },
              { icon: Zap, title: "Progress Terukur", desc: "Skill radar, weekly XP, dan streak harian — semua kelihatan." },
              { icon: Mic, title: "Latih Teks atau Suara", desc: "Pilih ketik naskah atau rekam suaramu. Keduanya didukung." },
              { icon: Users, title: "Komunitas Pejuang", desc: "Lihat ranking dan tier sesama pejuang public speaking." },
            ].map((f, i) => (
              <div key={f.title} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-card transition-all animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black mb-3">Hubungi Kami</h2>
              <p className="text-muted-foreground">Ada pertanyaan atau ingin memberikan masukan? Kirim pesan Anda!</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto rounded-3xl gradient-hero p-10 md:p-16 text-center shadow-elev overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-primary-foreground/20 blur-3xl" />
          <div className="relative">
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black text-primary-foreground mb-5">
              Siap Naik Level?
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-8">
              Gratis untuk dicoba. Mulai dari tier Basic, kumpulkan XP, dan buktikan kamu bisa jadi keynote speaker selanjutnya.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-card text-foreground font-bold shadow-elev hover:scale-105 transition-transform">
              Masuk Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
