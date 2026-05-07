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
  { id: 1, title: "60-Detik Self Intro", level: "Basic", xp: 50, time: "1 min", difficulty: "Easy", icon: "👋" },
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

export const weeklyXP = [
  { day: "Sen", xp: 120 },
  { day: "Sel", xp: 240 },
  { day: "Rab", xp: 180 },
  { day: "Kam", xp: 320 },
  { day: "Jum", xp: 280 },
  { day: "Sab", xp: 410 },
  { day: "Min", xp: 190 },
];
