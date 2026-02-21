import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const StudyTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="widget-card text-center">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Study Timer</p>
      <p className="text-4xl font-mono font-bold glow-text mb-4">{formatTime(seconds)}</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="h-10 w-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center
            hover:bg-primary/25 transition-all duration-200"
        >
          {isRunning ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        </button>
        <button
          onClick={() => { setIsRunning(false); setSeconds(0); }}
          className="h-10 w-10 rounded-full bg-secondary/50 border border-glass-border flex items-center justify-center
            hover:bg-secondary/70 transition-all duration-200"
        >
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default StudyTimer;
