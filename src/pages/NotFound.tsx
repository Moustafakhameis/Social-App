import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Home, Compass, Activity, ArrowLeft, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans p-4 sm:p-8">
      
      {/* Background decorations matching the app's aesthetic */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left Side: Massive 404 & Text */}
        <div className="flex-1 text-center lg:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Error 404</span>
            </div>

            <div className="relative inline-block mb-6">
              <h1 className="text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/80 to-foreground/20 select-none">
                404
              </h1>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-3xl opacity-20 -z-10" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Lost in space
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              We've explored deep and wide, but we couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all font-semibold text-base"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
              <Link to="/" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all relative overflow-hidden group font-semibold text-base">
                  <span className="relative z-10 flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Helpful Links Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-md lg:max-w-none xl:max-w-md mx-auto"
        >
          <div className="bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
            
            <h3 className="text-xl font-bold mb-8 text-foreground flex items-center gap-3">
              <Compass className="w-6 h-6 text-primary" />
              Helpful Links
            </h3>
            
            <div className="space-y-4">
              <Link to="/feed" className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Activity Feed</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">See what your friends are up to</p>
                </div>
              </Link>

              <Link to="/discover" className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white text-blue-500 transition-all duration-300">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-blue-500 transition-colors">Discover</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Find new people and trends</p>
                </div>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <p className="text-sm font-medium text-muted-foreground mb-4">Or try searching for it</p>
              <div className="relative group">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search SocialApp..." 
                  className="w-full pl-12 h-14 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/50 rounded-xl text-base transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
