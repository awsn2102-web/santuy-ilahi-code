import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Lightbulb, Calendar } from "lucide-react";

const articles = [
  { title: "Cara Efektif Belajar di Era Digital", desc: "Teknik belajar yang terbukti efektif: spaced repetition, active recall, dan Feynman technique.", date: "8 Mar 2025", emoji: "📚" },
  { title: "Time Management untuk Mahasiswa", desc: "Cara mengatur waktu antara kuliah, organisasi, dan kehidupan pribadi.", date: "3 Mar 2025", emoji: "⏰" },
  { title: "Growth Mindset vs Fixed Mindset", desc: "Memahami pola pikir yang menentukan kesuksesan kamu di masa depan.", date: "25 Feb 2025", emoji: "🧠" },
  { title: "Pentingnya Literasi Keuangan Sejak Muda", desc: "Dasar-dasar mengelola keuangan yang seharusnya diajarkan di sekolah.", date: "18 Feb 2025", emoji: "💰" },
  { title: "Public Speaking: Dari Takut Jadi Percaya Diri", desc: "Tips mengatasi grogi dan tampil percaya diri saat presentasi.", date: "12 Feb 2025", emoji: "🎤" },
  { title: "Menulis sebagai Terapi", desc: "Bagaimana journaling bisa membantu kesehatan mental dan produktivitas.", date: "5 Feb 2025", emoji: "✍️" },
];

const Pengetahuan = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <Brain className="w-8 h-8" /> Pengetahuan
        </h1>
        <p className="text-primary-foreground/70 mt-2">Wawasan dan life skills untuk generasi muda</p>
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
            <div className="flex items-start gap-4">
              <span className="text-3xl">{a.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{a.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {a.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Pengetahuan;
