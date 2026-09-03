export type Tier = "Basic" | "Silver" | "Gold";

export const userStats = {
  name: "Alex Morgan",
  level: 7,
  xp: 2450,
  xpToNext: 3000,
  tier: "Silver" as Tier,
  streak: 12,
  challengesCompleted: 24,
  totalChallenges: 60,
  hoursLearned: 18,
  rank: 47,
  badges: 9,
};

export const levels = [
  {
    id: 1,
    tier: "Basic" as Tier,
    title: "Voice Warm-Up",
    desc: "Latih artikulasi, intonasi, dan kepercayaan diri dasar.",
    skills: ["Pernapasan", "Artikulasi", "Eye Contact"],
    challenges: 12,
    completed: 12,
    locked: false,
  },
  {
    id: 2,
    tier: "Basic" as Tier,
    title: "Self Introduction",
    desc: "Perkenalkan diri dengan struktur yang menarik.",
    skills: ["Storytelling", "Hook", "Closing"],
    challenges: 10,
    completed: 10,
    locked: false,
  },
  {
    id: 3,
    tier: "Silver" as Tier,
    title: "Persuasive Pitch",
    desc: "Susun argumen yang meyakinkan audiens.",
    skills: ["Logika", "Emosi", "Call-to-Action"],
    challenges: 12,
    completed: 7,
    locked: false,
  },
  {
    id: 4,
    tier: "Silver" as Tier,
    title: "Storytelling Master",
    desc: "Bawakan cerita yang memikat dari awal hingga akhir.",
    skills: ["Plot", "Karakter", "Pacing"],
    challenges: 12,
    completed: 0,
    locked: false,
  },
  {
    id: 5,
    tier: "Gold" as Tier,
    title: "Debate Champion",
    desc: "Berdebat dengan logika tajam dan retorika kuat.",
    skills: ["Rebuttal", "Reasoning", "Confidence"],
    challenges: 14,
    completed: 0,
    locked: true,
  },
  {
    id: 6,
    tier: "Gold" as Tier,
    title: "Keynote Speaker",
    desc: "Sampaikan keynote layaknya TED Talk profesional.",
    skills: ["Stage Presence", "Big Idea", "Impact"],
    challenges: 14,
    completed: 0,
    locked: true,
  },
];

export const challenges = [
  { id: 1, title: "Random Quiz Rush", level: "Basic", xp: 10, time: "5 min", difficulty: "Easy", icon: "🎲", isMiniGame: true },
  { id: 2, title: "Tongue Twister Sprint", level: "Basic", xp: 30, time: "2 min", difficulty: "Easy", icon: "👅" },
  { id: 3, title: "Jelaskan Objek Random", level: "Basic", xp: 60, time: "2 min", difficulty: "Easy", icon: "🎲" },
  { id: 4, title: "Pitch Produk Imajiner", level: "Silver", xp: 120, time: "3 min", difficulty: "Medium", icon: "🚀" },
  { id: 5, title: "Bercerita dari 3 Kata", level: "Silver", xp: 100, time: "3 min", difficulty: "Medium", icon: "📖" },
  { id: 6, title: "Convince in 90 Seconds", level: "Silver", xp: 150, time: "1.5 min", difficulty: "Medium", icon: "💡" },
  { id: 7, title: "Impromptu Debate", level: "Gold", xp: 250, time: "5 min", difficulty: "Hard", icon: "⚖️" },
  { id: 8, title: "TED-Style Keynote", level: "Gold", xp: 300, time: "6 min", difficulty: "Hard", icon: "🎤" },
  { id: 9, title: "Crisis Press Conference", level: "Gold", xp: 280, time: "5 min", difficulty: "Hard", icon: "📰" },
];

export const leaderboard = [
  { rank: 1, name: "Maya Putri", xp: 12480, tier: "Gold", avatar: "M" },
  { rank: 2, name: "Rio Saputra", xp: 11250, tier: "Gold", avatar: "R" },
  { rank: 3, name: "Nadia Fitri", xp: 9870, tier: "Gold", avatar: "N" },
  { rank: 4, name: "Bima Aditya", xp: 8540, tier: "Silver", avatar: "B" },
  { rank: 5, name: "Citra Dewi", xp: 7920, tier: "Silver", avatar: "C" },
  { rank: 6, name: "Dani Pratama", xp: 6810, tier: "Silver", avatar: "D" },
  { rank: 7, name: "Eva Lestari", xp: 5940, tier: "Silver", avatar: "E" },
  { rank: 47, name: "Alex Morgan (You)", xp: 2450, tier: "Silver", avatar: "A", isYou: true },
];

export const badges = [
  { id: 1, name: "First Words", icon: "🎯", earned: true, desc: "Selesaikan challenge pertama" },
  { id: 2, name: "Streak 7", icon: "🔥", earned: true, desc: "7 hari berturut-turut latihan" },
  { id: 3, name: "Streak 30", icon: "💎", earned: false, desc: "30 hari berturut-turut" },
  { id: 4, name: "Storyteller", icon: "📚", earned: true, desc: "Selesaikan 5 storytelling" },
  { id: 5, name: "Debater", icon: "⚔️", earned: false, desc: "Menangkan 3 debat" },
  { id: 6, name: "Keynote Hero", icon: "🌟", earned: false, desc: "Bawakan keynote 6 menit" },
  { id: 7, name: "Eloquent", icon: "💬", earned: true, desc: "Skor bahasa 90+" },
  { id: 8, name: "Confident Voice", icon: "🎙️", earned: true, desc: "Skor confidence 85+" },
];

export const skillRadar = [
  { skill: "Clarity", value: 78 },
  { skill: "Confidence", value: 82 },
  { skill: "Pace", value: 65 },
  { skill: "Engagement", value: 71 },
  { skill: "Structure", value: 88 },
  { skill: "Vocabulary", value: 74 },
];

export const quizBank = [
  // Public speaking
  { q: "Apa teknik pernapasan yang disarankan sebelum berbicara di depan umum?", options: ["Napas dada cepat", "Napas diafragma", "Menahan napas", "Napas pendek"], answer: 1 },
  { q: "Berapa detik ideal untuk membuat hook/pembuka yang menarik?", options: ["3-5 detik", "30 detik", "2 menit", "60 detik"], answer: 0 },
  { q: "Apa yang dimaksud dengan 'eye contact triangle'?", options: ["Melihat 3 titik audiens", "Menutup mata 3 kali", "Berdiri segitiga", "3 jenis tatapan marah"], answer: 0 },
  { q: "Struktur pidato yang baik adalah...", options: ["Isi saja", "Pembuka - Isi - Penutup", "Penutup dulu", "Bebas tanpa struktur"], answer: 1 },
  { q: "Apa itu 'filler words'?", options: ["Kata penting", "Kata pengisi seperti 'eee', 'um'", "Kata bahasa asing", "Istilah teknis"], answer: 1 },
  { q: "Kecepatan bicara ideal untuk pidato adalah...", options: ["200+ kata/menit", "50 kata/menit", "120-150 kata/menit", "Secepat mungkin"], answer: 2 },
  { q: "Apa fungsi 'pause' dalam public speaking?", options: ["Lupa materi", "Memberi penekanan & waktu audiens mencerna", "Membuang waktu", "Tanda gugup"], answer: 1 },
  { q: "Gesture tangan saat berbicara sebaiknya...", options: ["Dimasukkan saku", "Natural dan mendukung pesan", "Berlebihan terus", "Diam kaku"], answer: 1 },
  { q: "Apa itu 'impromptu speaking'?", options: ["Pidato terjadwal", "Bicara spontan tanpa persiapan", "Membaca naskah", "Pidato tertulis"], answer: 1 },
  { q: "Cara mengatasi demam panggung yang efektif adalah...", options: ["Menghindar tampil", "Latihan & visualisasi positif", "Minum obat tidur", "Tidak latihan"], answer: 1 },
  // Pengetahuan umum
  { q: "Ibukota Indonesia adalah...", options: ["Bandung", "Jakarta", "Surabaya", "Medan"], answer: 1 },
  { q: "Planet terdekat dari matahari adalah...", options: ["Venus", "Bumi", "Merkurius", "Mars"], answer: 2 },
  { q: "HTML singkatan dari...", options: ["HyperText Markup Language", "High Text Machine Language", "Hyperlink Text Mode Language", "Home Tool Markup Language"], answer: 0 },
  { q: "Benua terbesar di dunia adalah...", options: ["Afrika", "Eropa", "Asia", "Amerika"], answer: 2 },
  { q: "Siapa penemu lampu pijar?", options: ["Newton", "Edison", "Einstein", "Tesla"], answer: 1 },
  { q: "Bahasa pemrograman yang berjalan di browser adalah...", options: ["Python", "C++", "JavaScript", "Java"], answer: 2 },
  { q: "1 GB sama dengan berapa MB?", options: ["100 MB", "512 MB", "1024 MB", "2048 MB"], answer: 2 },
  { q: "Negara dengan populasi terbanyak di dunia (2024) adalah...", options: ["China", "Amerika", "Indonesia", "India"], answer: 3 },
  { q: "Gunung tertinggi di dunia adalah...", options: ["K2", "Everest", "Kilimanjaro", "Fuji"], answer: 1 },
  { q: "CSS digunakan untuk...", options: ["Database", "Styling tampilan web", "Server", "Sistem operasi"], answer: 1 },
  // Hitungan cepat
  { q: "15 + 27 = ?", options: ["32", "42", "52", "41"], answer: 1 },
  { q: "8 × 7 = ?", options: ["54", "56", "48", "64"], answer: 1 },
  { q: "100 - 37 = ?", options: ["63", "73", "67", "53"], answer: 0 },
  { q: "144 ÷ 12 = ?", options: ["14", "11", "12", "16"], answer: 2 },
  { q: "25% dari 80 = ?", options: ["15", "25", "20", "30"], answer: 2 },
  { q: "9 × 9 = ?", options: ["72", "81", "99", "79"], answer: 1 },
  { q: "50 + 75 - 25 = ?", options: ["100", "125", "90", "110"], answer: 0 },
  { q: "3² + 4² = ?", options: ["25", "49", "12", "7"], answer: 0 },
  { q: "200 ÷ 4 = ?", options: ["40", "60", "50", "45"], answer: 2 },
  { q: "13 + 19 = ?", options: ["31", "33", "32", "30"], answer: 2 },
];

export const weeklyXP = [
  { day: "Sen", xp: 120 },
  { day: "Sel", xp: 240 },
  { day: "Rab", xp: 180 },
  { day: "Kam", xp: 320 },
  { day: "Jum", xp: 280 },
  { day: "Sab", xp: 410 },
  { day: "Min", xp: 190 },
];
