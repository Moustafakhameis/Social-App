import { useState } from "react";
import { Settings as SettingsIcon, Shield, User, Bell, Key, Monitor, Smartphone, Lock } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useAuthStore } from "@/store/authStore";

export default function Settings() {
  const { isDark, toggle } = useThemeStore();
  const { user } = useAuthStore();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-muted-foreground/30'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 p-4 sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <SettingsIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Settings</h1>
            <p className="text-muted-foreground font-medium">Manage your account preferences</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Account Section */}
        <div className="glass-card p-6 overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px]" />
          
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-foreground">
            <User className="w-5 h-5 text-primary" /> Account details
          </h2>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 mb-6 border border-border/50">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">{user?.name || "User"}</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
              Edit
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-3 rounded-xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your security credentials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-foreground">
            <Monitor className="w-5 h-5 text-primary" /> Appearance
          </h2>
          
          <div className="flex justify-between items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
              </div>
            </div>
            <ToggleSwitch checked={isDark} onChange={toggle} />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-foreground">
            <Shield className="w-5 h-5 text-primary" /> Privacy & Notifications
          </h2>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts for likes and comments</p>
                </div>
              </div>
              <ToggleSwitch checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">Private Account</p>
                  <p className="text-xs text-muted-foreground">Only approved followers can see your posts</p>
                </div>
              </div>
              <ToggleSwitch checked={privateAccount} onChange={() => setPrivateAccount(!privateAccount)} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
