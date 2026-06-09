import axios from 'axios';
import type { 
  PostsResponse, Post, UsersResponse, User, CommentsResponse, Comment 
} from '@/types/dummy';

const API = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- POSTS ---
export const fetchPosts = async (limit = 30, skip = 0) => {
  const { data } = await API.get<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchPostById = async (id: number | string) => {
  const { data } = await API.get<Post>(`/posts/${id}`);
  return data;
};

export const fetchPostsByUser = async (userId: number | string) => {
  const { data } = await API.get<PostsResponse>(`/posts/user/${userId}`);
  return data;
};

export const searchPosts = async (query: string) => {
  const { data } = await API.get<PostsResponse>(`/posts/search?q=${query}`);
  return data;
};

export const addPost = async (post: Partial<Post>) => {
  const { data } = await API.post<Post>('/posts/add', post);
  return data;
};

export const updatePost = async (id: number | string, post: Partial<Post>) => {
  const { data } = await API.put<Post>(`/posts/${id}`, post);
  return data;
};

export const deletePost = async (id: number | string) => {
  const { data } = await API.delete<Post>(`/posts/${id}`);
  return data;
};

// --- USERS ---
export const fetchUsers = async (limit = 30, skip = 0) => {
  const { data } = await API.get<UsersResponse>(`/users?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchUserById = async (id: number | string) => {
  const { data } = await API.get<User>(`/users/${id}`);
  return data;
};

export const searchUsers = async (query: string) => {
  const { data } = await API.get<UsersResponse>(`/users/search?q=${query}`);
  return data;
};

export const addUser = async (user: Partial<User>) => {
  const { data } = await API.post<User>('/users/add', user);
  return data;
};

export const updateUser = async (id: number | string, user: Partial<User>) => {
  const { data } = await API.put<User>(`/users/${id}`, user);
  return data;
};

// --- COMMENTS ---
export const fetchComments = async (limit = 30, skip = 0) => {
  const { data } = await API.get<CommentsResponse>(`/comments?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchCommentById = async (id: number | string) => {
  const { data } = await API.get<Comment>(`/comments/${id}`);
  return data;
};

export const fetchCommentsByPostId = async (postId: number | string) => {
  const { data } = await API.get<CommentsResponse>(`/comments/post/${postId}`);
  return data;
};

export const addComment = async (comment: { body: string; postId: number; userId: number }) => {
  const { data } = await API.post<Comment>('/comments/add', comment);
  return data;
};

export const updateComment = async (id: number | string, comment: Partial<Comment>) => {
  const { data } = await API.put<Comment>(`/comments/${id}`, comment);
  return data;
};

export const deleteComment = async (id: number | string) => {
  const { data } = await API.delete<Comment>(`/comments/${id}`);
  return data;
};
