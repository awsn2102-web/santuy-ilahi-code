import { Link } from "react-router-dom";
import { ArrowLeft, Code, Clock, Tag } from "lucide-react";

const tutorials = [
  { title: "Dasar HTML & CSS untuk Pemula", desc: "Pelajari fondasi web development dari nol. Cocok untuk yang baru mulai belajar coding.", tags: ["HTML", "CSS"], time: "15 menit" },
  { title: "JavaScript ES6: Arrow Function & Destructuring", desc: "Memahami fitur modern JavaScript yang sering dipakai di project nyata.", tags: ["JavaScript", "ES6"], time: "20 menit" },
  { title: "Belajar React dari Nol", desc: "Step by step membuat aplikasi pertama dengan React. Mulai dari JSX sampai state management.", tags: ["React", "Frontend"], time: "30 menit" },
  { title: "Tailwind CSS: Styling Cepat & Efisien", desc: "Cara pakai utility-first CSS framework untuk mempercepat development.", tags: ["CSS", "Tailwind"], time: "12 menit" },
  { title: "Git & GitHub untuk Mahasiswa", desc: "Panduan lengkap version control untuk kolaborasi project kampus.", tags: ["Git", "Tools"], time: "18 menit" },
  { title: "REST API dengan Node.js & Express", desc: "Membangun backend API sederhana untuk project full-stack.", tags: ["Node.js", "Backend"], time: "25 menit" },
];

const Tutorial = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <Code className="w-8 h-8" /> Tutorial Pemrograman
        </h1>
        <p className="text-primary-foreground/70 mt-2">Belajar coding ala anak kampus IT — santai tapi serius</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {tutorials.map((t, i) => (
          <div
            key={t.title}
            className="p-6 rounded-2xl border bg-card hover:blog-shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <h3 className="font-bold text-lg mb-2">{t.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.desc}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {t.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-primary/10 text-primary">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {t.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Tutorial;
