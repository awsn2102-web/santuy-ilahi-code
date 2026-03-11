import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Heart, Calendar } from "lucide-react";

const stories = [
  { title: "Hari Pertama di Bandung", desc: "Dari terminal Garut, naik angkot pertama kali ke Bandung. Rasanya campur aduk antara excited dan kangen rumah.", date: "Agustus 2023", location: "Bandung", mood: "🌅" },
  { title: "Rindu Garut di Malam Minggu", desc: "Malam minggu di kosan, teman-teman pada pulang. Cuma aku yang duduk di teras sambil dengar hujan. Garut terasa jauh.", date: "September 2023", location: "Bandung", mood: "🌧️" },
  { title: "Nasi Liwet Pinggir Jalan", desc: "Nemu warung nasi liwet di jalan Dipatiukur. Rasanya mirip masakan Mamah. Hampir nangis di warung.", date: "Oktober 2023", location: "Dipatiukur", mood: "🍚" },
  { title: "Subuh di Masjid Salman ITB", desc: "Shalat subuh berjamaah, lalu duduk di taman sambil baca Quran. Bandung dingin, tapi hati hangat.", date: "November 2023", location: "Masjid Salman", mood: "🕌" },
  { title: "Pulang Kampung Setelah 3 Bulan", desc: "Akhirnya pulang ke Garut. Dipeluk Mamah di depan pintu. Semua capek hilang seketika.", date: "Desember 2023", location: "Garut", mood: "🏡" },
  { title: "Puisi: Jalan Pulang", desc: "\"Garut — kau bukan sekadar kota kelahiran. Kau adalah aroma tanah setelah hujan, suara adzan maghrib dari musholla kecil, dan senyum Mamah yang selalu bilang: hati-hati di jalan, Nak.\"", date: "Januari 2024", location: "Garut ↔ Bandung", mood: "📝" },
];

const CeritaPerjalanan = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <MapPin className="w-8 h-8" /> Cerita Perjalanan
        </h1>
        <p className="text-primary-foreground/70 mt-2">Kisah dari Garut ke Bandung — puisi, cerita, dan kenangan</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-2 border-primary/20 ml-4 space-y-8">
          {stories.map((s, i) => (
            <div
              key={s.title}
              className="relative pl-8 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                {s.mood}
              </div>
              <div className="p-5 rounded-2xl border bg-card hover:blog-shadow transition-all">
                <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {s.date}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CeritaPerjalanan;
