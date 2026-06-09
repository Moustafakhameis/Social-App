import { type Post } from "@/types/dummy";
import { Heart, Eye, Share2, Bookmark, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useUser } from "@/api/dummyHooks";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { data: user } = useUser(post.userId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 sm:p-7 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-primary/5 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl group"
    >
      <div className="flex items-center gap-3 mb-4">
        <Link to={`/profile/${post.userId}`} className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] block">
          <div className="w-full h-full rounded-full bg-background overflow-hidden">
            {user?.image ? (
              <img src={user.image} alt={user.firstName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-bold bg-muted text-foreground">
                {post.userId}
              </div>
            )}
          </div>
        </Link>
        <div>
          <Link to={`/profile/${post.userId}`} className="font-semibold text-sm hover:underline">
            {user ? `${user.firstName} ${user.lastName}` : `User #${post.userId}`}
          </Link>
          <p className="text-xs text-muted-foreground">
            {user?.username ? `@${user.username}` : "Posted recently"}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <Link to={`/post/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
          <p className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap">{post.body}</p>
        </Link>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary/10 text-secondary-foreground text-xs font-semibold">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full">
            <Heart className="w-4 h-4 mr-2" />
            <span>{post.reactions?.likes || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-full">
            <Eye className="w-4 h-4 mr-2" />
            <span>{post.views || 0}</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-colors">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
