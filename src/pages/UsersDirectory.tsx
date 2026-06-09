import { useState } from "react";
import { useUsers } from "@/api/dummyHooks";
import { Loader2, Search, Mail, Phone, Building } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function UsersDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data, isLoading, isError } = useUsers(debouncedQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setTimeout(() => setDebouncedQuery(e.target.value), 500);
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-20 p-4 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Discover People</h1>
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search users by name..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full h-14 pl-12 pr-4 rounded-full bg-white dark:bg-slate-900 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Users Grid */}
      {isLoading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center text-destructive p-8 glass-card">Error loading users.</div>
      ) : data?.users?.length === 0 ? (
        <div className="text-center text-muted-foreground p-12 glass-card border-dashed">
          No users found matching "{debouncedQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.users.map((user, idx) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/profile/${user.id}`} className="block group h-full">
                <div className="glass-card p-6 rounded-3xl border border-border/40 hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <img src={user.image} alt={user.firstName} className="w-full h-full rounded-full object-cover bg-background" />
                  </div>
                  
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">@{user.username}</p>
                  
                  <div className="mt-auto w-full space-y-2 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                    {user.company?.title && (
                      <div className="flex items-center justify-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="truncate">{user.company.title}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
