import { useState } from "react";
import { useParams, Link } from "react-router";
import { useUser, useUserPosts } from "@/api/dummyHooks";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Phone, Edit2, Loader2, ArrowLeft, Image as ImageIcon, MessageSquare } from "lucide-react";
import { PostCard } from "@/features/posts/PostCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const { id } = useParams();
  const { data: user, isLoading: userLoading, isError: userError } = useUser(id || "");
  const { data: postsData, isLoading: postsLoading } = useUserPosts(id || "");
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "media">("posts");

  if (userLoading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-10 text-center glass-card">
        <h2 className="text-2xl font-bold text-destructive mb-2">User not found</h2>
        <Link to="/users">
          <Button variant="outline">Back to Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      {/* Cover Photo */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
        <Link to="/users" className="absolute top-4 left-4 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Profile Info */}
      <div className="px-6 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 md:-mt-20 mb-6 gap-4">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background overflow-hidden bg-background relative z-10 shadow-xl">
            {user.image ? (
              <img src={user.image} alt={user.firstName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-muted text-muted-foreground">
                {user.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Simulated Edit Button (only if viewing own profile, mocked as ID=1) */}
          {user.id === 1 ? (
            <Link to="/settings">
              <Button variant="outline" className="rounded-full shadow-sm">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button className="rounded-full shadow-sm px-8">
              Follow
            </Button>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black">{user.firstName} {user.lastName}</h1>
          <p className="text-muted-foreground text-lg mb-4">@{user.username}</p>
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
              {user.company?.title && (
                <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-md">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="font-medium">{user.company.title} at {user.company.department}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-md">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-md">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-medium">{user.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-6">
            <div className="flex flex-col">
              <span className="font-black text-xl">{user.id * 12}</span>
              <span className="text-muted-foreground text-sm uppercase tracking-wider font-bold">Following</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl">{user.id * 342}</span>
              <span className="text-muted-foreground text-sm uppercase tracking-wider font-bold">Followers</span>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-border/40 mb-6">
          <button 
            onClick={() => setActiveTab("posts")}
            className={`px-6 py-4 font-bold transition-colors border-b-2 ${activeTab === "posts" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Posts ({postsData?.total || 0})
          </button>
          <button 
            onClick={() => setActiveTab("replies")}
            className={`px-6 py-4 font-bold transition-colors border-b-2 ${activeTab === "replies" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Replies
          </button>
          <button 
            onClick={() => setActiveTab("media")}
            className={`px-6 py-4 font-bold transition-colors border-b-2 ${activeTab === "media" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            Media
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="max-w-2xl min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "posts" && (
              <motion.div key="posts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {postsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : postsData?.posts?.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground glass-card border-dashed">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Edit2 className="w-8 h-8 opacity-50" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">No posts yet</h3>
                    <p>This user hasn't shared anything.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {postsData?.posts?.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "replies" && (
              <motion.div key="replies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="py-12 text-center text-muted-foreground glass-card border-dashed">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 opacity-50 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No replies yet</h3>
                <p>Replies will appear here.</p>
              </motion.div>
            )}

            {activeTab === "media" && (
              <motion.div key="media" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="py-12 text-center text-muted-foreground glass-card border-dashed">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 opacity-50 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No media</h3>
                <p>Images and videos will appear here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
