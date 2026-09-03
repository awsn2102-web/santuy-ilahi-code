import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const XP_PER_LEVEL = 500;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  challengesCompleted: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (name: string, avatar: string) => void;
  addXP: (amount: number, options?: { countChallenge?: boolean }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "speakup_auth";

// Simpan semua user (multi-account support)
const getUsers = (): Record<string, { password: string; user: User }> => {
  try {
    return JSON.parse(localStorage.getItem("speakup_users") || "{}");
  } catch {
    return {};
  }
};

const saveUsers = (users: Record<string, { password: string; user: User }>) => {
  localStorage.setItem("speakup_users", JSON.stringify(users));
};

const getLoggedInUser = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session saat app load
    const saved = getLoggedInUser();
    if (saved) setUser(saved);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const entry = users[email.toLowerCase()];

    if (!entry) return { success: false, error: "Email tidak ditemukan." };
    if (entry.password !== btoa(password)) return { success: false, error: "Password salah." };

    // Sync data terbaru dari storage
    const freshUser = entry.user;
    setUser(freshUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(freshUser));
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name.trim()) return { success: false, error: "Nama tidak boleh kosong." };
    if (!email.includes("@")) return { success: false, error: "Format email tidak valid." };
    if (password.length < 6) return { success: false, error: "Password minimal 6 karakter." };

    const users = getUsers();
    if (users[email.toLowerCase()]) return { success: false, error: "Email sudah terdaftar." };

    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.toLowerCase(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128`,
      xp: 0,
      level: 1,
      createdAt: new Date().toISOString(),
    };

    users[email.toLowerCase()] = { password: btoa(password), user: newUser };
    saveUsers(users);

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (name: string, avatar: string) => {
    if (!user) return;
    const updated = { ...user, name, avatar };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Update juga di daftar users
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].user = updated;
      saveUsers(users);
    }
  };

  const addXP = (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    const updated = { ...user, xp: newXP, level: newLevel };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const users = getUsers();
    if (users[user.email]) {
      users[user.email].user = updated;
      saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, addXP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
