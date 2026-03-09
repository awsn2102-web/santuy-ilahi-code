import { Book, Code, Moon, MapPin, Heart, BookOpen, MessageCircle, Share2, Bookmark } from "lucide-react";

const BlogHeader = () => (
  <header className="blog-gradient-bg">
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-2xl font-bold text-primary-foreground backdrop-blur-sm">
          R
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary-foreground tracking-tight">Komunitas Mutiara</h2>
          <p className="text-primary-foreground/70 text-xs">Tech · Islam · Kehidupan</p>
        </div>
      </div>
    </div>
    <nav className="border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <ul className="flex gap-1 overflow-x-auto py-2 text-sm font-medium">
          {["Home", "Daftar Isi", "Doa-Doa", "Tutorial", "Teknologi", "Pengetahuan", "Pemrograman"].map((item) => (
            <li key={item}>
              <a href="#" className="px-4 py-2 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all block whitespace-nowrap">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </header>
);

const HeroSection = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
    <div className="container mx-auto px-4 relative">
      <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
        <p className="font-arabic text-lg text-muted-foreground mb-4">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="blog-gradient-text">Assalamu'alaikum,</span>
          <br />
          <span className="text-foreground">Saya Rafi 👋</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Suka belajar teknologi, pemrograman, tapi juga ingin tetap dekat dengan nilai-nilai islami dan cerita hidup yang <em className="text-foreground font-medium not-italic">real</em>?
        </p>
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: Code,
    title: "Tutorial Pemrograman",
    desc: "Tutorial dan catatan pemrograman ala anak kampus IT",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Moon,
    title: "Doa & Refleksi",
    desc: "Doa-doa mustajab dan refleksi sebagai seorang muslim",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MapPin,
    title: "Cerita Perjalanan",
    desc: "Cerita perjalanan dari Garut ke Bandung, lengkap dengan puisi dan pengalaman sehari-hari",
    color: "bg-primary/10 text-primary",
  },
];

const FeaturesSection = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-2">Apa yang Saya Bagikan?</h2>
      <p className="text-muted-foreground text-center mb-12">Di blog ini, kamu akan menemukan:</p>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group p-6 rounded-2xl border bg-background hover:blog-shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto blog-gradient-bg rounded-3xl p-8 md:p-12 text-center blog-shadow-lg">
        <BookOpen className="w-10 h-10 text-primary-foreground/80 mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Kalau kamu merasa butuh teman belajar yang santai tapi serius...
        </h2>
        <p className="text-primary-foreground/80 mb-8 leading-relaxed max-w-xl mx-auto">
          Ingin berkembang di era teknologi 4.0? Kamu ada di tempat yang tepat. Jangan buru-buru pergi — coba baca beberapa tulisan, tinggalkan komentar, atau share artikel yang menurutmu bermanfaat.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-semibold hover:bg-background/90 transition-colors text-sm">
            <Bookmark className="w-4 h-4" /> Bookmark Blog
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors text-sm">
            <Share2 className="w-4 h-4" /> Share Artikel
          </button>
        </div>
      </div>
    </div>
  </section>
);

const ClosingSection = () => (
  <section className="py-16 bg-card border-t">
    <div className="container mx-auto px-4 text-center max-w-2xl">
      <Heart className="w-8 h-8 text-accent mx-auto mb-4 animate-float" />
      <p className="text-lg text-muted-foreground leading-relaxed font-arabic italic mb-4">
        "Jadilah pelanggan tetap blog ini"
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Bookmark, follow, atau simpan alamat blog ini supaya kamu nggak ketinggalan update terbaru. Dari sini, semoga kita bisa saling menyapa, berbagi ilmu, dan menjalin silaturahmi lewat tulisan.
      </p>
    </div>
  </section>
);

const SocialLinks = () => {
  const socials = [
    { label: "Facebook", color: "bg-[hsl(220,70%,50%)]" },
    { label: "Twitter", color: "bg-[hsl(200,85%,55%)]" },
    { label: "YouTube", color: "bg-[hsl(0,80%,50%)]" },
    { label: "Instagram", color: "bg-[hsl(330,70%,55%)]" },
  ];
  return (
    <div className="flex justify-center gap-3 py-8">
      {socials.map((s) => (
        <a key={s.label} href="#" className={`${s.color} text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform`}>
          {s.label[0]}
        </a>
      ))}
    </div>
  );
};

const Footer = () => (
  <footer className="border-t py-8">
    <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
      <p>© 2025 Komunitas Mutiara — Blog by Rafi</p>
      <p className="mt-1">Garut → Bandung 🇮🇩</p>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <HeroSection />
      <FeaturesSection />
      <SocialLinks />
      <CTASection />
      <ClosingSection />
      <Footer />
    </div>
  );
};

export default Index;
