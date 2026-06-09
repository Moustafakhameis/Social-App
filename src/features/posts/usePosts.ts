import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "./postService";
import toast from "react-hot-toast";

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.metadata?.nextPage || undefined,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create post");
    },
  });
};
