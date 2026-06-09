import { Outlet, NavLink } from "react-router";
import { Home, Search, Bell, User, Settings, PenSquare, LogOut, Moon, Sun } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function MainLayout() {
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useThemeStore();

  return (
    <div className="min-h-screen bg-background flex justify-center relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="w-full max-w-7xl flex relative z-10">
        {/* Left Sidebar */}
        <aside className="w-20 lg:w-72 h-screen sticky top-0 border-r border-border/20 bg-background/40 backdrop-blur-xl p-4 flex-col hidden sm:flex justify-between">
          <div>
            <NavLink to="/feed" className="flex items-center gap-4 mb-8 p-2 group transition-all">
              <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                SA
              </div>
              <span className="text-2xl font-bold hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                SocialApp
              </span>
            </NavLink>

            <nav className="space-y-2">
              <SidebarItem icon={<Home size={22} />} label="Feed" to="/feed" />
              <SidebarItem icon={<Search size={22} />} label="Discover" to="/users" />
              <SidebarItem icon={<Bell size={22} />} label="Notifications" to="/notifications" />
              <SidebarItem icon={<User size={22} />} label="Profile" to={`/profile/${user?._id || user?.id || "1"}`} />
              <SidebarItem icon={<Settings size={22} />} label="Settings" to="/settings" />
            </nav>

            <Button className="w-full rounded-full hidden lg:block mt-8 shadow-lg shadow-primary/25 relative overflow-hidden group" size="lg">
              <span className="relative z-10 font-semibold text-md">Post</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
            </Button>
            <Button className="w-12 h-12 rounded-full lg:hidden mt-8 mx-auto p-0 flex items-center justify-center shadow-lg shadow-primary/25" size="icon">
              <PenSquare className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-4 border-t border-border/20">
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex-shrink-0 flex items-center justify-center text-white font-semibold shadow-inner">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="hidden lg:block truncate">
                  <p className="font-semibold text-sm truncate">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="hidden lg:flex w-8 h-8 items-center justify-center rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <motion.div
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />}
                </motion.div>
              </button>
              <button 
                onClick={logout}
                className="hidden lg:flex w-8 h-8 items-center justify-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 border-r border-border/20 bg-background/40 backdrop-blur-sm min-h-screen">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 h-screen sticky top-0 p-6 hidden xl:block border-l border-border/20 bg-background/40 backdrop-blur-xl">
          <div className="glass-card p-5 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 shadow-xl shadow-black/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trending Now
            </h3>
            <div className="space-y-5">
              <TrendingItem category="Technology" title="React 19" count="12.5K" />
              <TrendingItem category="Design" title="Glassmorphism UI" count="8,432" />
              <TrendingItem category="Development" title="Tailwind v4" count="5,102" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group ${
          isActive
            ? "bg-primary/10 text-primary font-semibold shadow-sm"
            : "hover:bg-white/50 dark:hover:bg-slate-800/50 hover:shadow-sm text-foreground/80 hover:text-foreground"
        }`
      }
    >
      <div className="group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <span className="text-lg hidden lg:block">{label}</span>
    </NavLink>
  );
}

function TrendingItem({ category, title, count }: { category: string; title: string; count: string }) {
  return (
    <div className="text-sm group cursor-pointer">
      <p className="text-muted-foreground text-xs flex items-center gap-1">
        {category} • <span className="text-primary/60 group-hover:text-primary transition-colors">Trending</span>
      </p>
      <p className="font-semibold text-md mt-0.5 group-hover:text-primary transition-colors">{title}</p>
      <p className="text-muted-foreground text-xs mt-0.5">{count} posts</p>
    </div>
  );
}
