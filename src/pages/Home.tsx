import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useThemeStore } from "@/store/themeStore";
import {
  Zap, Moon, Sun, MessageSquare, Users, Heart,
  ArrowRight, Star, Globe, Shield, Bell, Lock,
  CheckCircle2, Sparkles, Camera,
} from "lucide-react";

/* ─────────── DATA ─────────── */
const features = [
  { icon: <Zap className="w-5 h-5" />,           title: "Real-time Feed",      desc: "Lightning-fast updates. Your feed loads in under 100ms with TanStack Query.",           from: "#f59e0b", to: "#ef4444", span: "md:col-span-2" },
  { icon: <Moon className="w-5 h-5" />,          title: "Dark Mode First",     desc: "Stunning dark & light themes crafted for every eye, saved across devices.",               from: "#8b5cf6", to: "#6366f1", span: "" },
  { icon: <Camera className="w-5 h-5" />,        title: "Rich Media",          desc: "Share photos, videos, and immersive stories that captivate.",                            from: "#ec4899", to: "#f43f5e", span: "" },
  { icon: <MessageSquare className="w-5 h-5" />, title: "Instant Messaging",   desc: "Zero-latency chat with live typing indicators. Connect with anyone, instantly.",         from: "#3b82f6", to: "#06b6d4", span: "md:col-span-2" },
];

const stats = [
  { icon: <Users className="w-5 h-5" />, value: "2M+",  label: "Active Users",  c: "#3b82f6" },
  { icon: <Heart className="w-5 h-5" />, value: "50M+", label: "Posts Liked",   c: "#f43f5e" },
  { icon: <Globe className="w-5 h-5" />, value: "150+", label: "Countries",     c: "#10b981" },
  { icon: <Star  className="w-5 h-5" />, value: "4.9",  label: "App Rating",    c: "#f59e0b" },
];

const testimonials = [
  { name: "Sarah K.", handle: "@sarahk", text: "Absolutely love the feed! Clean, fast, and stunning. Feels like the future of social.", avatar: "S", from: "#f43f5e", to: "#ec4899" },
  { name: "Ahmed M.", handle: "@ahmedm", text: "The best social app I've ever used. The design is incredible — absolutely premium.",     avatar: "A", from: "#3b82f6", to: "#6366f1" },
  { name: "Mia L.",   handle: "@mial",   text: "Finally a platform that feels truly premium. The dark mode alone is worth it. 10/10.", avatar: "M", from: "#10b981", to: "#06b6d4" },
];

const perks = ["Free forever on the basic plan", "No ads on premium accounts", "End-to-end encrypted messages", "Custom profile themes"];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 3 + 1.5, dur: Math.random() * 14 + 8, delay: Math.random() * 8,
}));

/* ─────────── HELPERS ─────────── */
function card(isDark: boolean, extra = "") {
  return isDark
    ? `bg-[#111827] border border-white/[0.08] shadow-2xl shadow-black/60 ${extra}`
    : `bg-white border border-black/[0.06] shadow-xl shadow-black/[0.06] ${extra}`;
}

import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";

/* ─────────── COMPONENT ─────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY       = useTransform(scrollYProgress, [0, 1],    ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1,    0]);
  const { isDark, toggle } = useThemeStore();
  const token = useAuthStore((state) => state.token);

  // If user is already logged in, redirect them immediately to the feed
  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <>
      <Helmet>
        <title>SocialApp — Connect in the Next Dimension</title>
        <meta name="description" content="Experience a world-class social platform built for the future." />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-background overflow-x-hidden selection:bg-primary/20">

        {/* ══ NAVBAR ══ */}
        <nav className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`max-w-6xl mx-auto flex justify-between items-center rounded-2xl px-5 py-3 backdrop-blur-2xl ${
              isDark
                ? "bg-[#0d1117]/90 border border-white/[0.07] shadow-2xl shadow-black/60"
                : "bg-white/80 border border-black/[0.06] shadow-xl shadow-black/[0.06]"
            }`}>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-[11px]"
                style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>SA</div>
              <span className="hidden sm:block text-[17px] font-black tracking-tight text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg,#3b82f6,#8b5cf6)" }}>SocialApp</span>
            </Link>

            <div className="flex items-center gap-2">
              <button onClick={toggle} aria-label="Toggle theme"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isDark ? "hover:bg-white/10 text-zinc-400 hover:text-white" : "hover:bg-black/5 text-zinc-500 hover:text-zinc-900"
                }`}>
                <motion.div key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </button>
              <Button variant="ghost" size="sm" className="rounded-xl font-semibold" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="rounded-xl px-4 font-bold relative overflow-hidden group shadow-lg shadow-primary/30" asChild>
                <Link to="/register">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:300%_auto] animate-gradient" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </nav>

        <main className="flex-grow">

          {/* ══ HERO ══ */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
            {/* Orbs */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-15%] left-[-10%] w-[65%] h-[65%] rounded-full blur-[200px]"
                style={{ background: "radial-gradient(circle,rgba(59,130,246,0.4),transparent 70%)" }} />
              <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[200px]"
                style={{ background: "radial-gradient(circle,rgba(139,92,246,0.35),transparent 70%)" }} />
              <div className="absolute top-[35%] left-[30%] w-[45%] h-[45%] rounded-full blur-[180px]"
                style={{ background: "radial-gradient(circle,rgba(236,72,153,0.2),transparent 70%)" }} />
            </motion.div>

            {/* Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {PARTICLES.map(p => (
                <motion.div key={p.id} className="absolute rounded-full"
                  style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size,
                    background:`linear-gradient(135deg,#3b82f6,#8b5cf6)`, opacity:isDark?0.5:0.25 }}
                  animate={{ y:[-20,20,-20], opacity:isDark?[0.2,0.7,0.2]:[0.1,0.4,0.1] }}
                  transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:"easeInOut" }} />
              ))}
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              {/* Badge */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10 text-sm font-bold text-primary
                  border border-primary/30 bg-primary/[0.08] dark:bg-primary/[0.15]">
                <Sparkles className="w-3.5 h-3.5" />
                Now with real-time messaging &amp; stories
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.85, ease:[0.16,1,0.3,1], delay:0.1 }}>
                <h1 className="font-black tracking-tighter leading-[0.88] mb-8">
                  <span className="block text-[clamp(2.8rem,9vw,7rem)] text-foreground drop-shadow-sm">Connect in the</span>
                  <span className="block text-[clamp(2.8rem,9vw,7rem)] text-transparent bg-clip-text bg-[length:300%_auto] animate-gradient"
                    style={{ backgroundImage:"linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)" }}>
                    Next Dimension.
                  </span>
                </h1>
                <p className="text-base md:text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed font-medium">
                  A world-class social platform built for the future — stunning design, real-time feeds, and a community like no other.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button size="lg" asChild
                    className="h-14 px-10 rounded-2xl text-base font-black shadow-2xl shadow-primary/40 relative overflow-hidden group">
                    <Link to="/register">
                      <span className="relative z-10 flex items-center gap-2">
                        Start for Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:300%_auto] animate-gradient" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild
                    className="h-14 px-10 rounded-2xl text-base font-bold"
                    style={isDark ? { background:"rgba(255,255,255,0.05)", borderColor:"rgba(255,255,255,0.12)", color:"#e2e8f0" } : {}}>
                    <Link to="/login">Sign in</Link>
                  </Button>
                </div>

                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                  className="text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  No credit card · Free forever · Cancel anytime
                </motion.p>
              </motion.div>

              {/* ── FULL APP MOCKUP ── */}
              <motion.div initial={{ opacity:0, y:80, scale:0.94 }} animate={{ opacity:1, y:0, scale:1 }}
                transition={{ duration:1.1, delay:0.55, ease:[0.16,1,0.3,1] }}
                className="mt-20 max-w-4xl mx-auto relative">

                {/* Glow under */}
                <div className="absolute -bottom-14 inset-x-[5%] h-28 blur-[80px] rounded-full pointer-events-none"
                  style={{ background:"linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899)", opacity: isDark?0.45:0.18 }} />

                {/* Browser window */}
                <div className="relative rounded-[20px] overflow-hidden select-none"
                  style={{
                    border: isDark?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(0,0,0,0.09)",
                    boxShadow: isDark
                      ? "0 50px 120px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(59,130,246,0.07)"
                      : "0 40px 100px -20px rgba(0,0,0,0.22)",
                  }}>

                  {/* Chrome Bar */}
                  <div className="flex items-center gap-3 px-5 py-3"
                    style={{ background:isDark?"#161b22":"#ffffff", borderBottom:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)" }}>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex items-center gap-1.5 text-[10px] rounded-md px-3 py-1"
                        style={{ background:isDark?"rgba(255,255,255,0.06)":"#f1f5f9", color:isDark?"#6b7280":"#94a3b8",
                          border:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.06)" }}>
                        <Shield className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" /> app.socialapp.com
                      </div>
                    </div>
                    <Bell className="w-3.5 h-3.5 flex-shrink-0" style={{ color:isDark?"#374151":"#d1d5db" }} />
                  </div>

                  {/* App Layout */}
                  <div className="flex" style={{ background:isDark?"#0d1117":"#f3f4f6", minHeight:360 }}>

                    {/* LEFT SIDEBAR */}
                    <div className="hidden md:flex flex-col gap-1 w-[68px] flex-shrink-0 py-4 px-2 items-center"
                      style={{ background:isDark?"#161b22":"#ffffff", borderRight:isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.05)" }}>
                      <div className="w-9 h-9 rounded-xl mb-4 flex items-center justify-center text-white font-black text-[10px]"
                        style={{ background:"linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>SA</div>
                      {[
                        { g:"#3b82f6,#6366f1", a:true  },
                        { g:"#8b5cf6,#a855f7", a:false },
                        { g:"#ec4899,#f43f5e", a:false },
                        { g:"#10b981,#06b6d4", a:false },
                        { g:"#f59e0b,#ef4444", a:false },
                      ].map((item,i) => (
                        <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                          style={{ background:item.a?`linear-gradient(135deg,${item.g})`:"transparent", opacity:item.a?1:isDark?0.3:0.2 }}>
                          <div className="w-4 h-4 rounded"
                            style={{ background:item.a?"rgba(255,255,255,0.9)":`linear-gradient(135deg,${item.g})` }} />
                        </div>
                      ))}
                    </div>

                    {/* MAIN FEED */}
                    <div className="flex-1 overflow-hidden p-3 space-y-2.5" style={{ maxWidth:440 }}>

                      {/* Stories */}
                      <div className="flex gap-2.5 py-2 px-0.5">
                        {[
                          { g:"#3b82f6,#8b5cf6", lbl:"Add",   isAdd:true  },
                          { g:"#f43f5e,#ec4899", lbl:"Sarah", isAdd:false },
                          { g:"#f59e0b,#ef4444", lbl:"Ahmed", isAdd:false },
                          { g:"#10b981,#06b6d4", lbl:"Mia",   isAdd:false },
                          { g:"#8b5cf6,#6366f1", lbl:"Tom",   isAdd:false },
                        ].map((s,i) => (
                          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className="relative w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black"
                              style={{ background:`linear-gradient(135deg,${s.g})`, boxShadow:`0 2px 8px -2px rgba(0,0,0,0.3)` }}>
                              {s.isAdd?"+":(s.lbl[0])}
                              {!s.isAdd && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2"
                                  style={{ borderColor:isDark?"#0d1117":"#f3f4f6" }} />
                              )}
                            </div>
                            <span className="text-[8px] font-medium" style={{ color:isDark?"#6b7280":"#94a3b8" }}>{s.lbl}</span>
                          </div>
                        ))}
                      </div>

                      {/* Post 1 — image */}
                      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}
                        className="rounded-2xl p-3.5 space-y-2.5"
                        style={{ background:isDark?"#161b22":"#ffffff", border:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.05)" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full" style={{ background:"linear-gradient(135deg,#3b82f6,#8b5cf6)" }} />
                            <div>
                              <div className="h-2 w-20 rounded-full" style={{ background:isDark?"#1f2937":"#e5e7eb" }} />
                              <div className="h-1.5 w-12 rounded-full mt-1" style={{ background:isDark?"#111827":"#f3f4f6" }} />
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[0,1,2].map(d=><div key={d} className="w-1 h-1 rounded-full" style={{ background:isDark?"#374151":"#d1d5db" }} />)}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 w-full rounded-full" style={{ background:isDark?"#1f2937":"#f3f4f6" }} />
                          <div className="h-2 w-4/5 rounded-full" style={{ background:isDark?"#1f2937":"#f3f4f6" }} />
                        </div>
                        {/* Image */}
                        <div className="h-32 rounded-xl relative overflow-hidden"
                          style={{ background:"linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.1),rgba(236,72,153,0.1))",
                            border:isDark?"1px solid rgba(59,130,246,0.12)":"1px solid rgba(59,130,246,0.08)" }}>
                          <div className="absolute top-2.5 left-2.5 flex gap-1">
                            {["#3b82f6","#8b5cf6","#ec4899"].map((c,k)=>(
                              <div key={k} className="px-1.5 py-0.5 rounded-full text-[7px] font-bold text-white" style={{ background:c+"bb" }}>#tag</div>
                            ))}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full opacity-15" style={{ background:"linear-gradient(135deg,#3b82f6,#8b5cf6)" }} />
                          </div>
                        </div>
                        {/* Reactions */}
                        <div className="flex items-center justify-between pt-1"
                          style={{ borderTop:isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.04)" }}>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
                              <Heart className="w-3 h-3 fill-current" /> 1.2K
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-medium text-blue-500">
                              <MessageSquare className="w-3 h-3" /> 84
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {["#3b82f6","#8b5cf6","#ec4899"].map((c,k)=>(
                              <div key={k} className="w-4 h-4 rounded-full -ml-1 border" style={{ background:`${c}50`, borderColor:isDark?"#161b22":"#ffffff" }} />
                            ))}
                            <span className="text-[8px] ml-1 font-medium" style={{ color:isDark?"#6b7280":"#9ca3af" }}>+34</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Post 2 — trending */}
                      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.0 }}
                        className="rounded-2xl p-3.5 space-y-2"
                        style={{ background:isDark?"#161b22":"#ffffff", border:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(0,0,0,0.05)" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full" style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)" }} />
                            <div>
                              <div className="h-2 w-16 rounded-full" style={{ background:isDark?"#1f2937":"#e5e7eb" }} />
                              <div className="h-1.5 w-10 rounded-full mt-1" style={{ background:isDark?"#111827":"#f3f4f6" }} />
                            </div>
                          </div>
                          <div className="px-2 py-0.5 rounded-full text-[7px] font-bold text-white"
                            style={{ background:"linear-gradient(90deg,#f59e0b,#ef4444)" }}>🔥 Trending</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 w-full rounded-full" style={{ background:isDark?"#1f2937":"#f3f4f6" }} />
                          <div className="h-2 w-3/4 rounded-full" style={{ background:isDark?"#1f2937":"#f3f4f6" }} />
                        </div>
                        <div className="flex items-center gap-3 pt-1"
                          style={{ borderTop:isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.04)" }}>
                          <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color:isDark?"#6b7280":"#9ca3af" }}>
                            <Heart className="w-3 h-3 text-rose-400" /> 432
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color:isDark?"#6b7280":"#9ca3af" }}>
                            <MessageSquare className="w-3 h-3 text-blue-400" /> 21
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* RIGHT PANEL — Suggestions */}
                    <div className="hidden lg:flex flex-col w-[176px] flex-shrink-0 p-3 gap-2"
                      style={{ borderLeft:isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(0,0,0,0.05)" }}>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color:isDark?"#4b5563":"#9ca3af" }}>Suggested</p>
                      {[
                        { g:"#3b82f6,#6366f1", name:"Alex Chen",  m:"12 mutual" },
                        { g:"#10b981,#06b6d4", name:"Mia López",  m:"8 mutual"  },
                        { g:"#ec4899,#f43f5e", name:"Tom Wright", m:"5 mutual"  },
                      ].map((u,i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-xl"
                          style={{ background:isDark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)" }}>
                          <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[8px] font-black"
                            style={{ background:`linear-gradient(135deg,${u.g})` }}>{u.name[0]}</div>
                          <div className="min-w-0 flex-1">
                            <div className="h-1.5 w-14 rounded-full" style={{ background:isDark?"#1f2937":"#e5e7eb" }} />
                            <p className="text-[7px] mt-1" style={{ color:isDark?"#4b5563":"#9ca3af" }}>{u.m}</p>
                          </div>
                          <div className="w-10 h-4 rounded-full flex items-center justify-center text-white text-[7px] font-bold"
                            style={{ background:"linear-gradient(90deg,#3b82f6,#8b5cf6)" }}>Follow</div>
                        </div>
                      ))}

                      <p className="text-[9px] font-black uppercase tracking-widest mt-3 mb-1" style={{ color:isDark?"#4b5563":"#9ca3af" }}>Trending</p>
                      {["#design","#react","#ux"].map((tag,i) => (
                        <div key={i} className="px-2 py-1 rounded-lg text-[9px] font-bold"
                          style={{ background:isDark?"rgba(59,130,246,0.1)":"rgba(59,130,246,0.07)", color:"#3b82f6" }}>{tag}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ══ STATS ══ */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
                  whileHover={{ y:-4 }}
                  className="relative overflow-hidden rounded-2xl p-6 text-center group cursor-default"
                  style={{
                    background: isDark ? `linear-gradient(135deg, #111827, #0d1117)` : "#ffffff",
                    border: isDark ? `1px solid rgba(255,255,255,0.07)` : "1px solid rgba(0,0,0,0.06)",
                    boxShadow: isDark ? "0 20px 40px -10px rgba(0,0,0,0.5)" : "0 10px 30px -5px rgba(0,0,0,0.06)",
                  }}>
                  {/* Color top border accent */}
                  <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl"
                    style={{ background:`linear-gradient(90deg,transparent,${s.c},transparent)`, opacity: isDark?0.8:0.5 }} />
                  <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background:`${s.c}${isDark?"22":"12"}`, color:s.c }}>
                    {s.icon}
                  </div>
                  <div className="text-3xl font-black tracking-tight text-foreground">{s.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ══ FEATURES ══ */}
          <section className="py-16 px-6 max-w-6xl mx-auto">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black mb-5
                border border-blue-500/30 bg-blue-500/[0.08] text-blue-500">
                <Zap className="w-3.5 h-3.5" /> Features
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                A new standard<br />for social
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Built with premium precision for the ultimate user experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
              {features.map((f, i) => (
                <motion.div key={f.title}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
                  whileHover={{ y:-6 }}
                  className={`${f.span} relative overflow-hidden rounded-3xl flex flex-col justify-end p-7 cursor-default group`}
                  style={{
                    background: isDark
                      ? `linear-gradient(135deg, #111827 0%, #0d1117 100%)`
                      : "#ffffff",
                    border: isDark
                      ? `1px solid rgba(255,255,255,0.07)`
                      : "1px solid rgba(0,0,0,0.05)",
                    boxShadow: isDark
                      ? `0 20px 50px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : "0 10px 30px -5px rgba(0,0,0,0.06)",
                  }}>
                  {/* Gradient blob that's ALWAYS visible in dark mode */}
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[60px] transition-opacity duration-500"
                    style={{ background:`linear-gradient(135deg,${f.from},${f.to})`,
                      opacity: isDark ? 0.25 : 0, filter:"blur(60px)" }}
                    aria-hidden />
                  {/* Hover fill */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
                    style={{ background:`linear-gradient(135deg,${f.from}12,${f.to}08)` }} />

                  {/* Icon badge */}
                  <div className="absolute top-6 left-6 w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-xl"
                    style={{ background:`linear-gradient(135deg,${f.from},${f.to})`,
                      boxShadow:`0 8px 24px -4px ${f.from}70` }}>
                    {f.icon}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-black mb-2 text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ══ TESTIMONIALS ══ */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Loved by millions</h2>
                <p className="text-muted-foreground text-lg">Don't take our word for it.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <motion.div key={t.handle}
                    initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                    whileHover={{ y:-6 }}
                    className="relative overflow-hidden rounded-3xl p-7 flex flex-col gap-4 cursor-default group"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg,#111827,#0d1117)`
                        : "#ffffff",
                      border: isDark
                        ? `1px solid rgba(255,255,255,0.08)`
                        : "1px solid rgba(0,0,0,0.05)",
                      boxShadow: isDark
                        ? "0 20px 50px -10px rgba(0,0,0,0.6)"
                        : "0 10px 30px -5px rgba(0,0,0,0.06)",
                    }}>
                    {/* Corner glow */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-[40px] transition-opacity duration-500"
                      style={{ background:`linear-gradient(135deg,${t.from},${t.to})`,
                        opacity: isDark ? 0.2 : 0 }} />

                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array(5).fill(0).map((_,j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-sm font-semibold leading-relaxed flex-1 text-foreground">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.06)" }}>
                      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-sm"
                        style={{ background:`linear-gradient(135deg,${t.from},${t.to})`,
                          boxShadow:`0 4px 12px -2px ${t.from}60` }}>
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-black text-sm text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.handle}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ CTA ══ */}
          <section className="py-28 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[700px] h-[300px] blur-[120px] rounded-full"
                style={{ background:"linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899)", opacity: isDark?0.25:0.1 }} />
            </div>

            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.7 }}
              className="max-w-3xl mx-auto text-center relative z-10 rounded-3xl p-12 md:p-16 overflow-hidden"
              style={{
                background: isDark
                  ? "linear-gradient(135deg,#111827,#0d1117)"
                  : "#ffffff",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.09)"
                  : "1px solid rgba(0,0,0,0.06)",
                boxShadow: isDark
                  ? "0 40px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 20px 60px -10px rgba(0,0,0,0.12)",
              }}>
              {/* Top gradient line */}
              <div className="absolute top-0 inset-x-0 h-[2px]"
                style={{ background:"linear-gradient(90deg,transparent,#3b82f6 25%,#8b5cf6 50%,#ec4899 75%,transparent)" }} />

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-primary border border-primary/25 bg-primary/[0.08] mb-7">
                <Lock className="w-3.5 h-3.5" /> Free forever plan available
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
                Ready to join<br />millions?
              </h2>
              <p className="text-muted-foreground text-lg mb-9 max-w-md mx-auto leading-relaxed">
                Create your free account and experience what social media was always meant to be.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-10 text-left">
                {perks.map(p => (
                  <div key={p} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="font-medium text-foreground">{p}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild className="h-14 rounded-2xl px-12 text-base font-black shadow-2xl shadow-primary/35 relative overflow-hidden group">
                <Link to="/register">
                  <span className="relative z-10 flex items-center gap-2">
                    Create your free account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:300%_auto] animate-gradient" />
                </Link>
              </Button>
            </motion.div>
          </section>
        </main>

        {/* ══ FOOTER ══ */}
        <footer className="py-10 px-6" style={{ borderTop: isDark?"1px solid rgba(255,255,255,0.07)":"1px solid rgba(0,0,0,0.06)" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white font-black text-[9px]"
                style={{ background:"linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>SA</div>
              <span className="font-black text-foreground">SocialApp</span>
            </Link>
            <p className="text-xs text-muted-foreground">© 2026 SocialApp Inc. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              {["Privacy","Terms","Contact"].map(l => (
                <Link key={l} to="#" className="hover:text-foreground transition-colors font-medium">{l}</Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
