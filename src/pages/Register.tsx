import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useRegister } from "@/features/auth/useAuth";
import { registerSchema, type RegisterDto } from "@/features/auth/authTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, User, Mail, Lock, Calendar, Sparkles } from "lucide-react";

export default function Register() {
  const { mutate: registerUser, isPending } = useRegister();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterDto) => {
    registerUser(data);
  };

  return (
    <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 overflow-hidden font-sans">
      
      {/* Universal Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="absolute top-6 left-6 z-50"
      >
        <Link 
          to="/" 
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-black/20 hover:bg-black/40 lg:bg-white/10 lg:hover:bg-white/20 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 text-sm font-semibold text-white/90 hover:text-white"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:-translate-x-1 group-hover:bg-white/30 transition-all duration-300">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          Back to Home
        </Link>
      </motion.div>

      {/* Left side - Visual/Hero Section */}
      <div className="hidden lg:flex flex-[1] relative bg-zinc-950 justify-center items-center overflow-hidden">
        
        {/* Animated Glowing Orbs for a Mesh Gradient Effect */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[-20%] w-[50%] h-[50%] bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        <div className="absolute bottom-[20%] left-[-20%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }} />

        {/* Subtle Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />
        
        {/* Content */}
        <div className="relative z-10 p-12 text-white w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-xl">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-xs font-bold tracking-wide uppercase text-white/90">Join the movement</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-[1.1] mb-5">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-sm">
                journey today.
              </span>
            </h1>
            <p className="text-lg text-zinc-300 font-medium max-w-sm leading-relaxed">
              Connect with a vibrant community of professionals, creators, and thinkers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-[1.2] flex flex-col justify-center items-center p-6 relative overflow-y-auto">
        
        {/* Background ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-lg relative z-10"
        >
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-zinc-200/50 dark:border-zinc-800/50 p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
            
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black tracking-tight text-foreground mb-2">Create Account</h2>
              <p className="text-muted-foreground text-sm font-medium">
                Join SocialApp and start connecting in seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5 group relative">
                  <label className="text-xs font-bold text-foreground/70 pl-1 uppercase tracking-wider group-focus-within:text-blue-600 transition-colors">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none" />
                    <Input
                      {...register("name")}
                      placeholder="John Doe"
                      className="h-11 pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm text-sm font-medium w-full"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive font-medium pl-1">{errors.name.message}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 group relative">
                  <label className="text-xs font-bold text-foreground/70 pl-1 uppercase tracking-wider group-focus-within:text-blue-600 transition-colors">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none" />
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="name@example.com"
                      className="h-11 pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm text-sm font-medium w-full"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-destructive font-medium pl-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5 group relative">
                  <label className="text-xs font-bold text-foreground/70 pl-1 uppercase tracking-wider group-focus-within:text-blue-600 transition-colors">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none" />
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="••••••••"
                      className="h-11 pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm text-sm font-medium w-full"
                    />
                  </div>
                  {errors.password && <p className="text-xs text-destructive font-medium pl-1">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5 group relative">
                  <label className="text-xs font-bold text-foreground/70 pl-1 uppercase tracking-wider group-focus-within:text-blue-600 transition-colors">Confirm Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none" />
                    <Input
                      {...register("rePassword")}
                      type="password"
                      placeholder="••••••••"
                      className="h-11 pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm text-sm font-medium w-full"
                    />
                  </div>
                  {errors.rePassword && <p className="text-xs text-destructive font-medium pl-1">{errors.rePassword.message}</p>}
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5 group relative">
                  <label className="text-xs font-bold text-foreground/70 pl-1 uppercase tracking-wider group-focus-within:text-blue-600 transition-colors">Date of Birth</label>
                  <div className="relative flex items-center">
                    <Calendar className="absolute left-3.5 w-4 h-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none" />
                    <Input
                      {...register("dateOfBirth")}
                      type="date"
                      className="h-11 pl-10 pr-3 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm text-sm font-medium w-full block"
                    />
                  </div>
                  {errors.dateOfBirth && <p className="text-xs text-destructive font-medium pl-1">{errors.dateOfBirth.message}</p>}
                </div>

                {/* Custom Gender Pills */}
                <div className="space-y-1.5 group relative">
                  <label className="text-xs font-bold text-foreground/70 pl-1 uppercase tracking-wider transition-colors">Gender</label>
                  <div className="flex gap-2 h-11">
                    <label className="flex-1 relative cursor-pointer group/radio">
                      <input type="radio" value="male" {...register("gender")} className="peer sr-only" />
                      <div className="h-full flex items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 peer-checked:border-blue-600 peer-checked:bg-blue-50/50 dark:peer-checked:bg-blue-900/20 peer-checked:text-blue-600 text-muted-foreground text-sm font-bold transition-all shadow-sm">
                        Male
                      </div>
                    </label>
                    <label className="flex-1 relative cursor-pointer group/radio">
                      <input type="radio" value="female" {...register("gender")} className="peer sr-only" />
                      <div className="h-full flex items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 peer-checked:border-pink-600 peer-checked:bg-pink-50/50 dark:peer-checked:bg-pink-900/20 peer-checked:text-pink-600 text-muted-foreground text-sm font-bold transition-all shadow-sm">
                        Female
                      </div>
                    </label>
                  </div>
                  {errors.gender && <p className="text-xs text-destructive font-medium pl-1">{errors.gender.message}</p>}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-xl mt-6 relative overflow-hidden group shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 border-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-base font-bold text-white tracking-wide">
                  {isPending ? "Creating account..." : "Sign up instantly"}
                  {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />}
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground font-medium">Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-bold transition-colors">
                Sign in here
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
