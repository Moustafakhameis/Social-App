import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./dummyApi";
import type { Post, Comment } from "@/types/dummy";
import toast from "react-hot-toast";

// POSTS HOOKS
export const usePosts = (query = "") => {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => query ? api.searchPosts(query) : api.fetchPosts(),
  });
};

export const usePost = (id: number | string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => api.fetchPostById(id),
    enabled: !!id,
  });
};

export const useUserPosts = (userId: number | string) => {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => api.fetchPostsByUser(userId),
    enabled: !!userId,
  });
};

// Optimistic Post Addition
export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts", ""] });
      const previousPosts = queryClient.getQueryData(["posts", ""]);
      
      // Optimistically update
      queryClient.setQueryData(["posts", ""], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          posts: [{ ...newPost, id: Date.now(), reactions: { likes: 0, dislikes: 0 }, views: 0 }, ...old.posts]
        };
      });
      
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", ""], context.previousPosts);
      }
      toast.error("Failed to add post");
    },
    onSuccess: () => {
      toast.success("Post added successfully!");
    }
  });
};

// USERS HOOKS
export const useUsers = (query = "") => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => query ? api.searchUsers(query) : api.fetchUsers(100),
  });
};

export const useUser = (id: number | string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => api.fetchUserById(id),
    enabled: !!id,
  });
};

// COMMENTS HOOKS
export const usePostComments = (postId: number | string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => api.fetchCommentsByPostId(postId),
    enabled: !!postId,
  });
};

// Optimistic Comment Addition
export const useAddComment = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.addComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previousComments = queryClient.getQueryData(["comments", postId]);
      
      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return { comments: [ { ...newComment, id: Date.now(), user: { id: newComment.userId, username: 'you', fullName: 'You' } } ] };
        return {
          ...old,
          comments: [
            ...old.comments,
            { ...newComment, id: Date.now(), user: { id: newComment.userId, username: 'you', fullName: 'You' } }
          ]
        };
      });
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
      toast.error("Failed to add comment");
    },
    onSuccess: () => {
      toast.success("Comment added!");
    }
  });
};

export const useDeleteComment = (postId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteComment,
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previousComments = queryClient.getQueryData(["comments", postId]);
      
      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          comments: old.comments.filter((c: any) => c.id !== commentId)
        };
      });
      return { previousComments };
    },
    onError: (err, commentId, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
      toast.error("Failed to delete comment");
    },
    onSuccess: () => {
      toast.success("Comment deleted!");
    }
  });
};
