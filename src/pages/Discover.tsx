import { Search as SearchIcon, TrendingUp, Users, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Discover() {
  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-6 pb-20">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 pb-4 pt-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search users, posts, or topics (Ctrl+K)" 
            className="pl-10 bg-muted/50 rounded-full h-12 text-base border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary w-5 h-5" />
            <h2 className="text-xl font-bold">Trending Topics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-4 hover:bg-accent transition-colors cursor-pointer flex items-center justify-between group">
                <div>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Hash className="w-3 h-3" /> Trending
                  </p>
                  <p className="font-semibold text-lg group-hover:text-primary transition-colors">#Innovation2026</p>
                  <p className="text-muted-foreground text-sm">45.2K posts</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-secondary w-5 h-5" />
            <h2 className="text-xl font-bold">Suggested for you</h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-primary" />
                  <div>
                    <p className="font-semibold">Jane Doe {i}</p>
                    <p className="text-muted-foreground text-sm">@janedoe{i}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium text-sm">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
