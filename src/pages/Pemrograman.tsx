import { Link } from "react-router-dom";
import { ArrowLeft, Code2, Terminal, Zap } from "lucide-react";

const tips = [
  { title: "Clean Code: Prinsip Dasar yang Wajib Kamu Tahu", desc: "Menulis kode yang bersih, readable, dan maintainable. Bukan cuma jalan, tapi elegan.", icon: "✨", level: "Intermediate" },
  { title: "Debugging Like a Pro", desc: "Teknik debugging yang efektif: console.log strategis, breakpoints, dan rubber duck debugging.", icon: "🐛", level: "Beginner" },
  { title: "Design Pattern: Singleton & Observer", desc: "Dua design pattern yang paling sering dipakai di project nyata.", icon: "🏗️", level: "Advanced" },
  { title: "Terminal Commands yang Wajib Dihafal", desc: "Perintah terminal Linux/Mac yang bikin kamu 10x lebih produktif.", icon: "💻", level: "Beginner" },
  { title: "Cara Membaca Dokumentasi dengan Efektif", desc: "Skill yang sering diremehkan tapi paling penting untuk developer.", icon: "📖", level: "Beginner" },
  { title: "Refactoring: Kapan dan Bagaimana", desc: "Panduan kapan harus refactor dan teknik refactoring yang aman.", icon: "🔧", level: "Intermediate" },
  { title: "Testing 101: Unit Test dengan Jest", desc: "Mulai menulis test untuk kode kamu. Investasi jangka panjang.", icon: "🧪", level: "Intermediate" },
  { title: "Data Structure yang Sering Muncul di Interview", desc: "Array, LinkedList, Stack, Queue, dan cara implementasinya.", icon: "📊", level: "Advanced" },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-accent/10 text-accent",
  Advanced: "bg-destructive/10 text-destructive",
};

const Pemrograman = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <Code2 className="w-8 h-8" /> Pemrograman
        </h1>
        <p className="text-primary-foreground/70 mt-2">Tips, trik, dan best practices dunia programming</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
        {tips.map((t, i) => (
          <div
            key={t.title}
            className="p-5 rounded-2xl border bg-card hover:blog-shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{t.icon}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${levelColor[t.level]}`}>{t.level}</span>
            </div>
            <h3 className="font-bold text-sm mb-2 leading-snug">{t.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Pemrograman;
