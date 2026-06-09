import { useState } from "react";
import { usePostComments, useAddComment, useDeleteComment } from "@/api/dummyHooks";
import { Loader2, MessageSquare, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export function CommentsSection({ postId }: { postId: number | string }) {
  const { data, isLoading } = usePostComments(postId);
  const { mutate: addComment, isPending: isAdding } = useAddComment(postId);
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment(postId);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addComment({
      body: newComment,
      postId: Number(postId),
      userId: 1 // Simulated current user
    });
    setNewComment("");
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-primary" />
        Comments ({data?.comments?.length || 0})
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-8 relative flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center font-bold text-primary mr-3 shadow-inner">
          You
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-border/50 rounded-full h-12 pl-5 pr-14 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
        />
        <Button 
          type="submit" 
          disabled={isAdding || !newComment.trim()}
          size="icon"
          className="absolute right-1 w-10 h-10 rounded-full"
        >
          {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-1" />}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : data?.comments?.length === 0 ? (
          <div className="text-center text-muted-foreground p-8 glass-card border-dashed">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {data?.comments?.map((comment) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex gap-3 p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm border border-border/30 hover:border-border/60 transition-colors"
              >
                <Link to={`/profile/${comment.user.id}`} className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center font-bold text-sm border border-border/50">
                    {comment.user.username.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Link to={`/profile/${comment.user.id}`} className="font-semibold text-sm hover:underline">
                      {comment.user.fullName} <span className="text-muted-foreground font-normal ml-1">@{comment.user.username}</span>
                    </Link>
                    
                    {/* Simulated Delete Button for current user's comments */}
                    {comment.user.id === 1 && (
                      <button 
                        onClick={() => deleteComment(comment.id)}
                        disabled={isDeleting}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        title="Delete comment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">{comment.body}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
