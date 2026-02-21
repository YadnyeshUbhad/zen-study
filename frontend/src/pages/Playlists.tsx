import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, Play, Lock, CheckCircle2, Link2, ExternalLink, ChevronRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const API_BASE = "http://localhost:5000";

/** Converts ISO 8601 duration (e.g. "PT1H8M6S") to readable format (e.g. "1:08:06") */
function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${minutes}:${pad(seconds)}`;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  position: number;
  completed?: boolean;
  locked?: boolean;
  quizPassed?: boolean;
}

const Playlists = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlistId, setPlaylistId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImport = async () => {
    if (!playlistUrl.trim()) {
      setError("Please paste a YouTube playlist URL.");
      return;
    }

    setLoading(true);
    setError("");
    setVideos([]);

    try {
      const res = await fetch(`${API_BASE}/api/playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: playlistUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch playlist.");
        return;
      }

      // Mark first video as unlocked, rest as locked (learning flow)
      const enrichedVideos: Video[] = data.videos.map((v: Video, i: number) => ({
        ...v,
        completed: false,
        locked: i > 0,
        quizPassed: false,
      }));

      setPlaylistId(data.playlistId);
      setVideos(enrichedVideos);
    } catch {
      setError("Could not connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const completedCount = videos.filter((v) => v.completed).length;
  const progressPercent = videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-lg font-semibold text-foreground">Playlists & Tutorials</h1>
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
            {/* Add Playlist */}
            <div className="widget-card mb-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Add YouTube Playlist</p>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Paste YouTube playlist URL..."
                    value={playlistUrl}
                    onChange={(e) => setPlaylistUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleImport()}
                    className="pl-10 bg-glass/80 border-glass-border"
                    disabled={loading}
                  />
                </div>
                <Button className="glass-button-primary px-6" onClick={handleImport} disabled={loading}>
                  {loading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Importing...</>
                  ) : (
                    <><ExternalLink className="h-4 w-4 mr-2" /> Import</>
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-xs text-red-400 mt-2">{error}</p>
              )}
            </div>

            {/* Active Playlist */}
            {videos.length > 0 && (
              <div className="widget-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Imported Playlist</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {videos.length} videos · {completedCount} completed · {progressPercent}% progress
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/25">
                    {progressPercent === 100 ? "Completed" : "In Progress"}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2 mb-6" />

                <div className="space-y-2">
                  {videos.map((video, i) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-200 ${video.locked
                          ? "border-glass-border/50 bg-glass/20 opacity-50"
                          : video.completed
                            ? "border-primary/20 bg-primary/5"
                            : "border-glass-border bg-glass/40 hover:bg-glass/60 cursor-pointer"
                        }`}
                    >
                      {/* Thumbnail */}
                      <div className="h-12 w-20 rounded-md overflow-hidden shrink-0 bg-secondary/30">
                        {video.thumbnail && (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {/* Icon */}
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0">
                        {video.locked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : video.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <Play className="h-4 w-4 text-primary" />
                        )}
                      </div>

                      {/* Title + Duration */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{video.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDuration(video.duration)}</p>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground tabular-nums">#{video.position}</span>
                        {video.completed && video.quizPassed && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-glow-cyan/15 text-glow-cyan border border-glow-cyan/25">Quiz Passed</span>
                        )}
                        {!video.locked && !video.completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">Take Quiz</span>
                        )}
                        {!video.locked && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Playlists;
