import { Link } from "react-router-dom";
import { ArrowLeft, Moon, Star } from "lucide-react";

const duas = [
  { title: "Doa Sebelum Tidur", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", meaning: "Dengan nama-Mu ya Allah, aku mati dan aku hidup.", benefit: "Melindungi dari gangguan saat tidur" },
  { title: "Doa Bangun Tidur", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", meaning: "Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dikembalikan.", benefit: "Memulai hari dengan rasa syukur" },
  { title: "Doa Masuk Masjid", arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", meaning: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.", benefit: "Mendapatkan rahmat saat beribadah" },
  { title: "Doa Sebelum Makan", arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ", meaning: "Dengan nama Allah dan dengan berkah Allah.", benefit: "Makanan menjadi berkah" },
  { title: "Doa Keluar Rumah", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ", meaning: "Dengan nama Allah, aku bertawakal kepada Allah, tiada daya dan kekuatan kecuali dengan pertolongan Allah.", benefit: "Dijaga dan dilindungi selama perjalanan" },
  { title: "Doa Ketika Hujan Turun", arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا", meaning: "Ya Allah, turunkanlah hujan yang bermanfaat.", benefit: "Hujan menjadi berkah, bukan musibah" },
  { title: "Doa Memohon Ilmu", arabic: "رَبِّ زِدْنِي عِلْمًا", meaning: "Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan.", benefit: "Dimudahkan dalam mencari ilmu" },
  { title: "Doa Istikharah", arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ", meaning: "Ya Allah, aku memohon pilihan yang terbaik kepada-Mu dengan ilmu-Mu, dan aku memohon kekuatan dengan kekuatan-Mu.", benefit: "Mendapat petunjuk dalam mengambil keputusan" },
];

const DoaDoa = () => (
  <div className="min-h-screen bg-background">
    <div className="blog-gradient-bg py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground flex items-center gap-3">
          <Moon className="w-8 h-8" /> Doa-Doa Harian
        </h1>
        <p className="text-primary-foreground/70 mt-2">Kumpulan doa sehari-hari untuk diamalkan</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {duas.map((dua, i) => (
          <div
            key={dua.title}
            className="p-6 rounded-2xl border bg-card animate-fade-in-up hover:blog-shadow transition-all"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-3 mb-4">
              <Star className="w-5 h-5 text-accent mt-1 shrink-0" />
              <h3 className="font-bold text-lg">{dua.title}</h3>
            </div>
            <p className="font-arabic text-2xl text-right leading-loose text-foreground mb-3" dir="rtl">{dua.arabic}</p>
            <p className="text-muted-foreground italic mb-2">"{dua.meaning}"</p>
            <p className="text-sm text-primary font-medium">✦ {dua.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DoaDoa;
