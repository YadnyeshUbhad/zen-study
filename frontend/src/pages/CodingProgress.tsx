import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, Code2, Flame, TrendingUp, Target, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const topicStats = [
  { topic: "Arrays", solved: 45, total: 80, color: "bg-primary" },
  { topic: "Strings", solved: 30, total: 50, color: "bg-glow-cyan" },
  { topic: "Trees", solved: 18, total: 40, color: "bg-glow-purple" },
  { topic: "Dynamic Programming", solved: 12, total: 60, color: "bg-accent" },
  { topic: "Graphs", solved: 8, total: 35, color: "bg-primary" },
  { topic: "Linked Lists", solved: 22, total: 30, color: "bg-glow-cyan" },
];

const recentProblems = [
  { name: "Two Sum", platform: "LeetCode", difficulty: "Easy", solved: true },
  { name: "Merge Intervals", platform: "LeetCode", difficulty: "Medium", solved: true },
  { name: "Binary Tree Zigzag", platform: "LeetCode", difficulty: "Medium", solved: false },
  { name: "N-Queens", platform: "GeeksforGeeks", difficulty: "Hard", solved: true },
  { name: "Kth Largest Element", platform: "LeetCode", difficulty: "Medium", solved: true },
];

const CodingProgress = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">Coding Progress</h1>
          <div className="flex items-center gap-4">
            <button className="h-9 w-9 rounded-full bg-secondary/50 border border-glass-border flex items-center justify-center hover:bg-secondary/70 transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">JD</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Solved", value: "135", icon: Code2, color: "glow-text" },
                { label: "Current Streak", value: "21 days", icon: Flame, color: "text-[hsl(30_90%_60%)]" },
                { label: "This Week", value: "+18", icon: TrendingUp, color: "text-glow-cyan" },
                { label: "Accuracy", value: "76%", icon: Target, color: "text-accent" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="widget-card text-center">
                  <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Difficulty Breakdown */}
            <div className="widget-card mb-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Difficulty Breakdown</p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Easy", solved: 60, total: 80, color: "text-glow-cyan" },
                  { label: "Medium", solved: 55, total: 120, color: "text-accent" },
                  { label: "Hard", solved: 20, total: 60, color: "text-destructive" },
                ].map((d) => (
                  <div key={d.label} className="text-center">
                    <p className={`text-3xl font-bold ${d.color}`}>{d.solved}</p>
                    <p className="text-xs text-muted-foreground mt-1">/ {d.total} {d.label}</p>
                    <Progress value={(d.solved / d.total) * 100} className="h-1.5 mt-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Topic Distribution */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Topic Distribution</p>
                <div className="widget-card space-y-4">
                  {topicStats.map((t) => (
                    <div key={t.topic}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground">{t.topic}</span>
                        <span className="text-muted-foreground">{t.solved}/{t.total}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary/60 overflow-hidden">
                        <div className={`h-full rounded-full ${t.color} transition-all duration-700`} style={{ width: `${(t.solved / t.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Problems */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Recent Activity</p>
                <div className="space-y-2">
                  {recentProblems.map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="widget-card flex items-center gap-3 !p-3"
                    >
                      <div className={`h-2 w-2 rounded-full ${p.solved ? "bg-primary" : "bg-destructive"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.platform}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        p.difficulty === "Easy" ? "bg-glow-cyan/15 text-glow-cyan border-glow-cyan/25" :
                        p.difficulty === "Medium" ? "bg-accent/15 text-accent border-accent/25" :
                        "bg-destructive/15 text-destructive border-destructive/25"
                      }`}>{p.difficulty}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CodingProgress;
