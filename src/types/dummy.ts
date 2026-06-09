export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  company?: {
    title: string;
    department: string;
  };
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface PaginatedResponse<T> {
  total: number;
  skip: number;
  limit: number;
}

export interface PostsResponse extends PaginatedResponse<Post> {
  posts: Post[];
}

export interface UsersResponse extends PaginatedResponse<User> {
  users: User[];
}

export interface CommentsResponse extends PaginatedResponse<Comment> {
  comments: Comment[];
}
