import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useThemeStore } from "@/store/themeStore";

function App() {
  const token = useAuthStore((state) => state.token);
  const { isDark } = useThemeStore();

  // Apply dark class on mount and whenever isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    // We could verify token here if needed
  }, [token]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          className: "glass dark:text-white",
          style: {
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }
        }} 
      />
    </div>
  );
}

export default App;
