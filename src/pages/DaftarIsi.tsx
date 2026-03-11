import { Link } from "react-router-dom";
import { ArrowLeft, Book, Code, Moon, MapPin, Cpu, Brain } from "lucide-react";

const categories = [
  { title: "Tutorial Pemrograman", desc: "Belajar coding dari dasar hingga mahir", icon: Code, path: "/tutorial", count: 12 },
  { title: "Doa-Doa", desc: "Kumpulan doa harian dan mustajab", icon: Moon, path: "/doa-doa", count: 8 },
  { title: "Cerita Perjalanan", desc: "Kisah dari Garut ke Bandung", icon: MapPin, path: "/cerita-perjalanan", count: 6 },
  { title: "Teknologi", desc: "Perkembangan teknologi terkini", icon: Cpu, path: "/teknologi", count: 10 },
  { title: "Pengetahuan", desc: "Wawasan umum dan life skills", icon: Brain, path: "/pengetahuan", count: 7 },
  { title: "Pemrograman", desc: "Tips & trik dunia programming", icon: Code, path: "/pemrograman", count: 9 },
];

const DaftarIsi = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <Book className="w-8 h-8" /> Daftar Isi
        </h1>
        <p className="text-primary-foreground/70 mt-2">Jelajahi semua kategori tulisan di blog ini</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, i) => (
          <Link
            key={cat.title}
            to={cat.path}
            className="group p-6 rounded-2xl border bg-card hover:blog-shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <cat.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{cat.desc}</p>
            <span className="text-xs font-semibold text-primary">{cat.count} artikel →</span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default DaftarIsi;
