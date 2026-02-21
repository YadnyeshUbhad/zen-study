import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const quotes = [
  "Consistency beats talent.",
  "Small progress daily compounds into mastery.",
  "The expert was once a beginner.",
  "Discipline is choosing what you want most over what you want now.",
  "Every hour of study is an investment in your future.",
  "Focus is the new superpower.",
  "Learn one thing deeply, then expand.",
  "Progress, not perfection.",
  "The best time to start was yesterday. The next best time is now.",
  "Your potential is limitless — unlock it daily.",
];

const MotivationWidget = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000); // Change every 8s for demo, conceptually every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="motivation-card max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-glow-cyan" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Daily Motivation</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-foreground/90 italic"
        >
          "{quotes[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default MotivationWidget;
