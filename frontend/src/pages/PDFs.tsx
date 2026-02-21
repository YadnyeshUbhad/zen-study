import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, FileText, Upload, Clock, Eye, BookOpen, CheckCircle2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const mockPDFs = [
  { id: 1, title: "Data Structures & Algorithms.pdf", pages: 120, pagesRead: 85, timeSpent: "4h 20m", status: "reading", quizAvailable: true },
  { id: 2, title: "System Design Fundamentals.pdf", pages: 60, pagesRead: 60, timeSpent: "2h 45m", status: "completed", quizAvailable: true },
  { id: 3, title: "Operating Systems Notes.pdf", pages: 95, pagesRead: 12, timeSpent: "35m", status: "reading", quizAvailable: false },
  { id: 4, title: "Database Management.pdf", pages: 78, pagesRead: 0, timeSpent: "0m", status: "new", quizAvailable: false },
];

const PDFs = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">PDFs & Documents</h1>
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
            {/* Upload */}
            <div className="widget-card mb-6 border-dashed border-2 border-glass-border hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Upload Study Materials</p>
                <p className="text-xs text-muted-foreground">Drop PDFs here or click to browse</p>
              </div>
            </div>

            {/* PDF Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPDFs.map((pdf, i) => (
                <motion.div
                  key={pdf.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="widget-card hover:shadow-[0_0_25px_-5px_hsl(var(--glow-blue)/0.15)] cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{pdf.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> {pdf.pagesRead}/{pdf.pages} pages
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {pdf.timeSpent}
                        </span>
                      </div>
                      <Progress value={(pdf.pagesRead / pdf.pages) * 100} className="h-1.5 mt-3" />
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          pdf.status === "completed"
                            ? "bg-primary/15 text-primary border-primary/25"
                            : pdf.status === "reading"
                            ? "bg-accent/15 text-accent border-accent/25"
                            : "bg-secondary/50 text-muted-foreground border-glass-border"
                        }`}>
                          {pdf.status === "completed" ? "Completed" : pdf.status === "reading" ? "In Progress" : "Not Started"}
                        </span>
                        {pdf.quizAvailable && (
                          <span className="text-xs text-glow-cyan flex items-center gap-1">
                            <Brain className="h-3 w-3" /> Quiz Ready
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PDFs;
