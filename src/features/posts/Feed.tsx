import { useState } from "react";
import { usePosts, useAddPost } from "@/api/dummyHooks";
import { PostCard } from "./PostCard";
import { Loader2, Image as ImageIcon, Video, Smile, Search } from "lucide-react";

export function Feed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const { data, isLoading, isError } = usePosts(debouncedQuery);
  const { mutate: addPost, isPending: isAdding } = useAddPost();

  // Simple debounce for search
  // In a real app, use useDebounce hook
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Setting directly for immediate feedback or we could debounce it
    setTimeout(() => {
      setDebouncedQuery(e.target.value);
    }, 500);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    addPost({
      title: newPostContent.slice(0, 30) + (newPostContent.length > 30 ? "..." : ""),
      body: newPostContent,
      userId: 1, // Simulated current user ID
      tags: ["general"]
    });
    setNewPostContent("");
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-20">
      {/* Header with Search */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border/20 p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold hidden sm:block">Feed</h2>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={handleSearch}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary/30 border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Create Post Input */}
      {!debouncedQuery && (
        <div className="p-4 sm:p-6 border-b border-border/20 bg-white/5 dark:bg-slate-900/5 mb-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex-shrink-0 flex items-center justify-center text-white font-semibold shadow-inner mt-1">
              You
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="What's on your mind?" 
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full bg-transparent resize-none border-none focus:ring-0 text-lg placeholder:text-muted-foreground min-h-[60px] outline-none"
                rows={2}
              />
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-border/20">
                <div className="flex gap-1 text-primary">
                  <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <ImageIcon size={20} />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Video size={20} />
                  </button>
                  <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Smile size={20} />
                  </button>
                </div>
                <button 
                  onClick={handleCreatePost}
                  disabled={isAdding || !newPostContent.trim()}
                  className="bg-primary text-primary-foreground px-5 py-1.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isAdding ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feed Content */}
      <div className="px-4 sm:px-6 mt-6">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center text-destructive p-4 glass-card">Error loading feed</div>
        ) : data?.posts?.length === 0 ? (
          <div className="text-center text-muted-foreground p-12 glass-card">
            No posts found.
          </div>
        ) : (
          <div className="space-y-6">
            {data?.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
