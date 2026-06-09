import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLogin } from "@/features/auth/useAuth";
import { loginSchema, type LoginDto } from "@/features/auth/authTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

export default function Login() {
  const { mutate: login, isPending } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginDto) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex bg-background relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="absolute top-8 left-8 z-50"
      >
        <Link 
          to="/" 
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 text-sm font-semibold text-white/90 hover:text-white"
        >
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-x-1 group-hover:bg-white/20 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>
      </motion.div>
      {/* Left side - Visual/Hero Section */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-zinc-900 justify-center items-center">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Abstract background" 
            className="object-cover w-full h-full opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-secondary/40" />
        </div>
        
        <div className="relative z-10 p-12 text-white max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-medium">Connect in a new way</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                SocialApp
              </span>
            </h1>
            <p className="text-lg text-zinc-300 font-medium max-w-md leading-relaxed">
              Experience lightning-fast interactions, seamless design, and the ultimate social connectivity platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle ambient light for the right side */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-xl flex lg:hidden items-center justify-center shadow-lg shadow-primary/20 mb-6 mx-auto">
              <span className="text-xl text-white font-bold tracking-tighter">SA</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Sign in to your account</h2>
            <p className="text-muted-foreground text-sm">
              Enter your credentials below to access your feed
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Email Address</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/50 transition-all rounded-xl"
              />
              {errors.email && (
                <p className="text-xs text-destructive flex items-center mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground/80">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/50 transition-all rounded-xl"
              />
              {errors.password && (
                <p className="text-xs text-destructive flex items-center mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl mt-6 relative overflow-hidden group shadow-lg shadow-primary/25"
            >
              <span className="relative z-10 flex items-center gap-2 text-md font-semibold">
                {isPending ? "Signing in..." : "Sign in"} 
                {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Sign up now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
