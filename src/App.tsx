import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage, RegisterPage } from "@/pages/AuthPages";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Levels from "./pages/Levels";
import Challenges from "./pages/Challenges";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* AuthProvider di dalam BrowserRouter agar useNavigate bisa dipakai di dalam context */}
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<Index />} />
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected — wajib login */}
            <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/levels"      element={<ProtectedRoute><Levels /></ProtectedRoute>} />
            <Route path="/challenges"  element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
            <Route path="/practice"    element={<ProtectedRoute><Practice /></ProtectedRoute>} />
            <Route path="/progress"    element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
