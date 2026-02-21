import { motion } from "framer-motion";
import {
  BarChart3, BookOpen, CheckCircle2, Brain, Clock, Flame,
  Target, TrendingUp
} from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

const ProgressBar = ({ value, max, color = "bg-primary" }: { value: number; max: number; color?: string }) => (
  <div className="w-full h-2 rounded-full bg-secondary/60 overflow-hidden">
    <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${(value / max) * 100}%` }} />
  </div>
);

const widgets = [
  {
    title: "Study Progress",
    icon: TrendingUp,
    content: (
      <div>
        <p className="text-3xl font-bold glow-text">72%</p>
        <p className="text-xs text-muted-foreground mt-1 mb-3">Weekly goal completion</p>
        <ProgressBar value={72} max={100} />
      </div>
    ),
  },
  {
    title: "Current Course",
    icon: BookOpen,
    content: (
      <div>
        <p className="text-sm font-semibold text-foreground">Advanced React Patterns</p>
        <p className="text-xs text-muted-foreground mt-1 mb-3">12 / 24 lessons completed</p>
        <ProgressBar value={12} max={24} />
      </div>
    ),
  },
  {
    title: "Completed Videos",
    icon: CheckCircle2,
    content: (
      <div>
        <p className="text-3xl font-bold text-glow-cyan">48</p>
        <p className="text-xs text-muted-foreground mt-1">Videos completed this month</p>
      </div>
    ),
  },
  {
    title: "Quiz Performance",
    icon: Brain,
    content: (
      <div>
        <p className="text-3xl font-bold gradient-text">85%</p>
        <p className="text-xs text-muted-foreground mt-1">Average quiz score</p>
      </div>
    ),
  },
  {
    title: "Daily Study Time",
    icon: Clock,
    content: (
      <div>
        <p className="text-3xl font-bold text-glow-purple">2h 34m</p>
        <p className="text-xs text-muted-foreground mt-1">Today's total study time</p>
      </div>
    ),
  },
  {
    title: "Streak",
    icon: Flame,
    content: (
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold" style={{ color: "hsl(30 90% 60%)" }}>14</p>
        <p className="text-sm font-medium text-muted-foreground mb-1">days</p>
      </div>
    ),
  },
  {
    title: "Daily Goals",
    icon: Target,
    content: (
      <div className="space-y-2">
        {[
          { label: "Study 3 hours", done: true },
          { label: "Complete 2 quizzes", done: true },
          { label: "Review notes", done: false },
        ].map((g) => (
          <div key={g.label} className="flex items-center gap-2 text-xs">
            <div className={`h-3.5 w-3.5 rounded-full border ${g.done ? "bg-primary/80 border-primary" : "border-glass-border"}`} />
            <span className={g.done ? "text-foreground line-through opacity-60" : "text-foreground"}>{g.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Focus Sessions",
    icon: BarChart3,
    content: (
      <div className="flex items-end gap-1 h-12">
        {[40, 70, 55, 80, 65, 90, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-primary/40"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    ),
  },
];

const DashboardWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {widgets.map((w, i) => (
        <motion.div
          key={w.title}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="widget-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <w.icon className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{w.title}</p>
          </div>
          {w.content}
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
