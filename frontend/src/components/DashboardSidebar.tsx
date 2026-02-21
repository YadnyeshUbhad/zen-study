import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, BarChart3, Brain, Code2,
  FileText, Settings, LogOut, Zap, ChevronLeft, Play, Eye
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Playlists", icon: Play, path: "/playlists" },
  { label: "PDFs & Docs", icon: FileText, path: "/pdfs" },
  { label: "Quizzes", icon: Brain, path: "/quizzes" },
  { label: "Coding Stats", icon: Code2, path: "/coding" },
  { label: "Notes", icon: BookOpen, path: "/notes" },
  { label: "Focus Mode", icon: Eye, path: "/focus" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen sticky top-0 flex flex-col border-r border-border bg-sidebar overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        <div className="h-8 w-8 min-w-[2rem] rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        {!collapsed && <span className="text-sm font-bold gradient-text whitespace-nowrap">StudyFlow</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                ${isActive
                  ? "sidebar-glow-active"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
            >
              <item.icon className="h-4 w-4 min-w-[1rem]" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground
            hover:bg-sidebar-accent transition-all duration-200"
        >
          <LogOut className="h-4 w-4 min-w-[1rem]" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground
            hover:bg-sidebar-accent transition-all duration-200"
        >
          <ChevronLeft className={`h-4 w-4 min-w-[1rem] transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
