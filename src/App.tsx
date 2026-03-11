import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DaftarIsi from "./pages/DaftarIsi";
import DoaDoa from "./pages/DoaDoa";
import Tutorial from "./pages/Tutorial";
import Teknologi from "./pages/Teknologi";
import Pengetahuan from "./pages/Pengetahuan";
import Pemrograman from "./pages/Pemrograman";
import CeritaPerjalanan from "./pages/CeritaPerjalanan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/daftar-isi" element={<DaftarIsi />} />
          <Route path="/doa-doa" element={<DoaDoa />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/teknologi" element={<Teknologi />} />
          <Route path="/pengetahuan" element={<Pengetahuan />} />
          <Route path="/pemrograman" element={<Pemrograman />} />
          <Route path="/cerita-perjalanan" element={<CeritaPerjalanan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
