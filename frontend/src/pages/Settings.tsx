import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, User, BookOpen, Brain, Eye, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl">
            {/* Profile */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Profile</p>
              </div>
              <div className="widget-card space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Full Name</Label>
                    <Input defaultValue="John Doe" className="mt-1 bg-glass/80 border-glass-border" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <Input defaultValue="john@example.com" className="mt-1 bg-glass/80 border-glass-border" />
                  </div>
                </div>
              </div>
            </section>

            {/* Study Preferences */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Study Preferences</p>
              </div>
              <div className="widget-card space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Daily Study Goal (hours)</Label>
                  <Select defaultValue="3">
                    <SelectTrigger className="mt-1 bg-glass/80 border-glass-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 8].map((h) => (
                        <SelectItem key={h} value={h.toString()}>{h} hours</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Lock videos until quiz passed</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Auto-generate quizzes from content</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>

            {/* Quiz Settings */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quiz Settings</p>
              </div>
              <div className="widget-card space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Quiz Difficulty</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="mt-1 bg-glass/80 border-glass-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="adaptive">Adaptive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Pass Threshold</Label>
                  <Select defaultValue="70">
                    <SelectTrigger className="mt-1 bg-glass/80 border-glass-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[50, 60, 70, 80, 90].map((p) => (
                        <SelectItem key={p} value={p.toString()}>{p}%</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Focus Mode */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Focus Mode</p>
              </div>
              <div className="widget-card space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Detect tab switches (anti-distraction)</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Pause video on tab switch</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Show warning overlay</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>

            <Button className="glass-button-primary px-8">Save Changes</Button>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
