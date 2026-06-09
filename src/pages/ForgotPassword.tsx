import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsPending(true);
    // Mock API call
    setTimeout(() => {
      setIsPending(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Visual/Hero Section */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-zinc-900 justify-center items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop" 
            alt="Security" 
            className="object-cover w-full h-full opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 via-transparent to-secondary/40" />
        </div>
        
        <div className="relative z-10 p-12 text-white max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Secure your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                account
              </span>
            </h1>
            <p className="text-lg text-zinc-300 font-medium max-w-md leading-relaxed">
              Don't worry, it happens to the best of us. We'll help you get back into your account securely.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
            
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Forgot password?</h2>
            <p className="text-muted-foreground text-sm">
              {isSubmitted 
                ? "Check your email for reset instructions."
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg">Email Sent</h3>
              <p className="text-sm text-muted-foreground">
                We've sent an email to <span className="font-medium text-foreground">{email}</span> with a link to reset your password.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email Address</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/50 transition-all rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending || !email}
                className="w-full h-12 rounded-xl mt-6 relative overflow-hidden group shadow-lg shadow-primary/25"
              >
                <span className="relative z-10 flex items-center gap-2 text-md font-semibold">
                  {isPending ? "Sending link..." : "Send reset link"} 
                  {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
