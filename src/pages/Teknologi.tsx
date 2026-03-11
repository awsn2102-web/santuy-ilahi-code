import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, TrendingUp, Calendar } from "lucide-react";

const articles = [
  { title: "AI di 2025: Apa yang Berubah?", desc: "Perkembangan AI yang mengubah cara kita bekerja, belajar, dan berinteraksi.", date: "10 Mar 2025", category: "Artificial Intelligence" },
  { title: "Cloud Computing untuk Pemula", desc: "Memahami dasar-dasar cloud computing dan kenapa penting untuk developer masa kini.", date: "5 Mar 2025", category: "Cloud" },
  { title: "5G dan Internet of Things", desc: "Bagaimana 5G membuka peluang baru untuk IoT di Indonesia.", date: "28 Feb 2025", category: "IoT" },
  { title: "Keamanan Siber: Tips untuk Mahasiswa", desc: "Cara melindungi data pribadi dan akun online dari ancaman cyber.", date: "20 Feb 2025", category: "Security" },
  { title: "Blockchain Bukan Cuma Crypto", desc: "Penggunaan blockchain di luar cryptocurrency yang mungkin belum kamu tahu.", date: "15 Feb 2025", category: "Blockchain" },
  { title: "Low-Code Platform: Masa Depan Development?", desc: "Apakah low-code akan menggantikan developer? Ini analisisnya.", date: "10 Feb 2025", category: "Trends" },
];

const Teknologi = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <Cpu className="w-8 h-8" /> Teknologi
        </h1>
        <p className="text-primary-foreground/70 mt-2">Update terkini dunia teknologi dan digital</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {articles.map((a, i) => (
          <div
            key={a.title}
            className="p-6 rounded-2xl border bg-card hover:blog-shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-accent/10 text-accent">{a.category}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" /> {a.date}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2">{a.title}</h3>
            <p className="text-muted-foreground text-sm">{a.desc}</p>
            <p className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1">
              Baca selengkapnya <TrendingUp className="w-3 h-3" />
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Teknologi;
