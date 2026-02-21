import { useState } from "react";
import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import MotivationWidget from "@/components/MotivationWidget";
import AuthModal from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

const Index = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <HeroScene />

      {/* Top bar with motivation */}
      <div className="relative z-10 pt-6 px-6">
        <MotivationWidget />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">StudyFlow</h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-foreground"
          >
            Track. Learn.{" "}
            <span className="glow-text">Improve.</span>
            <br />
            Stay Consistent.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto"
          >
            Your personal learning companion — track progress, build streaks, and achieve mastery with focus-first design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openAuth("signup")}
              className="glass-button-primary text-lg px-10 py-4"
            >
              Create Account
            </button>
            <button
              onClick={() => openAuth("login")}
              className="glass-button-secondary text-lg px-10 py-4"
            >
              Login
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom ambient line */}
      <div className="relative z-10 h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(210 100% 60% / 0.3), hsl(260 60% 60% / 0.2), transparent)"
        }}
      />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default Index;
