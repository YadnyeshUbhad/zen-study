import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardWidgets from "@/components/DashboardWidgets";
import StudyTimer from "@/components/StudyTimer";
import MotivationWidget from "@/components/MotivationWidget";
import { Bell, Search } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search courses, notes..."
              className="input-glass pl-10 py-2 w-64 text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="h-9 w-9 rounded-full bg-secondary/50 border border-glass-border flex items-center justify-center hover:bg-secondary/70 transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">JD</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Good evening, John 👋</h1>
                <p className="text-sm text-muted-foreground mt-1">Keep up the great work. You're on a 14-day streak!</p>
              </div>
              <div className="w-full lg:w-auto max-w-sm">
                <MotivationWidget />
              </div>
            </div>

            {/* Timer + Widgets */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
              <div className="xl:col-span-1">
                <StudyTimer />
              </div>
              <div className="xl:col-span-3">
                <div className="widget-card h-full flex flex-col justify-center">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Focus Session</p>
                  <div className="flex items-center gap-4">
                    <div className="h-3 w-3 rounded-full bg-glow-cyan animate-pulse-glow" />
                    <p className="text-sm text-foreground">No active focus session</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Start the timer to begin a focus session.</p>
                </div>
              </div>
            </div>

            <DashboardWidgets />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
