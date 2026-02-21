import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, FileText, Search, Plus, BookOpen, Code2, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockNotes = [
  { id: 1, title: "React useEffect Cleanup", source: "Video: React Hooks Masterclass", tags: ["React", "Hooks"], snippet: "Always return a cleanup function to avoid memory leaks when using subscriptions or timers...", time: "2 hours ago", type: "video" },
  { id: 2, title: "Binary Search Template", source: "PDF: DSA Fundamentals", tags: ["Algorithm", "Search"], snippet: "Template for binary search: left = 0, right = n-1, while left <= right, mid = left + (right-left)/2...", time: "Yesterday", type: "pdf" },
  { id: 3, title: "OS Process Scheduling", source: "PDF: Operating Systems", tags: ["OS", "Process"], snippet: "Round Robin scheduling uses a fixed time quantum. Context switching overhead is the main drawback...", time: "3 days ago", type: "pdf" },
  { id: 4, title: "Custom Hook Pattern", source: "Video: Advanced React", tags: ["React", "Patterns"], snippet: "Extract stateful logic into custom hooks. Name must start with 'use'. Can call other hooks inside...", time: "1 week ago", type: "video" },
  { id: 5, title: "SQL Join Optimization", source: "Manual Entry", tags: ["Database", "SQL"], snippet: "Use EXPLAIN ANALYZE to check query plans. Index columns used in JOIN conditions for better performance...", time: "1 week ago", type: "code" },
];

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">Notes & Knowledge Base</h1>
          <div className="flex items-center gap-4">
            <Button size="sm" className="glass-button-primary text-xs px-4">
              <Plus className="h-3 w-3 mr-1" /> New Note
            </Button>
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
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes, tags, snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-glass/80 border-glass-border"
              />
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockNotes.map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="widget-card cursor-pointer hover:shadow-[0_0_25px_-5px_hsl(var(--glow-blue)/0.12)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {note.type === "video" ? (
                      <BookOpen className="h-4 w-4 text-primary" />
                    ) : note.type === "pdf" ? (
                      <FileText className="h-4 w-4 text-accent" />
                    ) : (
                      <Code2 className="h-4 w-4 text-glow-cyan" />
                    )}
                    <p className="text-sm font-semibold text-foreground truncate flex-1">{note.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{note.snippet}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary/60 text-muted-foreground border border-glass-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="truncate">{note.source}</span>
                    <span className="flex items-center gap-1 shrink-0"><Clock className="h-3 w-3" /> {note.time}</span>
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

export default Notes;
