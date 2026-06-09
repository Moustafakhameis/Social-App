import { useParams, Link } from "react-router";
import { usePost, useUser } from "@/api/dummyHooks";
import { Loader2, ArrowLeft, Heart, Eye, Share2, Bookmark, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentsSection } from "@/features/comments/CommentsSection";

export default function SinglePost() {
  const { id } = useParams();
  const { data: post, isLoading, isError } = usePost(id || "");
  const { data: user } = useUser(post?.userId || "");

  if (isLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-10 text-center glass-card">
        <h2 className="text-2xl font-bold text-destructive mb-2">Post not found</h2>
        <Link to="/feed">
          <Button variant="outline">Back to Feed</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full pb-20">
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border/20 p-4 flex items-center gap-4">
        <Link to="/feed" className="p-2 hover:bg-secondary/20 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-xl font-bold">Post</h2>
      </div>

      <div className="p-4 sm:p-6">
        <div className="glass-card p-6 sm:p-8 rounded-3xl mb-8 border border-border/50 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <Link to={`/profile/${post.userId}`} className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] block">
              <div className="w-full h-full rounded-full bg-background overflow-hidden">
                {user?.image ? (
                  <img src={user.image} alt={user.firstName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold bg-muted text-foreground">
                    {post.userId}
                  </div>
                )}
              </div>
            </Link>
            <div>
              <Link to={`/profile/${post.userId}`} className="font-bold text-base hover:underline block">
                {user ? `${user.firstName} ${user.lastName}` : `User #${post.userId}`}
              </Link>
              <p className="text-sm text-muted-foreground">
                {user?.username ? `@${user.username}` : "Posted recently"}
              </p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">{post.title}</h1>
          <p className="text-base sm:text-lg text-foreground/90 whitespace-pre-wrap leading-relaxed mb-6">
            {post.body}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-5 border-t border-border/50">
            <div className="flex gap-4">
              <div className="flex items-center text-muted-foreground font-medium">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                <span>{post.reactions?.likes || 0}</span>
              </div>
              <div className="flex items-center text-muted-foreground font-medium">
                <Eye className="w-5 h-5 mr-2 text-blue-500" />
                <span>{post.views || 0}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id} />
      </div>
    </div>
  );
}
