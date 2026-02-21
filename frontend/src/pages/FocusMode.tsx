import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Target, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FocusMode = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [goal, setGoal] = useState("Complete React Hooks lesson");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = ((25 * 60 - seconds) / (25 * 60)) * 100;
  const circumference = 2 * Math.PI * 120;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(var(--glow-blue) / 0.3), transparent 70%)" }} />
      </div>

      {/* Exit button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 right-6 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
      >
        <Minimize2 className="h-4 w-4" /> Exit Focus Mode
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        {/* Goal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Target className="h-4 w-4 text-primary" />
          <p className="text-sm text-muted-foreground">{goal}</p>
        </motion.div>

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mx-auto mb-10">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="120" fill="none" stroke="hsl(var(--glass-border))" strokeWidth="4" />
            <circle
              cx="130" cy="130" r="120" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              className="transition-all duration-1000"
              style={{ filter: "drop-shadow(0 0 8px hsl(var(--glow-blue) / 0.4))" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-5xl font-bold text-foreground tracking-wider font-mono">{formatTime(seconds)}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { setSeconds(25 * 60); setIsRunning(false); }}
            className="h-12 w-12 rounded-full border border-glass-border hover:bg-glass/60"
          >
            <RotateCcw className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="h-16 w-16 rounded-full glass-button-primary !px-0"
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full border border-glass-border hover:bg-glass/60"
          >
            <Maximize2 className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-muted-foreground mt-8"
        >
          {isRunning ? "Stay focused. You're doing great." : "Press play to start your focus session."}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FocusMode;
