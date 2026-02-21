import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, Brain, Clock, Target, CheckCircle2, XCircle, BarChart3, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const mockQuizzes = [
  { id: 1, title: "React Hooks - useEffect", source: "Video", questions: 10, score: 90, passed: true, time: "5:30" },
  { id: 2, title: "Data Structures Ch.3", source: "PDF", questions: 15, score: 73, passed: true, time: "8:12" },
  { id: 3, title: "Custom Hooks", source: "Video", questions: 8, score: null, passed: false, time: null },
  { id: 4, title: "OS Memory Management", source: "PDF", questions: 12, score: null, passed: false, time: null },
];

const weakAreas = [
  { topic: "Closures", accuracy: 45 },
  { topic: "Recursion", accuracy: 52 },
  { topic: "Memory Management", accuracy: 60 },
  { topic: "Dynamic Programming", accuracy: 38 },
];

const Quizzes = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">Quizzes</h1>
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
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Avg Score", value: "82%", icon: Target, color: "text-primary" },
                { label: "Quizzes Taken", value: "24", icon: Brain, color: "text-glow-cyan" },
                { label: "Pass Rate", value: "88%", icon: CheckCircle2, color: "text-glow-purple" },
                { label: "Avg Time", value: "6:45", icon: Clock, color: "text-accent" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="widget-card text-center">
                  <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quiz List */}
              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Available & Completed Quizzes</p>
                {mockQuizzes.map((quiz, i) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="widget-card flex items-center gap-4 cursor-pointer hover:shadow-[0_0_20px_-5px_hsl(var(--glow-blue)/0.12)]"
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                      quiz.score !== null ? (quiz.passed ? "bg-primary/15 border border-primary/25" : "bg-destructive/15 border border-destructive/25") : "bg-accent/15 border border-accent/25"
                    }`}>
                      {quiz.score !== null ? (
                        quiz.passed ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <XCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Brain className="h-5 w-5 text-accent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{quiz.title}</p>
                      <p className="text-xs text-muted-foreground">{quiz.questions} questions · From {quiz.source}</p>
                    </div>
                    {quiz.score !== null ? (
                      <span className={`text-sm font-bold ${quiz.passed ? "text-primary" : "text-destructive"}`}>{quiz.score}%</span>
                    ) : (
                      <Button size="sm" variant="ghost" className="text-xs text-primary">
                        Start <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Weak Areas */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Weak Areas</p>
                <div className="widget-card space-y-4">
                  {weakAreas.map((area) => (
                    <div key={area.topic}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground">{area.topic}</span>
                        <span className="text-muted-foreground">{area.accuracy}%</span>
                      </div>
                      <Progress value={area.accuracy} className="h-1.5" />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2">Focus on these topics to improve your scores.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Quizzes;
