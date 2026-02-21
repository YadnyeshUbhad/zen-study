import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Playlists from "./pages/Playlists";
import PDFs from "./pages/PDFs";
import Quizzes from "./pages/Quizzes";
import CodingProgress from "./pages/CodingProgress";
import Notes from "./pages/Notes";
import FocusMode from "./pages/FocusMode";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/pdfs" element={<PDFs />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/coding" element={<CodingProgress />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/focus" element={<FocusMode />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
