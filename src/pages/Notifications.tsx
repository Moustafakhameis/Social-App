import { useState } from "react";
import { Bell, BellRing, UserPlus, Heart, MessageCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, isRead: false, type: "like", message: "Jane Doe liked your post", time: "2m ago", icon: <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> },
    { id: 2, isRead: false, type: "comment", message: "Alex left a comment: 'Great thoughts!'", time: "1h ago", icon: <MessageCircle className="w-5 h-5 text-blue-500" /> },
    { id: 3, isRead: true, type: "follow", message: "Mia started following you", time: "3h ago", icon: <UserPlus className="w-5 h-5 text-emerald-500" /> },
    { id: 4, isRead: true, type: "system", message: "Welcome to SocialApp! Set up your profile.", time: "1d ago", icon: <BellRing className="w-5 h-5 text-purple-500" /> },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto w-full pb-20 p-4 sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Notifications</h1>
            <p className="text-muted-foreground font-medium">You have {unreadCount} unread messages</p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-full"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {notifications.map((notif, i) => (
            <motion.div 
              key={notif.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 sm:p-5 flex items-center gap-4 rounded-2xl transition-all group cursor-pointer ${
                notif.isRead 
                  ? "bg-transparent border border-border/40 hover:bg-black/5 dark:hover:bg-white/5" 
                  : "glass-card border-primary/20 shadow-lg shadow-primary/5"
              }`}
              onClick={() => markRead(notif.id)}
            >
              <div className={`w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center ${notif.isRead ? "bg-muted" : "bg-primary/10"}`}>
                {notif.icon}
              </div>
              <div className="flex-1">
                <p className={`text-[15px] group-hover:text-primary transition-colors ${notif.isRead ? "text-foreground/80 font-medium" : "text-foreground font-bold"}`}>
                  {notif.message}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 font-medium">{notif.time}</p>
              </div>
              
              {!notif.isRead && (
                <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
