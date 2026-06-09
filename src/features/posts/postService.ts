import { apiClient } from "@/api/axios";
import type { PostsResponse, Post } from "./postTypes";

export const postService = {
  getPosts: async ({ pageParam = 1 }: { pageParam?: number }): Promise<PostsResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "success",
          metadata: { currentPage: pageParam, numberOfPages: 1, limit: 50 },
          posts: pageParam === 1 ? [
            {
              _id: "post1",
              body: "Welcome to SocialApp! This is a mock post because the backend is currently offline. 🚀",
              image: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000",
              user: { _id: "user1", name: "System Admin", photo: "https://github.com/shadcn.png" },
              createdAt: new Date().toISOString(),
              comments: []
            },
            {
              _id: "post2",
              body: "The new Tailwind v4 design system is looking great!",
              user: { _id: "user2", name: "Designer", photo: "https://github.com/shadcn.png" },
              createdAt: new Date(Date.now() - 3600000).toISOString(),
              comments: []
            }
          ] : []
        });
      }, 500);
    });
  },
  getPost: async (id: string): Promise<Post> => {
    const response = await apiClient.get<{ post: Post }>(`/posts/${id}`);
    return response.data.post;
  },
  createPost: async (formData: FormData): Promise<Post> => {
    // Requires token
    const response = await apiClient.post<{ post: Post }>("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.post;
  },
};
